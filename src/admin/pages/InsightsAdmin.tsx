import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, Newspaper, Loader2, Eye, ExternalLink, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { slugify } from '../../lib/storage';
import type { InsightArticle } from '../../types';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Drawer } from '../components/ui/Drawer';
import { Field, TextInput, TextArea, Select, TagsField } from '../components/ui/Field';
import { ImageUpload } from '../components/ui/ImageUpload';
import { Toast, useToast } from '../components/ui/Toast';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

const CATEGORIES: InsightArticle['category'][] = [
  'Technology',
  'Career',
  'Web Development',
  'AI',
  'Programming',
  'Digital Skills',
  'Nepal IT Industry',
];

const emptyInsight = (): InsightArticle => ({
  id: '',
  slug: '',
  title: '',
  excerpt: '',
  category: 'Technology',
  date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  readTime: '5 min read',
  author: { name: '', role: 'Navya Ed Tech' },
  coverImage: '',
  content: [''],
  tags: [],
  status: 'published',
  seoTitle: '',
  seoDescription: '',
});

const ParagraphListField: React.FC<{ items: string[]; onChange: (items: string[]) => void }> = ({ items, onChange }) => {
  const updateAt = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <TextArea
            rows={3}
            value={item}
            onChange={(e) => updateAt(index, e.target.value)}
            placeholder={`Paragraph ${index + 1}…`}
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
            aria-label="Remove paragraph"
            className="shrink-0 w-9 h-9 rounded-lg border border-input-border text-ink-faint hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center justify-center"
          >
            &times;
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="text-xs font-semibold text-blue hover:text-navy transition-colors"
      >
        + Add paragraph
      </button>
    </div>
  );
};

export const InsightsAdmin: React.FC = () => {
  const { items: insights, isLoading, error, add, update, remove } = useSupabaseTable<InsightArticle>('insights', { orderBy: 'createdAt' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'published' | 'draft' | 'archived'>('All');
  const [drawerState, setDrawerState] = useState<{ mode: 'create' | 'edit'; draft: InsightArticle } | null>(null);
  const [viewTarget, setViewTarget] = useState<InsightArticle | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<InsightArticle | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { toast, showToast, dismissToast } = useToast();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return insights.filter((i) => {
      const matchesQuery = !q || i.title.toLowerCase().includes(q) || i.slug.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
      const iStatus = i.status || 'published';
      const matchesStatus = statusFilter === 'All' || iStatus === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [insights, search, statusFilter]);

  const handleToggleStatus = async (insight: InsightArticle, newStatus: InsightArticle['status']) => {
    try {
      await update(insight.id, { status: newStatus });
      showToast(`Updated "${insight.title}" status to ${newStatus}.`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to update article status.');
    }
  };

  const openCreate = () => {
    setSaveError(null);
    setDrawerState({ mode: 'create', draft: emptyInsight() });
  };
  const openEdit = (insight: InsightArticle) => {
    setSaveError(null);
    setDrawerState({ mode: 'edit', draft: { ...insight, author: { ...insight.author } } });
  };

  const handleSave = async () => {
    if (!drawerState) return;
    const draft = drawerState.draft;
    
    // Validate required fields
    if (!draft.title.trim()) {
      setSaveError('Article Title is required.');
      return;
    }
    if (!draft.excerpt.trim()) {
      setSaveError('Short excerpt is required for reader preview.');
      return;
    }
    const cleanContent = draft.content.filter((p) => p.trim());
    if (cleanContent.length === 0) {
      setSaveError('Please provide at least one paragraph of article body text.');
      return;
    }

    const generatedSlug = draft.slug.trim() || slugify(draft.title);
    if (drawerState.mode === 'create' && insights.some((i) => i.slug === generatedSlug)) {
      setSaveError(`An article with slug "${generatedSlug}" already exists. Please choose a unique title or slug.`);
      return;
    }

    const cleaned: InsightArticle = {
      ...draft,
      title: draft.title.trim(),
      slug: generatedSlug,
      status: draft.status || 'published',
      content: cleanContent,
      seoTitle: draft.seoTitle?.trim() || draft.title.trim(),
      seoDescription: draft.seoDescription?.trim() || draft.excerpt.trim(),
    };

    setIsSaving(true);
    setSaveError(null);
    try {
      if (drawerState.mode === 'create') {
        const { id: _omit, ...payload } = cleaned;
        await add(payload);
        showToast(`Article "${cleaned.title}" published successfully.`);
      } else {
        await update(draft.id, cleaned);
        showToast(`Article "${cleaned.title}" updated successfully.`);
      }
      setDrawerState(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save article.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      showToast(`Article deleted successfully.`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Failed to delete article.');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Insights"
        description="Articles published on the live Insights blog."
        actions={
          <Button variant="primary" size="sm" onClick={openCreate} leftIcon={<Plus className="w-4 h-4" />}>
            New Article
          </Button>
        }
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1 border-b border-border-soft overflow-x-auto text-xs">
          {(['All', 'published', 'draft', 'archived'] as const).map((status) => {
            const count = status === 'All'
              ? insights.length
              : insights.filter((i) => (i.status || 'published') === status).length;
            const label = status === 'All' ? 'All Articles' : status === 'published' ? 'Published' : status === 'draft' ? 'Drafts' : 'Archived';
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  statusFilter === status
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-ink-soft hover:bg-paper-alt hover:text-ink'
                }`}
              >
                <span>{label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${statusFilter === status ? 'bg-white/20 text-white' : 'bg-paper-alt text-ink-faint'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-b border-border-soft">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, tags, slug…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper-alt text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-colors"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-14 text-sm text-ink-faint">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading insights…
          </div>
        ) : error ? (
          <div className="px-5 py-10 text-center text-sm text-red-600">Failed to load insights: {error}</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={Newspaper} title="No articles found" description="Try a different search term, or publish a new insight." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-ink-faint border-b border-border-soft">
                  <th className="px-5 py-2.5 font-semibold">Article</th>
                  <th className="px-5 py-2.5 font-semibold hidden sm:table-cell">Category</th>
                  <th className="px-5 py-2.5 font-semibold">Status</th>
                  <th className="px-5 py-2.5 font-semibold hidden md:table-cell">Date</th>
                  <th className="px-5 py-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((insight) => {
                  const iStatus = insight.status || 'published';
                  return (
                    <tr key={insight.id} className="border-b border-paper-alt last:border-0 hover:bg-paper transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-ink max-w-md truncate">{insight.title}</p>
                        <p className="text-xs text-ink-faint mt-0.5">{insight.author.name || 'Unattributed'} · {insight.readTime}</p>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <Badge variant="navy" size="sm">{insight.category}</Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        {iStatus === 'published' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Published
                          </span>
                        )}
                        {iStatus === 'draft' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Draft
                          </span>
                        )}
                        {iStatus === 'archived' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                            Archived
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell text-ink-soft">{insight.date}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Quick Publish / Unpublish Toggle */}
                          {iStatus === 'draft' ? (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(insight, 'published')}
                              aria-label={`Publish ${insight.title}`}
                              title="Publish this article to live blog"
                              className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" /> Publish
                            </button>
                          ) : iStatus === 'published' ? (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(insight, 'draft')}
                              aria-label={`Unpublish ${insight.title}`}
                              title="Move to draft"
                              className="px-2 py-1 rounded text-xs font-medium text-ink-faint hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                            >
                              Unpublish
                            </button>
                          ) : null}

                          <button
                            type="button"
                            onClick={() => setViewTarget(insight)}
                            aria-label={`View article details for ${insight.title}`}
                            title="Preview article"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-[#F0F5FA] hover:text-blue transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEdit(insight)}
                            aria-label={`Edit ${insight.title}`}
                            title="Edit article"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-paper-alt hover:text-navy transition-colors cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(insight)}
                            aria-label={`Delete ${insight.title}`}
                            title="Delete article"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-soft hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Drawer
        isOpen={!!drawerState}
        onClose={() => setDrawerState(null)}
        title={drawerState?.mode === 'create' ? 'New Article' : 'Edit Article'}
        description="Blog article content as shown on the live Insights page."
        widthClass="max-w-2xl"
        footer={
          <>
            <button
              type="button"
              onClick={() => setDrawerState(null)}
              className="px-3.5 py-2 text-sm font-semibold text-ink-soft hover:text-ink"
            >
              Cancel
            </button>
            <Button variant="primary" size="md" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : drawerState?.mode === 'create' ? 'Publish Article' : 'Save Changes'}
            </Button>
          </>
        }
      >
        {drawerState && (
          <div className="space-y-5">
            {saveError && (
              <div className="px-4 py-2.5 rounded-lg bg-red-50 border border-red-100 text-xs font-medium text-red-700">
                {saveError}
              </div>
            )}
            <Field label="Title" required>
              <TextInput
                value={drawerState.draft.title}
                onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, title: e.target.value } })}
                placeholder="e.g. Navigating Modern Software Engineering Careers in Nepal"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Category">
                <Select
                  value={drawerState.draft.category}
                  onChange={(e) =>
                    setDrawerState({ ...drawerState, draft: { ...drawerState.draft, category: e.target.value as InsightArticle['category'] } })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Publishing Status">
                <Select
                  value={drawerState.draft.status || 'published'}
                  onChange={(e) =>
                    setDrawerState({ ...drawerState, draft: { ...drawerState.draft, status: e.target.value as InsightArticle['status'] } })
                  }
                >
                  <option value="published">Published (Live to Public)</option>
                  <option value="draft">Draft (Admin Only)</option>
                  <option value="archived">Archived (Unlisted)</option>
                </Select>
              </Field>
              <Field label="Read Time">
                <TextInput
                  value={drawerState.draft.readTime}
                  onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, readTime: e.target.value } })}
                  placeholder="e.g. 6 min read"
                />
              </Field>
            </div>

            <Field label="URL Slug" hint="Auto-generated from title if left blank.">
              <TextInput
                value={drawerState.draft.slug}
                onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, slug: slugify(e.target.value) } })}
                placeholder={slugify(drawerState.draft.title) || 'article-slug'}
              />
            </Field>

            <Field label="Excerpt" required hint="Short synopsis shown on the blog cards and RSS/social feeds.">
              <TextArea
                rows={2}
                value={drawerState.draft.excerpt}
                onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, excerpt: e.target.value } })}
                placeholder="Key takeaway summarizing the article..."
              />
            </Field>

            {/* SEO Metadata Section */}
            <div className="p-4 rounded-xl border border-border bg-paper-alt space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-blue" />
                <span>Search Engine Optimization (SEO)</span>
              </div>
              <Field
                label="SEO Meta Title"
                hint={`${(drawerState.draft.seoTitle || drawerState.draft.title).length}/60 recommended chars`}
              >
                <TextInput
                  value={drawerState.draft.seoTitle || ''}
                  onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, seoTitle: e.target.value } })}
                  placeholder={drawerState.draft.title || 'Optimal search engine title'}
                />
              </Field>
              <Field
                label="SEO Meta Description"
                hint={`${(drawerState.draft.seoDescription || drawerState.draft.excerpt).length}/160 recommended chars`}
              >
                <TextArea
                  rows={2}
                  value={drawerState.draft.seoDescription || ''}
                  onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, seoDescription: e.target.value } })}
                  placeholder={drawerState.draft.excerpt || 'Brief description for Google search result snippets...'}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Author Name">
                <TextInput
                  value={drawerState.draft.author.name}
                  onChange={(e) =>
                    setDrawerState({ ...drawerState, draft: { ...drawerState.draft, author: { ...drawerState.draft.author, name: e.target.value } } })
                  }
                  placeholder="e.g. Engineering Advisory Group"
                />
              </Field>
              <Field label="Author Role">
                <TextInput
                  value={drawerState.draft.author.role}
                  onChange={(e) =>
                    setDrawerState({ ...drawerState, draft: { ...drawerState.draft, author: { ...drawerState.draft.author, role: e.target.value } } })
                  }
                />
              </Field>
            </div>

            <Field label="Publish Date">
              <TextInput
                value={drawerState.draft.date}
                onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, date: e.target.value } })}
                placeholder="e.g. August 2026"
              />
            </Field>

            <Field label="Cover Image">
              <ImageUpload
                value={drawerState.draft.coverImage}
                onChange={(url) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, coverImage: url } })}
                folder="insights"
                hint="Article hero banner displayed on the blog details page."
              />
            </Field>

            <Field label="Tags">
              <TagsField
                tags={drawerState.draft.tags}
                onChange={(tags) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, tags } })}
              />
            </Field>

            <Field label="Article Content" hint="Each paragraph renders as its own block on the live article page.">
              <ParagraphListField
                items={drawerState.draft.content}
                onChange={(content) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, content } })}
              />
            </Field>
          </div>
        )}
      </Drawer>

      {/* In-Dashboard Read-Only Article Inspection Drawer */}
      <Drawer
        isOpen={!!viewTarget}
        onClose={() => setViewTarget(null)}
        title="Article Overview & Reader"
        description={viewTarget?.title || ''}
        widthClass="max-w-3xl"
        footer={
          <>
            <a
              href={`/insights/${viewTarget?.slug}?preview=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border text-xs font-semibold text-navy bg-white hover:bg-paper-alt transition-colors mr-auto"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Live Preview
            </a>
            <button
              type="button"
              onClick={() => setViewTarget(null)}
              className="px-4 py-2 text-sm font-semibold text-ink-soft hover:text-ink cursor-pointer"
            >
              Close
            </button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                if (viewTarget) {
                  const target = viewTarget;
                  setViewTarget(null);
                  openEdit(target);
                }
              }}
              leftIcon={<Pencil className="w-4 h-4" />}
            >
              Edit This Article
            </Button>
          </>
        }
      >
        {viewTarget && (
          <div className="space-y-6">
            {/* Header Telemetry */}
            <div className="p-5 rounded-2xl bg-navy text-white space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="navy" size="sm">{viewTarget.category}</Badge>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  (viewTarget.status || 'published') === 'published'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : viewTarget.status === 'draft'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-white/10 text-white/80'
                }`}>
                  {viewTarget.status || 'published'}
                </span>
                {viewTarget.readTime && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/90">
                    {viewTarget.readTime}
                  </span>
                )}
                {viewTarget.date && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/90">
                    {viewTarget.date}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{viewTarget.title}</h3>
              <p className="text-xs text-white/80 leading-relaxed">{viewTarget.excerpt}</p>

              {viewTarget.author?.name && (
                <div className="pt-2 border-t border-white/15 flex items-center gap-2.5 text-xs">
                  <span className="text-navy-mist">Author:</span>
                  <span className="font-semibold text-white">{viewTarget.author.name}</span>
                  {viewTarget.author.role && <span className="text-navy-mist">({viewTarget.author.role})</span>}
                </div>
              )}
            </div>

            {/* Tags */}
            {viewTarget.tags && viewTarget.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {viewTarget.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-input-border text-xs font-mono text-navy">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Formatted Article Content */}
            <div className="space-y-3 p-5 rounded-2xl bg-white border border-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy border-b border-border pb-2">
                Article Body Content ({viewTarget.content.length} Paragraphs)
              </h4>
              <div className="space-y-3.5 text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                {viewTarget.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this article?"
        description={`"${deleteTarget?.title}" will be removed from the live Insights page. This cannot be undone.`}
        confirmLabel="Delete Article"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
};

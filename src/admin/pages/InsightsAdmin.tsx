import React, { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, Newspaper, Loader2, Eye } from 'lucide-react';
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
  const [drawerState, setDrawerState] = useState<{ mode: 'create' | 'edit'; draft: InsightArticle } | null>(null);
  const [viewTarget, setViewTarget] = useState<InsightArticle | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<InsightArticle | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { toast, showToast, dismissToast } = useToast();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return insights;
    return insights.filter((i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
  }, [insights, search]);

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
    if (!draft.title.trim()) return;

    const cleaned: InsightArticle = {
      ...draft,
      slug: draft.slug || slugify(draft.title),
      content: draft.content.filter((p) => p.trim()),
    };

    setIsSaving(true);
    setSaveError(null);
    try {
      if (drawerState.mode === 'create') {
        const { id: _omit, ...payload } = cleaned;
        await add(payload);
      } else {
        await update(draft.id, cleaned);
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
        <div className="p-4 border-b border-border-soft">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
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
                  <th className="px-5 py-2.5 font-semibold hidden md:table-cell">Published</th>
                  <th className="px-5 py-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((insight) => (
                  <tr key={insight.id} className="border-b border-paper-alt last:border-0 hover:bg-paper transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-ink max-w-md truncate">{insight.title}</p>
                      <p className="text-xs text-ink-faint mt-0.5">{insight.author.name || 'Unattributed'} · {insight.readTime}</p>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <Badge variant="navy" size="sm">{insight.category}</Badge>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-ink-soft">{insight.date}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewTarget(insight)}
                          aria-label={`View article details for ${insight.title}`}
                          title="View article details"
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
                ))}
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

            <div className="grid grid-cols-2 gap-4">
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
              <Field label="Read Time">
                <TextInput
                  value={drawerState.draft.readTime}
                  onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, readTime: e.target.value } })}
                  placeholder="e.g. 6 min read"
                />
              </Field>
            </div>

            <Field label="Excerpt">
              <TextArea
                rows={2}
                value={drawerState.draft.excerpt}
                onChange={(e) => setDrawerState({ ...drawerState, draft: { ...drawerState.draft, excerpt: e.target.value } })}
              />
            </Field>

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

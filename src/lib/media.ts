/**
 * The site ships no stock or AI imagery. Bundled /images/ paths and stock
 * hosts (still present in older Supabase rows) count as "no photo"; only
 * genuinely uploaded photos, such as Supabase Storage URLs, are shown.
 */
export const isRealPhoto = (src?: string | null): src is string =>
  !!src && !/^\/images\//i.test(src) && !/images\.unsplash\.com|picsum\.photos|placehold/i.test(src);

import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

interface WithId {
  id: string;
}

interface UseSupabaseTableOptions {
  orderBy?: string;
  ascending?: boolean;
}

export function useSupabaseTable<T extends WithId>(table: string, options: UseSupabaseTableOptions = {}) {
  const { orderBy, ascending = false } = options;
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    let query = supabase.from(table).select('*');
    if (orderBy) query = query.order(orderBy, { ascending });
    const { data, error } = await query;
    if (error) {
      setError(error.message);
    } else {
      setItems((data ?? []) as T[]);
      setError(null);
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, orderBy, ascending]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(
    async (item: Partial<T>): Promise<T> => {
      const { data, error } = await supabase.from(table).insert(item as never).select().single();
      if (error) throw new Error(error.message);
      setItems((prev) => [data as T, ...prev]);
      return data as T;
    },
    [table]
  );

  const update = useCallback(
    async (id: string, patch: Partial<T>): Promise<T> => {
      const { data, error } = await supabase.from(table).update(patch as never).eq('id', id).select().single();
      if (error) throw new Error(error.message);
      setItems((prev) => prev.map((item) => (item.id === id ? (data as T) : item)));
      return data as T;
    },
    [table]
  );

  const remove = useCallback(
    async (id: string): Promise<void> => {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw new Error(error.message);
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [table]
  );

  /** Deletes every row, then bulk-inserts the given rows. Used by "Reset to defaults" / "Clear all". */
  const replaceAll = useCallback(
    async (rows: Partial<T>[]): Promise<void> => {
      const { data: existing, error: fetchError } = await supabase.from(table).select('id');
      if (fetchError) throw new Error(fetchError.message);
      const ids = (existing ?? []).map((row: { id: string }) => row.id);
      if (ids.length > 0) {
        const { error: deleteError } = await supabase.from(table).delete().in('id', ids);
        if (deleteError) throw new Error(deleteError.message);
      }
      if (rows.length > 0) {
        const { error: insertError } = await supabase.from(table).insert(rows as never[]);
        if (insertError) throw new Error(insertError.message);
      }
      await refresh();
    },
    [table, refresh]
  );

  return { items, isLoading, error, refresh, add, update, remove, replaceAll };
}

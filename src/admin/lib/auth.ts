import { supabase } from '../../lib/supabaseClient';

export interface AdminAccount {
  name: string;
  email: string;
}

export async function signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

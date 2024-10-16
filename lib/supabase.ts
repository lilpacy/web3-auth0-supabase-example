import { createClient } from '@supabase/supabase-js';

const getSupabase = (access_token: string) => {
  const options = {};

  if (access_token) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (options as any).global = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    options
  );

  return supabase;
};

const checkSupabaseConnection = async (access_token: string) => {
  const supabase = getSupabase(access_token);
  const { data, error } = await supabase.from('todo').select('*');
  return { data, error };
};

export { getSupabase, checkSupabaseConnection };

import { createClient } from '@supabase/supabase-js';

const getSupabase = (access_token: string) => {
  const options = {};

  if (access_token) {
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

export { getSupabase };

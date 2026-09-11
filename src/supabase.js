import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.ncwwfieuguvawyxuzjfw;
const supabaseAnonKey = import.meta.env.sb_publishable_EaLQbF-FL_GjA-Cysua8gg_7ZvIGyq3;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
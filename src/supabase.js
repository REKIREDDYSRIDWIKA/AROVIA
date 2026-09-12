import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ncwwfieuguvawyxuzjfw.supabase.co";

const supabaseAnonKey = "sb_publishable_EaLQbF-FL_GjA-Cysua8gg_7ZvIGyq3";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
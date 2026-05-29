import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://jqxmrhfkealrqnmwvaca.supabase.co";

const supabaseKey =
  "sb_publishable_DI1yRg1SlCeHdjgn5-cTlA_6bfkWF0U";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );
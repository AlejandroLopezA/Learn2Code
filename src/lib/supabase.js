import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "TU_URL";

const supabaseKey =
  "TU_PUBLISHABLE_KEY";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );
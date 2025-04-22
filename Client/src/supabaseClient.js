import { createClient } from "@supabase/supabase-js"; 

const supabase = createClient('https://your-project.supabase.co', "your-anon-or-service-key");

export default supabase;

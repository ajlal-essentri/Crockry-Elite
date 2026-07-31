import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lnspinsjtoocsoeouswi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxuc3BpbnNqdG9vY3NvZW91c3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNDg4NDAsImV4cCI6MjEwMDcyNDg0MH0.n5qMYSV5x5l3pmRT4exRMaG0xjaF-_O3o1KgU138qHE";

export const supabase = createClient(supabaseUrl, supabaseKey);

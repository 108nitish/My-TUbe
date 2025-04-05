import { createClient } from "@supabase/supabase-js"; 

const supabase = createClient("https://mvhusfrehckbpsujhjqf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aHVzZnJlaGNrYnBzdWpoanFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDIyODYsImV4cCI6MjA1OTI3ODI4Nn0.m3HOwNtgKU2PiMXHS-ZKO2lQ1NfM5KJaLbjOW6xcQm0");

export default supabase;
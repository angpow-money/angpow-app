import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = "https://txmjkbhjhgaqyhtwjoag.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4bWprYmhqaGdhcXlodHdqb2FnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjg1NzQyNSwiZXhwIjoyMDQyNDMzNDI1fQ.6tzTRWapx2WVowEcjKmb8dd09beS0usIawy55CTN7gs"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
export default supabase

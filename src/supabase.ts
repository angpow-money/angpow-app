import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = "https://txmjkbhjhgaqyhtwjoag.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4bWprYmhqaGdhcXlodHdqb2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4NTc0MjUsImV4cCI6MjA0MjQzMzQyNX0.Sc2srczqdRi0tq80dM_FdXX6TEeUxpD7T5WA1nNycTU"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
export default supabase

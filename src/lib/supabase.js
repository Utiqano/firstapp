import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.https://dgnsomdadgtvfkfcxwgf.supabase.co
const supabaseAnonKey = import.meta.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnbnNvbWRhZGd0dmZrZmN4d2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDM5MTUsImV4cCI6MjA3OTU3OTkxNX0.AqBN5yju4u02tpfuuPKZ5sfR4tBeEVvU1g6NGCUPISE

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
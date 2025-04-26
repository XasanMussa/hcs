import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://izuwgiwqlkzajgrzqsqg.supabase.co"; // Replace with your actual Supabase project URL
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6dXdnaXdxbGt6YWpncnpxc3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2ODM2MzYsImV4cCI6MjA2MTI1OTYzNn0.9KPpYoCyuJLFY9tguUSVipbH6StxYi9vZybd0jJFfu0"; // Replace with your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

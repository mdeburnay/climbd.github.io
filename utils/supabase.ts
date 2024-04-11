import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pbitzroejhdbkjocdyof.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiaXR6cm9lamhkYmtqb2NkeW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1Mzc2ODksImV4cCI6MjAyODExMzY4OX0.-giPLe1CyWtl8yUQ7NHRzxbStlhn7SAskbdKtx0W0jg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

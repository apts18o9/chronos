//export client-side instance of better auth 

'use client'
import { createClient } from "@supabase/supabase-js"


// console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log("Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
//client instance
export const authClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)


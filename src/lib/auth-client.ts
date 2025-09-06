//export client-side instance of better auth 

'use client'
import { createAuthClient } from "better-auth/client"

//client instance
export const authClient = createAuthClient();
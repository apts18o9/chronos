//better auth initialization

import {betterAuth} from "better-auth"
import { nextCookies } from "better-auth/next-js"
import {Pool} from "pg"

//db connection pool
const database = new Pool({
    connectionString: process.env.DATABASE_URL,
})


//better auth instance

export const auth = betterAuth({
    database,
    secret: process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET,
    plugins: [nextCookies()],
});
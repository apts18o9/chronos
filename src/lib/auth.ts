// //better auth initialization

// import {betterAuth} from "better-auth"
// import { nextCookies } from "better-auth/next-js"
// import {Pool} from "pg"
// import {z} from "zod"
// //db connection pool
// const database = new Pool({
//     connectionString: process.env.DATABASE_URL,
// })


// //user schema 
// const userSchema = z.object({
//     email: z.email(),
//     password: z.string().min(6),
//     name: z.string().optional(),

// })


// //better auth instance

// export const auth = betterAuth({
//     database,
//     userSchema,
//     secret: process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET,
//     plugins: [nextCookies()],
// });
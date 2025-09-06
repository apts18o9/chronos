//route for better auth actions and provide get and post call for sign-in and sign-out

import { toNextJsHandler } from "better-auth/next-js";
import {auth} from "@/lib/auth"

export const {GET, POST} = toNextJsHandler(auth.handler)


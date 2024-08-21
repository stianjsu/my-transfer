import { UTApi } from "uploadthing/server"
import { env } from "@/env"

export const utapi = new UTApi({ apiKey: env.UPLOADTHING_SECRET })

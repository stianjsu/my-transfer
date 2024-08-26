import { NextResponse, NextRequest } from "next/server"
import { env } from "@/env"
import { db } from "@/server/db"
import { sql, lt } from "drizzle-orm"
import { uploadedFilesTable } from "@/server/db/schema"
import { utapi } from "@/server/uploadthing"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export async function GET(req: NextRequest) {
  if (req.headers.get("Authorization") !== `Bearer ${env.CRON_SECRET}`)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const deletedFiles = await db.transaction(async (tx) => {
    const oldFiles = await tx
      .delete(uploadedFilesTable)
      .where(lt(uploadedFilesTable.createdAt, sql`NOW() - INTERVAL '24 hours'`))
      .returning()

    const uploadthingRes = await utapi
      .deleteFiles(oldFiles.map((f) => f.key))
      .catch(async (err) => {
        console.error(err)
        return { success: false as boolean, deletedCount: 0 as number } as const
      })

    if (!uploadthingRes.success) tx.rollback()

    return { oldFiles, uploadthingRes }
  })
  console.log(deletedFiles)

  return NextResponse.json({ ...deletedFiles })
}

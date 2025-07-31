"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/server/db"
import { uploadedFilesTable } from "@/server/db/schema"
import { eq, and, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function markFileAsDownloaded(filekey: string) {
  const { userId } = await auth()

  // Check if user is authenticated
  if (!userId) {
    redirect("/sign-in")
  }

  const file = await db
    .select()
    .from(uploadedFilesTable)
    .where(
      and(
        eq(uploadedFilesTable.key, filekey),
        eq(uploadedFilesTable.userId, userId),
      ),
    )
    .limit(1)

  if (file.length === 0) {
    throw new Error("File not found or access denied")
  }

  await db
    .update(uploadedFilesTable)
    .set({ lastDownloaded: sql`CURRENT_TIMESTAMP` })
    .where(eq(uploadedFilesTable.key, filekey))

  revalidatePath("/")
}

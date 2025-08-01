import { DownloadButton } from "@/components/DownloadButton"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { FolderCheck } from "lucide-react"
import Image from "next/image"
import { FILE_URL } from "./uploadthing"

export const fileSizeConverter: (size: number) => string = (size) => {
  const sizeOrders = ["bytes", "KB", "MB", "GB"]
  const order = Math.floor(Math.log10(size) / 3)

  return `${(size / 1024 ** order).toFixed(1)} ${sizeOrders[order]}`
}

export const FileDisplay = ({
  name,
  timeCreated,
  fileKey,
  size,
  lastDownloaded,
}: {
  name: string
  timeCreated: Date
  fileKey: string
  size: number
  lastDownloaded: Date | null
}) => {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
  ]
  const extension = name.toLowerCase().substring(name.lastIndexOf("."))
  const isImage = imageExtensions.includes(extension)

  return (
    <Card className="border">
      {lastDownloaded && (
        <div className="absolute right-2 top-2">
          <FolderCheck size={20} className="text-green-600" />
        </div>
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-xl">
          <div className="flex flex-row">
            <div className="relative h-[50px] w-[50px] overflow-hidden rounded-lg bg-gradient-to-br from-sky-400 to-cyan-400">
              {isImage ? (
                <Image
                  fill
                  src={FILE_URL + fileKey}
                  alt="🎨"
                  className="object-cover"
                  sizes="50px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span>📝</span>
                </div>
              )}
            </div>
            <div className="flex flex-1 justify-end">
              <DownloadButton fileKey={fileKey} name={name} />
            </div>
          </div>
          <div className="w-full overflow-hidden text-ellipsis text-nowrap pt-2">
            {name}
          </div>
        </CardTitle>
        <CardDescription>
          <span>
            {timeCreated.toLocaleTimeString("no") +
              " - " +
              timeCreated.toLocaleDateString("no", { dateStyle: "short" })}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          <span className="flex-1 py-1">{fileSizeConverter(size)}</span>
          <span className="text-s rounded bg-blue-600/30 px-2 py-1 font-medium uppercase tracking-wide text-blue-200">
            {name.split(".")[1].toUpperCase()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

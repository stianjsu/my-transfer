import { Download } from "./Icons"

export const fileSizeConverter: (size: number) => string = (size) => {
  const sizeOrders = ["bytes", "KB", "MB", "GB"]
  const order = Math.floor(Math.log10(size) / 3)

  return `${(size / 1024 ** order).toFixed(1)} ${sizeOrders[order]}`
}

export const FileDisplay = ({
  name,
  timeCreated,
  downloadUrl,
  size,
}: {
  name: string
  timeCreated: Date
  downloadUrl: string
  size: number
}) => {
  return (
    <div className="flex h-24 w-full flex-row items-center gap-4 rounded-lg bg-slate-900 p-2 sm:h-20">
      <span className="line-clamp-3 grow break-words text-sm sm:line-clamp-3 sm:text-base">
        {name}
      </span>

      <div className="flex min-w-[85px] flex-col text-sm">
        <span>
          {timeCreated.toLocaleDateString("no", { dateStyle: "short" })}
        </span>
        <span>Size: {fileSizeConverter(size)}</span>
        <span>Type: {name.split(".")[1].toUpperCase()}</span>
      </div>
      <div className="size-12 min-w-max">
        <a
          href={downloadUrl}
          className="flex size-12 items-center justify-center rounded-full border border-slate-300 transition ease-in-out hover:bg-slate-500"
          download
        >
          <Download size={30} />
        </a>
      </div>
    </div>
  )
}

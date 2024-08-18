import { Download, LoadingSpinner, RefreshIcon } from "./Icons"

const FileDisplay = ({
  file,
}: {
  file: { name: string; timeCreated: Date; downloadUrl: string }
}) => {
  return (
    <div className="flex h-24 w-full flex-row items-center gap-4 rounded-lg bg-slate-900 p-2 sm:h-20">
      <span className="line-clamp-3 grow break-words text-sm sm:line-clamp-3 sm:text-base">
        {file.name}
      </span>

      <div className="flex min-w-[85px] flex-col text-sm">
        <span>
          {/* Uploaded:{" "} */}
          {file.timeCreated.toLocaleDateString("no", { dateStyle: "short" })}
        </span>
        {/* <span>Size: {fileSizeConverter(file.sizeBytes)}</span> */}
        <span>Type: {file.name.split(".")[1].toUpperCase()}</span>
      </div>
      <div className="size-12 min-w-max">
        <a
          href={file.downloadUrl}
          target="_blank"
          className="flex size-12 items-center justify-center rounded-full border border-slate-300 transition ease-in-out hover:bg-slate-500"
        >
          <Download size={30} />
        </a>
      </div>
    </div>
  )
}

export default function FilesDisplay() {
  return (
    <>
      {false ? (
        <div className="mb-4 flex h-[50vh] w-full items-center justify-center text-2xl font-bold">
          <LoadingSpinner size={64} />
        </div>
      ) : (
        <>
          <div className="my-6 flex w-full items-center justify-end gap-2 align-middle">
            <span>Refresh</span>
            <div className="mr-6 cursor-pointer rounded-lg bg-slate-900 p-2 hover:bg-slate-700">
              <RefreshIcon size={28} />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <FileDisplay
              file={{
                name: "test.pdf",
                downloadUrl: "testing",
                timeCreated: new Date(Date.now()),
              }}
            />
            <FileDisplay
              file={{
                name: "test.pdf",
                downloadUrl: "testing",
                timeCreated: new Date(Date.now()),
              }}
            />
            <FileDisplay
              file={{
                name: "test.pdf",
                downloadUrl: "testing",
                timeCreated: new Date(Date.now()),
              }}
            />
            <FileDisplay
              file={{
                name: "test.pdf",
                downloadUrl: "testing",
                timeCreated: new Date(Date.now()),
              }}
            />
          </div>
        </>
      )}
    </>
  )
}

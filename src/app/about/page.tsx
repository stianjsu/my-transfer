const About = () => {
  return (
    <main className="m-auto flex min-h-screen max-w-2xl flex-col items-center justify-between pt-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-2 text-2xl font-extrabold leading-8 tracking-tight text-slate-200 sm:text-3xl">
            Transfer Your Files Across Devices
          </p>
        </div>

        <div className="mt-10">
          <div className="text-center">
            <p className="mt-2 text-base text-slate-400">
              My-Transfer is an app that allows you to temporarily upload files
              to access them across devices. All files are automatically deleted
              after 1 day to ensure your privacy and security. You can find the
              source code for this app{" "}
              <a
                href="https://github.com/stianjsu/my-transfer"
                className="text-slate-200 hover:text-indigo-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              . To install My-Transfer as a PWA on your mobile device, follow
              these steps:
            </p>
            <ol className="mt-2 list-decimal text-left text-base text-gray-400">
              <li>Open My-Transfer in your browser on your mobile device.</li>
              <li>
                Click on the &quot;share&quot; button for iOS or your browsers
                menu.
              </li>
              <li>
                Click &quot;Add to Home-screen&quot; or your browsers install
                button
              </li>
              <li>Launch the app from your home screen.</li>
            </ol>

            <div className="my-12">
              <p className="text-lg font-medium">Why I Created My-Transfer</p>
              <p className="mt-4 text-base text-slate-400">
                My-Transfer was created to test out the developer experience
                using Next.js, Vercel and Tailwind CSS. The functionality was
                implemented easily with Firebase. I wanted to build a simple and
                user-friendly app that allows you to transfer files securely
                across devices without worrying about file storage or privacy
                concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About

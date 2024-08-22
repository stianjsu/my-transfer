import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <main className="m-auto flex min-h-screen flex-col items-center gap-4 pt-24">
      <SignUp path="/sign-up" />
    </main>
  )
}

import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <main className="m-auto flex min-h-screen flex-col items-center gap-4 pt-24">
      <SignIn signUpUrl={"/sign-up"} />
    </main>
  )
}

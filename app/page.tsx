import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isSignedIn = Boolean(data?.claims);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-4 py-24">
      <p className="text-sm font-medium text-muted-foreground">Seeker AI</p>
      <h1 className="max-w-lg text-3xl font-semibold tracking-tight">
        Search and research with an account that stays in sync.
      </h1>
      <p className="max-w-md text-muted-foreground">
        Sign in with Google or email to reach the dashboard. A profile record is
        created automatically when you authenticate.
      </p>
      <div className="flex gap-3">
        {isSignedIn ? (
          <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
            Open dashboard
          </Link>
        ) : (
          <>
            <Link href="/login" className={buttonVariants({ size: "lg" })}>
              Sign in
            </Link>
            <Link href="/signup" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

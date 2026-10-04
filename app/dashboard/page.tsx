import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { GeminiChat } from "@/components/dashboard/gemini-chat";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (!userId) {
    redirect("/login?next=/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name, avatar_url")
    .eq("id", userId)
    .maybeSingle();

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You are signed in. Your profile was created or updated on authentication.
          </p>
        </div>
        <form action={signOut}>
          <Button type="submit" variant="outline" size="lg">
            Sign out
          </Button>
        </form>
      </div>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          {profile?.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-12 items-center justify-center rounded-full bg-muted text-sm font-medium">
              {(profile?.full_name ?? profile?.email ?? "U").slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium">{profile?.full_name || "No name on file"}</p>
            <p className="text-sm text-muted-foreground">{profile?.email ?? "No email on file"}</p>
          </div>
        </div>
      </section>

      <GeminiChat />
    </main>
  );
}

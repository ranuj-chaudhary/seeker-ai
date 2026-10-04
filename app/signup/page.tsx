import { SignUpForm } from "@/components/auth/signup-form";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <SignUpForm error={params.error} />
    </main>
  );
}

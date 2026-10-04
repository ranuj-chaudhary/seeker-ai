---
name: server-action
description: Add a secure Next.js server action for Seeker AI that accepts FormData, validates input, mutates data via Supabase, and redirects with error/message params, following app/auth/actions.ts. Use for form submissions, auth, and mutations that aren't AI calls.
---
# Server Action

Add to a `"use server";` file (e.g. `app/<domain>/actions.ts`), mirroring
`app/auth/actions.ts`.

## Pattern
```ts
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function doThing(formData: FormData) {
  const value = getString(formData, "value");
  if (!value) redirect("/path?error=Value is required.");

  const supabase = await createClient();
  const { error } = await supabase.from("table").insert({ /* ... */ });
  if (error) redirect(`/path?error=${encodeURIComponent(error.message)}`);

  redirect("/path?message=Saved.");
}
```

## Rules
- **`redirect()` throws** — always the final statement; never wrap it in `try/catch`.
- Authenticate with `await createClient()` + `supabase.auth.getClaims()` when the action
  touches user data.
- Trim input; validate (lengths, formats). Sanitize any redirect target with a
  `safeNextPath`-style check (must start with `/`, not `//`).
- Communicate results through `?error=` / `?message=` query params; keep copy consistent.
- Call actions from forms: `<form action={doThing}>`.

## Checklist
- [ ] `"use server";` at top of file
- [ ] Input validated + trimmed
- [ ] Auth checked for user data
- [ ] `redirect()` last (outside try/catch)
- [ ] RLS relies on `auth.uid()` (never trust client-supplied user id)

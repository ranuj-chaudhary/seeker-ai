# Seeker AI — Project Brief

## Overview
Seeker AI is an **AI-powered job-search platform**. Users authenticate, build a
profile, and use AI (Google Gemini) to research, match, and act on job opportunities.

## Goals
- Give users an authenticated workspace to search and analyze jobs.
- Use Gemini to summarize roles, match candidates to jobs, and draft application content.
- Keep the stack lean: Next.js App Router + Supabase + Gemini.

## Current Scope (v0.1)
- Email/password + Google OAuth authentication (Supabase).
- Auto-synced user profiles via a Postgres trigger.
- Protected dashboard with a Gemini chat assistant (`/api/chat`).

## Non-functional requirements
- TypeScript strict; lint and type-check clean.
- RLS enabled on every table; secrets only in server env vars.
- Token-conscious development (Cline rules/skills + memory bank).

## Source of truth
This file defines scope. Update it when requirements change.

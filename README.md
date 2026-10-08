# HCBB KBO Stats

This project is a professional HCBB baseball statistics website inspired by KBO/MLB style reporting interfaces.

## Features
- Responsive navigation and scoreboard layout
- Realistic standings, schedules, players, teams, and statistics pages
- Player and team detail views
- Functional admin interface with secure login and content management
- Database-ready Supabase integration with file fallback persistence

## Local development

```bash
npm install
npm run dev
```

## Admin login
- Email: admin@hcbb.com
- Password: hcbb1234

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optional `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` in a `.env.local` file to override defaults.

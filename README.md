# Birthday Party Landing Page 🎉

A beautiful, dark-themed React landing page for a birthday party with RSVP functionality and Supabase integration.

## Features

- 🌙 Dark mode with purple accents
- 🎨 Modern, responsive design
- 📝 RSVP form with validation
- 💾 Supabase database integration for guest list
- 🎭 Dress code section (Emo or Twilight theme)
- ✨ Smooth animations and transitions

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Supabase** - Backend database
- **React Hook Form** - Form validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account

### Installation

1. Clone or navigate to this repository:

```bash
cd /path/to/rocionacul_web
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then edit `.env` and add your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Database Setup

1. Create a new table in your Supabase project called `guest_list` with the following schema:

```sql
CREATE TABLE guest_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  number_of_guests INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

2. Set up Row Level Security (RLS) to allow inserts:

```sql
-- Enable RLS
ALTER TABLE guest_list ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON guest_list
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Create policy to allow reading (if you want to view the guest list)
CREATE POLICY "Allow reading guest list" ON guest_list
  FOR SELECT
  TO authenticated
  USING (true);
```

### Running the Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Customization

### Event Details

Edit the placeholder text in `src/components/EventInfo.tsx`:
- Date and time
- Location/venue
- Event description

### Colors

The purple theme can be customized in `tailwind.config.js` by modifying the purple color values.

### RSVP Form Fields

To add or modify form fields, edit:
- `src/components/RSVPModal.tsx` - Form UI
- `src/types/rsvp.ts` - TypeScript types
- `src/utils/rsvp.ts` - Submission logic
- Update your Supabase table schema accordingly

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

You can deploy this site to various platforms:

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard

### Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. Add environment variables in Netlify dashboard

### Other Platforms

Any static hosting service that supports SPA (Single Page Applications) will work:
- GitHub Pages
- Cloudflare Pages
- Railway
- Render

## Project Structure

```
rocionacul_web/
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Welcome section
│   │   ├── EventInfo.tsx         # Event details
│   │   ├── RSVPSection.tsx       # RSVP CTA section
│   │   ├── RSVPModal.tsx         # RSVP form modal
│   │   └── DressCode.tsx         # Dress code section
│   ├── lib/
│   │   └── supabase.ts           # Supabase client
│   ├── utils/
│   │   └── rsvp.ts               # RSVP submission logic
│   ├── types/
│   │   └── rsvp.ts               # TypeScript types
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── tailwind.config.js            # Tailwind configuration
├── vite.config.ts                # Vite configuration
└── package.json                  # Dependencies

```

## License

MIT - Feel free to use this for your own party! 🎊

# Supabase Setup Instructions

Follow these steps to set up your Supabase database for the birthday party RSVP system.

## 1. Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project

## 2. Get Your Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

3. Add them to your `.env` file:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3. Create the Database Table

1. In your Supabase dashboard, go to the **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Create the guest_list table
CREATE TABLE guest_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  number_of_guests INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE guest_list ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for RSVP submissions)
CREATE POLICY "Allow public RSVP inserts" ON guest_list
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Allow authenticated users to view the guest list
-- (you can view this from your Supabase dashboard anyway)
CREATE POLICY "Allow authenticated reads" ON guest_list
  FOR SELECT
  TO authenticated
  USING (true);
```

4. Click **Run** or press `Ctrl/Cmd + Enter`

## 4. Verify the Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the `guest_list` table
3. Check that it has these columns:
   - id (uuid)
   - name (text)
   - email (text)
   - phone (text)
   - number_of_guests (int4)
   - created_at (timestamptz)

## 5. Test the RSVP Form

1. Start your dev server: `npm run dev`
2. Open the site in your browser
3. Click "RSVP Now" and fill out the form
4. Submit the form
5. Check your Supabase dashboard → Table Editor → guest_list to see the submission

## 6. View Your Guest List

You can view all RSVPs in your Supabase dashboard:
1. Go to **Table Editor**
2. Click on the `guest_list` table
3. You'll see all submissions with timestamps

## Optional: Email Notifications

If you want to receive email notifications when someone RSVPs:

1. Go to **Database** → **Webhooks** in Supabase
2. Create a webhook that triggers on INSERT to `guest_list`
3. Use a service like Zapier or Make.com to send yourself an email

## Security Notes

- The `anon` key is safe to use in your frontend code
- Row Level Security (RLS) prevents users from reading or deleting RSVPs
- Only inserts are allowed through the public interface
- You can view/manage all data from your authenticated Supabase dashboard

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

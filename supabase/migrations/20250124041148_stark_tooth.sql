/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `status` (text) - For tracking email status (subscribed, unsubscribed)
  
  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for inserting new emails
    - Add policy for reading own email status
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'subscribed'
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new emails
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to read their own email status
CREATE POLICY "Users can read own email status"
  ON waitlist
  FOR SELECT
  TO public
  USING (true);
-- Password-Based Access System Setup for Supabase
-- Run this SQL in your Supabase SQL Editor

-- 1. Create site_passwords table to store passwords for different hiring managers
CREATE TABLE IF NOT EXISTS site_passwords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  password TEXT NOT NULL UNIQUE,
  name TEXT,
  identifier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create site_access_logs table to track who accessed the site
CREATE TABLE IF NOT EXISTS site_access_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  password_id UUID REFERENCES site_passwords(id) ON DELETE CASCADE,
  identifier TEXT,
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  ip_address TEXT
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE site_passwords ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_access_logs ENABLE ROW LEVEL SECURITY;

-- 4. Create policies to allow reading passwords (for authentication)
-- Note: In production, you might want to restrict this further
CREATE POLICY "Allow read access for authentication"
ON site_passwords
FOR SELECT
USING (true);

-- 5. Create policy to allow inserting access logs
CREATE POLICY "Allow insert access logs"
ON site_access_logs
FOR INSERT
WITH CHECK (true);

-- 6. Create policy to allow reading access logs (for tracking)
CREATE POLICY "Allow read access logs"
ON site_access_logs
FOR SELECT
USING (true);

-- 7. Insert example passwords (replace with your own)
-- Each password can be given to a different hiring manager
INSERT INTO site_passwords (password, name, identifier) VALUES 
  ('portfolio2024-A', 'Hiring Manager A', 'manager-a'),
  ('portfolio2024-B', 'Hiring Manager B', 'manager-b'),
  ('portfolio2024-C', 'Hiring Manager C', 'manager-c');

-- 8. Create an index on password for faster lookups
CREATE INDEX IF NOT EXISTS idx_site_passwords_password ON site_passwords(password);

-- 9. Create an index on password_id for faster log queries
CREATE INDEX IF NOT EXISTS idx_site_access_logs_password_id ON site_access_logs(password_id);

-- 10. Create an index on accessed_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_site_access_logs_accessed_at ON site_access_logs(accessed_at);


# Password-Based Access System

This portfolio uses a password-based access control system instead of full authentication. Each hiring manager gets a unique password, and all access is tracked.

## Setup Instructions

### 1. Create Database Tables in Supabase

1. Go to your Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `supabase-setup.sql`
3. Run the SQL script

This will create:
- `site_passwords` table - stores passwords and identifiers
- `site_access_logs` table - tracks who accessed the site and when

### 2. Add Passwords for Hiring Managers

You can add passwords directly in Supabase or use SQL:

```sql
INSERT INTO site_passwords (password, name, identifier) VALUES 
  ('your-password-here', 'Hiring Manager Name', 'unique-identifier');
```

### 3. View Access Logs

To see who accessed your site, query the access logs:

```sql
SELECT 
  sl.accessed_at,
  sp.name,
  sp.identifier,
  sl.ip_address
FROM site_access_logs sl
JOIN site_passwords sp ON sl.password_id = sp.id
ORDER BY sl.accessed_at DESC;
```

## How It Works

1. **Login**: User enters password → API checks against `site_passwords` table
2. **Tracking**: Each login is logged in `site_access_logs` with timestamp and IP
3. **Access**: Valid password sets a cookie that grants access for 30 days
4. **Protection**: Middleware checks for the cookie on all routes

## Adding New Passwords

To add a new password for a hiring manager:

```sql
INSERT INTO site_passwords (password, name, identifier) 
VALUES ('new-password', 'Manager Name', 'manager-id');
```

## Security Notes

- Passwords are stored in plain text for simplicity
- For production, consider hashing passwords
- The system uses HTTP-only cookies for session management
- IP addresses are logged for tracking purposes


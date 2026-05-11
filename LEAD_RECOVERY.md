# Recovering legacy WPForms leads via SiteGround phpMyAdmin

The plan is to pull every contact-form submission from the live WordPress database, export as CSV, drop it into this repo at `data/leads-pre-migration-2026-05-11.csv`, and seed the new `leads` table from it in Phase 4.

WPForms Lite 1.8.4+ stores entries in the WP database — even though the admin UI gates the entries view behind a Pro upgrade prompt, the data is there. Pulling it via phpMyAdmin sidesteps the upsell.

## Step-by-step

1. **Log into SiteGround.** https://my.siteground.com → Websites → click **Site Tools** next to homeofficeclean.com.
2. **Open phpMyAdmin.** Site Tools → **Site** → **MySQL** → tab **PHPMYADMIN** → click **Access phpMyAdmin**.
3. **Pick the right database.** Left sidebar shows one or more databases — pick the one that contains tables starting with the WordPress prefix (usually `wp_`, sometimes a randomized prefix like `wp_abc123_`). The right database has tables like `*_options`, `*_posts`, `*_users`.
4. **Confirm the WPForms entries table exists.** Click the **SQL** tab and run:
   ```sql
   SHOW TABLES LIKE '%wpforms_entries%';
   ```
   You should see `<prefix>_wpforms_entries` (one row per submission) and possibly `<prefix>_wpforms_entry_fields` (one row per field). Note the prefix.
5. **Export the entries table as CSV.**
   - Left sidebar → click `<prefix>_wpforms_entries`
   - Top tab → **Export** → Format: **CSV** → **Export**.
6. **Also export `<prefix>_wpforms_entry_fields`** the same way (if it exists). The `fields` JSON column on `_entries` can be empty in some Lite versions; the `_entry_fields` table is the authoritative source.
7. **Bonus: export the form definition.** Run this in the SQL tab and export the result as CSV — gives us the original field config to replicate:
   ```sql
   SELECT * FROM <prefix>_posts WHERE post_type = 'wpforms' AND ID = 971;
   ```
8. **Drop the files into the repo:**
   - `data/leads-pre-migration-2026-05-11_entries.csv`
   - `data/leads-pre-migration-2026-05-11_entry_fields.csv` (if exported)
   - `data/wpforms-form-971.csv` (the form definition)

   Create the `data/` directory at the repo root if it doesn't exist. The files are gitignored.
9. **Tell Claude** the files are in place — Phase 4 will parse them into the normalized `leads` table.

## If the entries table doesn't exist

That means this WPForms Lite version isn't persisting entries to DB. Fall back to **the admin Gmail inbox**: search for the WPForms notification (likely "Ново запитване" / "Запитване от сайта" / "New Entry"), select all matches, **Forward as attachment** (Gmail menu → More → Forward as attachment) to yourself, save the resulting `.eml` files, drop them at `data/leads-eml/`, and tell Claude — we'll parse them.

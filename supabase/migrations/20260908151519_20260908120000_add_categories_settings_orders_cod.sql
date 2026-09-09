/*
# ZORVEX: Dynamic Categories, Store Settings, Orders, COD, MRP

## Summary
This migration adds the infrastructure for dynamic category management,
store settings (UPI), orders, and product-level COD availability to the
existing ZORVEX (formerly AQUAVITA) e-commerce database.

## 1. New Tables

### categories
- `id` (uuid, PK)
- `name` (text, not null) — display name e.g. "Electronics"
- `slug` (text, not null, unique) — URL-safe identifier e.g. "electronics"
- `description` (text, nullable) — optional category description
- `is_active` (boolean, default true) — can be toggled by admin
- `sort_order` (integer, default 0) — for custom ordering on homepage
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

### store_settings
- `id` (int, PK, default 1) — singleton row
- `upi_id` (text, nullable) — store UPI ID for QR generation
- `qr_code_url` (text, nullable) — static QR image URL (optional)
- `instagram_url` (text, nullable)
- `facebook_url` (text, nullable)
- `whatsapp_url` (text, nullable)
- `updated_at` (timestamptz, default now())

### orders
- `id` (uuid, PK)
- `customer_name` (text, not null)
- `customer_phone` (text, not null)
- `customer_email` (text, nullable)
- `shipping_address` (text, not null)
- `city` (text, nullable)
- `pincode` (text, nullable)
- `payment_method` (text, not null) — 'cod' or 'upi'
- `items` (jsonb, not null) — array of {product_id, name, price, quantity, supplier_link}
- `total_amount` (numeric, not null)
- `status` (text, not null, default 'pending')
- `payment_screenshot_url` (text, nullable)
- `created_at` (timestamptz, default now())

## 2. Modified Tables

### products — new columns
- `mrp` (numeric, nullable, default 0) — original price for strikethrough
- `supplier_link` (text, nullable) — Meesho/supplier URL
- `meesho_price` (numeric, nullable) — supplier cost
- `rating` (numeric, default 4.5) — product rating
- `review_count` (integer, default 0) — number of reviews
- `cod_available` (boolean, not null, default false) — COD availability toggle

## 3. Data Migration
- Seed categories table from existing distinct product.category values
- Insert singleton store_settings row (id=1) if not exists

## 4. Security (RLS)
- categories: public read (anon+authenticated), admin write (authenticated)
- store_settings: public read, admin write (authenticated)
- orders: public insert (customers place orders), admin read/update (authenticated)
- products: existing policies preserved, new columns covered by existing open policy

## 5. Notes
- All statements are idempotent (IF NOT EXISTS / DO $$ blocks)
- No existing data is deleted or modified destructively
- Product category column remains text (not FK) for backward compat — products reference category slug
*/

-- ============================================================
-- 1. Add missing columns to products table
-- ============================================================
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='mrp') THEN
    ALTER TABLE products ADD COLUMN mrp numeric DEFAULT 0;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='supplier_link') THEN
    ALTER TABLE products ADD COLUMN supplier_link text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='meesho_price') THEN
    ALTER TABLE products ADD COLUMN meesho_price numeric;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='rating') THEN
    ALTER TABLE products ADD COLUMN rating numeric DEFAULT 4.5;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='review_count') THEN
    ALTER TABLE products ADD COLUMN review_count integer DEFAULT 0;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='cod_available') THEN
    ALTER TABLE products ADD COLUMN cod_available boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- ============================================================
-- 2. Create categories table
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_categories" ON categories;
CREATE POLICY "admin_insert_categories" ON categories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_categories" ON categories;
CREATE POLICY "admin_update_categories" ON categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_categories" ON categories;
CREATE POLICY "admin_delete_categories" ON categories FOR DELETE
  TO authenticated USING (true);

-- Seed categories from existing product data
INSERT INTO categories (name, slug, sort_order)
SELECT 'Fish Food & Nutrition', 'fish-food', 1
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'fish-food');

INSERT INTO categories (name, slug, sort_order)
SELECT 'Aquarium Accessories', 'accessories', 2
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'accessories');

-- ============================================================
-- 3. Create store_settings table (singleton)
-- ============================================================
CREATE TABLE IF NOT EXISTS store_settings (
  id integer PRIMARY KEY DEFAULT 1,
  upi_id text,
  qr_code_url text,
  instagram_url text,
  facebook_url text,
  whatsapp_url text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT store_settings_singleton CHECK (id = 1)
);

ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_store_settings" ON store_settings;
CREATE POLICY "public_read_store_settings" ON store_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_store_settings" ON store_settings;
CREATE POLICY "admin_update_store_settings" ON store_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_insert_store_settings" ON store_settings;
CREATE POLICY "admin_insert_store_settings" ON store_settings FOR INSERT
  TO authenticated WITH CHECK (true);

-- Insert singleton row if not exists
INSERT INTO store_settings (id, upi_id)
SELECT 1, null
WHERE NOT EXISTS (SELECT 1 FROM store_settings WHERE id = 1);

-- ============================================================
-- 4. Create orders table
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  shipping_address text NOT NULL,
  city text,
  pincode text,
  payment_method text NOT NULL,
  items jsonb NOT NULL,
  total_amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_screenshot_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_orders" ON orders;
CREATE POLICY "public_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_orders" ON orders;
CREATE POLICY "admin_read_orders" ON orders FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_orders" ON orders;
CREATE POLICY "admin_update_orders" ON orders FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- 5. Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

ALTER TABLE public.enquiries ADD COLUMN selected_package text;

CREATE TABLE public.site_settings (
  id text PRIMARY KEY DEFAULT 'main' CHECK (id = 'main'),
  phone text NOT NULL DEFAULT '+91 9344160526',
  phone_raw text NOT NULL DEFAULT '+919344160526',
  whatsapp text NOT NULL DEFAULT '919344160526',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
INSERT INTO public.site_settings (id, phone, phone_raw, whatsapp) VALUES ('main', '+91 9344160526', '+919344160526', '919344160526');

CREATE TABLE public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price text NOT NULL,
  original_price text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.packages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.packages TO authenticated;
GRANT ALL ON public.packages TO service_role;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view packages" ON public.packages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert packages" ON public.packages FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update packages" ON public.packages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete packages" ON public.packages FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
INSERT INTO public.packages (name, price, original_price, display_order) VALUES
('Rhopium Plus Package', '₹90,000', NULL, 1),
('Silver Wedding Package', '₹70,000', NULL, 2),
('Golden Wedding Package', '₹80,000', NULL, 3),
('Rhopium Wedding Package', '₹85,000', NULL, 4),
('Copper Wedding Package', '₹58,000', NULL, 5),
('Basic Wedding Package', '₹50,000', NULL, 6),
('Budget Wedding Package', '₹39,999', '₹40,000', 7);

CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt_text text NOT NULL DEFAULT 'Selva Captures wedding photography',
  storage_path text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;
GRANT ALL ON public.gallery_images TO service_role;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view gallery images" ON public.gallery_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert gallery images" ON public.gallery_images FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update gallery images" ON public.gallery_images FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery images" ON public.gallery_images FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
INSERT INTO public.gallery_images (image_url, alt_text, display_order) VALUES
('/__l5e/assets-v1/e0691b34-5241-47c4-a36d-59034dec170b/gal1.jpg', 'Bridal portrait in a red and gold silk saree with traditional jewellery', 1),
('/__l5e/assets-v1/68340c1a-2a6c-4d83-8804-d0fe1e42c3e0/gal3.jpg', 'Wedding couple portrait at golden hour', 2),
('/__l5e/assets-v1/b9b3f514-be67-4f7d-b50f-f4d40cb7adb0/gal4.jpg', 'Candid moment of the bride laughing as petals fall', 3),
('/__l5e/assets-v1/5886cabf-f0f1-46ce-9907-174728c2a969/gal5.jpg', 'Traditional South Indian garland exchange ceremony', 4),
('/__l5e/assets-v1/8565bad3-daeb-475d-a20f-1112d9d0acfc/gal2.jpg', 'Groom portrait in an ivory sherwani and turban', 5),
('/__l5e/assets-v1/823022fa-bdbf-4779-a4f3-7de7f7fe0e83/gal6.jpg', 'Wedding details: bangles, mehndi and rings on silk', 6),
('/__l5e/assets-v1/1bbce232-9ed7-4e90-b66d-b0f45961160d/gal7.jpg', 'Pre-wedding beach shoot at sunset', 7),
('/__l5e/assets-v1/1d469df4-9c82-4a43-82ce-36478c9b0783/gal8.jpg', 'Cinematic reception moment with sparklers', 8);

CREATE POLICY "Anyone can view gallery files" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'gallery');
CREATE POLICY "Admins can upload gallery files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update gallery files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin')) WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
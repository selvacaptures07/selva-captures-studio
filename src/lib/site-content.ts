import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BRAND, PACKAGES } from "@/lib/site-data";
import { GALLERY } from "@/lib/photos";

export type SiteSettings = {
  id: string;
  phone: string;
  phone_raw: string;
  whatsapp: string;
};

export type SitePackage = {
  id: string;
  name: string;
  price: string;
  original_price: string | null;
  display_order: number;
};

export type GalleryImage = {
  id: string;
  image_url: string;
  alt_text: string;
  storage_path: string | null;
  display_order: number;
  resolved_url: string;
};

export const defaultSettings: SiteSettings = {
  id: "main",
  phone: BRAND.phone,
  phone_raw: BRAND.phoneRaw,
  whatsapp: BRAND.whatsapp,
};

export const defaultPackages: SitePackage[] = PACKAGES.map((item, index) => ({
  id: `default-${index}`,
  name: item.name,
  price: item.price,
  original_price: item.original ?? null,
  display_order: index + 1,
}));

export const defaultGallery: GalleryImage[] = GALLERY.map((item, index) => ({
  id: `default-${index}`,
  image_url: item.src,
  alt_text: item.alt,
  storage_path: null,
  display_order: index + 1,
  resolved_url: item.src,
}));

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").eq("id", "main").single();
      if (error) throw error;
      return data;
    },
    initialData: defaultSettings,
  });
}

export function usePackages() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("packages").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
    initialData: defaultPackages,
  });
}

export function useGallery() {
  return useQuery({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery_images").select("*").order("display_order");
      if (error) throw error;
      return Promise.all(
        data.map(async (image) => {
          if (!image.storage_path) return { ...image, resolved_url: image.image_url };
          const { data: signed } = await supabase.storage.from("gallery").createSignedUrl(image.storage_path, 3600);
          return { ...image, resolved_url: signed?.signedUrl ?? image.image_url };
        }),
      );
    },
    initialData: defaultGallery,
  });
}
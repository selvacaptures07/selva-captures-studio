import p1 from "@/assets/photo1.jpg.asset.json";
import p2 from "@/assets/photo2.jpg.asset.json";
import p3 from "@/assets/photo3.jpg.asset.json";
import p4 from "@/assets/photo4.jpg.asset.json";
import p5 from "@/assets/photo5.jpg.asset.json";
import p6 from "@/assets/photo6.jpg.asset.json";
import g1 from "@/assets/gal1.jpg.asset.json";
import g2 from "@/assets/gal2.jpg.asset.json";
import g3 from "@/assets/gal3.jpg.asset.json";
import g4 from "@/assets/gal4.jpg.asset.json";
import g5 from "@/assets/gal5.jpg.asset.json";
import g6 from "@/assets/gal6.jpg.asset.json";
import g7 from "@/assets/gal7.jpg.asset.json";
import g8 from "@/assets/gal8.jpg.asset.json";

export const HERO = p1.url;

/** Original studio photos. */
export const PHOTOS = [p1.url, p2.url, p3.url, p4.url, p5.url, p6.url];

export const GALLERY = [
  { src: g1.url, alt: "Bridal portrait in a red and gold silk saree with traditional jewellery" },
  { src: g3.url, alt: "Wedding couple portrait at golden hour" },
  { src: g4.url, alt: "Candid moment of the bride laughing as petals fall" },
  { src: g5.url, alt: "Traditional South Indian garland exchange ceremony" },
  { src: g2.url, alt: "Groom portrait in an ivory sherwani and turban" },
  { src: g6.url, alt: "Wedding details: bangles, mehndi and rings on silk" },
  { src: g7.url, alt: "Pre-wedding beach shoot at sunset" },
  { src: g8.url, alt: "Cinematic reception moment with sparklers" },
  { src: p2.url, alt: "Bride and groom forehead-to-forehead couple portrait" },
  { src: p3.url, alt: "Black and white couple portrait in wedding attire" },
  { src: p5.url, alt: "Bride and groom kissing over the bouquet" },
  { src: p6.url, alt: "Couple in traditional attire embracing outdoors" },
];

/** Images used on the service cards, in SERVICES order. */
export const SERVICE_IMAGES = [
  g3.url,
  g4.url,
  g5.url,
  g8.url,
  g7.url,
  p2.url,
  g6.url,
  g1.url,
];

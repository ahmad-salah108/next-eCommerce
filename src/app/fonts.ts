import { Cairo, Inter, Playfair_Display } from "next/font/google";

// For headings
export const playfair_display = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
});

// For body
export const inter = Inter({
  subsets: ["latin"],
  display: "swap"
})

// For arabic language
export const cairo = Cairo({
  subsets: ["arabic"],
  display: 'swap',
});
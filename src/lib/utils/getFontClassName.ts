import { cairo, inter, playfair_display } from '@/app/fonts';

export const getFontClassName = (locale: string = "en", type: "heading" | "body" = "body"): string => {
  return locale === "ar" ? cairo.className : type === "heading" ? playfair_display.className : inter.className;
};
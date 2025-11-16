import { cairo, inter, playfair_display } from '@/app/fonts';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFontClassName = (locale: string, type: "heading" | "body" = "body"): string => {
  return locale === "ar" ? cairo.className : type === "heading" ? playfair_display.className : inter.className;
};

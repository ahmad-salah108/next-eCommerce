import { Category } from "./Category";

export interface Product {
  id: number;
  images: string[];
  main_image: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  slug: string;
  product_categories: Array<Category>;
  price: number;
  stock: number;
  created_at: string;
  deleted_at: string;
}

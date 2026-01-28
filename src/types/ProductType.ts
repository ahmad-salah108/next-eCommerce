import { CategoryType } from "./CategoryType";

export type ProductType = {
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
  product_categories: Array<CategoryType>
  price: number;
  stock: number;
  created_at: string;
  deleted_at: string;
};

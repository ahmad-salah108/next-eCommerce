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
  category_id: number;
  price: number;
  stock: number;
  created_at: string;
  deleted_at: string;
};

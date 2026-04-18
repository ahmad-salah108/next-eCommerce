import { TablePageParams } from "./TablePageParams";

export type QueryProps =
  | {
      getAll: true; // If getAll is true...
      params?: TablePageParams; // The rest become optional
      PAGE_SIZE?: number;
    }
  | {
      getAll?: false; // If getAll is false (or undefined)...
      params: TablePageParams; // The rest are mandatory
      PAGE_SIZE: number;
    };

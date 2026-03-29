type OptionalString = string | undefined;

export const QUERY_KEYS = {
  users: {
    all: ['users'] as const, // Good for comprehensive invalidation
    list: (page: OptionalString, search: OptionalString) => [...QUERY_KEYS.users.all, page, search] as const,
    details: (id: string) => [...QUERY_KEYS.users.all, id]
  },
  categories: {
    all: ['categories'] as const,
    list: (page: OptionalString, search: OptionalString) => [...QUERY_KEYS.categories.all, page, search] as const,
    details: (id: string) => [...QUERY_KEYS.categories.all, id]
  },
  products: {
    all: ['products'] as const,
    list: (page: OptionalString, search: OptionalString) => [...QUERY_KEYS.products.all, page, search] as const,
    details: (id: string) => [...QUERY_KEYS.products.all, id]
  },
  orders: {
    all: ['orders'] as const,
    list: (page: OptionalString, search: OptionalString) => [...QUERY_KEYS.orders.all, page, search] as const,
    details: (id: string) => [...QUERY_KEYS.orders.all, id]
  },
}
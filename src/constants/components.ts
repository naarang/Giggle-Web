export const subHeaderStatusKeys = {
  SEARCH: 'search',
  STATIC: 'static',
  DETAIL: 'detail',
} as const

export type SubHeaderStatusUnion = typeof subHeaderStatusKeys[keyof typeof subHeaderStatusKeys]
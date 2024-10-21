export const subHeaderTypeKeys = {
  SEARCH: 'search',
  STATIC: 'static',
  DETAIL: 'detail',
} as const

export type SubHeaderTypeUnion = typeof subHeaderTypeKeys[keyof typeof subHeaderTypeKeys]
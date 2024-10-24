// sub header 컴포넌트 타입
export const subHeaderTypeKeys = {
  SEARCH: 'search',
  STATIC: 'static',
  DETAIL: 'detail',
} as const

export type SubHeaderTypeUnion = typeof subHeaderTypeKeys[keyof typeof subHeaderTypeKeys]

// button 컴포넌트 타입
export const buttonTypeKeys = {
  LARGE: 'large',
  SMALL: 'small',
  APPLY: 'applyNow',
  SMALLAPPLY: 'smallApply',
  BACK: 'back',
  CONTINUE: 'continue',
  SCRAP: 'scrap',
} as const

export type buttonTypeUnion = typeof buttonTypeKeys[keyof typeof buttonTypeKeys]

export const buttonTypeKeys = {
  LARGE: 'large',
  SMALL: 'small',
  APPLY: 'applyNow',
  BACK: 'back',
  CONTINUE: 'continue',
} as const

export type buttonTypeUnion = typeof buttonTypeKeys[keyof typeof buttonTypeKeys]
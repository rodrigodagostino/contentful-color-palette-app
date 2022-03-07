export type ColorIdTokenType =
  | 'slate'
  | 'blue'
  | 'aqua'
  | 'ice'
  | 'sky'
  | 'skyLight'
  | 'stone'
  | 'gray'
  | 'tangerine'
  | 'tangerineLight'
  | 'coral'
  | 'coralLight'
  | 'violet'
  | 'violetLight'
  | 'white'
  | 'transparent'

export type ColorTokenType = {
  [key in ColorIdTokenType]: ColorTokenPropsInterface
}

export interface ColorTokenPropsInterface {
  label: string
  hex: string | null
  rgba: ColorTokenRGBAPropsInterface
}

export interface ColorTokenRGBAPropsInterface {
  r: string
  g: string
  b: string
  a: string
}

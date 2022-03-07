import tokens from '@contentful/f36-tokens'
import { ColorTokenRGBAPropsInterface } from './types'

export const getTextColor = (backgroundColor: ColorTokenRGBAPropsInterface) => {
  const color = Math.round(
    (parseInt(backgroundColor.r) * 299 +
      parseInt(backgroundColor.g) * 587 +
      parseInt(backgroundColor.b) * 114) /
      1000
  )
  return color > 125 ? tokens.gray900 : '#ffffff'
}

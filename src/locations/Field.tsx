import { useEffect, useState } from 'react'
import { FieldAppSDK } from '@contentful/app-sdk';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit'
import { Button, Grid, Stack, Text } from '@contentful/f36-components'
import { DoneIcon } from '@contentful/f36-icons'

import { COLOR_TOKENS } from '../lib/definitions'
import { ColorIdTokenType } from '../lib/types'
import { getTextColor } from '../lib/utils'

const Field = () => {
  const sdk = useSDK<FieldAppSDK>()

  const [selectedColor, setSelectedColor] = useState(
    sdk.field.getValue() || undefined
  )

  useEffect(() => {
    // This ensures our app has enough space to render
    sdk.window.startAutoResizer()
  })

  const selectColor = (colorId: ColorIdTokenType) => {
    sdk.field.setValue(colorId)
    setSelectedColor(colorId)
  }

  const slateRGBA = COLOR_TOKENS.slate.rgba

  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  return (
    <>
      <Grid className="color-palette" columns="repeat(8, 1fr)">
        {Object.keys(COLOR_TOKENS).map(color => {
          const { label, rgba } = COLOR_TOKENS[color as ColorIdTokenType]
          return (
            <Stack
              flexDirection="column"
              marginTop="spacingM"
              marginBottom="spacingM"
              spacing="spacingXs"
            >
              <Button
                className="color-palette__button"
                startIcon={
                  selectedColor === color ? (
                    <DoneIcon className="color-palette__button-icon" />
                  ) : undefined
                }
                style={{
                  width: '3.25rem',
                  height: '3.25rem',
                  borderRadius: '50%',
                  color: getTextColor(rgba),
                  backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
                  ...(color === 'transparent' && {
                    backgroundImage:
                      'linear-gradient(45deg, rgba(0,0,0,0.16) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.16) 75%, rgba(0,0,0,0.16)), linear-gradient(45deg, rgba(0,0,0,0.16) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.16) 75%, rgba(0,0,0,0.16))',
                    backgroundSize: '1.25rem 1.25rem',
                    backgroundPosition: '0 0, 0.625rem 0.625rem',
                  }),
                  textIndent: '-9999px',
                }}
                variant="secondary"
                aria-pressed={selectedColor === color}
                aria-label={`Color: ${label}`}
                onClick={() => selectColor(color as ColorIdTokenType)}
              />
              <Text className="color-palette__button-text">{label}</Text>
            </Stack>
          )
        })}
      </Grid>

      <style>{`
        .color-palette__button-icon {
          width: 2rem;
          height: 2rem;
          padding: 0.325rem;
          border-radius: 50%;
          fill: currentColor;
          background-color: rgba(${slateRGBA.r}, ${slateRGBA.g}, ${slateRGBA.b}, 0.12);
        }

        .color-palette__button-text {
          text-align: center;
        }
      `}</style>
    </>
  )
}

export default Field

import type { ThemeOverride } from '@chakra-ui/react'
import { extendTheme, theme } from '@chakra-ui/react'

const themeExtension: ThemeOverride = {
  colors: {
    primary: theme.colors.teal,
    secondary: theme.colors.cyan,
  },
  styles: {
    global: {
      'html, body, #__next': { height: '100%' },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
}

const extendedTheme = extendTheme(themeExtension)

export { extendedTheme as theme }

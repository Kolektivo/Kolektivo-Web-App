import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import createSafeTheme from './safeTheme'

const SafeThemeProvider = ({ children }: { children: React.ReactNode }) => {
  /* const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createSafeTheme(prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode]) */

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={createSafeTheme('light')}>
        <CssBaseline enableColorScheme>{children}</CssBaseline>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
export default SafeThemeProvider

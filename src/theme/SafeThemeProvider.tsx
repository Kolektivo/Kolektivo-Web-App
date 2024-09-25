import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import createSafeTheme from './safeTheme'

const SafeThemeProvider = ({ children }: { children: React.ReactNode }) => {
  /* const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createSafeTheme(prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode]) */

  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider theme={createSafeTheme('light')}>
        <CssBaseline enableColorScheme>{children}</CssBaseline>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
export default SafeThemeProvider

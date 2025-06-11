"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string // "class" or "data-theme"
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme?: Theme // Actual theme applied (light or dark)
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme", // Changed from "theme" to avoid conflicts
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window !== "undefined") {
      try {
        return (localStorage.getItem(storageKey) as Theme) || defaultTheme
      } catch (e) {
        // Unsupported
      }
    }
    return defaultTheme
  })
  
  const [resolvedTheme, setResolvedTheme] = React.useState<Theme | undefined>(undefined);

  React.useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleThemeChange = () => {
      const systemTheme = mediaQuery.matches ? "dark" : "light"
      const newTheme = theme === "system" ? systemTheme : theme
      
      setResolvedTheme(newTheme) // Update resolved theme

      // Apply attribute
      if (attribute === "class") {
        root.classList.remove("light", "dark")
        if (newTheme) {
          root.classList.add(newTheme)
        }
      } else {
        root.setAttribute(attribute, newTheme)
      }

      // Disable transitions
      if (disableTransitionOnChange) {
        const css = document.createElement('style')
        css.appendChild(
          document.createTextNode(
            `* {
              -webkit-transition: none !important;
              -moz-transition: none !important;
              -o-transition: none !important;
              -ms-transition: none !important;
              transition: none !important;
            }`
          )
        )
        document.head.appendChild(css)
        
        // Calling getComputedStyle forces the browser to redraw
        window.getComputedStyle(document.body) 
        
        // Wait for next tick before removing
        setTimeout(() => {
          document.head.removeChild(css)
        }, 1)
      }
    }

    handleThemeChange() // Initial theme application
    mediaQuery.addEventListener("change", handleThemeChange)

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange)
    }
  }, [theme, attribute, disableTransitionOnChange])


  React.useEffect(() => {
    // Set initial resolved theme based on current theme and system preference
    if (typeof window !== "undefined") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setResolvedTheme(theme === "system" ? systemTheme : theme);
    }
  }, [theme]);


  const providerValue = React.useMemo(() => ({
    theme,
    setTheme: (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme)
      } catch (e) {
        // Unsupported
      }
      setTheme(newTheme)
    },
    resolvedTheme,
  }), [theme, storageKey, resolvedTheme])

  return (
    <ThemeProviderContext.Provider value={providerValue}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

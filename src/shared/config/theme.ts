import { Theme } from '@consta/uikit/Theme'

// Brand colors from original MUI theme
export const emailBuilderColors = {
  // Brand colors
  brand: {
    navy: '#212443',
    blue: '#0079CC', 
    green: '#1F8466',
    red: '#E81212',
    yellow: '#F6DC9F',
    purple: '#6C0E7C',
    brown: '#CC996C',
  },
  
  // Cadet colors (grays)
  cadet: {
    100: '#F9FAFB',
    200: '#F2F5F7', 
    300: '#DCE4EA',
    400: '#A8BBCA',
    500: '#6A8BA4',
  },
  
  // Highlight colors
  highlight: {
    100: '#FEFCF4',
    200: '#FDF8E6',
    300: '#FBF3D1',
    400: '#F9EEBB',
    500: '#F6DC9F',
  },
  
  // Status colors
  status: {
    success: '#1F8466',
    error: '#E81212', 
    warning: '#F6DC9F',
    info: '#0079CC',
  },
  
  // Background colors
  background: {
    default: '#f2f5f7',
    paper: '#ffffff',
    surface: '#F9FAFB',
  },
  
  // Text colors
  text: {
    primary: '#1F1F21',
    secondary: '#4F4F4F',
    disabled: '#A8BBCA',
  },
}

// Spacing system
export const emailBuilderSpacing = {
  xs: '4px',
  s: '8px', 
  m: '16px',
  l: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
}

// Typography system
export const emailBuilderTypography = {
  fontFamily: {
    primary: 'sans-serif, "Segoe UI", Roboto, Helvetica, Arial',
    monospace: 'monospace, Menlo, Monaco, "Segoe UI Mono", "Roboto Mono"',
  },
  fontSize: {
    xs: '12px',
    s: '14px',
    m: '16px', 
    l: '18px',
    xl: '24px',
    '2xl': '32px',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5', 
    relaxed: '1.75',
  },
}

// CSS variables for drag & drop and other utilities
export const emailBuilderCSSVars = `
  :root {
    /* Brand colors */
    --email-builder-brand-navy: ${emailBuilderColors.brand.navy};
    --email-builder-brand-blue: ${emailBuilderColors.brand.blue};
    --email-builder-brand-green: ${emailBuilderColors.brand.green};
    --email-builder-brand-red: ${emailBuilderColors.brand.red};
    --email-builder-brand-yellow: ${emailBuilderColors.brand.yellow};
    
    /* Background colors */
    --email-builder-bg-default: ${emailBuilderColors.background.default};
    --email-builder-bg-paper: ${emailBuilderColors.background.paper};
    --email-builder-bg-surface: ${emailBuilderColors.background.surface};
    
    /* Text colors */
    --email-builder-text-primary: ${emailBuilderColors.text.primary};
    --email-builder-text-secondary: ${emailBuilderColors.text.secondary};
    
    /* Spacing */
    --email-builder-space-xs: ${emailBuilderSpacing.xs};
    --email-builder-space-s: ${emailBuilderSpacing.s};
    --email-builder-space-m: ${emailBuilderSpacing.m};
    --email-builder-space-l: ${emailBuilderSpacing.l};
    --email-builder-space-xl: ${emailBuilderSpacing.xl};
    
    /* Drag & Drop specific */
    --email-builder-drag-overlay-bg: rgba(55, 126, 235, 0.1);
    --email-builder-drag-overlay-border: #377eeb;
    --email-builder-drop-zone-valid: rgba(34, 197, 94, 0.1);
    --email-builder-drop-zone-invalid: rgba(239, 68, 68, 0.1);
    --email-builder-drop-zone-border-valid: #22c55e;
    --email-builder-drop-zone-border-invalid: #ef4444;
  }
`

// Consta theme preset configuration
export const emailBuilderTheme = {
  color: {
    primary: emailBuilderColors.brand.blue,
    accent: emailBuilderColors.brand.green,
    invert: emailBuilderColors.brand.navy,
  },
  size: 'm' as const,
  space: 'm' as const,
  font: 'primary' as const,
}

// Theme component props for Consta Theme provider
export const EmailBuilderThemeProvider = Theme

// Utility function to inject CSS variables
export const injectEmailBuilderCSS = () => {
  if (typeof document !== 'undefined') {
    const existingStyle = document.querySelector('#email-builder-theme')
    if (!existingStyle) {
      const styleElement = document.createElement('style')
      styleElement.id = 'email-builder-theme'
      styleElement.textContent = emailBuilderCSSVars
      document.head.appendChild(styleElement)
    }
  }
}

// Export default theme configuration
export default emailBuilderTheme 
import { presetGpnDefault } from '@consta/uikit/Theme'

// Email Builder Custom Theme based on Consta
export const emailBuilderTheme = presetGpnDefault;

// Email Builder Colors
export const emailBuilderColors = {
  primary: '#2563eb',     // Email builder brand color
  accent: '#7c3aed',      // Secondary brand color
  success: '#059669',     // Success actions
  warning: '#d97706',     // Warning states
  alert: '#dc2626',       // Error states
} as const;

// Email Builder Spacing
export const emailBuilderSpacing = {
  xs: '4px',
  s: '8px',
  m: '12px',
  l: '16px',
  xl: '24px',
  xxl: '32px',
} as const;

// CSS Variables for email builder specific styles
export const emailBuilderCSSVars = {
  // Email editor specific
  '--email-editor-bg': '#f8fafc',
  '--email-canvas-bg': '#ffffff',
  '--email-block-border': 'var(--color-bg-border)',
  '--email-drag-handle': 'var(--color-control-typo-ghost)',
  
  // Drag & Drop colors
  '--dnd-drop-zone-valid': 'var(--color-bg-success)',
  '--dnd-drop-zone-invalid': 'var(--color-bg-alert)',
  '--dnd-ghost-opacity': '0.5',
} as const; 
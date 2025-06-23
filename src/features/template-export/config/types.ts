
// Template Export Feature Types

export interface ExportOptions {
  format: ExportFormat
  includeStyles: boolean
  minifyOutput: boolean
  includeMetadata: boolean
  customSettings?: Record<string, any>
}

export type ExportFormat = 'html' | 'json' | 'mjml' | 'pdf'

export interface ExportResult {
  format: ExportFormat
  content: string | Uint8Array
  filename: string
  size: number
  timestamp: number
}

export interface ExportState {
  isExporting: boolean
  progress: number
  currentStep: string
  error: string | null
  lastExport: ExportResult | null
}

export interface HtmlExportOptions extends ExportOptions {
  format: 'html'
  includeInlineStyles: boolean
  includeResponsiveCSS: boolean
  optimizeForEmail: boolean
}

export interface JsonExportOptions extends ExportOptions {
  format: 'json'
  prettify: boolean
  includeSchema: boolean
}

export interface MjmlExportOptions extends ExportOptions {
  format: 'mjml'
  validateOutput: boolean
  optimizeForClients: string[]
}

export interface PdfExportOptions extends ExportOptions {
  format: 'pdf'
  pageSize: 'A4' | 'Letter' | 'Custom'
  orientation: 'portrait' | 'landscape'
  margins: {
    top: number
    right: number
    bottom: number
    left: number
  }
}

export interface ExportPreview {
  format: ExportFormat
  preview: string
  isValid: boolean
  warnings: string[]
  estimatedSize: number
} 
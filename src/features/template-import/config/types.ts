import { DocumentProps } from '@entities/document'

// Template Import Feature Types

export interface ImportOptions {
  format: ImportFormat
  validateStructure: boolean
  mergeWithCurrent: boolean
  preserveIds: boolean
  customMappings?: Record<string, string>
}

export type ImportFormat = 'json' | 'html' | 'mjml' | 'csv'

export interface ImportResult {
  success: boolean
  document?: DocumentProps
  errors: ImportError[]
  warnings: ImportWarning[]
  importedBlocks: number
  skippedBlocks: number
}

export interface ImportError {
  type: ImportErrorType
  message: string
  line?: number
  column?: number
  blockId?: string
}

export interface ImportWarning {
  type: ImportWarningType
  message: string
  suggestion?: string
  blockId?: string
}

export type ImportErrorType = 
  | 'invalid-format'
  | 'missing-required-field'
  | 'invalid-block-type'
  | 'schema-validation'
  | 'parse-error'

export type ImportWarningType =
  | 'unsupported-feature'
  | 'deprecated-property'
  | 'style-conversion'
  | 'missing-asset'
  | 'performance-concern'

export interface ImportState {
  isImporting: boolean
  progress: number
  currentStep: string
  error: string | null
  lastImport: ImportResult | null
}

export interface ImportPreview {
  isValid: boolean
  document?: Partial<DocumentProps>
  errors: ImportError[]
  warnings: ImportWarning[]
  estimatedBlocks: number
  supportedFeatures: string[]
  unsupportedFeatures: string[]
}

export interface JsonImportOptions extends ImportOptions {
  format: 'json'
  strictMode: boolean
  allowPartialImport: boolean
}

export interface HtmlImportOptions extends ImportOptions {
  format: 'html'
  extractInlineStyles: boolean
  preserveClassNames: boolean
  convertToBlocks: boolean
  blockMappings: Record<string, string>
}

export interface MjmlImportOptions extends ImportOptions {
  format: 'mjml'
  convertToHtml: boolean
  preserveMjmlAttributes: boolean
  optimizeForEditor: boolean
}

export interface CsvImportOptions extends ImportOptions {
  format: 'csv'
  delimiter: string
  hasHeader: boolean
  columnMappings: Record<string, string>
  templateType: string
} 
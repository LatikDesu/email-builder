import { BlockProps, BlockStyle } from '@entities/block'

// Block Configuration Feature Types

export interface BlockConfigState {
  selectedBlockId: string | null
  configPanelOpen: boolean
  activeTab: ConfigTab
  isDirty: boolean
}

export type ConfigTab = 'content' | 'style' | 'advanced'

export interface BlockConfigPanel {
  blockType: string
  tabs: ConfigTab[]
  fields: ConfigField[]
}

export interface ConfigField {
  name: string
  type: ConfigFieldType
  label: string
  description?: string
  defaultValue?: any
  validation?: ConfigValidation
  dependencies?: string[]
  group?: string
}

export type ConfigFieldType = 
  | 'text'
  | 'textarea' 
  | 'number'
  | 'color'
  | 'select'
  | 'checkbox'
  | 'slider'
  | 'padding'
  | 'font-family'
  | 'font-size'
  | 'font-weight'
  | 'text-align'
  | 'image-upload'

export interface ConfigValidation {
  required?: boolean
  min?: number
  max?: number
  pattern?: string
  custom?: (value: any) => boolean | string
}

export interface BlockConfigUpdate {
  blockId: string
  field: string
  value: any
  timestamp: number
}

export interface ConfigPreset {
  id: string
  name: string
  blockType: string
  config: Partial<BlockProps>
  style: Partial<BlockStyle>
} 
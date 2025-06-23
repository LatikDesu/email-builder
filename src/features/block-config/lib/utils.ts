import { BlockType } from '@entities/block'
import { BlockConfigPanel, ConfigField } from '../config/types'

// Generate configuration panel for block type
export const createConfigPanel = (blockType: BlockType): BlockConfigPanel => {
  const baseFields: ConfigField[] = [
    {
      name: 'id',
      type: 'text',
      label: 'Block ID',
      description: 'Unique identifier for this block',
    },
  ]

  const contentFields = getContentFields(blockType)
  const styleFields = getStyleFields(blockType)
  const advancedFields = getAdvancedFields(blockType)

  return {
    blockType,
    tabs: ['content', 'style', 'advanced'],
    fields: [...baseFields, ...contentFields, ...styleFields, ...advancedFields],
  }
}

// Get content-specific fields for block type
const getContentFields = (blockType: BlockType): ConfigField[] => {
  switch (blockType) {
    case 'text':
      return [
        {
          name: 'text',
          type: 'textarea',
          label: 'Text Content',
          validation: { required: true },
        },
      ]
    
    case 'heading':
      return [
        {
          name: 'text',
          type: 'text',
          label: 'Heading Text',
          validation: { required: true },
        },
        {
          name: 'level',
          type: 'select',
          label: 'Heading Level',
          defaultValue: 1,
        },
      ]
    
    case 'button':
      return [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          validation: { required: true },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
        },
      ]
    
    case 'image':
      return [
        {
          name: 'src',
          type: 'image-upload',
          label: 'Image Source',
          validation: { required: true },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
      ]
    
    default:
      return []
  }
}

// Get style-specific fields for block type
const getStyleFields = (blockType: BlockType): ConfigField[] => {
  const commonStyleFields: ConfigField[] = [
    {
      name: 'padding',
      type: 'padding',
      label: 'Padding',
      group: 'spacing',
    },
    {
      name: 'margin',
      type: 'padding',
      label: 'Margin',
      group: 'spacing',
    },
    {
      name: 'backgroundColor',
      type: 'color',
      label: 'Background Color',
      group: 'colors',
    },
  ]

  const textStyleFields: ConfigField[] = [
    {
      name: 'color',
      type: 'color',
      label: 'Text Color',
      group: 'colors',
    },
    {
      name: 'fontSize',
      type: 'font-size',
      label: 'Font Size',
      group: 'typography',
    },
    {
      name: 'fontFamily',
      type: 'font-family',
      label: 'Font Family',
      group: 'typography',
    },
    {
      name: 'fontWeight',
      type: 'font-weight',
      label: 'Font Weight',
      group: 'typography',
    },
    {
      name: 'textAlign',
      type: 'text-align',
      label: 'Text Alignment',
      group: 'typography',
    },
  ]

  if (['text', 'heading', 'button'].includes(blockType)) {
    return [...commonStyleFields, ...textStyleFields]
  }

  return commonStyleFields
}

// Get advanced fields for block type
const getAdvancedFields = (blockType: BlockType): ConfigField[] => {
  return [
    {
      name: 'className',
      type: 'text',
      label: 'CSS Class',
      description: 'Custom CSS class for styling',
    },
    {
      name: 'customStyles',
      type: 'textarea',
      label: 'Custom CSS',
      description: 'Custom CSS styles for this block',
    },
  ]
}

// Validate field value
export const validateFieldValue = (field: ConfigField, value: any): boolean | string => {
  const { validation } = field
  if (!validation) return true

  if (validation.required && (value === null || value === undefined || value === '')) {
    return `${field.label} is required`
  }

  if (validation.min !== undefined && value < validation.min) {
    return `${field.label} must be at least ${validation.min}`
  }

  if (validation.max !== undefined && value > validation.max) {
    return `${field.label} must be at most ${validation.max}`
  }

  if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
    return `${field.label} format is invalid`
  }

  if (validation.custom) {
    return validation.custom(value)
  }

  return true
} 
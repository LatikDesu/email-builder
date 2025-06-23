import { BlockProps } from '@entities/block'
import { DocumentProps } from '@entities/document'
import {
    CsvImportOptions,
    HtmlImportOptions,
    ImportError,
    ImportOptions,
    ImportResult,
    ImportWarning,
    JsonImportOptions,
    MjmlImportOptions
} from '../config/types'

// Base importer class
abstract class BaseImporter {
  abstract import(content: string, options: ImportOptions): Promise<ImportResult>
  
  protected createError(type: any, message: string, line?: number): ImportError {
    return { type, message, line }
  }
  
  protected createWarning(type: any, message: string, suggestion?: string): ImportWarning {
    return { type, message, suggestion }
  }
  
  protected generateBlockId(): string {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

// JSON Importer
export class JsonImporter extends BaseImporter {
  async import(content: string, options: JsonImportOptions): Promise<ImportResult> {
    const errors: ImportError[] = []
    const warnings: ImportWarning[] = []
    
    try {
      const data = JSON.parse(content)
      
      // Validate structure
      if (options.validateStructure) {
        const validationResult = this.validateJsonStructure(data)
        errors.push(...validationResult.errors)
        warnings.push(...validationResult.warnings)
      }
      
      if (errors.length > 0 && options.strictMode) {
        return {
          success: false,
          errors,
          warnings,
          importedBlocks: 0,
          skippedBlocks: 0,
        }
      }
      
      // Convert to document
      const document = this.convertToDocument(data, options)
      
      return {
        success: true,
        document,
        errors,
        warnings,
        importedBlocks: document.blocks.length,
        skippedBlocks: 0,
      }
      
    } catch (error) {
      return {
        success: false,
        errors: [this.createError('parse-error', `Invalid JSON: ${error}`)],
        warnings,
        importedBlocks: 0,
        skippedBlocks: 0,
      }
    }
  }
  
  private validateJsonStructure(data: any): { errors: ImportError[], warnings: ImportWarning[] } {
    const errors: ImportError[] = []
    const warnings: ImportWarning[] = []
    
    // Check required fields
    if (!data.id) errors.push(this.createError('missing-required-field', 'Document ID is required'))
    if (!data.name) errors.push(this.createError('missing-required-field', 'Document name is required'))
    if (!data.blocks || !Array.isArray(data.blocks)) {
      errors.push(this.createError('missing-required-field', 'Blocks array is required'))
    }
    
    // Check blocks structure
    if (data.blocks) {
      data.blocks.forEach((block: any, index: number) => {
        if (!block.id) errors.push(this.createError('missing-required-field', `Block ${index} missing ID`))
        if (!block.type) errors.push(this.createError('missing-required-field', `Block ${index} missing type`))
      })
    }
    
    return { errors, warnings }
  }
  
  private convertToDocument(data: any, options: JsonImportOptions): DocumentProps {
    const document: DocumentProps = {
      id: options.preserveIds ? data.id : this.generateBlockId(),
      name: data.name || 'Imported Document',
      blocks: data.blocks?.map((block: any) => this.convertBlock(block, options)) || [],
      settings: data.settings || this.getDefaultSettings(),
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: '1.0.0',
        ...data.metadata,
      },
    }
    
    return document
  }
  
  private convertBlock(block: any, options: JsonImportOptions): BlockProps {
    return {
      id: options.preserveIds ? block.id : this.generateBlockId(),
      type: block.type,
      data: block.data || {},
      children: block.children,
      parentId: block.parentId,
    }
  }
  
  private getDefaultSettings() {
    return {
      width: 600,
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontSize: 14,
      lineHeight: 1.4,
      padding: '20px',
    }
  }
}

// HTML Importer
export class HtmlImporter extends BaseImporter {
  async import(content: string, options: HtmlImportOptions): Promise<ImportResult> {
    const errors: ImportError[] = []
    const warnings: ImportWarning[] = []
    
    try {
      // Parse HTML (simplified - would use DOMParser in browser)
      const document = this.parseHtmlToDocument(content, options)
      
      warnings.push(this.createWarning(
        'unsupported-feature', 
        'HTML import is simplified and may not preserve all styling',
        'Consider using JSON format for full fidelity'
      ))
      
      return {
        success: true,
        document,
        errors,
        warnings,
        importedBlocks: document.blocks.length,
        skippedBlocks: 0,
      }
      
    } catch (error) {
      return {
        success: false,
        errors: [this.createError('parse-error', `HTML parsing failed: ${error}`)],
        warnings,
        importedBlocks: 0,
        skippedBlocks: 0,
      }
    }
  }
  
  private parseHtmlToDocument(content: string, options: HtmlImportOptions): DocumentProps {
    // Simplified HTML parsing - in real implementation would use proper HTML parser
    const blocks: BlockProps[] = []
    
    // Extract basic text content for demonstration
    const textMatch = content.match(/<body[^>]*>(.*?)<\/body>/s)
    if (textMatch) {
      blocks.push({
        id: this.generateBlockId(),
        type: 'text',
        data: { text: textMatch[1].replace(/<[^>]*>/g, '').trim() },
      })
    }
    
    return {
      id: this.generateBlockId(),
      name: 'Imported HTML Document',
      blocks,
      settings: this.getDefaultSettings(),
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: '1.0.0',
      },
    }
  }
  
  private getDefaultSettings() {
    return {
      width: 600,
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontSize: 14,
      lineHeight: 1.4,
      padding: '20px',
    }
  }
}

// MJML Importer
export class MjmlImporter extends BaseImporter {
  async import(content: string, options: MjmlImportOptions): Promise<ImportResult> {
    const warnings: ImportWarning[] = [
      this.createWarning(
        'unsupported-feature',
        'MJML import is not fully implemented',
        'Use JSON format for complete functionality'
      )
    ]
    
    return {
      success: false,
      errors: [this.createError('invalid-format', 'MJML import not implemented yet')],
      warnings,
      importedBlocks: 0,
      skippedBlocks: 0,
    }
  }
}

// CSV Importer
export class CsvImporter extends BaseImporter {
  async import(content: string, options: CsvImportOptions): Promise<ImportResult> {
    const warnings: ImportWarning[] = [
      this.createWarning(
        'unsupported-feature',
        'CSV import is not fully implemented',
        'Use JSON format for complete functionality'
      )
    ]
    
    return {
      success: false,
      errors: [this.createError('invalid-format', 'CSV import not implemented yet')],
      warnings,
      importedBlocks: 0,
      skippedBlocks: 0,
    }
  }
}

// Import factory
export const createImporter = (format: string) => {
  switch (format) {
    case 'json':
      return new JsonImporter()
    case 'html':
      return new HtmlImporter()
    case 'mjml':
      return new MjmlImporter()
    case 'csv':
      return new CsvImporter()
    default:
      throw new Error(`Unsupported import format: ${format}`)
  }
} 
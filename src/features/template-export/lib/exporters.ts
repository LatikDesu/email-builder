import { DocumentProps } from '@entities/document'
import {
    ExportOptions,
    ExportResult,
    HtmlExportOptions,
    JsonExportOptions,
    MjmlExportOptions,
    PdfExportOptions
} from '../config/types'

// Base exporter class
abstract class BaseExporter {
  abstract export(document: DocumentProps, options: ExportOptions): Promise<ExportResult>
  
  protected generateFilename(document: DocumentProps, extension: string): string {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const name = document.name.replace(/[^a-zA-Z0-9]/g, '_')
    return `${name}_${timestamp}.${extension}`
  }
}

// HTML Exporter
export class HtmlExporter extends BaseExporter {
  async export(document: DocumentProps, options: HtmlExportOptions): Promise<ExportResult> {
    const html = this.generateHtml(document, options)
    const filename = this.generateFilename(document, 'html')
    
    return {
      format: 'html',
      content: html,
      filename,
      size: new Blob([html]).size,
      timestamp: Date.now(),
    }
  }

  private generateHtml(document: DocumentProps, options: HtmlExportOptions): string {
    const { blocks, settings } = document
    
    const styles = options.includeInlineStyles ? this.generateInlineStyles(settings) : ''
    const responsiveCSS = options.includeResponsiveCSS ? this.generateResponsiveCSS() : ''
    
    const bodyContent = blocks.map(block => this.renderBlock(block)).join('\n')
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${document.name}</title>
  ${options.includeResponsiveCSS ? `<style>${responsiveCSS}</style>` : ''}
</head>
<body style="${styles}">
  <div class="email-container" style="max-width: ${settings.width}px; margin: 0 auto;">
    ${bodyContent}
  </div>
</body>
</html>`.trim()
  }

  private generateInlineStyles(settings: any): string {
    return `
      font-family: ${settings.fontFamily};
      font-size: ${settings.fontSize}px;
      line-height: ${settings.lineHeight};
      background-color: ${settings.backgroundColor};
      padding: ${settings.padding};
    `.replace(/\s+/g, ' ').trim()
  }

  private generateResponsiveCSS(): string {
    return `
      @media (max-width: 600px) {
        .email-container { width: 100% !important; }
        .responsive-column { width: 100% !important; display: block !important; }
      }
    `.replace(/\s+/g, ' ').trim()
  }

  private renderBlock(block: any): string {
    // Simplified block rendering - will be expanded based on block types
    return `<div class="block block-${block.type}" data-block-id="${block.id}">
      <!-- Block content for ${block.type} -->
    </div>`
  }
}

// JSON Exporter
export class JsonExporter extends BaseExporter {
  async export(document: DocumentProps, options: JsonExportOptions): Promise<ExportResult> {
    const content = options.prettify 
      ? JSON.stringify(document, null, 2)
      : JSON.stringify(document)
    
    const filename = this.generateFilename(document, 'json')
    
    return {
      format: 'json',
      content,
      filename,
      size: new Blob([content]).size,
      timestamp: Date.now(),
    }
  }
}

// MJML Exporter
export class MjmlExporter extends BaseExporter {
  async export(document: DocumentProps, options: MjmlExportOptions): Promise<ExportResult> {
    const mjml = this.generateMjml(document, options)
    const filename = this.generateFilename(document, 'mjml')
    
    return {
      format: 'mjml',
      content: mjml,
      filename,
      size: new Blob([mjml]).size,
      timestamp: Date.now(),
    }
  }

  private generateMjml(document: DocumentProps, options: MjmlExportOptions): string {
    const { blocks, settings } = document
    
    const bodyContent = blocks.map(block => this.renderMjmlBlock(block)).join('\n    ')
    
    return `
<mjml>
  <mj-head>
    <mj-title>${document.name}</mj-title>
    <mj-attributes>
      <mj-all font-family="${settings.fontFamily}" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="${settings.backgroundColor}">
    <mj-section>
      <mj-column>
        ${bodyContent}
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`.trim()
  }

  private renderMjmlBlock(block: any): string {
    // Simplified MJML block rendering
    switch (block.type) {
      case 'text':
        return `<mj-text>${block.data.text || ''}</mj-text>`
      case 'button':
        return `<mj-button href="${block.data.url || '#'}">${block.data.text || 'Button'}</mj-button>`
      case 'image':
        return `<mj-image src="${block.data.src || ''}" alt="${block.data.alt || ''}" />`
      default:
        return `<!-- Unsupported block type: ${block.type} -->`
    }
  }
}

// PDF Exporter (placeholder - would require additional dependencies)
export class PdfExporter extends BaseExporter {
  async export(document: DocumentProps, options: PdfExportOptions): Promise<ExportResult> {
    // This would require a PDF generation library like puppeteer or jsPDF
    throw new Error('PDF export not implemented yet')
  }
}

// Export factory
export const createExporter = (format: string) => {
  switch (format) {
    case 'html':
      return new HtmlExporter()
    case 'json':
      return new JsonExporter()
    case 'mjml':
      return new MjmlExporter()
    case 'pdf':
      return new PdfExporter()
    default:
      throw new Error(`Unsupported export format: ${format}`)
  }
} 
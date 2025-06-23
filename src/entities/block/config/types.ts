// Block Entity Types

export interface BlockProps {
  id: string;
  type: string;
  data: Record<string, any>;
  children?: string[];
  parentId?: string;
}

export interface BlockConfig {
  type: string;
  name: string;
  category: string;
  icon?: string;
  defaultProps: Record<string, any>;
  schema?: any; // Zod schema for validation
}

export interface BlockStyle {
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  [key: string]: any;
}

export type BlockType = 
  | 'text'
  | 'heading'
  | 'button'
  | 'image'
  | 'divider'
  | 'spacer'
  | 'container'
  | 'columns'
  | 'html'; 
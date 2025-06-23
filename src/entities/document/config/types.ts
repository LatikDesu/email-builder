import { BlockProps } from '@entities/block';

// Document Entity Types

export interface DocumentProps {
  id: string;
  name: string;
  blocks: BlockProps[];
  settings: DocumentSettings;
  metadata: DocumentMetadata;
}

export interface DocumentSettings {
  width: number;
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  padding: string;
}

export interface DocumentMetadata {
  createdAt: string;
  updatedAt: string;
  version: string;
  author?: string;
  description?: string;
} 
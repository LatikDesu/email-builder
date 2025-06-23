import { Layout as ConstaLayout } from '@consta/uikit/Layout'
import React from 'react'

// Email Builder Layout Component - wrapper around Consta Layout
export const Layout: React.FC<any> = (props) => {
  return <ConstaLayout {...props} />;
};

// Re-export for convenience
export { ConstaLayout }


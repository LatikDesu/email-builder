import { Text as ConstaText } from '@consta/uikit/Text'
import React from 'react'

// Email Builder Text Component - wrapper around Consta Text
export const Text: React.FC<any> = (props) => {
  return <ConstaText {...props} />;
};

// Re-export for convenience
export { ConstaText }


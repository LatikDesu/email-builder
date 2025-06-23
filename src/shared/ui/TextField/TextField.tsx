import { TextField as ConstaTextField } from '@consta/uikit/TextField';
import React from 'react';

// Email Builder TextField Component - wrapper around Consta TextField
export const TextField: React.FC<any> = (props) => {
  return <ConstaTextField {...props} />;
};

// Re-export for convenience
export { ConstaTextField };

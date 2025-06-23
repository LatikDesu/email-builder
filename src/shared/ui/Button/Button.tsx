import { Button as ConstaButton } from '@consta/uikit/Button'
import React from 'react'

// Email Builder Button Component - wrapper around Consta Button
export const Button: React.FC<any> = (props) => {
  return <ConstaButton {...props} />;
};

// Re-export for convenience
export { ConstaButton }


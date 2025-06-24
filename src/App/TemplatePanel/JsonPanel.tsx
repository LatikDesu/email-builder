import React, { useMemo } from 'react';

import { useDocument } from '../../documents/editor/EditorContext';

import { HighlightedCodePanel } from '../../shared/ui';

export default function JsonPanel() {
  const document = useDocument();
  const code = useMemo(() => JSON.stringify(document, null, '  '), [document]);
  return <HighlightedCodePanel type="json" value={code} />;
}

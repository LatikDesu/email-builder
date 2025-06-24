import React, { useState } from 'react'

import { IconShare } from '@consta/icons/IconShare'
import { Button } from '@consta/uikit/Button'
import { SnackBar } from '@consta/uikit/SnackBar'
import { Tooltip } from '@consta/uikit/Tooltip'

import { useDocument } from '../../documents/editor/EditorContext'

export default function ShareButton() {
  const document = useDocument();
  const [message, setMessage] = useState<string | null>(null);

  const onClick = async () => {
    const c = encodeURIComponent(JSON.stringify(document));
    location.hash = `#code/${btoa(c)}`;
    setMessage('The URL was updated. Copy it to share your current template.');
  };

  const onClose = () => {
    setMessage(null);
  };

  const buttonStyle: React.CSSProperties = {
    minWidth: 'auto',
    padding: '8px'
  };

  const snackBarItems = message ? [{
    key: 'share-message',
    message: message,
    status: 'system' as const,
    autoClose: 5
  }] : [];

  return (
    <>
      <Tooltip content="Share current template">
        <Button
          onClick={onClick}
          view="clear"
          size="s"
          iconLeft={IconShare}
          onlyIcon
          style={buttonStyle}
        />
      </Tooltip>
      <SnackBar
        items={snackBarItems}
        onItemClose={onClose}
        onItemAutoClose={onClose}
      />
    </>
  );
}

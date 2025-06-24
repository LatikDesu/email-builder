import React from 'react'

import { IconArrowRight } from '@consta/icons/IconArrowRight'
import { IconSettings } from '@consta/icons/IconSettings'
import { Button } from '@consta/uikit/Button'

import { toggleInspectorDrawerOpen, useInspectorDrawerOpen } from '../../documents/editor/EditorContext'

export default function ToggleInspectorPanelButton() {
  const inspectorDrawerOpen = useInspectorDrawerOpen();

  const handleClick = () => {
    toggleInspectorDrawerOpen();
  };

  const buttonStyle: React.CSSProperties = {
    minWidth: 'auto',
    padding: '8px'
  };

  if (inspectorDrawerOpen) {
    return (
      <Button
        onClick={handleClick}
        view="clear"
        size="s"
        iconLeft={IconArrowRight}
        onlyIcon
        style={buttonStyle}
      />
    );
  }
  return (
    <Button
      onClick={handleClick}
      view="clear"
      size="s"
      iconLeft={IconSettings}
      onlyIcon
      style={buttonStyle}
    />
  );
}

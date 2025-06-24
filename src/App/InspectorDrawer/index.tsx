import React from 'react'

import { useInspectorDrawerOpen, useSelectedBlockId } from '../../documents/editor/EditorContext'

import ConfigurationPanel from './ConfigurationPanel'
import EmailSettingsPanel from './EmailSettingsPanel'

export const INSPECTOR_DRAWER_WIDTH = 320;

export default function InspectorDrawer() {
  const inspectorDrawerOpen = useInspectorDrawerOpen();
  const selectedBlockId = useSelectedBlockId();

  const sidebarStyle: React.CSSProperties = {
    position: 'absolute',
    right: 0,
    top: 0,
    width: inspectorDrawerOpen ? INSPECTOR_DRAWER_WIDTH : 0,
    height: '100%',
    backgroundColor: 'var(--email-builder-bg-paper)',
    borderLeft: '1px solid var(--email-builder-cadet-300, #DCE4EA)',
    transition: 'width 225ms cubic-bezier(0.0, 0, 0.2, 1)',
    overflow: 'hidden',
    zIndex: 1,
  };

  const headerStyle: React.CSSProperties = {
    width: INSPECTOR_DRAWER_WIDTH,
    height: 49,
    borderBottom: '1px solid var(--email-builder-cadet-300, #DCE4EA)',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--email-builder-text-primary)',
  };

  const contentStyle: React.CSSProperties = {
    width: INSPECTOR_DRAWER_WIDTH,
    height: 'calc(100% - 49px)',
    overflow: 'auto',
  };

  if (!inspectorDrawerOpen) {
    return null;
  }

  const renderCurrentPanel = () => {
    if (selectedBlockId) {
      // Показываем инспектор выбранного блока
      return <ConfigurationPanel />;
    } else {
      // Показываем настройки письма когда ничего не выбрано
      return <EmailSettingsPanel />;
    }
  };

  const getHeaderTitle = () => {
    if (selectedBlockId) {
      return 'Block Properties';
    } else {
      return 'Email Settings';
    }
  };

  return (
    <div style={sidebarStyle}>
      <div style={headerStyle}>
        {getHeaderTitle()}
      </div>
      <div style={contentStyle}>
        {renderCurrentPanel()}
      </div>
    </div>
  );
}

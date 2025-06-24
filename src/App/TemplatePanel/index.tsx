import React from 'react'

import { IconPhone } from '@consta/icons/IconPhone'
import { IconScreenStroked } from '@consta/icons/IconScreenStroked'
import { Reader } from '@usewaypoint/email-builder'

import EditorBlock from '../../documents/editor/EditorBlock'
import {
    setSelectedScreenSize,
    useDocument,
    useSelectedMainTab,
    useSelectedScreenSize,
} from '../../documents/editor/EditorContext'
import ToggleInspectorPanelButton from '../InspectorDrawer/ToggleInspectorPanelButton'

import { ChoiceGroup } from '@consta/uikit/ChoiceGroup'
import DownloadJson from './DownloadJson'
import HtmlPanel from './HtmlPanel'
import ImportJson from './ImportJson'
import JsonPanel from './JsonPanel'
import MainTabsGroup from './MainTabsGroup'

type ScreenSize = 'desktop' | 'mobile';

const screenSizeOptions = [
  { label: 'Desktop', value: 'desktop' as ScreenSize, icon: IconScreenStroked },
  { label: 'Mobile', value: 'mobile' as ScreenSize, icon: IconPhone },
];

export default function TemplatePanel() {
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();

  const mainBoxStyle: React.CSSProperties = {
    height: '100%',
    ...(selectedScreenSize === 'mobile' && {
      margin: '32px auto',
      width: 370,
      height: 800,
      boxShadow: 'rgba(33, 36, 67, 0.04) 0px 10px 20px, rgba(33, 36, 67, 0.04) 0px 2px 6px, rgba(33, 36, 67, 0.04) 0px 0px 1px',
    }),
  };

  const handleScreenSizeChange = ({ value }: { value: ScreenSize }) => {
    setSelectedScreenSize(value);
  };

  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case 'editor':
        return (
          <div style={mainBoxStyle}>
            <EditorBlock id="root" />
          </div>
        );
      case 'preview':
        return (
          <div style={mainBoxStyle}>
            <Reader document={document} rootBlockId="root" />
          </div>
        );
      case 'html':
        return <HtmlPanel />;
      case 'json':
        return <JsonPanel />;
    }
  };

  const headerStyle: React.CSSProperties = {
    height: 49,
    borderBottom: '1px solid var(--email-builder-cadet-300, #DCE4EA)',
    backgroundColor: 'var(--email-builder-bg-paper, #ffffff)',
    padding: '0 8px',
  };

  const contentStyle: React.CSSProperties = {
    height: 'calc(100vh - 49px)',
    overflow: 'auto',
    minWidth: 370,
  };

  const headerContainerStyle: React.CSSProperties = {
    ...headerStyle,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '24px',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    alignItems: 'center',
  };

  return (
    <>
      <div style={headerContainerStyle}>
        <div style={leftSectionStyle}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <MainTabsGroup />
          </div>
          <div style={rightSectionStyle}>
            <DownloadJson />
            <ImportJson />
            <ChoiceGroup
              value={screenSizeOptions.find(option => option.value === selectedScreenSize)}
              items={screenSizeOptions}
              onChange={({ value }) => handleScreenSizeChange({ value: value })}
              size="xs"
              multiple={false}
              name="screenSize"
            />
          </div>
        </div>
        <ToggleInspectorPanelButton />
      </div>
      <div style={contentStyle}>
        {renderMainPanel()}
      </div>
    </>
  );
}

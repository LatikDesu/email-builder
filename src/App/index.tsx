import { Layout } from '@consta/uikit/Layout'
import { renderToStaticMarkup } from '@usewaypoint/email-builder'
import React from 'react'

import { TEditorConfiguration } from '../documents/editor/core'
import { setDocument, subscribeDocument, useInspectorDrawerOpen, useSamplesDrawerOpen } from '../documents/editor/EditorContext'
import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from './InspectorDrawer'
import TemplatePanel from './TemplatePanel'

export const DEFAULT_SOURCE: TEditorConfiguration = {
  "root": {
    "type": "EmailLayout",
    "data": {}
  }
}

// CSS transition utility for drawer animations
function createTransition(property: string, open: boolean): string {
  const duration = open ? '225ms' : '195ms';
  const easing = open ? 'cubic-bezier(0.0, 0, 0.2, 1)' : 'cubic-bezier(0.4, 0, 1, 1)';
  return `${property} ${duration} ${easing}`;
}

export interface AppProps {
  // Initial configuration to load. Optional.
  data?: TEditorConfiguration,
  // Callback for any change in document. Optional.
  onChange?: (json: TEditorConfiguration, html: String) => void,
  // Optional height for the Stack component.
  height?: string,
}

export default function App(props: AppProps) {
  const inspectorDrawerOpen = useInspectorDrawerOpen();
  const samplesDrawerOpen = useSamplesDrawerOpen();

  const marginLeftTransition = createTransition('margin-left', samplesDrawerOpen);
  const marginRightTransition = createTransition('margin-right', inspectorDrawerOpen);

  if (props.data) {
    setDocument(props.data)
  } else {
    setDocument(DEFAULT_SOURCE)
  }

  if (props.onChange) {
    subscribeDocument ((document) => {
      props.onChange?.(document, renderToStaticMarkup(document, { rootBlockId: 'root' }))
    })
  }

  const containerStyle: React.CSSProperties = {
    marginRight: inspectorDrawerOpen ? `${INSPECTOR_DRAWER_WIDTH}px` : 0,
    transition: [marginLeftTransition, marginRightTransition].join(', '),
    height: props.height ? props.height : 'auto',
  };

  return (
    <>
      <InspectorDrawer />
      <Layout 
        direction="column"
        style={containerStyle}
      >
        <TemplatePanel />
      </Layout>
    </>
  );
}

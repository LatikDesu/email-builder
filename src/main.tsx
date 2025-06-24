import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { AppProps, DEFAULT_SOURCE } from './App'
import { resetDocument, setDocument } from './documents/editor/EditorContext'

import { Theme, presetGpnDefault } from '@consta/uikit/Theme'
import { injectEmailBuilderCSS } from './shared/config/theme'

function isRendered(containerId: string): boolean {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id ${containerId} not found`);
    return false;
  }
  return container.hasChildNodes();
}

function render(containerId: string, props: AppProps, force: boolean = false) {
  if (!isRendered(containerId) || force) {
    const container = document.getElementById(containerId);
    if (!container) return;

    injectEmailBuilderCSS();

    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <Theme preset={presetGpnDefault}>
          <App {...props} />
        </Theme>
      </React.StrictMode>
    );
  }
}

export { App, DEFAULT_SOURCE, isRendered, render, resetDocument, setDocument }


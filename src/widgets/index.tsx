import { declareIndexPlugin, type ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import { BACKGROUND_PLUGIN_DATA_KEY, setDocumentBackground } from '../utils/storage';
import { JAMES_WEBB } from '../components/BackgroundPicker';
import '../style.css';
import '../index.css';

async function onActivate(plugin: ReactRNPlugin) {
  // Register the document background widget to appear above the toolbar/title
  await plugin.app.registerWidget('document_background', WidgetLocation.DocumentAboveToolbar, {
    dimensions: { height: 'auto', width: '100%' },
  });

  await plugin.settings.registerBooleanSetting({
    id: 'show-add-cover-button',
    title: 'Show "Add Cover" Button',
    defaultValue: true,
    description: 'If disabled, the "Add Cover" button is hidden. You can use the /cover command instead to add a cover.'
  });

  await plugin.settings.registerNumberSetting({
    id: 'cover-height',
    title: 'Cover Height (px)',
    defaultValue: 280,
    description: 'The height of the cover image in pixels.'
  });

  await plugin.app.registerCommand({
    id: 'add-document-cover',
    name: 'Add Cover',
    description: 'Adds a random cover image to the current specifically focused Document.',
    action: async () => {
      // Get the currently open page/pane ID rather than the deeply nested text focus ID
      const openPaneIds = await plugin.window.getOpenPaneRemIds();

      const documentId = openPaneIds[0];

      if (documentId) {
        const defaultBg = {
          type: 'image' as const,
          value: JAMES_WEBB[Math.floor(Math.random() * JAMES_WEBB.length)],
          yPosition: 50
        };

        // This unified helper sets the storage key and triggers tracker refetches natively
        await setDocumentBackground(plugin, documentId, defaultBg);
      } else {
        plugin.app.toast('Please focus on a Document first to add a cover.');
      }
    },
  });
}

async function onDeactivate(_: ReactRNPlugin) { }

declareIndexPlugin(onActivate, onDeactivate);

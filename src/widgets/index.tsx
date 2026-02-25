import { declareIndexPlugin, type ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import { BACKGROUND_PLUGIN_DATA_KEY } from '../utils/storage';
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

  await plugin.app.registerCommand({
    id: 'add-document-cover',
    name: 'Add Cover',
    description: 'Adds a random cover image to the current specifically focused Rem.',
    action: async () => {
      const rem = await plugin.focus.getFocusedRem();

      // We want to apply the cover strictly to the specific rem the user typed the slash command on
      if (rem) {
        const defaultBg = {
          type: 'image',
          value: JAMES_WEBB[Math.floor(Math.random() * JAMES_WEBB.length)],
          yPosition: 50
        };
        // Set the storage key explicitly mapped to this precise rem's ID
        await plugin.storage.setSynced(`${BACKGROUND_PLUGIN_DATA_KEY}_${rem._id}`, defaultBg);
      } else {
        plugin.app.toast('Please focus on a specific Rem first to add a cover.');
      }
    },
  });
}

async function onDeactivate(_: ReactRNPlugin) { }

declareIndexPlugin(onActivate, onDeactivate);

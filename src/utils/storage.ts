import { RNPlugin, RemId } from '@remnote/plugin-sdk';

export type BackgroundType = 'color' | 'gradient' | 'image';

export interface DefaultBackgroundState {
  type: BackgroundType;
  value: string;
  yPosition: number;
}

export const BACKGROUND_PLUGIN_DATA_KEY = 'notion_background_data';

export const getDocumentBackground = async (
  plugin: RNPlugin,
  documentId: RemId
): Promise<DefaultBackgroundState | null> => {
  const data = await plugin.storage.getSynced(`${BACKGROUND_PLUGIN_DATA_KEY}_${documentId}`);
  return data ? (data as DefaultBackgroundState) : null;
};

export const setDocumentBackground = async (
  plugin: RNPlugin,
  documentId: RemId,
  data: DefaultBackgroundState | null
) => {
  await plugin.storage.setSynced(`${BACKGROUND_PLUGIN_DATA_KEY}_${documentId}`, data);
};

import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { ConnectionModal } from './src/components/ConnectionModal';
import { ControlDeck } from './src/components/ControlDeck';
import { Header } from './src/components/Header';
import { PromptModal } from './src/components/PromptModal';
import { StickerLibrary } from './src/components/StickerLibrary';
import { Toast } from './src/components/Toast';
import {
  ENVIRONMENTS,
  FIXED_STICKERS,
  INITIAL_PLACEMENTS,
  REASONING_LEVELS,
} from './src/deck-model';
import { useDeckLayout } from './src/hooks/useDeckLayout';
import { colors } from './src/theme';

function nextOption(options, current) {
  const index = options.indexOf(current);
  return options[(index + 1) % options.length];
}

export default function App() {
  const layout = useDeckLayout();
  const [placements, setPlacements] = useState(INITIAL_PLACEMENTS);
  const [controls, setControls] = useState({
    agent: 'Codex',
    environment: 'Desktop',
    reasoning: 'XHigh',
  });
  const [editMode, setEditMode] = useState(false);
  const [connectionOpen, setConnectionOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [lastEvent, setLastEvent] = useState('Deck ready · mobile and tablet layout active.');
  const [notice, setNotice] = useState('');
  const noticeTimer = useRef();

  const placedIds = useMemo(
    () => new Set(placements.filter(Boolean)),
    [placements],
  );

  function flash(message) {
    setNotice(message);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 2200);
  }

  function updateControl(key, options) {
    setControls((current) => {
      const next = nextOption(options, current[key]);
      flash(`${key[0].toUpperCase()}${key.slice(1)} · ${next}`);
      return { ...current, [key]: next };
    });
  }

  function removeSticker(sticker) {
    if (FIXED_STICKERS.has(sticker.id)) {
      flash(`${sticker.label} is fixed.`);
      return;
    }
    setPlacements((current) => current.map((id) => (id === sticker.id ? null : id)));
    setLastEvent(`${sticker.label} moved back to the library.`);
  }

  function addSticker(sticker) {
    if (placedIds.has(sticker.id)) {
      flash(`${sticker.label} is already on the deck.`);
      return;
    }
    const freeIndex = placements.findIndex(
      (id, index) => !id && ![0, 3, 12, 14].includes(index),
    );
    if (freeIndex < 0) {
      flash('Remove one configurable sticker first.');
      return;
    }
    setPlacements((current) => {
      const next = [...current];
      next[freeIndex] = sticker.id;
      return next;
    });
    setLastEvent(`${sticker.label} added to the deck.`);
  }

  function runSticker(sticker) {
    if (editMode && !FIXED_STICKERS.has(sticker.id)) {
      removeSticker(sticker);
      return;
    }

    switch (sticker.action) {
      case 'environment':
        updateControl('environment', ENVIRONMENTS);
        break;
      case 'reasoning':
        updateControl('reasoning', REASONING_LEVELS);
        break;
      case 'agent':
        updateControl('agent', ['Codex', 'GPT']);
        break;
      case 'prompt':
        setPromptOpen(true);
        break;
      case 'review':
        setLastEvent('Human Review opened · no candidate is currently waiting.');
        break;
      case 'version':
        setLastEvent('Version history ready · no native versions saved yet.');
        break;
      case 'approve':
        setLastEvent('Approval requires a candidate in Human Review.');
        break;
      case 'reject':
        setLastEvent('Rejection requires a candidate in Human Review.');
        break;
      case 'stop':
        setLastEvent('Stop requested · the last safe state is preserved.');
        break;
      default:
        setLastEvent(`${sticker.label} selected · ready for host integration.`);
    }
  }

  async function openConnectionPage() {
    const url = controls.environment === 'API'
      ? 'https://platform.openai.com/api-keys'
      : 'https://chatgpt.com/auth/login';
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      flash('This device cannot open the connection page.');
      return;
    }
    await Linking.openURL(url);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[
          styles.page,
          {
            paddingBottom: layout.isTablet ? 40 : 26,
            paddingHorizontal: layout.horizontalPadding,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.content, { maxWidth: layout.isTablet ? 900 : 560 }]}>
          <Header
            editMode={editMode}
            isTablet={layout.isTablet}
            onConnection={() => setConnectionOpen(true)}
            onEdit={() => setEditMode((current) => !current)}
          />
          <ControlDeck
            controls={controls}
            editMode={editMode}
            lastEvent={lastEvent}
            layout={layout}
            onStickerPress={runSticker}
            placements={placements}
          />
          {editMode ? (
            <StickerLibrary
              layout={layout}
              onAdd={addSticker}
              placedIds={placedIds}
            />
          ) : null}
        </View>
      </ScrollView>

      <Toast message={notice} />
      <ConnectionModal
        controls={controls}
        onClose={() => setConnectionOpen(false)}
        onOpenPage={openConnectionPage}
        visible={connectionOpen}
      />
      <PromptModal
        agent={controls.agent}
        onClose={() => setPromptOpen(false)}
        onSubmit={(value) => {
          setPromptOpen(false);
          setLastEvent(`Prompt queued · ${value}`);
        }}
        visible={promptOpen}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.canvas,
    flex: 1,
  },
  page: {
    alignItems: 'center',
    backgroundColor: colors.canvas,
    flexGrow: 1,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
});

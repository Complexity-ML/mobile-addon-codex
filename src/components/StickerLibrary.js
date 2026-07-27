import { StyleSheet, Text, View } from 'react-native';
import { FIXED_STICKERS, STICKERS } from '../deck-model';
import { colors, sharedStyles } from '../theme';
import { LibraryTile } from './LibraryTile';

const AVAILABLE_STICKERS = STICKERS.filter(
  (sticker) => !FIXED_STICKERS.has(sticker.id),
);

export function StickerLibrary({ layout, onAdd, placedIds }) {
  return (
    <View style={[styles.panel, { width: layout.deckWidth }]}>
      <View style={styles.header}>
        <View>
          <Text style={sharedStyles.eyebrow}>EDIT MODE</Text>
          <Text style={styles.title}>Square sticker library</Text>
        </View>
        <Text style={styles.hint}>Tap deck tiles to remove</Text>
      </View>
      <View style={[styles.grid, { gap: layout.gap }]}>
        {AVAILABLE_STICKERS.map((sticker) => (
          <LibraryTile
            disabled={placedIds.has(sticker.id)}
            isTablet={layout.isTablet}
            key={sticker.id}
            onPress={onAdd}
            size={layout.librarySize}
            sticker={sticker}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#19273ceb',
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 11,
    padding: 11,
  },
  header: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
  hint: {
    color: colors.muted,
    fontSize: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

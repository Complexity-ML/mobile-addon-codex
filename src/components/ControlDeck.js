import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { DeckTile } from './DeckTile';

export function ControlDeck({
  controls,
  editMode,
  lastEvent,
  layout,
  onStickerPress,
  placements,
}) {
  const rows = [
    placements.slice(0, 4),
    placements.slice(4, 8),
    placements.slice(8, 12),
  ];
  const tileProps = {
    controls,
    editMode,
    gap: layout.gap,
    isTablet: layout.isTablet,
    onPress: onStickerPress,
    size: layout.tileSize,
  };

  return (
    <View style={[styles.frame, { width: layout.deckWidth }]}>
      <View
        style={[
          styles.grid,
          { gap: layout.gap, padding: layout.deckPadding },
        ]}
      >
        {rows.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={[styles.row, { gap: layout.gap }]}>
            {row.map((id, columnIndex) => (
              <DeckTile
                {...tileProps}
                id={id}
                key={`slot-${rowIndex}-${columnIndex}`}
              />
            ))}
          </View>
        ))}
        <View style={[styles.row, { gap: layout.gap }]}>
          <DeckTile {...tileProps} id={placements[12]} wide />
          <DeckTile {...tileProps} id={placements[13]} />
          <DeckTile {...tileProps} id={placements[14]} />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerCopy}>
          <Text numberOfLines={1} style={styles.footerEvent}>{lastEvent}</Text>
          <Text style={styles.footerMeta}>
            {layout.isTablet ? 'TABLET' : 'MOBILE'} · 4 COLUMNS
          </Text>
        </View>
        <Text style={styles.capacity}>11 configurable · 4 fixed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: '#0e192ae6',
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  grid: {
    backgroundColor: '#111c2eb8',
  },
  row: {
    flexDirection: 'row',
  },
  footer: {
    alignItems: 'center',
    backgroundColor: '#19273cd1',
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    minHeight: 54,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  footerCopy: {
    flex: 1,
  },
  footerEvent: {
    color: colors.ink,
    fontSize: 9,
    fontWeight: '700',
  },
  footerMeta: {
    color: colors.muted,
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 3,
  },
  capacity: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: '700',
  },
});

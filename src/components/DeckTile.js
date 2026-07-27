import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FIXED_STICKERS, stickerById } from '../deck-model';
import { colors, toneColor } from '../theme';

function resolveSticker(sticker, controls) {
  if (!sticker) return null;
  if (sticker.id === 'environment-control') {
    return { ...sticker, label: controls.environment };
  }
  if (sticker.id === 'reasoning-control') {
    return { ...sticker, label: controls.reasoning };
  }
  if (sticker.id === 'active-agent') {
    return { ...sticker, label: controls.agent };
  }
  return sticker;
}

export function DeckTile({
  controls,
  editMode,
  gap,
  id,
  isTablet,
  onPress,
  size,
  wide = false,
}) {
  const sticker = resolveSticker(stickerById(id), controls);
  const width = wide ? size * 2 + gap : size;

  if (!sticker) {
    return (
      <View
        accessibilityLabel="Empty deck position"
        style={[styles.emptyTile, { height: size, width }]}
      >
        <Text style={styles.emptyTilePlus}>＋</Text>
        <Text style={styles.emptyTileLabel}>EMPTY</Text>
      </View>
    );
  }

  const tone = toneColor(sticker.tone);
  const fixed = FIXED_STICKERS.has(sticker.id);
  return (
    <Pressable
      accessibilityHint={editMode && !fixed ? 'Removes this sticker from the deck' : sticker.hint}
      accessibilityLabel={`${sticker.label} sticker`}
      accessibilityRole="button"
      onPress={() => onPress(sticker)}
      style={({ pressed }) => [
        styles.tile,
        {
          borderColor: pressed ? tone : colors.line,
          height: size,
          opacity: pressed ? 0.84 : 1,
          width,
        },
      ]}
    >
      <View style={[styles.icon, { backgroundColor: `${tone}1f` }]}>
        <Text style={[styles.symbol, { color: tone, fontSize: isTablet ? 22 : 18 }]}>
          {sticker.symbol}
        </Text>
      </View>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.72}
        numberOfLines={1}
        style={[styles.label, { fontSize: isTablet ? 13 : 10 }]}
      >
        {sticker.label}
      </Text>
      <Text numberOfLines={1} style={[styles.meta, { fontSize: isTablet ? 8 : 7 }]}>
        {sticker.controlLabel ?? (fixed ? 'FIXED' : editMode ? 'TAP TO REMOVE' : 'READY')}
      </Text>
      <View style={[styles.signal, { backgroundColor: tone }]} />
      {editMode && !fixed ? (
        <View style={styles.removeBadge}>
          <Text style={styles.removeBadgeText}>×</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderRadius: 11,
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 6,
    position: 'relative',
  },
  icon: {
    alignItems: 'center',
    borderRadius: 8,
    height: '38%',
    justifyContent: 'center',
    marginBottom: 4,
    minHeight: 25,
    width: '42%',
  },
  symbol: {
    fontWeight: '800',
  },
  label: {
    color: colors.ink,
    fontWeight: '800',
    maxWidth: '92%',
    textAlign: 'center',
  },
  meta: {
    color: colors.muted,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginTop: 2,
    maxWidth: '92%',
    textAlign: 'center',
  },
  signal: {
    borderRadius: 4,
    height: 5,
    position: 'absolute',
    right: 7,
    top: 7,
    width: 5,
  },
  removeBadge: {
    alignItems: 'center',
    backgroundColor: '#080f1ae6',
    borderColor: colors.rose,
    borderRadius: 8,
    borderWidth: 1,
    bottom: 5,
    height: 18,
    justifyContent: 'center',
    position: 'absolute',
    right: 5,
    width: 18,
  },
  removeBadgeText: {
    color: colors.rose,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 15,
  },
  emptyTile: {
    alignItems: 'center',
    backgroundColor: '#19273c7a',
    borderColor: '#53627a',
    borderRadius: 11,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
  },
  emptyTilePlus: {
    color: '#718096',
    fontSize: 20,
  },
  emptyTileLabel: {
    color: '#718096',
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 1,
  },
});

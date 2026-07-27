import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, toneColor } from '../theme';

export function LibraryTile({ disabled, isTablet, onPress, size, sticker }) {
  const tone = toneColor(sticker.tone);
  return (
    <Pressable
      accessibilityHint={disabled ? 'Already present on the deck' : 'Adds this sticker to the deck'}
      accessibilityLabel={`${sticker.label}${disabled ? ', already placed' : ''}`}
      accessibilityRole="button"
      disabled={disabled}
      onPress={() => onPress(sticker)}
      style={({ pressed }) => [
        styles.tile,
        {
          borderColor: disabled ? colors.line : `${tone}99`,
          height: size,
          opacity: disabled ? 0.32 : pressed ? 0.74 : 1,
          width: size,
        },
      ]}
    >
      <Text style={[styles.symbol, { color: tone, fontSize: isTablet ? 21 : 17 }]}>
        {sticker.symbol}
      </Text>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.68}
        numberOfLines={2}
        style={[styles.label, { fontSize: isTablet ? 11 : 9 }]}
      >
        {sticker.label}
      </Text>
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
    padding: 6,
  },
  symbol: {
    fontWeight: '800',
    marginBottom: 5,
  },
  label: {
    color: colors.ink,
    fontWeight: '700',
    textAlign: 'center',
  },
});

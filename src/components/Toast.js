import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function Toast({ message }) {
  if (!message) return null;

  return (
    <View pointerEvents="none" style={styles.toast}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    alignSelf: 'center',
    backgroundColor: '#202f45',
    borderColor: colors.lineBright,
    borderRadius: 10,
    borderWidth: 1,
    bottom: 24,
    maxWidth: 330,
    paddingHorizontal: 13,
    paddingVertical: 10,
    position: 'absolute',
  },
  text: {
    color: colors.ink,
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
});

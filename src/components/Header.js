import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, sharedStyles } from '../theme';

export function Header({
  editMode,
  isTablet,
  onConnection,
  onEdit,
}) {
  return (
    <View style={[styles.header, isTablet && styles.tabletHeader]}>
      <View>
        <Text style={sharedStyles.eyebrow}>AGENTLOOP STUDIO</Text>
        <Text style={[styles.title, { fontSize: isTablet ? 28 : 21 }]}>
          Agent control deck
        </Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.previewChip}>
          <View style={styles.previewDot} />
          <Text style={styles.actionText}>Preview</Text>
        </View>
        <Pressable
          accessibilityLabel="Connection"
          accessibilityRole="button"
          onPress={onConnection}
          style={({ pressed }) => [
            styles.connectionChip,
            pressed && sharedStyles.pressed,
          ]}
        >
          <Text style={styles.connectionIcon}>⌁</Text>
          <Text style={styles.actionText}>Connection</Text>
        </Pressable>
        <Pressable
          accessibilityLabel={editMode ? 'Finish editing' : 'Edit deck'}
          accessibilityRole="button"
          onPress={onEdit}
          style={({ pressed }) => [
            styles.editChip,
            editMode && styles.editChipActive,
            pressed && sharedStyles.pressed,
          ]}
        >
          <Text style={styles.actionText}>{editMode ? 'Done' : 'Edit'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'stretch',
    gap: 13,
    marginBottom: 14,
    width: '100%',
  },
  tabletHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.ink,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 3,
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  previewChip: {
    alignItems: 'center',
    backgroundColor: '#19273ceb',
    borderColor: colors.line,
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 7,
    minHeight: 36,
    paddingHorizontal: 10,
  },
  previewDot: {
    backgroundColor: colors.green,
    borderRadius: 5,
    height: 7,
    width: 7,
  },
  connectionChip: {
    alignItems: 'center',
    backgroundColor: '#19273ceb',
    borderColor: `${colors.cyan}88`,
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    minHeight: 36,
    paddingHorizontal: 10,
  },
  connectionIcon: {
    color: colors.cyan,
    fontSize: 17,
    fontWeight: '800',
  },
  editChip: {
    alignItems: 'center',
    backgroundColor: '#19273ceb',
    borderColor: colors.line,
    borderRadius: 9,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 36,
    paddingHorizontal: 12,
  },
  editChipActive: {
    backgroundColor: '#786cff26',
    borderColor: colors.violet,
  },
  actionText: {
    color: colors.ink,
    fontSize: 10,
    fontWeight: '700',
  },
});

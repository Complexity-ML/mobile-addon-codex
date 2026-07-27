import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, sharedStyles } from '../theme';

export function ConnectionModal({
  controls,
  onClose,
  onOpenPage,
  visible,
}) {
  const apiMode = controls.environment === 'API';
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <View style={styles.root}>
        <Pressable
          accessibilityLabel="Close connection dialog"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
        <View accessibilityViewIsModal style={styles.card}>
          <View style={styles.header}>
            <View>
              <Text style={sharedStyles.eyebrow}>CONNECTION</Text>
              <Text style={styles.title}>Web sign-in</Text>
            </View>
            <Pressable
              accessibilityLabel="Close connection details"
              accessibilityRole="button"
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && sharedStyles.pressed,
              ]}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          <View style={styles.connectionState}>
            <View style={styles.connectionDot} />
            <View style={styles.connectionCopy}>
              <Text style={styles.connectionTitle}>
                {apiMode ? 'OpenAI Platform' : 'ChatGPT account'}
              </Text>
              <Text style={styles.connectionSubtitle}>
                {apiMode
                  ? 'Create or manage an API key on the official web page.'
                  : 'Continue on the official ChatGPT web page. AgentLoop never receives your password.'}
              </Text>
            </View>
          </View>

          <View style={styles.detailList}>
            <Detail label="AGENT" value={controls.agent} />
            <Detail label="ENVIRONMENT" value={controls.environment} />
            <Detail label="REASONING" value={controls.reasoning} />
          </View>

          <Pressable
            accessibilityRole="link"
            onPress={onOpenPage}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && sharedStyles.pressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {apiMode ? 'Open API keys page' : 'Continue with ChatGPT'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function Detail({ label, value }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailKey}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#050b149e',
    flex: 1,
    justifyContent: 'center',
    padding: 18,
  },
  card: {
    backgroundColor: '#17253a',
    borderColor: colors.lineBright,
    borderRadius: 15,
    borderWidth: 1,
    maxWidth: 410,
    overflow: 'hidden',
    padding: 15,
    width: '100%',
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  title: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 3,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    height: 31,
    justifyContent: 'center',
    width: 31,
  },
  closeButtonText: {
    color: colors.ink,
    fontSize: 20,
    lineHeight: 22,
  },
  connectionState: {
    alignItems: 'center',
    backgroundColor: '#0e192ab8',
    borderColor: colors.line,
    borderRadius: 11,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 12,
  },
  connectionDot: {
    backgroundColor: colors.green,
    borderRadius: 6,
    height: 10,
    width: 10,
  },
  connectionCopy: {
    flex: 1,
  },
  connectionTitle: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '800',
  },
  connectionSubtitle: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 3,
  },
  detailList: {
    marginVertical: 12,
  },
  detailRow: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
  },
  detailKey: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  detailValue: {
    color: colors.ink,
    fontSize: 10,
    fontWeight: '800',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#28d7ce2b',
    borderColor: colors.cyan,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '800',
  },
});

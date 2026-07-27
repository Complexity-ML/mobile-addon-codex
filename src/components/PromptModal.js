import { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, sharedStyles } from '../theme';

export function PromptModal({ agent, onClose, onSubmit, visible }) {
  const [value, setValue] = useState('');
  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.root}>
        <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />
        <View style={styles.card}>
          <View style={styles.header}>
            <View>
              <Text style={sharedStyles.eyebrow}>PROMPT</Text>
              <Text style={styles.title}>Ask {agent}</Text>
            </View>
            <Pressable
              accessibilityLabel="Close prompt"
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
          <TextInput
            autoFocus
            multiline
            onChangeText={setValue}
            placeholder="Describe the next bounded UI task…"
            placeholderTextColor="#718096"
            style={styles.input}
            value={value}
          />
          <Pressable
            disabled={!value.trim()}
            onPress={() => {
              onSubmit(value.trim());
              setValue('');
            }}
            style={({ pressed }) => [
              styles.primaryButton,
              !value.trim() && styles.disabledButton,
              pressed && sharedStyles.pressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>Send prompt</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#050b149e',
    flex: 1,
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#17253a',
    borderColor: colors.lineBright,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 1,
    padding: 17,
    paddingBottom: Platform.OS === 'ios' ? 34 : 18,
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
  input: {
    backgroundColor: '#0e192ab8',
    borderColor: colors.line,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 13,
    marginBottom: 12,
    minHeight: 100,
    padding: 12,
    textAlignVertical: 'top',
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
  disabledButton: {
    opacity: 0.4,
  },
});

import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';

const THEMES = [
  {
    id: 'dark-blue',
    backgroundColor: '#00171F',
    fontColor: '#E8F1F2', // Light blue-white for contrast
  },
  {
    id: 'dark',
    backgroundColor: '#0A0A0A',
    fontColor: '#D4D4D4', // Soft white for dark theme
  },
  {
    id: 'sepia',
    backgroundColor: '#C2B280',
    fontColor: '#2C1810', // Dark brown for sepia
  },
  {
    id: 'light',
    backgroundColor: '#F5F5F5',
    fontColor: '#1A1A1A', // Near black for light theme
  },
];

const ThemeSettingsModal = ({
  visible,
  onClose,
  currentTheme,
  onThemeChange,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          {THEMES.map(theme => (
            <TouchableOpacity
              key={theme.id}
              style={[
                styles.themeOption,
                {backgroundColor: theme.backgroundColor},
                currentTheme.backgroundColor === theme.backgroundColor &&
                  styles.selectedTheme,
              ]}
              onPress={() => onThemeChange(theme)}>
              <View
                style={[
                  styles.themePreview,
                  {
                    backgroundColor: theme.backgroundColor,
                    borderColor:
                      currentTheme.backgroundColor === theme.backgroundColor
                        ? '#EB5E28'
                        : theme.backgroundColor,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ababab',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 16,
  },
  themeOption: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  themePreview: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 30,
  },
  selectedTheme: {
    borderWidth: 2,
    borderColor: '#EB5E28',
  },
});

export default ThemeSettingsModal;

import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

const FONT_FAMILIES = [
  'Poppins-Regular',
  'Roboto-Regular',
  'OpenSans-Regular',
  'SpaceMono-Regular',
];

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;

const FontSettingsModal = ({
  visible,
  onClose,
  currentFontSize,
  onFontSizeChange,
  currentFontFamily,
  onFontFamilyChange,
}) => {
  const handleIncreaseFontSize = () => {
    if (currentFontSize < MAX_FONT_SIZE) {
      onFontSizeChange(currentFontSize + 2);
    }
  };

  const handleDecreaseFontSize = () => {
    if (currentFontSize > MIN_FONT_SIZE) {
      onFontSizeChange(currentFontSize - 2);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          {/* Font Size Controls */}
          <View style={styles.fontSizeControls}>
            <TouchableOpacity
              style={styles.fontSizeButton}
              onPress={handleDecreaseFontSize}>
              <Text style={styles.fontSizeButtonText}>Aa-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fontSizeButton}
              onPress={handleIncreaseFontSize}>
              <Text style={styles.fontSizeButtonText}>Aa+</Text>
            </TouchableOpacity>
          </View>

          {/* Font Family Selection */}
          <View style={styles.fontFamilyContainer}>
            {FONT_FAMILIES.map(font => (
              <TouchableOpacity
                key={font}
                style={[
                  styles.fontFamilyButton,
                  currentFontFamily === font && styles.selectedFontFamily,
                ]}
                onPress={() => onFontFamilyChange(font)}>
                <Text
                  style={[
                    styles.fontFamilyText,
                    {fontFamily: font},
                    currentFontFamily === font && styles.selectedFontFamilyText,
                  ]}>
                  {font.replace('-Regular', '')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
    backgroundColor: '#001219',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  fontSizeControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  fontSizeButton: {
    backgroundColor: '#EB5E28',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  fontSizeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  fontFamilyContainer: {
    gap: 15,
  },
  fontFamilyButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  selectedFontFamily: {
    backgroundColor: 'rgba(235, 94, 40, 0.1)',
  },
  fontFamilyText: {
    fontSize: 16,
    color: '#f8f8f8',
    textAlign: 'center',
  },
  selectedFontFamilyText: {
    color: '#EB5E28',
  },
});

export default FontSettingsModal;

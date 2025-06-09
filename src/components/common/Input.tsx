import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { colors } from '@/theme';

interface InputProps extends TextInputProps {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
  },
});

export default Input; 
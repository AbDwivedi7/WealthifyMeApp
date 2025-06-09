import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

interface InputProps extends TextInputProps {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, ...props }) => {
  return (
    <TextInput
      style={styles.input}
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
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Input; 
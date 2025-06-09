import React from 'react';
import { Button as RNButton, ButtonProps as RNButtonProps, StyleSheet } from 'react-native';



interface ButtonProps extends RNButtonProps {
  title: string;
}

console.log('Button loaded');

const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
  return <RNButton title={title} {...props} />;
};

export default Button; 
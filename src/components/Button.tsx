import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { PRIMARY_COLOR } from '../contants/Colors';

export default function MyButton({
  text,
  style,
  onPress,
  ...props
}: {
  text: String;
  style?: { wrap: {}; text: {} } | undefined;
  onPress: () => void;
}) {
  const styles = StyleSheet.create({
    wrap: {
      backgroundColor: PRIMARY_COLOR,
      borderRadius: 100,
      justifyContent: 'center',
      padding: 10,
      ...style?.wrap,
    },

    text: {
      color: 'white',
      fontWeight: '500',
      textAlign: 'center',
      fontSize: 14,
      ...style?.text,
    },
  });

  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress} {...props}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

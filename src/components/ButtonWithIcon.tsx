import { Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY_COLOR } from '../contants/Colors';

export default function MyButtonWithIcon({
  text,
  style,
  name,
  onPress,
  ...props
}: {
  text: string;
  name: string;
  style?: { wrap: {}; text: {} } | undefined;
  onPress: () => void;
}) {
  const styles = StyleSheet.create({
    wrap: {
      justifyContent: 'center',
      padding: 10,
      ...style?.wrap,
    },

    text: {
      color: 'white',
      fontWeight: '500',
      textAlign: 'center',
      fontSize: 12,
      ...style?.text,
    },
  });

  return (
    <Icon.Button name={name} style={styles.wrap} onPress={onPress} {...props}>
      <Text style={styles.text}>{text}</Text>
    </Icon.Button>
  );
}

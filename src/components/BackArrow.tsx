import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

export default function BackArrow({ navigation, ...props }) {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity {...props} onPress={goBack}>
      <Icon name="left" style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 14,
  },
});

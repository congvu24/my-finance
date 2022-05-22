import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { WHITE_COLOR } from '../contants/Colors';

export default function BackArrow({ ...props }) {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity {...props} onPress={goBack} style={{ padding: 2}}>
      <Icon name="left" style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 18,
    color: WHITE_COLOR,
  },
});

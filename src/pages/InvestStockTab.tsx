import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_COLOR } from '../contants/Colors';

export default function InvestTabStock() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrap}>
      <Text style={styles.comingText}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  comingText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

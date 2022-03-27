import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import {
  BLUE_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  SECONDARY_BG_COLOR,
  SECONDARY_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from '../contants/Colors';

export default function HomeShortcut() {
  const navigation = useNavigation();

  const goToMoneySource = () => {
    navigation.navigate('MoneySource');
  };

  return (
    <View style={styles.shortcut}>
      <View style={styles.shortcutBtn}>
        <View style={styles.shortcutIcon}>
          <AntdIcon
            name="profile"
            style={{ fontSize: 18, color: GREEN_COLOR }}
          />
        </View>
        <Text style={styles.shortcutText}>Spending</Text>
      </View>
      <View style={styles.shortcutBtn}>
        <View style={styles.shortcutIcon}>
          <AntdIcon
            name="linechart"
            style={{ fontSize: 18, color: YELLOW_COLOR }}
          />
        </View>
        <Text style={styles.shortcutText}>Invest</Text>
      </View>
      <TouchableOpacity style={styles.shortcutBtn} onPress={goToMoneySource}>
        <View style={styles.shortcutIcon}>
          <AntdIcon name="wallet" style={{ fontSize: 18, color: RED_COLOR }} />
        </View>
        <Text style={styles.shortcutText}>Wallet</Text>
      </TouchableOpacity>
      <View style={styles.shortcutBtn}>
        <View style={styles.shortcutIcon}>
          <AntdIcon
            name="appstore-o"
            style={{ fontSize: 18, color: BLUE_COLOR }}
          />
        </View>
        <Text style={styles.shortcutText}>Others</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shortcut: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  shortcutBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortcutIcon: {
    backgroundColor: SECONDARY_BG_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  shortcutText: {
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
    color: WHITE_COLOR,
  },
});

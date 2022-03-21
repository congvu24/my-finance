import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { SECONDARY_COLOR } from '../contants/Colors';

export default function HomeShortcut() {
  return (
    <View style={styles.shortcut}>
      <View style={styles.shortcutBtn}>
        <View style={styles.shortcutIcon}>
          <AntdIcon name="profile" style={{ fontSize: 18 }} />
        </View>
        <Text style={styles.shortcutText}>Chi tiêu</Text>
      </View>
      <View style={styles.shortcutBtn}>
        <View style={styles.shortcutIcon}>
          <AntdIcon name="linechart" style={{ fontSize: 18 }} />
        </View>
        <Text style={styles.shortcutText}>Đầu tư</Text>
      </View>
      <View style={styles.shortcutBtn}>
        <View style={styles.shortcutIcon}>
          <AntdIcon name="wallet" style={{ fontSize: 18 }} />
        </View>
        <Text style={styles.shortcutText}>Nguồn tiền</Text>
      </View>
      <View style={styles.shortcutBtn}>
        <View style={styles.shortcutIcon}>
          <AntdIcon name="appstore-o" style={{ fontSize: 18 }} />
        </View>
        <Text style={styles.shortcutText}>Khác</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shortcut: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shortcutBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortcutIcon: {
    backgroundColor: SECONDARY_COLOR,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  shortcutText: {
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
  },
});

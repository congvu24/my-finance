import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { LOGO } from '../contants/Images';
import { PRIMARY_COLOR } from '../contants/Colors';
import HomeShortList from '../components/HomeShortList';
import HomeOverview from '../components/HomeOverview';
import HomeShortcut from '../components/HomeShortcut';

export default function HomeTab() {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <View>
          <Icon name="text" style={styles.drawerBtn} />
        </View>
        <View style={styles.avatarWrap}>
          <Image source={LOGO} style={styles.avatar} />
        </View>
      </View>
      <HomeOverview />
      <HomeShortcut />
      <View style={styles.history}>
        <Text style={styles.historyText}>Lịch sử chi tiêu</Text>
        <TouchableOpacity>
          <Text style={styles.historyAll}>Tất cả</Text>
        </TouchableOpacity>
      </View>
      <HomeShortList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  drawerBtn: { fontSize: 20 },
  avatarWrap: {
    width: 40,
    height: 40,
  },
  avatar: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
  },
  history: {
    // marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyText: {
    fontWeight: '600',
    fontSize: 14,
    color: 'black',
  },
  historyAll: {
    fontSize: 13,
    fontWeight: '500',
    color: PRIMARY_COLOR,
  },
});

import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InvestTabGold from './InvestGoldTab';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  WHITE_COLOR,
  GREEN_COLOR,
  SECONDARY_BG_COLOR,
  BACKGROUND_COLOR,
} from '../contants/Colors';
import InvestTabCoin from './InvestCoinTab';

const Tab = createBottomTabNavigator();

export default function InvestTab() {
  const [tab, setTab] = useState('gold');

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.tab}>
        <TouchableOpacity
          style={tab === 'gold' ? styles.tabActive : styles.tabItem}
          onPress={() => setTab('gold')}>
          <Text style={tab === 'gold' ? styles.tabTextActive : styles.tabText}>
            Gold
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tab === 'stock' ? styles.tabActive : styles.tabItem}
          onPress={() => setTab('stock')}>
          <Text style={tab === 'stock' ? styles.tabTextActive : styles.tabText}>
            Stock
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tab === 'coin' ? styles.tabActive : styles.tabItem}
          onPress={() => setTab('coin')}>
          <Text style={tab === 'coin' ? styles.tabTextActive : styles.tabText}>
            Crypto
          </Text>
        </TouchableOpacity>
      </View>
      {tab === 'gold' && <InvestTabGold />}
      {tab === 'coin' && <InvestTabCoin />}
      {tab === 'stock' && <InvestTabGold />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: WHITE_COLOR,
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: GREEN_COLOR,
    backgroundColor: SECONDARY_BG_COLOR,
  },
  tabTextActive: {
    fontSize: 13,
    fontWeight: '600',
    color: WHITE_COLOR,
  },
  wrap: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
});

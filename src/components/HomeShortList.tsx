import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { LOGO } from '../contants/Images';
import {
  GREEN_COLOR,
  PRIMARY_COLOR,
  RED_COLOR,
  SECONDARY_BG_COLOR,
  SECONDARY_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';

export default function HomeShortList() {
  return (
    <View style={styles.shortList}>
      <View style={styles.itemWrap}>
        <View style={styles.itemAvatar}>
          <Image source={LOGO} style={styles.itemAvatarImg} />
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemTitle}>Chuyển tiền</Text>
          <Text style={styles.itemTime}>17 May 03:20pm</Text>
        </View>
        <View>
          <Text style={styles.itemMoney}>+ 100$</Text>
        </View>
      </View>
      <View style={styles.itemWrap}>
        <View style={styles.itemAvatar}>
          <Image source={LOGO} style={styles.itemAvatarImg} />
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemTitle}>Chuyển tiền</Text>
          <Text style={styles.itemTime}>17 May 03:20pm</Text>
        </View>
        <View>
          <Text style={styles.itemMoneyRed}>+ $100</Text>
        </View>
      </View>
      <View style={styles.itemWrap}>
        <View style={styles.itemAvatar}>
          <Image source={LOGO} style={styles.itemAvatarImg} />
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemTitle}>Chuyển tiền</Text>
          <Text style={styles.itemTime}>17 May 03:20pm</Text>
        </View>
        <View>
          <Text style={styles.itemMoneyRed}>- $100</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shortList: {},
  itemWrap: {
    flexDirection: 'row',
    height: 70,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: SECONDARY_BG_COLOR,
  },
  itemAvatar: {
    width: 50,
    height: '100%',
    marginRight: 10,
  },
  itemAvatarImg: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  itemBody: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-start',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: WHITE_COLOR,
  },
  itemTime: {
    fontSize: 12,
    fontWeight: '500',
    color: WHITE_COLOR,
    opacity: 0.5,
    marginTop: 5,
  },
  itemMoney: {
    width: 100,
    fontSize: 14,
    fontWeight: '500',
    color: GREEN_COLOR,
    textAlign: 'right',
  },
  itemMoneyRed: {
    width: 100,
    fontSize: 14,
    fontWeight: '500',
    color: RED_COLOR,
    textAlign: 'right',
  },
});

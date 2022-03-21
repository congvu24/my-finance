import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { LOGO } from '../contants/Images';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../contants/Colors';

export default function HomeShortList() {
  return (
    <View style={styles.shortList}>
      <View style={styles.itemWrap}>
        <View style={styles.itemAvatar}>
          <Image source={LOGO} style={styles.itemAvatarImg} />
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemTitle}>Chuyển tiền</Text>
          <Text style={styles.itemTime}>17:00 thứ 2, 20/11/2021</Text>
        </View>
        <View>
          <Text style={styles.itemMoney}>+100.000 VND</Text>
        </View>
      </View>
      <View style={styles.itemWrap}>
        <View style={styles.itemAvatar}>
          <Image source={LOGO} style={styles.itemAvatarImg} />
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemTitle}>Chuyển tiền</Text>
          <Text style={styles.itemTime}>17:00 thứ 2, 20/11/2021</Text>
        </View>
        <View>
          <Text style={styles.itemMoneyRed}>-100.000 VND</Text>
        </View>
      </View>
      <View style={styles.itemWrap}>
        <View style={styles.itemAvatar}>
          <Image source={LOGO} style={styles.itemAvatarImg} />
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemTitle}>Chuyển tiền</Text>
          <Text style={styles.itemTime}>17:00 thứ 2, 20/11/2021</Text>
        </View>
        <View>
          <Text style={styles.itemMoneyRed}>-100.000 VND</Text>
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
    backgroundColor: SECONDARY_COLOR,
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
    color: 'black',
  },
  itemTime: {
    fontSize: 12,
    fontWeight: '400',
  },
  itemMoney: {
    width: 100,
    fontSize: 14,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  itemMoneyRed: {
    width: 100,
    fontSize: 14,
    fontWeight: '600',
    color: 'red',
  },
});

import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import {
  ADD_MONEY_ICO,
  EXCHANGE_MONEY_ICO,
  WITHDRAW_MONEY_ICO,
} from '../contants/Images';
import {
  BLUE_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  SECONDARY_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { Transaction } from '../models/Transaction';
import formatMoney from '../utils/formatMoney';
import { getTransactions } from '../redux/reducer/transaction';

export default function HomeShortList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  const transaction = useSelector<RootState>(
    state => state.transaction.transaction,
  ) as Transaction[];

  return (
    <View style={styles.shortList}>
      {transaction.slice(0, 4).map(item => (
        <View style={styles.itemWrap} key={item.category + item.note}>
          <View style={styles.itemAvatar}>
            <Image
              source={
                item.type == -1
                  ? WITHDRAW_MONEY_ICO
                  : item.type == 1
                  ? ADD_MONEY_ICO
                  : EXCHANGE_MONEY_ICO
              }
              style={styles.itemAvatarImg}
            />
          </View>
          <View style={styles.itemBody}>
            <Text style={styles.itemTitle}>{item.note}</Text>
            <Text style={styles.itemTime}>
              {new Date(parseInt(item.date)).toLocaleString()}
            </Text>
          </View>
          <View>
            <Text
              style={{
                ...styles.itemMoney,
                color:
                  item.type === 1
                    ? GREEN_COLOR
                    : item.type === -1
                    ? RED_COLOR
                    : BLUE_COLOR,
              }}>
              {formatMoney(item.amount)}
            </Text>
          </View>
        </View>
      ))}
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
    fontSize: 14,
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

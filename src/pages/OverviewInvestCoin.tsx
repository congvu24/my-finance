import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import {
  BACKGROUND_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  SECONDARY_BG_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from '../contants/Colors';
import BackArrow from '../components/BackArrow';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import formatMoney from '../utils/formatMoney';
import MyButton from '../components/Button';

export default function OverviewInvestCoin() {
  const transaction = useSelector<RootState>(
    state => state.coin.transaction,
  ) as [];

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <BackArrow />
        <Text style={styles.headerText}>Trade history</Text>
      </View>
      <ScrollView style={styles.list}>
        {transaction.map(item => (
          <View style={styles.item} key={item.id}>
            <View style={styles.itemHeader}>
              <View style={styles.itemName}>
                <Text style={styles.itemNameText}>{item.code}</Text>
                <Text
                  style={
                    item.type > 0 ? styles.itemTypeText : styles.itemTypeTextRed
                  }>
                  {item.type < 0 ? 'Sell' : 'Buy'}
                </Text>
              </View>
              <Text style={styles.itemDateText}>
                {new Date(parseInt(item.date)).toLocaleString()}
              </Text>
            </View>
            <View style={styles.itemBody}>
              <View style={styles.itemBodyBlock}>
                <Text style={styles.itemBodyText}>
                  {formatMoney(item.price)}
                </Text>
                <Text style={styles.itemBodyTitle}>Price</Text>
              </View>
              <View style={styles.itemBodyBlock}>
                <Text style={styles.itemBodyText}>{item.amount}</Text>
                <Text style={styles.itemBodyTitle}>Amount</Text>
              </View>
            </View>
            <View style={styles.itemFooter}>
              <Text style={styles.itemBodyTitle}>Note</Text>
              <Text style={styles.itemBodyTitle}>{item.note}</Text>
            </View>
            <View style={styles.itemFooter}>
              <Text style={styles.itemBodyTitle}>Total</Text>
              <Text style={styles.itemBodyTitle}>
                {formatMoney(item.amount * item.price)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: SECONDARY_BG_COLOR,
    marginVertical: 10,
    borderRadius: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  itemNameText: {
    color: YELLOW_COLOR,
    fontSize: 16,
    fontWeight: '500',
  },
  itemTypeText: {
    color: GREEN_COLOR,
    marginLeft: 10,
    fontSize: 14,
  },
  itemTypeTextRed: {
    color: RED_COLOR,
    marginLeft: 10,
    fontSize: 14,
  },
  itemDateText: {
    color: WHITE_COLOR,
    opacity: 0.8,
    fontSize: 14,
    fontWeight: '500',
  },
  itemBody: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  itemBodyBlock: {
    alignItems: 'center',
  },
  itemBodyText: {
    color: WHITE_COLOR,
    fontSize: 18,
    fontWeight: '600',
  },
  itemBodyTitle: {
    color: WHITE_COLOR,
    opacity: 0.6,
    fontSize: 14,
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    marginTop: 10,
  },
  wrap: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: WHITE_COLOR,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
  },
});

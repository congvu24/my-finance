import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
  GREEN_COLOR,
  RED_COLOR,
} from '../contants/Colors';
import formatMoney from '../utils/formatMoney';

export default function SpendingGroup({ group, keyName }) {
  const [sumOut, setSumOut] = useState<number>(0);
  const [sumIn, setSumIn] = useState<number>(0);

  useEffect(() => {
    let sum1 = 0;
    let sum2 = 0;

    group.map(item => {
      if (item.type > 0) {
        sum1 = sum1 + item.amount;
      } else if (item.type < 0) {
        sum2 = sum2 + item.amount;
      }
    });
    setSumIn(sum1);
    setSumOut(sum2);
  }, [group]);

  return (
    <View style={styles.record}>
      <View style={styles.recordHeader}>
        <View style={styles.recordDate}>
          <Text style={styles.recordTextDate}>{keyName}</Text>
        </View>
        <View style={styles.recordCol}>
          <Text style={styles.recordIn}>{formatMoney(sumIn)}</Text>
        </View>
        <View style={styles.recordCol}>
          <Text style={styles.recordOut}>{formatMoney(sumOut)}</Text>
        </View>
      </View>
      <View style={styles.recordBody}>
        {group.map(item => (
          <View style={styles.recordItem} key={item.id}>
            <View style={styles.itemFirst}>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
            <View style={styles.itemSecond}>
              <Text style={styles.itemTitle}>{item.note}</Text>
              <Text style={styles.itemSource}>{item.source}</Text>
            </View>
            <View style={styles.itemLast}>
              {item.type == -1 && (
                <Text style={styles.itemOut}>{formatMoney(item.amount)}</Text>
              )}
              {item.type == 1 && (
                <Text style={styles.itemIn}>{formatMoney(item.amount)}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  record: {
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: SECONDARY_BG_COLOR,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: THIRD_BG_COLOR,
  },
  recordDate: {
    flex: 3,
  },
  recordTextDate: {
    fontSize: 14,
    fontWeight: '600',
    color: WHITE_COLOR,
    opacity: 0.8,
  },
  recordCol: {
    flex: 2,
    alignItems: 'flex-end',
  },
  recordIn: {
    fontSize: 15,
    color: GREEN_COLOR,
    fontWeight: '500',
  },
  recordOut: {
    fontSize: 15,
    color: 'red',
    fontWeight: '500',
  },
  recordBody: {
    paddingHorizontal: 10,
    backgroundColor: SECONDARY_BG_COLOR,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemFirst: {
    flex: 1,
  },
  itemCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: WHITE_COLOR,
  },
  itemSecond: { flex: 2 },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: WHITE_COLOR,
  },
  itemSource: {
    fontSize: 14,
    fontWeight: '400',
    color: WHITE_COLOR,
    opacity: 0.7,
  },
  itemLast: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemOut: {
    fontSize: 15,
    color: RED_COLOR,
    fontWeight: '500',
  },
  itemIn: {
    fontSize: 15,
    color: GREEN_COLOR,
    fontWeight: '500',
  },
});

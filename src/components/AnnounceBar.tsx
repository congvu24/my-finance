import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { THIRD_BG_COLOR, YELLOW_COLOR, WHITE_COLOR } from '../contants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { Transaction } from '../models/Transaction';
import _ from 'lodash';
import { SettingSpending } from '../types/setting';
import { getCategory } from '../redux/reducer/feature';
import { getSettingAction } from '../redux/reducer/settingSpending';
import { getTransactions } from '../redux/reducer/transaction';

export default function AnnounceBar() {
  const dispatch = useDispatch();
  const transaction = useSelector<RootState>(
    state => state.transaction.transaction,
  ) as Transaction[];
  const setting = useSelector<RootState>(
    state => state.setting.setting,
  ) as SettingSpending[];

  const [activeMessage, setActiveMessage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getSettingAction());
  }, []);

  useEffect(() => {
    const thisMonthTrans = transaction.filter(item => {
      const date = new Date(parseInt(item.date));
      const now = new Date();

      return (
        item.type < 0 &&
        date.getMonth() == now.getMonth() &&
        now.getFullYear() == date.getFullYear()
      );
    });

    const groupByCategory = _.groupBy(thisMonthTrans, item => item.category);
    // console.log(groupByCategory);

    let listMessage = [
      'Crypto market is extremely down.',
      'DJI is going to bear market.',
    ];
    Object.keys(groupByCategory).forEach(key => {
      let category = setting.find(item => item.categoryName == key);
      let sum = groupByCategory[key].reduce(
        (current, item) => current + item.amount,
        0,
      );

      if (
        category != undefined &&
        sum > parseInt(category.limit) &&
        parseInt(category.limit) > 0
      ) {
        console.log('haha', category, sum);
        listMessage.push(`You have reached the limit spending for ${key}.`);
      }
    });

    setData(listMessage);
  }, [transaction]);

  let timeoutId = null;

  useEffect(() => {
    if (data.length > 0) {
      timeoutId = setTimeout(() => {
        setActiveMessage((activeMessage + 1) % data.length);
      }, 5000);

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [activeMessage, data.length]);

  if (data.length > 0) {
    return (
      <View style={styles.announceWrap}>
        <Text style={styles.announceMessage}>{data[activeMessage]}</Text>
        <Icon name="notification" style={styles.announceIcon} />
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  announceWrap: {
    backgroundColor: THIRD_BG_COLOR,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  announceIcon: {
    color: YELLOW_COLOR,
    fontSize: 18,
    marginLeft: 'auto',
  },
  announceMessage: {
    color: WHITE_COLOR,
    fontWeight: '500',
  },
});

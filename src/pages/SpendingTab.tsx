import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import {
  BACKGROUND_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  SECONDARY_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../redux/reducer/transaction';
import { RootState } from '../redux';
import _ from 'lodash';
import SpendingGroup from '../components/SpendingGroup';
import { Transaction } from '../models/Transaction';
import formatMoney from '../utils/formatMoney';
import MonthSelection from '../components/MonthSelection';

const tabs = [
  {
    name: 'Daily',
    key: 'daily',
  },
  {
    name: 'Weekly',
    key: 'weekly',
  },
  {
    name: 'Monthly',
    key: 'monthly',
  },
];

export default function SpendingTab({ navigation }) {
  const dispatch = useDispatch();

  const [sumIn, setSumIn] = useState(0);
  const [sumOut, setSumOut] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [tab, setTab] = useState('daily');

  const data = useSelector<RootState>(
    state => state.transaction.transaction,
  ) as Transaction[];

  const goToAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  const goToOverviewSpending = () => {
    navigation.navigate('OverviewSpending');
  };

  const onMonthSelect = (selectedMonth, selectedYear) => {
    setMonth(selectedMonth);
    setYear(selectedYear);
  };

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  const groups = _.groupBy(
    data.filter(item => {
      const date = new Date(parseInt(item.date));
      return date.getMonth() === month && date.getFullYear() === year;
    }),
    item => {
      const date = new Date(parseInt(item.date));

      if (tab === 'monthly') {
        return date.getMonth() + 1 + '.' + date.getFullYear();
      } else if (tab === 'daily') {
        return date.toLocaleDateString();
      } else if (tab === 'weekly') {
        var firstday = new Date(date.setDate(date.getDate() - date.getDay()));
        var lastday = new Date(
          date.setDate(date.getDate() - date.getDay() + 6),
        );

        return (
          firstday.getDate() +
          '.' +
          (firstday.getMonth() + 1) +
          ' ~ ' +
          lastday.getDate() +
          '.' +
          (lastday.getMonth() + 1)
        );
      }
    },
  );

  useEffect(() => {
    let sum1 = 0;
    let sum2 = 0;

    data.forEach(item => {
      if (item.type > 0) {
        sum1 = sum1 + item.amount;
      } else if (item.type < 0) {
        sum2 = sum2 + item.amount;
      }
    });
    setSumOut(sum2);
    setSumIn(sum1);
  }, [data]);

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <MonthSelection onMonthSelect={onMonthSelect} />
        <View style={styles.headerTool}>
          <TouchableOpacity>
            <AntdIcon name="staro" style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntdIcon name="search1" style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntdIcon name="setting" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tab}>
        {tabs.map(item => (
          <TouchableOpacity
            style={item.key === tab ? styles.tabActive : styles.tabItem}
            key={item.key}
            onPress={() => setTab(item.key)}>
            <Text
              style={item.key === tab ? styles.tabTextActive : styles.tabText}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.type}>
        <View style={styles.typeCol}>
          <Text style={styles.typeText}>Income</Text>
          <Text style={styles.typeIncome}>{formatMoney(sumIn)}</Text>
        </View>
        <View style={styles.typeCol}>
          <Text style={styles.typeText}>Outcome</Text>
          <Text style={styles.typeOutcome}>{formatMoney(sumOut)}</Text>
        </View>
        <View style={styles.typeCol}>
          <Text style={styles.typeText}>Total</Text>
          <Text style={styles.typeSum}>{formatMoney(sumIn - sumOut)}</Text>
        </View>
      </View>

      {Object.keys(groups).length === 0 && (
        <View style={{ marginTop: 30, marginHorizontal: 'auto' }}>
          <Text
            style={{ color: WHITE_COLOR, fontSize: 11, textAlign: 'center' }}>
            There is no transaction in this time.
          </Text>
        </View>
      )}
      <ScrollView>
        {Object.keys(groups).map(key => (
          <SpendingGroup group={groups[key]} keyName={key} key={key} />
        ))}
      </ScrollView>

      <View style={styles.float}>
        <TouchableOpacity
          style={styles.floatBtnSmall}
          onPress={goToOverviewSpending}>
          <AntdIcon name="piechart" style={styles.floatIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatBtn} onPress={goToAddTransaction}>
          <AntdIcon name="plus" style={styles.floatIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  float: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  floatBtn: {
    width: 50,
    height: 50,
    backgroundColor: GREEN_COLOR,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
    marginLeft: 10,
  },
  floatBtnSmall: {
    width: 40,
    height: 40,
    backgroundColor: BLUE_COLOR,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
    marginLeft: 10,
    marginBottom: 2,
  },
  floatIcon: {
    fontSize: 20,
    color: 'white',
  },

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
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: WHITE_COLOR,
    opacity: 0.5,
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
    fontSize: 15,
    fontWeight: '600',
    color: WHITE_COLOR,
  },
  wrap: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 40,
    position: 'relative',
  },
  headerIcon: {
    fontSize: 16,
    fontWeight: '700',
    color: WHITE_COLOR,
  },
  headerMonth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    alignItems: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500',
    color: WHITE_COLOR,
    marginHorizontal: 5,
  },
  headerTool: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
    height: '100%',
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  typeCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: WHITE_COLOR,
  },
  typeIncome: {
    fontSize: 15,
    fontWeight: '600',
    color: GREEN_COLOR,
  },
  typeOutcome: {
    fontSize: 15,
    fontWeight: '600',
    color: RED_COLOR,
  },
  typeSum: {
    fontSize: 15,
    fontWeight: '600',
    color: BLUE_COLOR,
  },
});

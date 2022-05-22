import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackArrow from '../components/BackArrow';
import { VictoryLabel, VictoryPie } from 'victory-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  BACKGROUND_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from '../contants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import _ from 'lodash';
import { Transaction } from '../models/Transaction';
import formatMoney from '../utils/formatMoney';
import MonthSelection from '../components/MonthSelection';

export default function OverviewSpending({ navigation }) {
  const data = useSelector<RootState>(
    state => state.transaction.transaction,
  ) as Transaction[];
  const [chartData, setChartData] = useState<
    {
      x: string;
      y: number;
      sum: number;
      label: string;
    }[]
  >([]);
  const [type, setType] = useState(1);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const onMonthSelect = (selectedMonth, selectedYear) => {
    setMonth(selectedMonth);
    setYear(selectedYear);
  };

  useEffect(() => {
    if (data) {
      const dataFilter = data.filter(
        item =>
          item.type === type &&
          new Date(parseInt(item.date)).getMonth() === month &&
          new Date(parseInt(item.date)).getFullYear() === year,
      );
      let groups = _.groupBy(dataFilter, 'category');
      let sumAll = 0;
      dataFilter.forEach(item => (sumAll += item.amount));
      let result = Object.keys(groups).map(key => {
        let sum = 0;
        groups[key].forEach(item => {
          sum = sum + item.amount;
        });

        return {
          x: key,
          y: (sum / sumAll) * 100,
          sum: sum,
          label: key,
        };
      });
      setChartData(result);
    }
  }, [data, type, month, year]);

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <BackArrow />
        <Text style={styles.typeText}>Overview</Text>
        {/* <TouchableOpacity style={styles.rangeBtn}>
          <Text style={styles.rangeBtnText}>Monthly</Text>
          <Icon style={styles.rangeBtnText} name="down" />
        </TouchableOpacity> */}
      </View>

      <View style={styles.tab}>
        <TouchableOpacity
          style={type === 1 ? styles.tabActive : styles.tabItem}
          onPress={() => setType(1)}>
          <Text style={type === 1 ? styles.tabTextActive : styles.tabText}>
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={type === -1 ? styles.tabActive : styles.tabItem}
          onPress={() => setType(-1)}>
          <Text style={type === -1 ? styles.tabTextActive : styles.tabText}>
            Outcome
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.headerMonth}>
          <MonthSelection onMonthSelect={onMonthSelect} />
        </View>
        {chartData.length > 0 && (
          <VictoryPie
            width={300}
            // padding={{ top: 20, bottom: 20, right: 20, left: 20 }}
            style={{
              parent: {
                width: '100%',
                height: 'auto',
                overflow: 'visible',
              },
            }}
            colorScale={[RED_COLOR, GREEN_COLOR, YELLOW_COLOR, BLUE_COLOR]}
            labelComponent={
              <VictoryLabel style={[{ fill: WHITE_COLOR, fontSize: 11 }]} />
            }
            data={chartData}
          />
        )}
        {chartData.length === 0 && (
          <View style={{ marginTop: 30 }}>
            <Text
              style={{ color: WHITE_COLOR, fontSize: 11, textAlign: 'center' }}>
              There is no transaction in this time.
            </Text>
          </View>
        )}
      </View>
      {chartData.length > 0 && (
        <ScrollView style={styles.list}>
          {chartData
            .sort((a, b) => b.y - a.y)
            .map(item => (
              <View style={styles.item} key={item.label}>
                <Text style={styles.itemTag}>
                  {parseFloat(item.y).toFixed(2)}%
                </Text>
                <Text style={styles.itemName}>{item.label}</Text>
                <Text style={styles.itemValue}>{formatMoney(item.sum)}</Text>
              </View>
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerMonth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    alignItems: 'center',
    marginRight: 'auto',
    marginTop: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500',
    color: WHITE_COLOR,
    marginHorizontal: 5,
  },

  rangeBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  rangeBtnText: {
    fontSize: 11,
    color: WHITE_COLOR,
    fontWeight: '500',
  },

  list: {
    padding: 4,
    backgroundColor: SECONDARY_BG_COLOR,
    borderRadius: 5,
  },

  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginBottom: 15,
    borderBottomColor: THIRD_BG_COLOR,
  },
  itemTag: {
    backgroundColor: GREEN_COLOR,
    paddingHorizontal: 4,
    fontSize: 11,
    borderRadius: 4,
    textAlign: 'center',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 20,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 5,
    color: WHITE_COLOR,
  },
  itemValue: {
    marginLeft: 'auto',
    fontSize: 15,
    fontWeight: '500',
    color: WHITE_COLOR,
    opacity: 0.8,
  },
  wrap: {
    padding: 10,
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    marginLeft: 10,
    color: WHITE_COLOR,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    marginTop: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
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
    // backgroundColor: SECONDARY_COLOR,
  },
  tabTextActive: {
    fontSize: 15,
    fontWeight: '600',
    color: WHITE_COLOR,
  },
});

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { SECONDARY_COLOR } from '../contants/Colors';

export default function SpendingTab({ navigation }) {
  const goToAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  const goToOverviewSpending = () => {
    navigation.navigate('OverviewSpending');
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <View style={styles.headerMonth}>
          <TouchableOpacity>
            <AntdIcon
              name="left"
              style={{ ...styles.headerIcon, fontSize: 12 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerText}>tháng 3 2022</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <AntdIcon
              name="right"
              style={{ ...styles.headerIcon, fontSize: 12 }}
            />
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>Tháng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Ngày</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Tuần</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Năm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.type}>
        <View style={styles.typeCol}>
          <Text style={styles.typeText}>Thu</Text>
          <Text style={styles.typeIncome}>0</Text>
        </View>
        <View style={styles.typeCol}>
          <Text style={styles.typeText}>Chi</Text>
          <Text style={styles.typeOutcome}>4.500.000</Text>
        </View>
        <View style={styles.typeCol}>
          <Text style={styles.typeText}>Cộng</Text>
          <Text style={styles.typeSum}>4.500.000</Text>
        </View>
      </View>

      <View>
        <View style={styles.record}>
          <View style={styles.recordHeader}>
            <View style={styles.recordDate}>
              <Text style={styles.recordTextDate}>01 Th3 03.2022</Text>
            </View>
            <View style={styles.recordCol}>
              <Text style={styles.recordIn}>1.000đ</Text>
            </View>
            <View style={styles.recordCol}>
              <Text style={styles.recordOut}>4.500.000đ</Text>
            </View>
          </View>
          <View style={styles.recordBody}>
            <View style={styles.recordItem}>
              <View style={styles.itemFirst}>
                <Text style={styles.itemCategory}>Khác</Text>
              </View>
              <View style={styles.itemSecond}>
                <Text style={styles.itemTitle}>Đạt mượn</Text>
                <Text style={styles.itemSource}>Tài khoản ngân hàng</Text>
              </View>
              <View style={styles.itemLast}>
                <Text style={styles.itemOut}>-4.500.000đ</Text>
              </View>
            </View>
            <View style={styles.recordItem}>
              <View style={styles.itemFirst}>
                <Text style={styles.itemCategory}>Khác</Text>
              </View>
              <View style={styles.itemSecond}>
                <Text style={styles.itemTitle}>Đạt mượn</Text>
                <Text style={styles.itemSource}>Tài khoản ngân hàng</Text>
              </View>
              <View style={styles.itemLast}>
                <Text style={styles.itemIn}>+200.000đ</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.record}>
          <View style={styles.recordHeader}>
            <View style={styles.recordDate}>
              <Text style={styles.recordTextDate}>01 Th3 03.2022</Text>
            </View>
            <View style={styles.recordCol}>
              <Text style={styles.recordIn}>1.000đ</Text>
            </View>
            <View style={styles.recordCol}>
              <Text style={styles.recordOut}>4.500.000đ</Text>
            </View>
          </View>
          <View style={styles.recordBody}>
            <View style={styles.recordItem}>
              <View style={styles.itemFirst}>
                <Text style={styles.itemCategory}>Khác</Text>
              </View>
              <View style={styles.itemSecond}>
                <Text style={styles.itemTitle}>Đạt mượn</Text>
                <Text style={styles.itemSource}>Tài khoản ngân hàng</Text>
              </View>
              <View style={styles.itemLast}>
                <Text style={styles.itemOut}>-4.500.000đ</Text>
              </View>
            </View>
            <View style={styles.recordItem}>
              <View style={styles.itemFirst}>
                <Text style={styles.itemCategory}>Khác</Text>
              </View>
              <View style={styles.itemSecond}>
                <Text style={styles.itemTitle}>Đạt mượn</Text>
                <Text style={styles.itemSource}>Tài khoản ngân hàng</Text>
              </View>
              <View style={styles.itemLast}>
                <Text style={styles.itemIn}>+200.000đ</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

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
    backgroundColor: 'red',
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
    backgroundColor: 'blue',
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
    borderBottomWidth: 0.5,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    // backgroundColor: SECONDARY_COLOR,
  },
  tabTextActive: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
  record: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: SECONDARY_COLOR,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
  },
  recordDate: {
    flex: 3,
  },
  recordTextDate: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },
  recordCol: {
    flex: 2,
    alignItems: 'flex-end',
  },
  recordIn: {
    fontSize: 13,
    color: 'blue',
    fontWeight: '500',
  },
  recordOut: {
    fontSize: 13,
    color: 'red',
    fontWeight: '500',
  },
  recordBody: {
    paddingHorizontal: 10,
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
    fontSize: 12,
    fontWeight: '500',
  },
  itemSecond: { flex: 2 },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
  itemSource: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemLast: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemOut: {
    fontSize: 13,
    color: 'red',
    fontWeight: '500',
  },
  itemIn: {
    fontSize: 13,
    color: 'blue',
    fontWeight: '500',
  },

  wrap: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 40,
  },
  headerIcon: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  headerMonth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
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
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    borderBottomColor: 'grey',
  },
  typeCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
  },
  typeIncome: {
    fontSize: 13,
    fontWeight: '600',
    color: 'blue',
  },
  typeOutcome: {
    fontSize: 13,
    fontWeight: '600',
    color: 'red',
  },
  typeSum: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
});

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../contants/Colors';
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native';
import { LOGO } from '../contants/Images';
import Svg, { Defs, LinearGradient, Polygon, Stop } from 'react-native-svg';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

export default function InvestTab({ navigation }) {
  const width = useWindowDimensions().width;

  const goToAddInvest = () => {
    navigation.navigate('AddInvestStock');
  };
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <View style={styles.headerMonth}>
          {/* <TouchableOpacity>
            <AntdIcon
              name="left"
              style={{ ...styles.headerIcon, fontSize: 12 }}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity>
            <Text style={styles.headerText}>Đầu tư</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity>
            <AntdIcon
              name="right"
              style={{ ...styles.headerIcon, fontSize: 12 }}
            />
          </TouchableOpacity> */}
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
          <Text style={styles.tabTextActive}>Chứng khoán</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Vàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>Coin</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <VictoryChart
          height={250}
          width={width}
          theme={VictoryTheme.material}
          // maxDomain={{ x: 5, y: 100 }}
          padding={{ top: 0, bottom: 0, right: 0, left: 0 }}
          style={{
            parent: {
              width: '100%',
              height: 'auto',
              overflow: 'visible',
            },
          }}
          scale={{ x: 'time', y: 'linear' }}>
          <Defs>
            <LinearGradient id="gradientFill" x1="0%" x2="0%" y1="0%" y2="100%">
              <Stop offset="20%" stopColor={PRIMARY_COLOR} stopOpacity="0.3" />
              <Stop offset="40%" stopColor={'green'} stopOpacity="0.3" />
              <Stop offset="80%" stopColor={'white'} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={'white'} stopOpacity="0.3" />
            </LinearGradient>
          </Defs>

          <VictoryAxis
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: { fill: 'transparent' },
              grid: { stroke: 'none' },
            }}
          />

          <VictoryArea
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 4 },
              { x: 4, y: 2 },
              { x: 5, y: 4 },
            ]}
            // categories={{ x: ['1/1/2022', '2/1/2022', 'mice'] }}
            style={{
              data: {
                stroke: PRIMARY_COLOR,
                fill: 'url(#gradientFill)',
                overflow: 'visible',
              },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            interpolation="linear"
          />
        </VictoryChart>
      </View>

      <View style={styles.portfolio}>
        <Text style={styles.portfolioTitle}>Danh mục đầu tư</Text>
        <View style={styles.portfolioList}>
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <View style={styles.itemNameCol}>
                <View style={styles.itemIcon}>
                  <Image source={LOGO} style={styles.itemIconImage} />
                </View>
                <Text style={styles.itemName}>Apple</Text>
              </View>
              <Text style={styles.itemSymbol}>APPL</Text>
            </View>
            <View style={styles.itemBody}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemInfoTitle}>Giá trị</Text>
                <View style={styles.itemInfoPrice}>
                  <Text style={styles.itemInfoCurrent}>132.11</Text>
                  <Text style={styles.itemInfoGreen}>+15%</Text>
                </View>
              </View>
              <View style={styles.itemInfo}>
                <Text style={{ ...styles.itemInfoTitle, textAlign: 'right' }}>
                  SL
                </Text>
                <View>
                  <Text style={styles.itemAmount}>1000</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.float}>
        <TouchableOpacity style={styles.floatBtnSmall}>
          <AntdIcon name="piechart" style={styles.floatIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatBtn} onPress={goToAddInvest}>
          <AntdIcon name="plus" style={styles.floatIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  portfolioList: {
    paddingVertical: 10,
  },
  portfolioTitle: {
    color: 'black',
    fontWeight: '500',
  },
  item: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  itemNameCol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIconImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
  },
  itemName: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 16,
  },
  itemSymbol: {
    fontWeight: '500',
  },
  itemBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  itemInfo: {
    // alignItems: 'center',
  },
  itemInfoTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemInfoCurrent: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  itemInfoGreen: {
    fontSize: 13,
    color: 'green',
    fontWeight: '500',
  },
  itemInfoPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemAmount: {
    fontWeight: '500',
    color: 'black',
    fontSize: 14,
  },

  portfolio: {
    padding: 10,
  },

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
  headerRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: 100,
    alignItems: 'center',
    // borderWidth: 1,
    // padding: 2,
    opacity: 0,
    // display: 'none',
  },
  headerRangeIcon: {
    fontSize: 11,
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

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 20,
    // backgroundColor: '#f5fcff',
    // margin: 20,
    // padding: 10,
  },
});

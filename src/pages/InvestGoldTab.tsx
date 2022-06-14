import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import {
  BACKGROUND_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
  PRIMARY_COLOR,
  RED_COLOR,
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
} from 'victory-native';
import { GOLD_ICO } from '../contants/Images';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentGoldPrice,
  getGoldPriceForChart,
  getMyGoldPortfolio,
  startListenPrice,
  stopSocket,
} from '../redux/reducer/gold';
import { RootState } from '../redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import formatMoney from '../utils/formatMoney';

function InvestTabGold() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const width = useWindowDimensions().width;

  const goldPrice = useSelector<RootState>(state => state.gold.data);
  const balance = useSelector<RootState>(state => state.gold.balance);
  const currentPrice = useSelector<RootState>(state => state.gold.currentPrice);

  const goToAddInvest = () => {
    navigation.navigate('AddInvestGold');
  };

  const goToInvestOverviewGold = () => {
    navigation.navigate('OverviewInvestGold');
  };

  useEffect(() => {
    dispatch(getGoldPriceForChart());
    dispatch(getMyGoldPortfolio());
    dispatch(startListenPrice());
    dispatch(getCurrentGoldPrice());

    return () => {
      dispatch(stopSocket());
    };
  }, []);

  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        <VictoryChart
          height={250}
          width={width}
          theme={VictoryTheme.material}
          maxDomain={{
            y: 2100,
          }}
          minDomain={{
            y: 1000,
          }}
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
              <Stop offset="80%" stopColor={'transparent'} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={'transparent'} stopOpacity="0.1" />
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
          {/* {goldPrice.length > 0 && ( */}
          <VictoryArea
            data={goldPrice}
            style={{
              data: {
                stroke: PRIMARY_COLOR,
                fill: 'url(#gradientFill)',
                overflow: 'visible',
              },
            }}
            animate={{
              duration: 2000,
              // onLoad: { duration: 6000 },
            }}
            interpolation="linear"
          />
          {/* )} */}
        </VictoryChart>
      </View>

      <View style={styles.portfolio}>
        <Text style={styles.portfolioTitle}>Gold price</Text>
        <View style={styles.containerPrice}>
          <View style={styles.priceSection}>
            {/* <View style={styles.priceWrap}>
              <Image
                source={currentPrice?.pc_col === 'redFont' ? DSC_ICO : INC_ICO}
                style={styles.priceIcon}
              />
            </View> */}
            <Text
              style={{
                ...styles.price,
                color:
                  currentPrice?.pc_col === 'redFont' ? RED_COLOR : GREEN_COLOR,
              }}>
              {formatMoney(currentPrice?.last_numeric)}
            </Text>
            <Text
              style={{
                ...styles.priceChange,
                color:
                  currentPrice?.pc_col === 'redFont' ? RED_COLOR : GREEN_COLOR,
              }}>
              ({formatMoney(currentPrice?.pc)})
            </Text>
          </View>
          <View style={styles.timeSection}>
            <Icon
              name="clockcircleo"
              style={{ color: WHITE_COLOR, fontWeight: '700' }}
            />
            <Text style={styles.time}>
              {new Date(currentPrice?.ts).toLocaleTimeString()}
            </Text>
            <Text style={styles.timeDescription}>
              Real-time Data. Currency in USD
            </Text>
          </View>
          {/* <View style={styles.indicateSection}>
            <Text style={styles.indicate}>Open: </Text>
            <Text style={styles.indicateValue}>{currentPrice?.bid}</Text>
          </View>
          <View style={styles.indicateSection}>
            <Text style={styles.indicate}>High: </Text>
            <Text style={styles.indicateValue}>{currentPrice?.high}</Text>
          </View>
          <View style={styles.indicateSection}>
            <Text style={styles.indicate}>Low: </Text>
            <Text style={styles.indicateValue}>{currentPrice?.low}</Text>
          </View> */}
        </View>
      </View>

      <View style={styles.portfolio}>
        <Text style={styles.portfolioTitle}>Your balance</Text>
        <View style={styles.portfolioList}>
          <View style={styles.item}>
            <View style={styles.itemHeader}>
              <View style={styles.itemNameCol}>
                <View style={styles.itemIcon}>
                  <Image source={GOLD_ICO} style={styles.itemIconImage} />
                </View>
                <View style={styles.itemNameSection}>
                  <Text style={styles.itemName}>GOLD</Text>
                  {currentPrice && (
                    <Text style={styles.itemSymbol}>
                      ${currentPrice?.last_numeric}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.itemBody}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemInfoTitle}>Value</Text>
                <View style={styles.itemInfoPrice}>
                  {currentPrice && (
                    <Text style={styles.itemInfoCurrent}>
                      $
                      {currentPrice
                        ? (currentPrice.last_numeric * balance.amount).toFixed(
                            2,
                          )
                        : ''}
                    </Text>
                  )}
                  {currentPrice && (
                    <Text style={styles.itemInfoGreen}>
                      {currentPrice
                        ? (
                            ((balance.value * balance.amount) /
                              (balance.amount * currentPrice.last_numeric)) *
                            100
                          ).toFixed(2) + '%'
                        : ''}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.itemInfo}>
                <Text style={{ ...styles.itemInfoTitle, textAlign: 'right' }}>
                  Amount
                </Text>
                <View>
                  <Text style={styles.itemAmount}>
                    {balance.amount.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.float}>
        <TouchableOpacity
          style={styles.floatBtnSmall}
          onPress={goToInvestOverviewGold}>
          <AntdIcon name="profile" style={styles.floatIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatBtn} onPress={goToAddInvest}>
          <AntdIcon name="plus" style={styles.floatIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(InvestTabGold);

const styles = StyleSheet.create({
  portfolioList: {
    paddingVertical: 10,
  },
  portfolioTitle: {
    color: WHITE_COLOR,
    fontWeight: '500',
  },
  item: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    backgroundColor: SECONDARY_BG_COLOR,
    borderColor: THIRD_BG_COLOR,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderBottomColor: THIRD_BG_COLOR,
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
  },
  itemNameSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    color: WHITE_COLOR,
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 16,
  },
  itemSymbol: {
    fontWeight: '500',
    color: WHITE_COLOR,
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
    fontSize: 14,
    fontWeight: '500',
    color: WHITE_COLOR,
    opacity: 0.6,
  },
  itemInfoCurrent: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: '600',
    color: WHITE_COLOR,
  },
  itemInfoGreen: {
    fontSize: 15,
    color: GREEN_COLOR,
    fontWeight: '500',
  },
  itemInfoPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemAmount: {
    fontWeight: '500',
    color: WHITE_COLOR,
    fontSize: 16,
    textAlign: 'right',
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
    width: 60,
    height: 60,
    backgroundColor: GREEN_COLOR,
    borderRadius: 30,
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
    width: 50,
    height: 50,
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
    fontSize: 25,
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
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: WHITE_COLOR,
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
    // padding: 10,
    // height: 40,
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
    fontSize: 15,
    fontWeight: '500',
    color: WHITE_COLOR,
    // marginHorizontal: 5,
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

  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: GREEN_COLOR,
    marginRight: 10,
  },
  priceChange: {
    fontSize: 16,
    fontWeight: '600',
    color: GREEN_COLOR,
    opacity: 0.8,
  },
  priceWrap: {
    width: 25,
    height: 30,
    marginRight: 5,
  },
  priceIcon: {
    // transform: [{ scale: 0.3 }],
    aspectRatio: 1,
    width: '100%',
    height: undefined,
  },
  containerPrice: {
    padding: 20,
    marginVertical: 10,
    marginTop: 20,
    backgroundColor: SECONDARY_BG_COLOR,
    borderRadius: 5,
  },

  dateString: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    borderBottomWidth: 1,
    flex: 1,
    padding: 0,
    color: WHITE_COLOR,
    borderColor: THIRD_BG_COLOR,
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  time: {
    color: WHITE_COLOR,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
    opacity: 0.8,
  },
  timeDescription: {
    color: WHITE_COLOR,
    fontWeight: '400',
    fontSize: 14,
    marginLeft: 5,
    opacity: 0.6,
  },
});

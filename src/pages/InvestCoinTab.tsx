import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import {
  BACKGROUND_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import { GOLD_ICO } from '../contants/Images';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { useNavigation } from '@react-navigation/native';
import {
  getMyCoinPortfolio,
  startListenPrice,
  stopListenPrice,
} from '../redux/reducer/coin';
import formatMoney from '../utils/formatMoney';
import _ from 'lodash';

function InvestTabCoin() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const portfolio = useSelector<RootState>(state => state.coin.portfolio);
  const currentPrice = useSelector<RootState>(state => state.coin.price);

  const goToAddInvest = () => {
    navigation.navigate('AddInvestCoin');
  };

  const goToInvestOverviewGold = () => {
    navigation.navigate('OverviewInvestCoin');
  };

  useEffect(() => {
    dispatch(getMyCoinPortfolio());
    () => dispatch(stopListenPrice());
  }, []);

  useEffect(() => {
    if (!_.isEmpty(portfolio)) {
      dispatch(
        startListenPrice(
          Object.keys(portfolio).map(key => portfolio[key].symbol),
        ),
      );
    }
    () => dispatch(stopListenPrice());
  }, [portfolio]);

  if (_.isEmpty(currentPrice)) {
    return (
      <ActivityIndicator
        size={30}
        color={GREEN_COLOR}
        style={{ marginTop: 20 }}
      />
    );
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.container} />
      <View style={styles.portfolio}>
        <View style={styles.portfolioList}>
          {Object.keys(portfolio).map(key => {
            const balance = portfolio[key];
            const price = currentPrice[balance.symbol];
            if (price) {
              return (
                <TouchableOpacity
                  style={styles.item}
                  key={key}
                  onPress={() => {
                    navigation.navigate('CoinDetailScreen', { coin: balance });
                  }}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemNameCol}>
                      <View style={styles.itemNameSection}>
                        <Text style={styles.itemName}>{balance.code}</Text>
                        <Text style={styles.itemSymbol}>
                          {formatMoney(price.c)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.itemBody}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemInfoTitle}>Value</Text>
                      <View style={styles.itemInfoPrice}>
                        <Text style={styles.itemInfoCurrent}>
                          {formatMoney(price?.c * balance.amount)}
                        </Text>
                        <Text
                          style={
                            price.c >= balance.value
                              ? styles.itemInfoGreen
                              : styles.itemInfoRed
                          }>
                          {(
                            ((price.c - balance.value) / balance.value) *
                            100
                          ).toFixed(2)}
                          %
                        </Text>
                      </View>
                    </View>
                    <View style={styles.itemInfo}>
                      <Text
                        style={{ ...styles.itemInfoTitle, textAlign: 'right' }}>
                        Amount
                      </Text>
                      <View>
                        <Text style={styles.itemAmount}>
                          {parseFloat(balance.amount).toFixed(4)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          })}
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

export default React.memo(InvestTabCoin);

const styles = StyleSheet.create({
  portfolioList: {},
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
  itemInfoRed: {
    fontSize: 15,
    color: RED_COLOR,
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
    marginTop: 10,
  },
});

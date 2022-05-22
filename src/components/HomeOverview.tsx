import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import React from 'react';
import { WHITE_COLOR } from '../contants/Colors';
import { OVERVIEW_BG } from '../contants/Images';
import { RootState } from '../redux';
import { useSelector } from 'react-redux';
import { User } from '../models/User';
import formatMoney from '../utils/formatMoney';
import { useNavigation } from '@react-navigation/native';

export default function HomeOverview() {
  const navigation = useNavigation();
  const userData = useSelector<RootState>(state => state.user.data) as User;

  const goToOverviewSpending = () => {
    navigation.navigate('OverviewSpending');
  };

  return (
    <View style={styles.overview}>
      <Text style={styles.welcomeText}>Hello, {userData?.name || ''}</Text>
      <Text style={styles.subWelcomeText}>Welcome to MyFiance</Text>
      <ImageBackground
        source={OVERVIEW_BG}
        resizeMode="cover"
        style={styles.overviewBg}>
        <View style={styles.balance}>
          <Text style={styles.yourBalance}>Your balance</Text>
          <Text style={styles.money}>{formatMoney(250000000)}</Text>
          <TouchableOpacity
            style={styles.overviewBtn}
            onPress={goToOverviewSpending}>
            <Text style={styles.overviewBtnText}>
              View your balance overview
            </Text>
            <View style={styles.overviewBtnIcon}>
              <Icon
                name="chevron-right"
                style={{ fontSize: 16, color: WHITE_COLOR, opacity: 0.8 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 18,
    fontWeight: '500',
    color: WHITE_COLOR,
  },
  subWelcomeText: {
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.8,
    color: WHITE_COLOR,
  },
  overviewBg: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  overview: {
    padding: 15,
  },
  overviewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overviewBtnText: {
    fontWeight: '500',
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  overviewBtnIcon: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    color: WHITE_COLOR,
  },

  balance: {
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  yourBalance: {
    fontWeight: '400',
    fontSize: 16,
    color: WHITE_COLOR,
  },
  money: {
    fontWeight: '700',
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    marginTop: 10,
  },
});

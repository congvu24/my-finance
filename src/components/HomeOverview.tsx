import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import React from 'react';

export default function HomeOverview() {
  return (
    <View style={styles.overview}>
      <Text style={styles.welcomeText}>Hello, Duong Cong Vu</Text>
      <Text style={styles.subWelcomeText}>Welcome to MyFiance</Text>
      <View style={styles.balance}>
        <Text style={styles.yourBalance}>Tài khoản của bạn</Text>
        <Text style={styles.money}>250.000.000 VND</Text>
        <TouchableOpacity style={styles.overviewBtn}>
          <Text style={styles.overviewBtnText}>Xem thống kê tài khoản</Text>
          <View style={styles.overviewBtnIcon}>
            <Icon name="chevron-right" style={{ fontSize: 14 }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  subWelcomeText: {
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.8,
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
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
  overviewBtnIcon: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  balance: {
    padding: 10,
    backgroundColor: 'blue',
    marginTop: 10,
    borderRadius: 10,
  },
  yourBalance: {
    fontWeight: '500',
    fontSize: 12,
    color: 'white',
  },
  money: {
    fontWeight: '700',
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    marginTop: 10,
  },
});

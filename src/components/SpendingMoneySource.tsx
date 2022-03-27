import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import {
  WHITE_COLOR,
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
} from '../contants/Colors';
import { getMoneySource } from '../redux/reducer/feature';
import { MoneySource } from '../models/MoneySource';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function SpendingMoneySource() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMoneySource());
  }, [dispatch]);

  const result = useSelector<RootState>(
    state => state.feature.moneySource,
  ) as MoneySource[];

  const goToAddMoneySource = () => {
    navigation.navigate('AddMoneySource');
  };

  return useMemo(
    () => (
      <View style={styles.selectWrap}>
        <View style={styles.selectHeader}>
          <Text style={styles.selectHeaderText}>Select source</Text>
          <TouchableOpacity onPress={goToAddMoneySource}>
            <Icon name="plus" style={{ color: WHITE_COLOR }} />
          </TouchableOpacity>
        </View>
        <View style={styles.select}>
          {result.map(item => (
            <TouchableOpacity style={styles.selectBtn} key={item.id}>
              <Text style={styles.selectText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    ),
    [result],
  );
}

const styles = StyleSheet.create({
  selectHeaderText: {
    color: WHITE_COLOR,
    fontSize: 14,
  },
  selectHeader: {
    backgroundColor: SECONDARY_BG_COLOR,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectWrap: {
    marginTop: 20,
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: THIRD_BG_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  selectBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    padding: 5,
    margin: 4,
    borderRadius: 2,
    borderColor: WHITE_COLOR,
  },
  selectText: {
    textAlign: 'center',
    fontSize: 12,
    color: WHITE_COLOR,
  },
});

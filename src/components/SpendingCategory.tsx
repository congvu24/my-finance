import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import {
  WHITE_COLOR,
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
} from '../contants/Colors';
import { Category } from '../models/Category';
import { getCategory } from '../redux/reducer/feature';

export default function SpendingCategory() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const result = useSelector<RootState>(
    state => state.feature.category,
  ) as Category[];

  return useMemo(
    () => (
      <View style={styles.selectWrap}>
        <View style={styles.selectHeader}>
          <Text style={styles.selectHeaderText}>Select category</Text>
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

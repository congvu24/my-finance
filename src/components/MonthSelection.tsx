import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { WHITE_COLOR } from '../contants/Colors';
import MonthPicker from './MonthPicker';

export default function MonthSelection({ onMonthSelect }) {
  const refMonthPicker = useRef();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const openMonthPicker = () => {
    refMonthPicker.current?.open();
  };

  const onSelect = (selectedMonth, selectedYear) => {
    setMonth(selectedMonth);
    setYear(selectedYear);

    onMonthSelect(selectedMonth, selectedYear);
  };

  const onNextMonth = () => {
    refMonthPicker.current?.nextMonth();
  };

  const onPreviousMonth = () => {
    refMonthPicker.current?.previousMonth();
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.headerMonth}>
        <TouchableOpacity onPress={onPreviousMonth}>
          <AntdIcon
            name="left"
            style={{ ...styles.headerIcon, fontSize: 12 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openMonthPicker}>
          <Text style={styles.headerText}>
            {month + 1}.{year}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNextMonth}>
          <AntdIcon
            name="right"
            style={{ ...styles.headerIcon, fontSize: 12 }}
          />
        </TouchableOpacity>
      </View>
      <MonthPicker ref={refMonthPicker} onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  headerMonth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
    alignItems: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '500',
    color: WHITE_COLOR,
    marginHorizontal: 5,
  },
  headerIcon: {
    fontSize: 16,
    fontWeight: '700',
    color: WHITE_COLOR,
  },
});

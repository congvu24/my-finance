import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { WHITE_COLOR } from '../contants/Colors';
import YearPicker from './YearPicker';

export default function YearSelection({ onYearSelect }) {
  const refYearPicker = useRef();
  const [year, setYear] = useState(new Date().getFullYear());

  const openMonthPicker = () => {
    refYearPicker.current?.open();
  };

  const onSelect = selectedYear => {
    setYear(selectedYear);

    onYearSelect(selectedYear);
  };

  const onNextYear = () => {
    refYearPicker.current?.nextYear();
  };

  const onPreviousYear = () => {
    refYearPicker.current?.previousYear();
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.headerMonth}>
        <TouchableOpacity onPress={onPreviousYear}>
          <AntdIcon
            name="left"
            style={{ ...styles.headerIcon, fontSize: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openMonthPicker}>
          <Text style={styles.headerText}>{year}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNextYear}>
          <AntdIcon
            name="right"
            style={{ ...styles.headerIcon, fontSize: 20 }}
          />
        </TouchableOpacity>
      </View>
      <YearPicker ref={refYearPicker} onSelect={onSelect} />
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
    fontSize: 14,
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

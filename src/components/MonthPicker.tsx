import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
const width = Dimensions.get('screen').width;

function MonthPickerComp({ onSelect }, ref) {
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  useImperativeHandle(ref, () => ({
    open: () => {
      setShow(true);
    },
    close: () => {
      setShow(false);
    },
    nextMonth: () => {
      if (month + 1 > 11) {
        setMonth(0);
        onPressMonth(0, year + 1);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
        onPressMonth(month + 1, year);
      }
    },
    previousMonth: () => {
      if (month - 1 < 0) {
        setMonth(11);
        onPressMonth(11, year - 1);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
        onPressMonth(month - 1, year);
      }
    },
  }));

  const onPressMonth = (month, year) => {
    setShow(false);
    onSelect(month, year);
  };

  const setCurrentMonth = () =>
    onPressMonth(new Date().getMonth(), new Date().getFullYear());

  if (!show) {
    return null;
  }
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Month</Text>
        <View style={styles.headerGroup}>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={setCurrentMonth}>
            <Text style={styles.headerText}>Current month</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShow(false)}>
            <Icon name="close" style={{ fontSize: 16, color: WHITE_COLOR }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.headerGroup}>
          <TouchableOpacity onPress={() => setYear(year - 1)}>
            <Icon name="left" color={WHITE_COLOR} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.monthText}>{year}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setYear(year + 1)}>
            <Icon name="right" color={WHITE_COLOR} />
          </TouchableOpacity>
        </View>
        <View style={styles.listMonth}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
            <TouchableOpacity
              style={styles.monthBtn}
              onPress={() => onPressMonth(item - 1, year)}
              key={item}>
              <Text style={styles.monthText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

export default forwardRef(MonthPickerComp);

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: THIRD_BG_COLOR,
    position: 'absolute',
    zIndex: 99999,
    top: 40,
    left: 10,
    width: width * 0.9,
    borderRadius: 10,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SECONDARY_BG_COLOR,
  },
  headerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: WHITE_COLOR,
  },
  body: {
    marginTop: 5,
    padding: 10,
  },
  listMonth: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  monthBtn: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  monthText: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: '500',
  },
});

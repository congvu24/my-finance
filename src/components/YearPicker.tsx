import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
const width = Dimensions.get('screen').width;

function YearPickerComp({ onSelect }, ref) {
  const [show, setShow] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());

  useImperativeHandle(ref, () => ({
    open: () => {
      setShow(true);
    },
    close: () => {
      setShow(false);
    },
    nextYear: () => {
      setYear(year + 1);
      onSelect(year + 1);
    },
    previousYear: () => {
      setYear(year - 1);
      onSelect(year - 1);
    },
  }));

  const onPressYear = year => {
    setShow(false);
    onSelect(year);
  };

  const setCurrentYear = () => onPressYear(new Date().getFullYear());

  if (!show) {
    return null;
  }
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Year</Text>
        <View style={styles.headerGroup}>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={setCurrentYear}>
            <Text style={styles.headerText}>Current year</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShow(false)}>
            <Icon name="close" style={{ fontSize: 16, color: WHITE_COLOR }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.listMonth}>
          {[
            2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022,
          ].map(item => (
            <TouchableOpacity
              style={styles.monthBtn}
              onPress={() => onPressYear(item)}
              key={item}>
              <Text style={styles.monthText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

export default forwardRef(YearPickerComp);

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

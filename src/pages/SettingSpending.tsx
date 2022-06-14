import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import BackArrow from '../components/BackArrow';
import {
  BACKGROUND_COLOR,
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import { Category } from '../models/Category';
import { RootState } from '../redux';
import { getCategory } from '../redux/reducer/feature';
import {
  getSettingAction,
  updateSettingAction,
} from '../redux/reducer/settingSpending';
import { SettingSpending } from '../types/setting';
import formatMoney from '../utils/formatMoney';

export default function SettingSpendingScreen() {
  const dispatch = useDispatch();
  const category = useSelector<RootState>(
    state => state.feature.category,
  ) as Category[];
  const setting = useSelector<RootState>(
    state => state.setting.setting,
  ) as SettingSpending[];
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getSettingAction(''));
  }, []);

  useEffect(() => {
    const setted = setting.map(item => item.category);
    const unSet = category.filter(item => !setted.includes(item.id));

    const newData = setting.map(currSetting => {
      const cate = category.find(item => item.id === currSetting.category);
      return { ...currSetting, categoryName: cate?.name };
    });

    unSet.forEach(item =>
      newData.push({
        category: item.id,
        limit: 0,
        created_by: '',
        categoryName: item.name,
      }),
    );
    setData(newData);
  }, [category, setting]);

  const handleChange = (category, limit) => {
    const newData = data;
    const index = data.findIndex(item => item.category == category);
    if (index > -1) {
      newData[index] = { ...newData[index], limit: limit };
      setData(_.uniqBy([...newData], 'category'));
    }
  };

  const handleSave = () => {
    _.uniqBy(data, 'category')
      .filter(item => item.limit > 0)
      .map(item => ({
        limit: item.limit,
        category: item.category,
        id: item.id,
        categoryName: item.categoryName,
      }))
      .forEach(item => {
        dispatch(updateSettingAction({ data: { ...item, id: item.id } }));
      });
  };

  return (
    <ScrollView style={styles.wrap}>
      <View style={styles.header}>
        <BackArrow />
        <Text style={styles.title}>Spending limit setting</Text>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Icon name="save" color={WHITE_COLOR} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {data.map(item => (
          <View style={styles.item} key={item.category}>
            <Text style={styles.itemName}>{item.categoryName}</Text>
            <View style={styles.itemInput}>
              <TextInput
                style={styles.itemTextInput}
                placeholder={String(item.limit)}
                placeholderTextColor={WHITE_COLOR}
                keyboardType="numeric"
                value={item.limit}
                onChangeText={value => {
                  handleChange(item.category, value);
                }}
              />
              <Text style={{ color: WHITE_COLOR }}>$/Month</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  title: {
    color: WHITE_COLOR,
    marginLeft: 10,
    fontSize: 14,
  },
  item: {
    backgroundColor: SECONDARY_BG_COLOR,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    color: WHITE_COLOR,
  },
  itemInput: {
    backgroundColor: THIRD_BG_COLOR,
    width: 200,
    marginLeft: 'auto',
    textAlign: 'right',
    color: WHITE_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  itemTextInput: {
    flex: 1,
    backgroundColor: THIRD_BG_COLOR,
    marginLeft: 'auto',
    textAlign: 'right',
    color: WHITE_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveBtn: {
    padding: 5,
    marginLeft: 'auto',
  },
});

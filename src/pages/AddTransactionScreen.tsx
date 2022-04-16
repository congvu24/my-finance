import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import BackArrow from '../components/BackArrow';
import MyButton from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  BACKGROUND_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
  RED_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import SpendingCategory from '../components/SpendingCategory';
import SpendingMoneySource from '../components/SpendingMoneySource';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';
import Toast from 'react-native-root-toast';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../redux/reducer/transaction';
import DateTimePicker from '@react-native-community/datetimepicker';

const listType = [
  { key: -1, type: 'Outcome' },
  { key: 1, type: 'Income' },
  { key: 0, type: 'Transfer' },
];

export default function AddTransactionScreen({ navigation }) {
  const dispatch = useDispatch();

  const [type, setType] = useState<number>(-1);
  const [showSource, setShowSource] = useState<boolean>(false);
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const createTime = new Date();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: createTime,
      time: createTime,
      source: '',
      category: '',
      amount: '',
      note: '',
    },
  });

  const onSubmit = data => {
    const date = new Date(data.date);
    const time = new Date(data.time);
    const finalDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getSeconds(),
      time.getMilliseconds(),
    );

    dispatch(
      addTransaction({
        onSuccess: () => {
          navigation.goBack();
        },
        data: {
          source: data.source,
          category: data.category,
          note: data.note,
          amount: parseFloat(data.amount),
          type: type,
          date: finalDate,
        },
      }),
    );
  };

  const onFinish = handleSubmit(onSubmit);

  const onPressSubmit = () => {
    if (!_.isEmpty(errors)) {
      Toast.show('Check your fields', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        textStyle: {
          fontSize: 12,
        },
      });
    }

    onFinish();
  };

  const changeSource = (newSrc: string) => {
    setValue('source', newSrc);
  };

  const changeCategory = (newCate: string) => {
    setValue('category', newCate);
  };

  const onClickTime = isTime => {
    setMode(isTime ? 'time' : 'date');
    setShow(true);
  };

  const onCancelTime = () => {
    setShow(false);
    setMode('date');
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <BackArrow />
        <Text style={styles.typeText}>Transactions</Text>
      </View>
      <View style={styles.wrapType}>
        {listType.map(item => (
          <TouchableOpacity
            key={item.key}
            onPress={() => setType(item.key)}
            style={[
              { ...styles.typeBtn },
              item.key === type ? { borderColor: WHITE_COLOR } : null,
            ]}>
            <Text
              style={[
                { ...styles.typeBtnText },
                item.key === type ? { opacity: 1 } : null,
              ]}>
              {item.type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { value } }) => (
            <View style={styles.input}>
              <Text style={styles.inputName}>Date</Text>
              <View style={styles.dateString}>
                <TouchableOpacity onPress={() => onClickTime(false)}>
                  <Text style={[styles.inputField, { borderBottomWidth: 0 }]}>
                    {new Date(value).toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                <Text> </Text>
                <TouchableOpacity onPress={() => onClickTime(true)}>
                  <Text style={[styles.inputField, { borderBottomWidth: 0 }]}>
                    {new Date(value).toLocaleTimeString()}
                  </Text>
                </TouchableOpacity>
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={mode}
                  is24Hour={true}
                  onChange={(event, data) => {
                    console.log(data);
                    if (data) {
                      if (mode === 'date') {
                        setValue('date', data);
                      } else {
                        setValue('time', data);
                      }
                    }
                    onCancelTime();
                  }}
                  onTouchCancel={onCancelTime}
                />
              )}
            </View>
          )}
          name="date"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { value } }) => (
            <View style={styles.input}>
              <Text style={styles.inputName}>Source</Text>
              <TouchableNativeFeedback
                onPress={() => {
                  Keyboard.dismiss();
                  setShowSource(true);
                  setShowCategory(false);
                }}>
                <Text
                  style={[
                    styles.inputField,
                    errors.source ? { borderBottomColor: RED_COLOR } : null,
                  ]}>
                  {value}
                </Text>
              </TouchableNativeFeedback>
            </View>
          )}
          name="source"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { value } }) => (
            <View style={styles.input}>
              <Text style={styles.inputName}>Category</Text>
              <TouchableNativeFeedback
                onPress={() => {
                  Keyboard.dismiss();
                  setShowCategory(true);
                  setShowSource(false);
                }}>
                <Text
                  style={[
                    styles.inputField,
                    errors.source ? { borderBottomColor: RED_COLOR } : null,
                  ]}>
                  {value}
                </Text>
              </TouchableNativeFeedback>
            </View>
          )}
          name="category"
        />
        <Controller
          control={control}
          rules={{
            required: true,
            min: 0,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.input}>
              <Text style={styles.inputName}>Amount</Text>
              <TextInput
                style={styles.inputField}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </View>
          )}
          name="amount"
        />
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.input}>
              <Text style={styles.inputName}>Note</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              <TouchableOpacity style={styles.addImageBtn}>
                <Icon name="camera" style={styles.addImageIcon} />
              </TouchableOpacity>
            </View>
          )}
          name="note"
        />
        <View style={styles.saveWrap}>
          <MyButton
            text={'Save'}
            style={{ wrap: styles.saveBtn, text: {} }}
            onPress={onPressSubmit}
          />
          <MyButton
            text={'Next'}
            style={{ wrap: styles.nextBtn, text: { color: WHITE_COLOR } }}
          />
        </View>

        {showCategory && <SpendingCategory onChange={changeCategory} />}
        {showSource && <SpendingMoneySource onChange={changeSource} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dateString: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    borderBottomWidth: 1,
    flex: 1,
    padding: 0,
    color: WHITE_COLOR,
    borderColor: THIRD_BG_COLOR,
  },
  addImageBtn: {
    paddingHorizontal: 10,
  },
  addImageIcon: {
    fontSize: 14,
    color: WHITE_COLOR,
  },
  nextBtn: {
    backgroundColor: BLUE_COLOR,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    paddingHorizontal: 14,
  },
  saveWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  saveBtn: {
    borderRadius: 5,
    backgroundColor: GREEN_COLOR,
    flex: 1,
    borderWidth: 1,
  },

  input: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  inputField: {
    borderBottomWidth: 1,
    flex: 1,
    padding: 0,
    color: WHITE_COLOR,
    borderColor: THIRD_BG_COLOR,
  },
  inputName: {
    width: 60,
    fontSize: 13,
    fontWeight: '500',
    color: WHITE_COLOR,
  },
  wrap: {
    padding: 10,
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    marginLeft: 10,
    color: WHITE_COLOR,
  },
  wrapType: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  typeBtn: {
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 2,
    borderColor: THIRD_BG_COLOR,
  },
  typeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: WHITE_COLOR,
    opacity: 0.7,
  },
});

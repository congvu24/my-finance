import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackArrow from '../components/BackArrow';
import MyButton from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  BACKGROUND_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';
import Toast from 'react-native-root-toast';
import { COIN_LIST } from '../contants/Coin';
import CoinSelect from '../components/CoinSelect';
import { addInvestCoinToFirebase } from '../redux/reducer/coin';
import { useRoute } from '@react-navigation/native';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

export default function AddInvestCoin({ navigation }) {
  const dispatch = useDispatch();
  const route = useRoute();
  const [type, setType] = useState(1);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState('');
  const [coin, setCoin] = useState(route?.params?.coin ?? '');

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
      amount: '',
      price: '',
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
      addInvestCoinToFirebase({
        onSuccess: () => {
          navigation.goBack();
        },
        data: {
          note: data.note,
          symbol: coin.symbol,
          code: coin.name,
          coinId: coin.id,
          amount: parseFloat(data.amount),
          price: parseFloat(data.price),
          type: type,
          date: finalDate,
        },
      }),
    );
  };

  const onClickTime = isTime => {
    setMode(isTime ? 'time' : 'date');
    setShow(true);
  };

  const onCancelTime = () => {
    setShow(false);
    setMode('date');
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
          fontSize: 14,
        },
      });
    }

    onFinish();
  };

  const onSelectCoin = value => {
    setFilter('');
    setCoin(value);
  };

  useEffect(() => {
    // dispatch(startListenPrice());
    // return () => {
    //   dispatch(stopSocket());
    // };
  }, []);

  return (
    <SafeAreaView style={styles.wrap}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={styles.header}>
          <BackArrow />
          <Text style={styles.typeText}>Crypto Investment</Text>
        </View>
        <View style={styles.wrapType}>
          <TouchableOpacity
            style={type == 1 ? styles.typeBtnActive : styles.typeBtn}
            onPress={() => setType(1)}>
            <Text style={styles.typeBtnText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={type == -1 ? styles.typeBtnActive : styles.typeBtn}
            onPress={() => setType(-1)}>
            <Text style={styles.typeBtnText}>Sell</Text>
          </TouchableOpacity>
        </View>
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

        <CoinSelect
          data={COIN_LIST.filter(item =>
            item.name.toLowerCase().includes(filter.toLowerCase()),
          )}
          onSelect={onSelectCoin}
          show={filter !== ''}
          renderChildren={() => (
            <View style={styles.input}>
              <Text style={styles.inputName}>Coin</Text>
              <TextInput
                style={[styles.inputField]}
                placeholderTextColor={WHITE_COLOR}
                placeholder={coin?.name}
                onChangeText={value => setFilter(value)}
              />
            </View>
          )}
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
            required: true,
            min: 0,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.input}>
              <Text style={styles.inputName}>Price</Text>
              <TextInput
                style={styles.inputField}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            </View>
          )}
          name="price"
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  indicateSection: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  indicate: {
    color: WHITE_COLOR,
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.6,
  },
  indicateValue: {
    color: WHITE_COLOR,
    fontSize: 15,
    fontWeight: '600',
  },

  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  time: {
    color: WHITE_COLOR,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5,
    opacity: 0.8,
  },
  timeDescription: {
    color: WHITE_COLOR,
    fontWeight: '400',
    fontSize: 14,
    marginLeft: 5,
    opacity: 0.6,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: GREEN_COLOR,
    marginRight: 10,
  },
  priceChange: {
    fontSize: 16,
    fontWeight: '600',
    color: GREEN_COLOR,
    opacity: 0.8,
  },
  priceWrap: {
    width: 25,
    height: 30,
    marginRight: 5,
  },
  priceIcon: {
    // transform: [{ scale: 0.3 }],
    aspectRatio: 1,
    width: '100%',
    height: undefined,
  },
  container: {
    padding: 20,
    marginVertical: 10,
    marginTop: 20,
    backgroundColor: SECONDARY_BG_COLOR,
    borderRadius: 5,
  },

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
  selectHeaderText: {
    color: 'white',
    fontSize: 14,
  },
  selectHeader: {
    backgroundColor: 'grey',
    padding: 5,
  },
  selectWrap: {
    marginTop: 20,
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: '#aba9a9',
    paddingVertical: 10,
  },
  selectBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    padding: 5,
    margin: 4,
    borderRadius: 2,
  },
  selectText: {
    textAlign: 'center',
    fontSize: 14,
  },
  addImageBtn: {
    paddingHorizontal: 10,
  },
  addImageIcon: {
    fontSize: 16,
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
    color: WHITE_COLOR,
  },
  inputField: {
    borderBottomWidth: 1,
    flex: 1,
    padding: 0,
    borderBottomColor: THIRD_BG_COLOR,
    color: WHITE_COLOR,
  },
  inputName: {
    width: 60,
    fontSize: 15,
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
  typeBtnActive: {
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 2,
    borderColor: WHITE_COLOR,
  },
  typeBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: WHITE_COLOR,
  },
});

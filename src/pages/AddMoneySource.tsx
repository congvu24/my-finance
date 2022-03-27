import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import BackArrow from '../components/BackArrow';
import MyButton from '../components/Button';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast';
import _ from 'lodash';
import {
  BACKGROUND_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import { addMoneySource } from '../redux/reducer/feature';
import { useNavigation } from '@react-navigation/native';

export default function AddMoneySource() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSubmit = data => {
    dispatch(
      addMoneySource({
        data,
        onSuccess,
      }),
    );
  };

  const onSuccess = () => {
    reset();
    navigation.goBack();
  };

  const onFinish = handleSubmit(onSubmit);

  const handlePressSubmit = () => {
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
    } else {
      onFinish();
    }
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <BackArrow />
        <Text style={styles.pageTitle}>Add Money source</Text>
      </View>
      <View style={styles.inputWrap}>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 3,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Name"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
              placeholderTextColor={WHITE_COLOR}
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Description"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.input}
              placeholderTextColor={WHITE_COLOR}
            />
          )}
          name="description"
        />

        <MyButton
          text={'Save'}
          style={{ wrap: { borderRadius: 5, marginTop: 30 } }}
          onPress={handlePressSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageTitle: {
    marginLeft: 10,
    color: WHITE_COLOR,
  },
  addBtn: {
    marginLeft: 'auto',
  },
  addBtnIcon: {
    fontSize: 14,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'grey',
    borderTopWidth: 1,
  },
  itemName: {
    marginLeft: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
  },
  subTitle: {
    fontSize: 11,
    fontWeight: '400',
    color: 'black',
  },
  editBtn: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  dragBtn: {},
  itemIcon: {
    fontSize: 14,
    color: 'black',
  },

  inputWrap: {
    padding: 10,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    fontSize: 12,
    borderColor: THIRD_BG_COLOR,
    color: WHITE_COLOR,
  },
});

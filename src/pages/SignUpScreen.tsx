import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { LOGO } from '../contants/Images';
import _ from 'lodash';
import {
  BACKGROUND_COLOR,
  GREEN_COLOR,
  PRIMARY_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import MyButton from '../components/Button';
import HorizontalDivider from '../components/HorizontalDivider';
import MyButtonWithIcon from '../components/ButtonWithIcon';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import { RootState } from '../redux';
import { signUp } from '../redux/reducer/user';

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
    },
  });
  const isLogged = useSelector<RootState>(state => state.user.isLogged);

  useEffect(() => {
    if (isLogged) {
      navigation.popToTop();
      navigation.replace('Home');
    }
  }, [isLogged]);

  const passwordInputRef = useRef<TextInput>(null);

  const onBack = () => {
    navigation.goBack();
  };

  const goLogin = () => {
    navigation.replace('Login');
  };
  const onSubmit = data => {
    dispatch(signUp(data));
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
          fontSize: 14,
        },
      });
    } else {
      onFinish();
    }
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <TouchableOpacity onPress={onBack}>
        <Icon name="arrowleft" size={20} color={WHITE_COLOR} />
      </TouchableOpacity>
      <View style={styles.logoWrap}>
        <Image source={LOGO} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.loginText}>Welcome to MyFinance</Text>
      </View>
      <View>
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
                style={styles.input}
                placeholderTextColor={WHITE_COLOR}
                value={value}
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 3,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Phone"
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                keyboardType="phone-pad"
                value={value}
                placeholderTextColor={WHITE_COLOR}
              />
            )}
            name="phone"
          />
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 3,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                keyboardType="email-address"
                placeholderTextColor={WHITE_COLOR}
                value={value}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 3,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={passwordInputRef}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor={WHITE_COLOR}
                placeholder="Password"
                style={styles.input}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
        </View>
        <MyButton
          text={'SIGN UP'}
          style={{
            wrap: styles.loginBtn,
            text: {},
          }}
          onPress={handlePressSubmit}
        />
        <View style={styles.subTextWrap}>
          <TouchableOpacity onPress={goLogin}>
            <Text style={styles.subText}>Login</Text>
          </TouchableOpacity>
        </View>
        <HorizontalDivider
          text="or"
          color={THIRD_BG_COLOR}
          textColor={WHITE_COLOR}
          style={{ marginTop: 30, opacity: 0.7 }}
        />
        <View style={styles.socialWrap}>
          <View style={styles.socialBtn}>
            <MyButtonWithIcon
              name="facebook"
              text="Connect with facebook"
              style={{
                wrap: { backgroundColor: '#3b5998' },
                text: { fontSize: 14 },
              }}
              onPress={() => {}}
            />
          </View>
          <View style={styles.socialBtn}>
            <MyButtonWithIcon
              name="google"
              text="Connect with Google"
              style={{
                wrap: { backgroundColor: '#EA4335' },
                text: { fontSize: 14 },
              }}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  logoWrap: {
    width: 100,
    display: 'flex',
    alignSelf: 'center',
    marginTop: 50,
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: GREEN_COLOR,
    marginTop: 20,
  },
  inputWrap: {
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: THIRD_BG_COLOR,
    fontSize: 15,
    color: WHITE_COLOR,
  },
  loginBtn: { borderRadius: 5, marginTop: 20 },
  subTextWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  subText: {
    fontSize: 14,
    fontWeight: '500',
    color: PRIMARY_COLOR,
  },
  socialWrap: {
    marginTop: 30,
  },
  socialBtn: {
    marginBottom: 10,
  },
});

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { LOGO } from '../contants/Images';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import MyButton from '../components/Button';
import HorizontalDivider from '../components/HorizontalDivider';
import MyButtonWithIcon from '../components/ButtonWithIcon';
import { signIn } from '../redux/reducer/user';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-root-toast';
import { RootState } from '../redux';
import _ from 'lodash';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const isLogged = useSelector<RootState>(state => state.user.isLogged);

  useEffect(() => {
    if (isLogged) {
      navigation.replace('Home');
    }
  }, [isLogged]);

  const passwordInputRef = useRef<TextInput>(null);

  const onBack = () => {
    navigation.goBack();
  };

  const goSignUp = () => {
    navigation.replace('Signup');
  };

  const onSubmit = data => {
    dispatch(signIn(data));
  };

  const onFinish = handleSubmit(onSubmit);

  const handlePressSubmit = () => {
    Keyboard.dismiss();
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
      <TouchableOpacity onPress={onBack}>
        <Icon name="arrowleft" size={20} color={WHITE_COLOR} />
      </TouchableOpacity>
      <View style={styles.logoWrap}>
        <Image source={LOGO} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.loginText}>Welcome back</Text>
      </View>
      <View>
        <View style={styles.inputWrap}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Phone"
                placeholderTextColor={WHITE_COLOR}
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="phone-pad"
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={passwordInputRef}
                placeholderTextColor={WHITE_COLOR}
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                secureTextEntry={true}
              />
            )}
            name="password"
          />
        </View>
        <MyButton
          text={'LOGIN'}
          style={{
            wrap: styles.loginBtn,
            text: {},
          }}
          onPress={handlePressSubmit}
        />
        <View style={styles.subTextWrap}>
          <TouchableOpacity onPress={goSignUp}>
            <Text style={styles.subText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.subText}>Forgot password?</Text>
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
              text="Connect with Facebook"
              style={{
                wrap: { backgroundColor: '#3b5998' },
                text: { fontSize: 12 },
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
                text: { fontSize: 12 },
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
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  logoWrap: {
    width: 100,
    height: 100,
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
    color: WHITE_COLOR,
    marginTop: 20,
  },
  inputWrap: {
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: THIRD_BG_COLOR,
    fontSize: 13,
    color: WHITE_COLOR,
  },
  loginBtn: { borderRadius: 5, marginTop: 20 },
  subTextWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subText: {
    fontSize: 12,
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

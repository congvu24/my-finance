import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import BackArrow from '../components/BackArrow';
import MyButton from '../components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  BACKGROUND_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
} from '../contants/Colors';
import SpendingCategory from '../components/SpendingCategory';
import SpendingMoneySource from '../components/SpendingMoneySource';

export default function AddTransactionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <BackArrow />
        <Text style={styles.typeText}>Transactions</Text>
      </View>
      <View style={styles.wrapType}>
        <TouchableOpacity
          style={{ ...styles.typeBtn, borderColor: WHITE_COLOR }}>
          <Text style={{ ...styles.typeBtnText, opacity: 1 }}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeBtn}>
          <Text style={styles.typeBtnText}>Outcome</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeBtn}>
          <Text style={styles.typeBtnText}>Transfer</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.input}>
          <Text style={styles.inputName}>Date</Text>
          <TextInput style={styles.inputField} />
        </View>
        <View style={styles.input}>
          <Text style={styles.inputName}>Source</Text>
          <TextInput style={styles.inputField} />
        </View>
        <View style={styles.input}>
          <Text style={styles.inputName}>Category</Text>
          <TextInput style={styles.inputField} />
        </View>
        <View style={styles.input}>
          <Text style={styles.inputName}>Amount</Text>
          <TextInput style={styles.inputField} keyboardType="numeric" />
        </View>
        <View style={styles.input}>
          <Text style={styles.inputName}>Note</Text>
          <TextInput style={styles.inputField} />
          <TouchableOpacity style={styles.addImageBtn}>
            <Icon name="camera" style={styles.addImageIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.saveWrap}>
          <MyButton text={'Save'} style={{ wrap: styles.saveBtn, text: {} }} />
          <MyButton
            text={'Next'}
            style={{ wrap: styles.nextBtn, text: { color: WHITE_COLOR } }}
          />
        </View>
        <SpendingCategory />
        <SpendingMoneySource />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

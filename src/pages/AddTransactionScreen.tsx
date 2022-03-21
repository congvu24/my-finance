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

export default function AddTransactionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <BackArrow navigation={navigation} />
        <Text style={styles.typeText}>Income</Text>
      </View>
      <View style={styles.wrapType}>
        <TouchableOpacity style={styles.typeBtn}>
          <Text style={styles.typeBtnText}>Thu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeBtn}>
          <Text style={styles.typeBtnText}>Chi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeBtn}>
          <Text style={styles.typeBtnText}>Chuyển khoản</Text>
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
          <TextInput style={styles.inputField} />
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
            style={{ wrap: styles.nextBtn, text: { color: 'black' } }}
          />
        </View>
        <View style={styles.selectWrap}>
          <View style={styles.selectHeader}>
            <Text style={styles.selectHeaderText}>Select header</Text>
          </View>
          <View style={styles.select}>
            <TouchableOpacity style={styles.selectBtn}>
              <Text style={styles.selectText}>Salary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectBtn}>
              <Text style={styles.selectText}>Salary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectBtn}>
              <Text style={styles.selectText}>Salary</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectBtn}>
              <Text style={styles.selectText}>Salary</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  selectHeaderText: {
    color: 'white',
    fontSize: 12,
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
    fontSize: 12,
  },
  addImageBtn: {
    paddingHorizontal: 10,
  },
  addImageIcon: {
    fontSize: 14,
  },
  nextBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
    paddingHorizontal: 14,
  },
  saveWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  saveBtn: {
    borderRadius: 5,
    backgroundColor: 'blue',
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
  },
  inputName: {
    width: 60,
    fontSize: 13,
    fontWeight: '500',
  },
  wrap: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    marginLeft: 10,
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
  },
  typeBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

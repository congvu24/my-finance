import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import BackArrow from '../components/BackArrow';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import {
  BACKGROUND_COLOR,
  RED_COLOR,
  SECONDARY_BG_COLOR,
  THIRD_BG_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from '../contants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { MoneySource } from '../models/MoneySource';
import { deleteMoneySource, getMoneySource } from '../redux/reducer/feature';

export default function MoneySourceScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userID = useSelector<RootState>(state => state.user.id);
  const data = useSelector<RootState>(
    state => state.feature.moneySource,
  ) as MoneySource[];

  useEffect(() => {
    dispatch(getMoneySource());
  }, []);

  const goToAddMoneySource = () => {
    navigation.navigate('AddMoneySource');
  };

  const goToEditMoneySource = data => {
    navigation.navigate('EditMoneySource', { source: data });
  };

  const removeMoneySource = (id: string) => {
    dispatch(
      deleteMoneySource({
        data: id,
      }),
    );
  };

  const confirmDelete = (id: string) =>
    Alert.alert(
      'Remove money source',
      'Do you agree to remove this money source?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => removeMoneySource(id) },
      ],
    );

  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <BackArrow />
        <Text style={styles.pageTitle}>Money source</Text>
        <TouchableOpacity style={styles.addBtn} onPress={goToAddMoneySource}>
          <Icon name="plus" style={styles.addBtnIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data.map(item => (
          <View style={styles.item} key={item.id}>
            <EntypoIcon
              name="database"
              style={{ ...styles.itemIcon, color: YELLOW_COLOR }}
            />

            <View style={styles.itemName}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subTitle}>{item.description}</Text>
            </View>
            <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
              {item.created_by === userID && (
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => goToEditMoneySource(item)}>
                  <Icon name="edit" style={styles.itemIcon} />
                </TouchableOpacity>
              )}
              {item.created_by === userID && (
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <EntypoIcon
                    name="trash"
                    style={{ ...styles.itemIcon, color: RED_COLOR }}
                  />
                </TouchableOpacity>
              )}
              {item.created_by !== userID && (
                <View style={styles.dragBtn}>
                  <EntypoIcon name="menu" style={styles.itemIcon} />
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
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
    color: WHITE_COLOR,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: SECONDARY_BG_COLOR,
    borderBottomColor: THIRD_BG_COLOR,
    borderBottomWidth: 0.5,
  },
  itemName: {
    marginLeft: 10,
    color: WHITE_COLOR,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: WHITE_COLOR,
  },
  subTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: WHITE_COLOR,
    opacity: 0.4,
  },
  editBtn: {
    marginRight: 20,
  },
  dragBtn: {},
  itemIcon: {
    fontSize: 14,
    color: WHITE_COLOR,
  },
});

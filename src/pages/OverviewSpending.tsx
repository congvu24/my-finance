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
import { VictoryChart, VictoryPie } from 'victory-native';

export default function OverviewSpending({ navigation }) {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.header}>
        <BackArrow navigation={navigation} />
        <Text style={styles.typeText}>Overview</Text>
      </View>
      <View style={styles.chartContainer}>
        <VictoryPie
          width={300}
          data={[
            { x: 'Cats', y: 35 },
            { x: 'Dogs', y: 40 },
            { x: 'Birds', y: 55 },
          ]}
        />
      </View>
      <View style={styles.list}>
        <View style={styles.item}>
          <Text style={styles.itemTag}>99%</Text>
          <Text style={styles.itemName}>Other</Text>
          <Text style={styles.itemValue}>4.500.000</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  itemTag: {
    backgroundColor: 'red',
    paddingHorizontal: 4,
    fontSize: 12,
    borderRadius: 4,
    textAlign: 'center',
  },
  itemName: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 5,
  },
  itemValue: {
    marginLeft: 'auto',
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
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

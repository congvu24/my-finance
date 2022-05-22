import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { Collections } from '../contants/Collections';
import firestore from '@react-native-firebase/firestore';
import { AddInvestGold } from '../types/gold';
import { Gold } from '../models/Gold';

const goldColl = firestore().collection(Collections.Gold);

export async function getGoldPrice() {
  const response = await axios.get(
    'https://api.investing.com/api/financialdata/8830/historical/chart/?interval=P1M&pointscount=70',
  );
  console.log(response);
  const data = response.data.data.map(item => ({
    x: item[0],
    y: item[4],
  }));
  return data;
}

export async function addInvestGold(data: AddInvestGold) {
  const ref = await goldColl.add({
    ...data,
    created_by: auth().currentUser?.uid,
  });

  return (await ref.get()).data() as Gold;
}

export async function getGoldPortfolio() {
  return (
    await goldColl.where('created_by', '==', auth().currentUser?.uid).get()
  ).docs.map(item => {
    return {
      ...item.data(),
      date: (item.data().date._seconds * 1000).toString(),
      id: item.id,
    };
  }) as Gold[];
}

export async function getCurrentPrice() {
  try {
    const response = await axios.post(
      'https://api.backend-capital.com/proxy/trading/v1/quoteCurrent',
      {
        instrumentId: ['27045129890124996'],
      },
    );
    const data = response.data.quotes?.[0];
    return data;
  } catch (err) {
    console.log(err);
  }
}

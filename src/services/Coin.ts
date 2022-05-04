import auth from '@react-native-firebase/auth';
import { Collections } from '../contants/Collections';
import firestore from '@react-native-firebase/firestore';
import { Coin } from '../models/Coin';
import { AddInvestCoin } from '../types/coin';
import axios from 'axios';

const coinColl = firestore().collection(Collections.Coin);

export async function addInvestCoin(data: AddInvestCoin) {
  const ref = await coinColl.add({
    ...data,
    created_by: auth().currentUser?.uid,
  });

  return (await ref.get()).data() as Coin;
}

export async function getCoinPortfolio() {
  return (
    await coinColl.where('created_by', '==', auth().currentUser?.uid).get()
  ).docs.map(item => {
    return {
      ...item.data(),
      date: (item.data().date._seconds * 1000).toString(),
      id: item.id,
    };
  }) as Coin[];
}

export async function getCoinHistoryPrice(id: number) {
  const response = await axios.get(
    `https://www.binance.com/bapi/composite/v1/public/promo/cmc/cryptocurrency/detail/chart?id=${id}&range=1M`,
  );
  const data = response.data?.data?.body?.data?.points;
  const result = Object.keys(data).map(key => ({
    x: key,
    y: data[key].v[0],
  }));
  return result;
}

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Collections } from '../contants/Collections';
import { MoneySource } from '../models/MoneySource';
import { CreateMoneySource } from '../types/moneySource';

const moneySourceColl = firestore().collection(Collections.MoneySource);

export async function getAllMoneySource(): Promise<MoneySource[]> {
  console.log(auth().currentUser?.uid);
  const common = (
    await moneySourceColl.where('created_by', '==', 'admin').get()
  ).docs.map(item => ({
    ...item.data(),
    id: item.id,
  }));
  const createdByUser = (
    await moneySourceColl
      .where('created_by', '==', auth().currentUser?.uid)
      .get()
  ).docs.map(item => ({
    ...item.data(),
    id: item.id,
  }));

  return [...common, ...createdByUser] as MoneySource[];
}

export async function createMoneySource(
  data: CreateMoneySource,
): Promise<MoneySource> {
  const ref = await moneySourceColl.add({
    ...data,
    created_by: auth().currentUser?.uid,
  });

  return (await ref.get()).data() as MoneySource;
}

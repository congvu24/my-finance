import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Collections } from '../contants/Collections';
import { MoneySource } from '../models/MoneySource';
import { CreateMoneySource, UpdateMoneySource } from '../types/moneySource';

const moneySourceColl = firestore().collection(Collections.MoneySource);

export async function getAllMoneySource(): Promise<MoneySource[]> {
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

export async function updateMoneySource(
  id: string,
  data: UpdateMoneySource,
): Promise<MoneySource> {
  await moneySourceColl.doc(id).update({
    ...data,
    created_by: auth().currentUser?.uid,
  });
  const ref = await moneySourceColl.doc(id);

  return (await ref.get()).data() as MoneySource;
}

export async function removeMoneySource(id: string): Promise<any> {
  await moneySourceColl.doc(id).delete();
}

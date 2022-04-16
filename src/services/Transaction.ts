import auth from '@react-native-firebase/auth';
import { Transaction } from '../models/Transaction';
import firestore from '@react-native-firebase/firestore';
import { Collections } from '../contants/Collections';
import { CreateTransaction } from '../types/transaction';

const transactionColl = firestore().collection(Collections.Transaction);

export async function getAllTransaction(): Promise<Transaction[]> {
  return (
    await transactionColl
      .where('created_by', '==', auth().currentUser?.uid)
      .get()
  ).docs.map(item => {
    return {
      ...item.data(),
      date: (item.data().date._seconds * 1000).toString(),
      id: item.id,
    };
  }) as Transaction[];
}

export async function createTransaction(
  data: CreateTransaction,
): Promise<Transaction> {
  const ref = await transactionColl.add({
    ...data,
    created_by: auth().currentUser?.uid,
  });

  return (await ref.get()).data() as Transaction;
}

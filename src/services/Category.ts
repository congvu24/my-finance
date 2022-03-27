import firestore from '@react-native-firebase/firestore';
import { Collections } from '../contants/Collections';
import { Category } from '../models/Category';

const categoryColl = firestore().collection(Collections.Category);

export async function getAllCategory(): Promise<Category[]> {
  return (await categoryColl.get()).docs.map(item => ({
    ...item.data(),
    id: item.id,
  })) as Category[];
}

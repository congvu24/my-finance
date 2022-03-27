import firestore from '@react-native-firebase/firestore';
import { Collections } from '../contants/Collections';
import { User } from '../models/User';
import { SetProfileData } from '../types/user';

const userColl = firestore().collection(Collections.User);

export async function createProfile(data: SetProfileData) {
  const ref = userColl.doc(data.id);
  await ref.set(data);
  return (await ref.get()).data();
}

export async function getProfile(userId: string): Promise<User> {
  console.log(userId);
  return (await userColl.doc(userId).get()).data() as User;
}

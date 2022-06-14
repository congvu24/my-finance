import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Collections } from '../contants/Collections';
import { SettingSpending, UpdateSetting } from '../types/setting';

const settingColl = firestore().collection(Collections.Setting);

export async function getAllSetting(): Promise<SettingSpending[]> {
  return (
    await settingColl.where('created_by', '==', auth().currentUser?.uid).get()
  ).docs.map(item => {
    return {
      ...item.data(),
      id: item.id,
    };
  }) as unknown as SettingSpending[];
}

export async function updateSetting(
  data: UpdateSetting,
  id?: string,
): Promise<Boolean> {
  try {
    if (id) {
      await settingColl.doc(id).update({ ...data });
      return true;
    } else {
      await settingColl.add({
        category: data.category,
        categoryName: data.categoryName,
        limit: data.limit,
        created_by: auth().currentUser?.uid,
      });
      return true;
    }
  } catch (err) {
    return false;
  }
}

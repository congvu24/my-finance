import auth from '@react-native-firebase/auth';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Toast from 'react-native-root-toast';
import { User } from '../../models/User';
import { createProfile, getProfile } from '../../services/User';
import { SignUpData } from '../../types/user';
import { PayloadWithCallback } from '../../types/utils';
import { offLoading, onLoading } from './app';

export const signUp = createAsyncThunk(
  'user/signup',
  async (data: SignUpData, thunkApi) => {
    try {
      thunkApi.dispatch(onLoading());
      await auth().createUserWithEmailAndPassword(data.email, data.password);

      await auth().currentUser?.updateProfile({
        displayName: data.name,
      });
      const currentUser = auth().currentUser;

      if (currentUser) {
        const profileData = await createProfile({
          id: currentUser.uid || '',
          email: currentUser.email || '',
          phone: data.phone,
          name: data.name,
        });

        thunkApi.dispatch(
          setLogin({ ...(profileData as User), uid: currentUser?.uid }),
        );
      }
    } catch (err) {
      Toast.show('Your information has been duplicated', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        textStyle: {
          fontSize: 12,
        },
      });
    } finally {
      thunkApi.dispatch(offLoading());
    }
  },
);

export const signIn = createAsyncThunk(
  'user/signin',
  async (data: SignUpData, thunkApi) => {
    try {
      thunkApi.dispatch(onLoading());
      await auth().signInWithEmailAndPassword(data.email, data.password);

      const currentUser = auth().currentUser;

      if (currentUser) {
        const profileData = await getProfile(currentUser.uid);
        thunkApi.dispatch(
          setLogin({ ...(profileData as User), uid: currentUser?.uid }),
        );
      }
    } catch (err) {
      Toast.show('Sign in failed', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        textStyle: {
          fontSize: 12,
        },
      });
    } finally {
      thunkApi.dispatch(offLoading());
    }
  },
);

export const getCurrentProfile = createAsyncThunk(
  'user/getProfile',
  async (payload: PayloadWithCallback<null>, thunkApi) => {
    try {
      const currentUser = auth().currentUser;
      console.log(currentUser?.uid);
      const profile = await getProfile(currentUser?.uid || '');
      console.log(profile);
      thunkApi.dispatch(setLogin({ ...profile, uid: currentUser?.uid }));
      payload.onSuccess?.();
    } catch (err) {
      thunkApi.dispatch(removeLogin());
      payload.onFailed?.();
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '' as any,
    data: {} as User | {},
    isLogged: false,
  },
  reducers: {
    setLogin(state, action: PayloadAction<User>) {
      state.data = action.payload;
      state.isLogged = true;
      state.id = action.payload.uid;
    },
    removeLogin(state) {
      state.data = {};
      state.isLogged = false;
    },
  },
});

export const { setLogin, removeLogin } = userSlice.actions;
export default userSlice.reducer;

import {
  CREATE_USER,
  CREATE_USER_SESSION,
  MY_USER,
  UPDATE_USER_EMAIL,
  UPDATE_USER_NAME,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PHONE,
  WAIT_SESSION,
} from '@/graphql/api';

import { defineStore } from 'pinia';
import { useMutation, useQuery, useSubscription } from '@vue/apollo-composable';

export const useSessionStore = defineStore('session', () => {
  const token = ref(localStorage.getItem('token'));

  const queryMyUser = useQuery(MY_USER);
  const mutationCreateUser = useMutation(CREATE_USER);
  const mutationCreateUserSession = useMutation(CREATE_USER_SESSION);
  const mutationUpdateUserName = useMutation(UPDATE_USER_NAME);
  const mutationUpdateUserEmail = useMutation(UPDATE_USER_EMAIL);
  const mutationUpdateUserPhone = useMutation(UPDATE_USER_PHONE);
  const mutationUpdateUserPassword = useMutation(UPDATE_USER_PASSWORD);
  const subscriptionWaitSession = useSubscription(WAIT_SESSION);

  const user = ref(queryMyUser.result.value?.myUser);
  watch(
    queryMyUser.result,
    res => {
      user.value = res?.myUser;
    },
    { immediate: true },
  );

  subscriptionWaitSession.onError(() => setToken(null));

  async function setToken (tok) {
    localStorage.setItem('token', tok);
    token.value = tok;
    queryMyUser.result.value = null;
    if (tok) {
      subscriptionWaitSession.start();
      await queryMyUser.refetch();
    } else {
      subscriptionWaitSession.stop();
    }
  }

  async function signUp (name, login, password, email, phone) {
    const res = await mutationCreateUser.mutate({
      name,
      login,
      password,
      email,
      phone,
    });
    await setToken(res.data.createUser.token);
  }

  async function signIn (login, password) {
    const res = await mutationCreateUserSession.mutate({
      login,
      password,
    });
    await setToken(res.data.createUserSession.token);
  }

  async function signOut () {
    await setToken(null);
  }

  async function updateUserName (name) {
    const res = await mutationUpdateUserName.mutate({ name });
    user.value = res.data.updateUserName;
  }

  async function updateUserEmail (email) {
    const res = await mutationUpdateUserEmail.mutate({ email });
    user.value = res.data.updateUserEmail;
  }

  async function updateUserPhone (phone) {
    const res = await mutationUpdateUserPhone.mutate({ phone });
    user.value = res.data.updateUserPhone;
  }

  async function updateUserPassword (newPassword, oldPassword) {
    const res = await mutationUpdateUserPassword.mutate({
      newPassword,
      oldPassword,
    });
    user.value = res.data.updateUserPassword;
  }

  return {
    token,
    user,
    loading: queryMyUser.loading,
    error: queryMyUser.error,
    setToken,
    signUp,
    signIn,
    signOut,
    updateUserName,
    updateUserEmail,
    updateUserPhone,
    updateUserPassword,
  };
});

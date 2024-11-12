'use server';
import { auth, signIn, signOut, update } from '@/auth';

export const signInWithCredentials = async (
  initialState: { message: string },
  formData: FormData
) => {
  await signIn('credentials', {
    displayName: formData.get('displayName') || '', // `'null'` 문자 방지
    email: formData.get('email') || '',
    password: formData.get('password') || '',
    redirectTo: '/login', // 로그인 후 메인 페이지로 이동!
  });
};
export const signOutWithForm = async (formData: FormData) => {
  await signOut();
};

export const signInWithGoogle = async () => {
  await signIn('google', { redirectTo: '/' });
};

export const signInWithKakao = async () => {
  await signIn('kakao', { callbackUrl: '/login' });
};
export { auth as getSession, update as updateSession };

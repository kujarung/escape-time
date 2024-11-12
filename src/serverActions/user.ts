'use server';
import { redirect } from 'next/navigation';
import { getSession, updateSession } from '@/serverActions/auth';

export async function updateUser(formData: FormData) {
  const session = await getSession();
  const res = await fetch(`${process.env.HEROPY_API_URL}/auth/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.HEROPY_API_KEY as string,
      username: 'HEROPY',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      displayName: formData.get('displayName'),
    }),
  });
  const updatedUser = await res.json();
  await updateSession({
    user: {
      name: updatedUser.displayName,
    },
  });
  redirect('/myaccount'); // 화면 출력 갱신
}

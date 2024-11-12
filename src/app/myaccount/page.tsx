import { getSession } from '@/serverActions/auth';
import { updateUser } from '@/serverActions/user';

export default async function MyaccountPage() {
  const session = await getSession();
  return (
    <>
      <form action={updateUser}>
        <label>
          사용자 이름
          <input
            name="displayName"
            type="text"
            defaultValue={session?.user?.name || ''}
          />
        </label>
        <button type="submit">수정</button>
      </form>
    </>
  );
}

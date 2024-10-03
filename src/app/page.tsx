import { auth } from '@/utils/auth/auth';
import Chatbox from '@/app/components/chatbox';

export default async function Home() {
  const sesstion = await auth();
  return (
    <div className="flex h-screen flex-col items-start">
      <div className="p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-2 text-3xl font-bold">Welcome to RealChat</h1>
          {sesstion && <p className="text-xl">Hello, {sesstion.user.name}! Ready to connect?</p>}
        </div>
      </div>
      {sesstion && (
        <div className="px-8">
          <Chatbox />
        </div>
      )}
    </div>
  );
}

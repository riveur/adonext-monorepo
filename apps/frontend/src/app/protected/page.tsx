import { withServerAuth } from "@/components/common/auth";
import LogoutButton from "@/components/common/logout-button";
import UserInfo from "@/components/common/user-info";

const ProtectedPage = () => {
  return (
    <main className="min-h-screen flex flex-col gap-8 items-center justify-center">
      <h1 className="text-lg font-bold">This is protected route</h1>
      <LogoutButton />
      <div className="max-w-sm">
        <UserInfo />
      </div>
    </main>
  );
};

export default withServerAuth(ProtectedPage);
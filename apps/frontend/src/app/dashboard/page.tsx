import { withServerAuth } from "@/components/common/auth";
import UserInfo from "@/components/common/user-info";
import DashboardTitle from "./components/dashboard-title";

const DashboardPage = () => {
  return (
    <>
      <DashboardTitle title="Welcome to dashboard" />
      <p>Here you got an example of dashboard</p>
      <div className="max-w-sm">
        <UserInfo />
      </div>
    </>
  );
};

export default withServerAuth(DashboardPage);

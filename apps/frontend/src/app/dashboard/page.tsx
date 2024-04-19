import { withServerAuth } from "@/components/common/auth";
import UserInfo from "@/components/common/user-info";
import DashboardTitle from "./components/dashboard-title";
import DashboardLayout from "./components/dashboard-layout";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardTitle>Welcome to dashboard</DashboardTitle>
      <p>Here you got an example of dashboard</p>
      <div className="max-w-sm">
        <UserInfo />
      </div>
    </DashboardLayout>
  );
};

export default withServerAuth(DashboardPage);

import { withServerGuest } from "@/components/common/auth";
import { LoginForm } from "@/components/forms/login-form";

const LoginPage = () => {
  return (
    <main className="min-h-screen grid content-center">
      <LoginForm />
    </main>
  );
}

export default withServerGuest(LoginPage);
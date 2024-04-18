import { withServerGuest } from "@/components/common/auth";
import { RegisterForm } from "@/components/forms/register-form";

const RegisterPage = () => {
  return (
    <main className="min-h-screen grid content-center">
      <RegisterForm />
    </main>
  );
}

export default withServerGuest(RegisterPage);
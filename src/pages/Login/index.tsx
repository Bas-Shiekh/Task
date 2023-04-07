import { FC } from "react";
import { LoginForm } from "../../components";

const Login: FC<{language: string}> = ({ language }) => {
  return (
    <main dir={language === "en" ? "ltr" : "rtl"}>
      <LoginForm />
    </main>
  );
};

export default Login;

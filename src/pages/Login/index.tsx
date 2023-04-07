import { FC } from "react";
import { LoginForm } from "../../components";
import Background from "../../assets/background.png";
import LangSwitcher from "../../components/LangSwitcher";

const Login: FC<{ language: string }> = ({ language }) => {
  return (
    <main dir={language === "en" ? "ltr" : "rtl"} style={{ display: "flex" }}>
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "50%",
        }}
      >
        <span className="layer" />
        <img src={Background} alt="" className="background" />
      </div>
      <LangSwitcher
        style={{
          position: "absolute",
          right: language === "en" ? "4rem" : "",
          top: "2rem",
          left: language === "ar" ? "4rem" : "",
        }}
      />
      <LoginForm />
    </main>
  );
};

export default Login;

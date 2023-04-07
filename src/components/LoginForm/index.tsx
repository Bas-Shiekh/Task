import { FC } from "react";
import { Button, Form, Input } from "antd";
import "./index.css";
import { useSignIn } from "../../hooks/auth.hook";
import { useTranslation } from "react-i18next";

const LoginForm: FC = () => {
  const { mutateAsync } = useSignIn();
  const onFinish = (values: any) => {
    mutateAsync(values);
  };
  const { t } = useTranslation();

  return (
    <div className="login-form-container">
      <h1>{t("login")}</h1>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 1000,
          outline: "1px solid #cccccc",
          padding: "2rem 2rem",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={t("email")}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          style={{ width: "100%" }}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label={t("password")}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {t("submit")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;

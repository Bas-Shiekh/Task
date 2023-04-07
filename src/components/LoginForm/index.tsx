import { FC, useEffect } from "react";
import { Button, Form, Input } from "antd";
import "./index.css";
import { useSignIn } from "../../hooks/auth.hook";



const LoginForm: FC = () => {
  const { mutateAsync } = useSignIn();
  const onFinish = (values: any) => {
    mutateAsync(values);
  };

  return (
    <div className="login-form-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 800,
          outline: "1px solid #cccccc",
          padding: "4rem 2rem",
          borderRadius: "1rem",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;

import { Button, Form, Input, InputNumber, message } from "antd";
import ImageUploader from "../UploadImage";
import { useState, FC } from "react";
import apiService from "../../api/ApiService";

const validateMessages = {
  required: "${label} is required!",
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddForm: FC<{ setIsModalOpen: Function; }> = ({
  setIsModalOpen,
}) => {
  const [base64Image, setBase64Image] = useState<string>("");
  const [initialValues, setInitialValues] = useState<any | null>(null);

  const onFinish = async (values: any) => {
    const { status } = await apiService.post(`/api/v1/vendor/manufacturers`, {
      ...values,
      image: base64Image,
    });
    if (status === 200) {
      setIsModalOpen(false);
      message.success("item was added successfully");
    } else message.error("error");
  };

  return (
    <Form
      name="nest-messages"
      onFinish={onFinish}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      validateMessages={validateMessages}
      initialValues={initialValues}
    >
      <Form.Item
        name={["name", "en"]}
        label="English Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["name", "ar"]}
        label="Arabic Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <ImageUploader
        base64Image={base64Image}
        setBase64Image={setBase64Image}
      />
      <Form.Item name={["sort"]} label="sort" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddForm;

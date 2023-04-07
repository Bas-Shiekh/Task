import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import { Item } from "../../interfaces";
import apiService from "../../api/ApiService";
import ImageUploader from "../UploadImage";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const EditForm: React.FC<{
  item: Item;
  setIsChanged: Function;
  setIsModalOpen: Function;
}> = ({
  item: { name, sort_order, image, id },
  setIsChanged,
  setIsModalOpen,
}) => {
  const [form] = Form.useForm();

  const [base64Image, setBase64Image] = useState<string>(image);
  const [initialValues, setInitialValues] = useState<any>({
    name,
    sort: sort_order,
    image,
    id,
  });

  useEffect(() => {
    form.setFieldsValue({
      name,
      sort: sort_order,
      image,
      id,
    });
  }, [name, image, id, sort_order, form]);

  const onFinish = async (values: any) => {
    const { status } = await apiService.put(
      `/api/v1/vendor/manufacturers/${id}`,
      {
        ...values,
        image: base64Image,
      }
    );
    if (status === 200) {
      setIsModalOpen(false);
      message.success("item was updated successfully");
      setIsChanged((prev: boolean) => !prev);
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
      form={form}
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

export default EditForm;

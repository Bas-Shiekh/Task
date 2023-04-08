import { FC, useEffect, useState } from "react";
import { Form, Modal, Pagination, Switch, Table, message } from "antd";
import apiService from "../../api/ApiService";
import { IUserName, Item } from "../../interfaces";
import EditForm from "../EditForm";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ManufacturerTable: FC = () => {
  const { t } = useTranslation();
  const lang = useSelector((state: any) => state);
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const getData = async () => {
    const { data, status } = await apiService.get(
      `/api/v1/vendor/manufacturers?per_page=${pagination.pageSize}&page=${pagination.current}&search=`,
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );
    if (status === 200) {
      setData(data.data);
      setPagination({
        ...pagination,
        total: data.pages.total,
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (currentItem) showModal();
  }, [currentItem]);

  useEffect(() => {
    getData();
  }, [pagination.current, isChanged]);

  const handleDelete = async (id: number) => {
    const response = await apiService.delete(
      `api/v1/vendor/manufacturers/${id}`
    );

    if (response.status === 200) {
      message.success("item was deleted successfully");
      setIsChanged((prev) => !prev);
    } else message.error("error");
  };

  const handlePageChange = (page: number) => {
    setPagination({
      ...pagination,
      current: page,
    });
  };

  const handleStatusChange = async (record: Item) => {
    const response = await apiService.put(
      `api/v1/vendor/manufacturers/status/${record.id}`,
      { status: record.status === 1 ? 0 : 1 }
    );

    if (response.status === 200) {
      message.success("item status was updated successfully");
      setIsChanged((prev) => !prev);
    } else message.error("error");
  };

  const columns = [
    {
      title: t("image"),
      dataIndex: "image",
      width: "15%",
      render: (src: string) => (
        <img src={src} alt="avatar" style={{ width: "30px", height: "30px" }} />
      ),
    },
    {
      title: t("name"),
      dataIndex: "name",
      width: "20%",
      render: (name: IUserName) => (
        <div>{lang === "en" ? name.en : name.ar}</div>
      ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      width: "15%",
      render: (_: any, record: Item) => (
        <Switch
          defaultChecked={record.status ? true : false}
          onChange={() => handleStatusChange(record)}
        />
      ),
    },
    {
      title: t("sort_order"),
      dataIndex: "sort_order",
      width: "20%",
    },
    {
      title: t("operation"),
      dataIndex: "operation",
      width: "20%",

      render: (_: any, record: Item) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "2rem",
            }}
          >
            <EditOutlined
              style={{ fontSize: "1.5rem", color: "#15c896" }}
              onClick={() => {
                setCurrentItem(record);
              }}
            />

            <DeleteOutlined
              style={{ fontSize: "1.5rem", color: "#c81515" }}
              onClick={() => handleDelete(record.id)}
            />
          </div>
        );
      },
    },
  ];

  const rowKey = (record: Item) => record.id;
  if (!data) return <p>loading ...</p>;

  return (
    <Form form={form} component={false}>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {currentItem && (
          <EditForm
            item={currentItem}
            setIsChanged={setIsChanged}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Modal>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey={rowKey}
        scroll={{ x: 500 }}
      />
      <Pagination
        defaultCurrent={1}
        total={pagination.total}
        current={pagination.current}
        pageSize={pagination.pageSize}
        onChange={handlePageChange}
      />
    </Form>
  );
};

export default ManufacturerTable;

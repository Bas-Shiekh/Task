import React, { FC, useState } from "react";
import { ManufacturerTable } from "../../components";
import { Button, Input, Layout, Menu, Modal, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Admin from "../../assets/me.png";
import { UserOutlined } from "@ant-design/icons";
import Avatar from "../../components/Avatar";
import LangSwitcher from "../../components/LangSwitcher";
import { useTranslation } from "react-i18next";
import AddForm from "../../components/AddForm";

const Manufacturers: FC<{ language: string }> = ({ language }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <main
      dir={language === "en" ? "ltr" : "rtl"}
      style={{ width: "100%", height: "100%" }}
    >
      <Layout style={{ width: "100%", height: "100%" }}>
        <Sider breakpoint="lg" collapsedWidth="0">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[UserOutlined].map((icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: t("manufacturers"),
            }))}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: "0 4rem", background: colorBgContainer }}>
            <div className="header">
              <div>
                {" "}
                <h3>{t("welcome")}</h3>
                <Avatar image={Admin} />
              </div>
              <LangSwitcher />
            </div>
          </Header>
          <Content
            style={{
              margin: "2rem 4rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Input placeholder="Search" style={{ width: "auto" }} />
              <Button
                style={{ width: "auto" }}
                onClick={() => setIsModalOpen(true)}
              >
                Add Manufacture
              </Button>
            </div>
            <ManufacturerTable />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Reach Online Group ©2023 Created by Basel Al-Sheikh
          </Footer>
          <Modal
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => setIsModalOpen(false)}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
          >
            <AddForm setIsModalOpen={setIsModalOpen} />
          </Modal>
        </Layout>
      </Layout>
    </main>
  );
};

export default Manufacturers;

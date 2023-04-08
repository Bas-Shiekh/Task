import React, { FC, useState } from "react";
import { ManufacturerTable } from "../../components";
import { Button, Input, Layout, Menu, MenuProps, Modal, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Admin from "../../assets/me.png";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Avatar from "../../components/Avatar";
import LangSwitcher from "../../components/LangSwitcher";
import { useTranslation } from "react-i18next";
import AddForm from "../../components/AddForm";
import JwtService from "../../api/JwtService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAuthActions } from "../../store/userAuth";

type MenuItem = Required<MenuProps>["items"][number];

const Manufacturers: FC<{ language: string }> = ({ language }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = userAuthActions;

  const handleLogout = () => {
    JwtService.destroyToken();
    if (!JwtService.getToken()) {
      dispatch(logout());
      navigate("/login");
    }
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    action?: Function,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      action,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(t("manufacturers"), "1", <UserOutlined />),
    getItem(
      <Button type="ghost" onClick={handleLogout} style={{ color: "#ff4d4f" }}>
        {t("logout")}
      </Button>,
      "2",
      <LogoutOutlined style={{ color: "#ff4d4f" }} />
    ),
  ];

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
            items={items}
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
                width: '100%'
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

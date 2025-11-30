import "./components/todo/todo.css";
import "./styles/global.css";
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import "./components/layout/layout.css";
import { Outlet } from "react-router-dom";
import { Layout, Spin } from "antd";
import { Content } from "antd/es/layout/layout.js";
import { useContext, useEffect } from "react";
import { getAccountApi } from "./services/api.service.js";
import { AuthContext } from "./components/context/auth.context.jsx";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    const res = await getAccountApi()
    if (res.data)
      setUser(res.data.user)
    setIsAppLoading(false)
  }

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      {isAppLoading === true ?
        <div style={{ position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <Spin tip="Loading..." size="large">
            {"Loading..."}
          </Spin>
        </div>
        :
        <>
          <Header />

          <Content style={{ padding: "16px" }}>
            <div className="layout__content-inner">
              <Outlet />
            </div>
          </Content>

          <Footer />
        </>
      }
    </Layout>
  )
}

export default App;
import "./components/todo/todo.css";
import "./styles/global.css";
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import "./components/layout/layout.css";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout.js";
import { useContext, useEffect } from "react";
import { getAccountApi } from "./services/api.service.js";
import { AuthContext } from "./components/context/auth.context.jsx";

const App = () => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    const res = await getAccountApi()
    if (res.data)
      setUser(res.data.user)
  }

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Header />

      <Content style={{ padding: "16px" }}>
        <div className="layout__content-inner">
          <Outlet />
        </div>
      </Content>

      <Footer />
    </Layout>
  )
}

export default App;
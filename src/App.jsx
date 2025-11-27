import "./components/todo/todo.css";
import "./styles/global.css";
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import "./components/layout/layout.css";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout.js";

const App = () => {
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Header />

      <Content style={{ padding: "24px" }}>
        <div className="layout__content-inner">
          <Outlet />
        </div>
      </Content>

      <Footer />
    </Layout>
  )
}

export default App;
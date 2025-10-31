import "./components/todo/todo.css";
import "./styles/global.css";
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import "./components/layout/layout.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App;
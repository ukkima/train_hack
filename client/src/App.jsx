import { Route, Routes } from "react-router";
import { Header } from "./components";
import { HomePage, LoginPage, RegisterPage } from "./pages";
import { homeLink, loginLink, registerLink } from "./consts";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path={homeLink()} element={<HomePage />} />
        <Route path={loginLink()} element={<LoginPage />} />
        <Route path={registerLink()} element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;

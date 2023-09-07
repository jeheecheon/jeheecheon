import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </MainLayout>
  );
}

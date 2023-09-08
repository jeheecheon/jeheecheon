import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/Main/MainLayout";
import AppRoutes from "./utils/AppRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Route>
    </Routes>
  );
}

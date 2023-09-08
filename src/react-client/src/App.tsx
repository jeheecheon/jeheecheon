import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/Blog/BlogLayout";
import AppRoutes from "./utils/AppRoutes";
import IPageProps from "./interfaces/page";

const Application: React.FunctionComponent<IPageProps> = props => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {AppRoutes.map((route, idx) => {
          const { element, ...rest } = route;
          return <Route key={idx} {...rest} element={element} />;
        })}
      </Route>
    </Routes>
  );
}

export default Application;

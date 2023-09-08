import About from "../pages/About";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/caterogies/:category',
    element: <About />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default AppRoutes;

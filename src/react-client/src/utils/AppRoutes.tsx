import About from "../pages/About";
import Demo from "../pages/Demo";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";

const AppRoutes = [
  {
    index: true,
    element: <Demo />
  },
  {
    path: '/Demo',
    element: <Demo />
  },
  {
    path: '/test',
    element: <Test />
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

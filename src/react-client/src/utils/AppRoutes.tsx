import About from "../pages/About";
import Demo from "../pages/Demo";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Posts from "../pages/Posts";
import CreatePost from "../pages/Posts/Manage/Create";
import UpdatePost from "../pages/Posts/Manage/Update";
import Test from "../pages/Test";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/Demo',
    element: <Demo />
  },
  {
    path: '/Posts',
    element: <Posts />
  },
  {
    path: '/Posts/Create',
    element: <CreatePost />
  },
  {
    path: '/Posts/Update/:postId',
    element: <UpdatePost />
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

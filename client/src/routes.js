import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: "/items",
    component: SearchPage,
    exact: true
  },
  {
    path: "/items/:id",
    component: ProductPage,
    exact: true
  },
  {
    component: NotFoundPage
  }
];

export default routes;

import Home from '../components/tabbar/tabbar';
import MovieList from '../views/movieList/movieList';
import MovieDetails from '../views/movieDetails/movieDetails';
let router = [
    {
        path: '/',//首页默认加载的页面
        Component: Home,
        exact: true //是否为严格模式
    },
    {
        path: '/movieList',
        Component: MovieList
    },
    {
        path: '/movieDetails/:id',
        Component: MovieDetails,
        routes: []
    }
];

export default router;
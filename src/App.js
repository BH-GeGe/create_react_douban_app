import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
// import Home from './components/tabbar/tabbar';
// import MovieList from './views/movieList/movieList';
// import MovieDetails from './views/movieDetails/movieDetails';
import router from './router/router';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {
            router.map(({ path, Component, exact = true, routes = [] }, key) => {
              return <Switch key={key}>
                <Route
                  exact={exact}
                  path={path}
                  render={props => (
                    //主要是为了传递嵌套路由到子组件 
                    <Component {...props} routes={routes} />
                  )}
                />
              </Switch>
            })
          }
        </div>
      </Router>
    );
  }
}
export default App;
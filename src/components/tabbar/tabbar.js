import React, { Component } from 'react';
import { TabBar, Toast } from 'antd-mobile';
import './tabbar.scss';
import Swiper from '../swiper/swiper';
import HotMovie from '../hotMovie/hotmovie';
// import api from '../../api/api';
import { getInTheaters, getComingSoon, getTop250, getNewMovie } from '../../api/common-api';
import Loading from '../loading/loading';

class TabBarModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'ListTab',
      hidden: false,
      start: 0,
      count: 6,
      allMovies: []
    };
  }

  UNSAFE_componentWillMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const { start, count } = this.state;
    return getInTheaters(start, count).then(res => {
      this.state.inTheatersMovies = res;
    }).then(() => {
      return getComingSoon(start, count).then(res => {
        this.state.ComingSoonMovies = res;
      })
    }).then(() => {
      return getTop250(start, count).then(res => {
        this.state.Top250Movies = res;
      })
    }).then(() => {
      return getNewMovie().then(res => {
        this.state.NewMovies = res;
      })
    }).then(() => {
      const { inTheatersMovies, ComingSoonMovies, Top250Movies, NewMovies } = this.state;
      this.setState({ allMovies: [inTheatersMovies, ComingSoonMovies, Top250Movies, NewMovies] });
      Toast.hide();
    })

  }

  render() {
    const { allMovies } = this.state;
    return (
      <div className="tabBarBox" style={{ position: 'fixed', height: '100%', minHeight: "101%", width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#000"
          barTintColor="#F5F5F5"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title="榜单"
            key="List"
            icon={
              <i className="fa fa-thumbs-o-up fa-lg"></i>
            }
            selectedIcon={
              <i className="fa fa-thumbs-up fa-lg"></i>
            }
            selected={this.state.selectedTab === 'ListTab'}
            badge={'new'}
            onPress={() => {
              this.setState({
                selectedTab: 'ListTab',
              });
            }}
            data-seed="logId"
          >
            {
              allMovies.length ?
                <div>
                  <Swiper />
                  <HotMovie allMovies={allMovies}></HotMovie>
                </div>
                : <Loading />
            }
          </TabBar.Item>
          <TabBar.Item
            title="搜索"
            key="Search"
            icon={
              <i className="fa fa-search fa-lg"></i>
            }
            selectedIcon={
              <i style={{ color: "#000" }} className="fa fa-search fa-lg"></i>
            }
            badge={''}
            selected={this.state.selectedTab === 'SearchTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'SearchTab',
              });
            }}
            data-seed="logId1"
          >
            <div>222</div>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className="fa fa-user-circle fa-lg"></i>
            }
            selectedIcon={
              <i className="fa fa-user-circle-o fa-lg"></i>
            }
            title="我的"
            key="My"
            selected={this.state.selectedTab === 'MyTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'MyTab',
              });
            }}
          >
            <div>333</div>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarModule;
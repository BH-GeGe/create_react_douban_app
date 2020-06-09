import React, { Component } from 'react';
import './movieList.scss';
import { getInTheaters, getComingSoon, getTop250, getNewMovie } from '../../api/common-api';
import utils from '../../utils/utils';
import Loading from '../../components/loading/loading';
import { Toast, PullToRefresh } from 'antd-mobile';
import { Link } from 'react-router-dom';
class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            start: 0,
            count: 10,
            movies: [],
            success: false,
            refreshing: false,
            distance: 60,
            down: false,
            height: document.documentElement.clientHeight
        }
    }

    UNSAFE_componentWillMount() {
        if (utils.getUrlAllParams(window.location.href).title) {
            this.state.type = utils.getUrlAllParams(window.location.href).title;
        }
    }

    componentDidMount() {
        this.getTypeMovie();
        window.onresize = () => {
            this.setState({height: document.documentElement.clientHeight});
        }
    }

    // 根据传参调取相应的接口
    getTypeMovie = async () => {
        const { type, start, count } = this.state;
        if (utils.contains(type, '正在上映')) {
            await getInTheaters(start, count).then(res => {
                this.setState({ movies: res.subjects });
            });
        } else if (utils.contains(type, '即将上映')) {
            await getComingSoon(start, count).then(res => {
                this.setState({ movies: res.subjects });
            });
        } else if (utils.contains(type, 'Top250')) {
            await getTop250(start, count).then(res => {
                this.setState({ movies: res.subjects });
            });
        } else if (utils.contains(type, '新片榜')) {
            await getNewMovie().then(res => {
                this.setState({ movies: res.subjects });
            });
        }
        this.setState({ success: true });
        Toast.hide();
    }
    // 上拉加载更多
    loadMoreMovies = async () => {
        const { type, movies, count } = this.state;
        let start = movies.length;
        let _this = this;
        function returnResult(res) {
            if(res && res.subjects.length) {
                _this.setState({ movies: movies.concat(res.subjects) });
            }else {
                _this.setState({distance: -1});
            }
        }
        if (utils.contains(type, '正在上映')) {
            await getInTheaters(start, count).then(res => {
                returnResult(res);
            });
        } else if (utils.contains(type, '即将上映')) {
            await getComingSoon(start, count).then(res => {
                returnResult(res);
            });
        } else if (utils.contains(type, 'Top250')) {
            await getTop250(start, count).then(res => {
                returnResult(res);
            });
        } else if (utils.contains(type, '新片榜')) {
            this.setState({distance: -1});
        }
        this.setState({ refreshing: false });
    }

    render() {
        const { movies, success, distance } = this.state;
        return (
            success ?
                <section className="ListBox" style={{ minHeight: window.screen.height }}>
                    <PullToRefresh
                        damping={distance}
                        style={{
                            height: this.state.height,
                            overflow: 'auto'
                        }}
                        indicator={this.state.down ? {} : { deactivate: '上拉加载更多', finish: '没有数据了' }}
                        direction={this.state.down ? 'down' : 'up'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true });
                            setTimeout(() => {
                                this.loadMoreMovies();
                            }, 1000);
                        }}
                    >
                        {

                            movies.map((obj, index) => {
                                return (
                                    <Link className="linkA" key={index} to={{ pathname: `/movieDetails/${obj.id}` }}>
                                        <div className="movieItem">
                                            <div className="clearfix">
                                                <img src={obj.images['small']} alt="封面" />
                                                <div>
                                                    <p>{obj.title}</p>
                                                    <p>{obj.original_title} {obj.year}</p>
                                                    <p>导演： {obj.directors.map((item, ind) => {
                                                        return <span key={ind}>{item.name}</span>
                                                    })}</p>
                                                </div>
                                                <span className="score">{obj.rating['average']}</span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        <p style={{
                            display: distance===-1?'block':'none',
                            textAlign: 'center',
                            color: '#999',
                            letterSpacing: '2px',
                            padding: '0 0 10px 0'
                        }}>
                            没有更多了
                        </p>
                    </PullToRefresh>
                </section>
                : <Loading />
        )
    }
}

export default MovieList;
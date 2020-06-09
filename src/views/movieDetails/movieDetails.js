import React, { Component } from 'react'
import './movieDetails.scss'
import { getMovieDetails } from '../../api/common-api';
import api from '../../api/api'
import Loading from '../../components/loading/loading';
import { Toast, PullToRefresh } from 'antd-mobile';

class MovieDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            start: 0,
            next_start: 10,
            count: 10,
            movieInfo: {},
            commentInfo: {},
            comments: [],
            success: false,
            refreshing: false,
            distance: 60,
            down: false,
            height: document.documentElement.clientHeight
        }
    }

    UNSAFE_componentWillMount() {
        if (this.props.match.params.id) {
            this.state.id = this.props.match.params.id;
        }
    }

    componentDidMount() {
        this.getMovieDetails();
        window.onresize = () => {
            this.setState({height: document.documentElement.clientHeight});
        }
    }

    getMovieDetails = async () => {
        const { id, start, count } = this.state;
        await getMovieDetails(id).then(res => {
            this.setState({ movieInfo: res });
        })
        await api.getMovieComments(id, start, count).then(res => {
            this.setState({ commentInfo: res, comments: res.comments });
            this.state.next_start = res.next_start;
        })
        this.setState({ success: true });
        Toast.hide();
    }

    loadMovieComments = async () => {
        const { id, next_start, count, comments } = this.state;
        await api.getMovieComments(id, next_start, count).then(res => {
            if(res && res.comments.length) {
                this.setState({ comments: comments.concat(res.comments) });
                this.state.next_start = res.next_start;
            }else {
                this.setState({distance: -1});
            }
        })
        this.setState({ refreshing: false });
    }

    render() {
        const { movieInfo, comments, commentInfo, success, distance } = this.state;
        let style = {
            height: '100%',
            width: '100%',
            position: 'fixed',
            top: 0,
            bottom: 0,
            zIndex: 1
        }
        let style2 = {
            position: 'absolute',
            zIndex: 2,
            top: 0,
            minHeight: '100%',
            minWidth: '100%',
            backgroundColor: 'rgba(255,255,255,.8)'
        }
        return (
            success ?
                <section className="movieDetails">
                    <img style={style} src={movieInfo.image} alt="" />
                    <div style={style2}>
                        <PullToRefresh
                            damping={distance}
                            style={{
                                height: this.state.height,
                                overflow: 'auto'
                            }}
                            indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                            direction={this.state.down ? 'down' : 'up'}
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                setTimeout(() => {
                                    this.loadMovieComments();
                                }, 1000);
                            }}
                        >
                            <div className="movieImage">
                                <img src={movieInfo.image} alt="" />
                                <p>{movieInfo.title || movieInfo.alt_title}({movieInfo.attrs['year']})</p>
                            </div>
                            <div className="score">
                                <p>评分：{movieInfo.rating['average']}</p>
                                <p>导演：{movieInfo.attrs.director ? movieInfo.attrs.director[0] : ''}</p>
                                <p>主演：{movieInfo.attrs.cast.slice(0, 3).map((ele) => ele)} ...</p>
                            </div>
                            <div className="summary">
                                <h3>摘要：</h3>
                                <p>{movieInfo.summary}</p>
                            </div>
                            <div className="comment">
                                <h4>{commentInfo.subject.title}的热评. . . <span>(全部{commentInfo.total}条)</span></h4>
                                {
                                    comments.map((ele, index) => {
                                        return (
                                            <div key={index} className="commentItem">
                                                <img src={ele.author.avatar} alt="" />
                                                <div>
                                                    <span>{ele.author.name}</span>
                                                    <span>{ele.author.signature}</span>
                                                    <p>{ele.content}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
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
                    </div>
                </section>
                : <Loading />
        )
    }
}

export default MovieDetails;
import React, { Component } from 'react';
import './hotmovie.scss';
import { NoticeBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
class HotMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allMovies: [],
        }
    }

    componentDidMount() {

    }
    render() {
        const { allMovies } = this.props;
        return (
            <section>
                <div>
                    <div className="noticeBar">
                        <NoticeBar style={{ backgroundColor: '#F5F5F5' }} marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                            豆瓣温馨提醒：请爱护您的双眼，避免长时间观看，祝您天天开心，生活愉快！
                        </NoticeBar>
                    </div>
                    {
                        allMovies.map((obj, index) => {
                            return (
                                <div className="hotMovieList" key={index}>
                                    <div className="sliderBox">
                                        <Link
                                            to={{
                                                pathname: `/movieList?title=${obj.title}`
                                            }}
                                        >
                                            <div className="boxTitle">
                                                <span className="typeTitle">{obj.title}</span>
                                                <span className="more"><i className="fa fa-angle-right fa-lg"></i></span>
                                            </div>
                                        </Link>
                                        <ul className="movieList">
                                            {obj.subjects.map((ele, index) => {
                                                return (
                                                    <Link key={index} to={{ pathname: `/movieDetails/${ele.id}` }}>
                                                        <li>
                                                            <img src={ele.subject ? ele.subject.images.small : ele.images.small} alt="" />
                                                            <span>{ele.subject ? ele.subject.title : ele.title}</span>
                                                        </li>
                                                    </Link>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        )
    }
}

export default HotMovie;
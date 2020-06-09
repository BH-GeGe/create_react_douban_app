import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import "./swiper.scss"

class Swiper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            swiperData: [
                { url: './images/jd.png', href: 'https://m.jd.com/', id: 1 },
                { url: './images/taobao.png', href: 'https://main.m.taobao.com/', id: 2 },  // 在public文件夹下面则路径不需要带有public
                { url: './images/suning.png', href: 'http://m.suning.com', id: 3 }
            ],
            imgHeight: window.screen.width/1.875
        }
    }

    componentDidMount() {
        
    }

    render() {
        const { swiperData, imgHeight } = this.state;
        return (
            <section className="myCarousel">
                <Carousel
                    autoplay={true}
                    infinite
                >
                    {swiperData.map(val => (
                        <a
                            key={val.id}
                            href={val.href}
                            style={{ display: 'inline-block', width: '100%', height: imgHeight }}
                        >
                            <img
                                src={val.url}
                                alt=""
                                style={{ width: '100%', height: imgHeight, verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            </section>
        )
    }
}

export default Swiper;
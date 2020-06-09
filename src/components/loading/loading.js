import React, { Component } from 'react';
import './loading.scss';
import { Toast } from 'antd-mobile';


class Loading extends Component {
    componentDidMount() {
        Toast.loading('拼命加载中...', 0);
    }

    render() {
        return (
            <section></section>
        )
    }
}

export default Loading;
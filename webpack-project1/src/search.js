"use strict";
import React from "react";
import ReactDom from "react-dom";
import './search.less';
import picture from './image/haiys60.jpg'

class Search extends React.Component {

    render() {
        return <div className = "search-text" > < img src = { picture }
        />搜索文字的内容hello < /div > ;
    }
}

ReactDom.render( <
    Search / > ,
    document.getElementById('root')
);
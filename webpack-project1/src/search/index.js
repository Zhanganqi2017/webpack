"use strict";
import React from "react";
import ReactDom from "react-dom";
import { a } from "./tree-shaking.js";
import "../../common/index.js";
import './search.less';
import picture from './image/haiys60.jpg'

class Search extends React.Component {

    render() {
        const funcA = a();
        return <div className = "search-text" > < img src = { picture }
        />{funcA}搜索文字的内容hello < /div > ;
    }
}

ReactDom.render( <
    Search / > ,
    document.getElementById('root')
);
"use strict";
import React from "react";
import ReactDom from "react-dom";
import { a } from "./tree-shaking.js";
import "../../common/index.js";
import './search.less';
import picture from './image/haiys60.jpg'

class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Text: null
        }
    }
    loadComponnet() {
        import ('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            });
        });
    }
    render() {
        const { Text } = this.state;
        const funcA = a();
        return <div className = "search-text" > { Text ? < Text / > : null } < img src = { picture }
        onClick = { this.loadComponnet.bind(this) }
        />{funcA}搜索文字的内容hello < /div > ;
    }
}

ReactDom.render( <
    Search / > ,
    document.getElementById('root')
);
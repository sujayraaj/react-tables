import React, {Component} from 'react';

export default class SearchBox extends Component {
    render(){
        return <input type="search" onChange={(evt)=>{this.props.changeCallback(evt.target.value)}} />
    }
}
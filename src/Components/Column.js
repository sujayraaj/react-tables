import React, {Component} from 'react';

export default class Column extends Component {
    render(){
        return <td>{this.props.data}</td>
    }
}
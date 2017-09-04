import React, {Component} from 'react';
import Column from './Column';

export default class Row extends Component {
    generateColumns(){
        return this.props.data.map((val,ind)=> <Column data={val} key={ind}/>);
    }
    render(){
        return <tr>
            {this.generateColumns()}
        </tr>
    }
}
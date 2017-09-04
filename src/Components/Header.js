import React, {Component} from 'react';

export default class Header extends Component {
    render(){
          return (
          <thead><tr>
            {this.props.header.map( (val,ind)=> <th key={ind}>{val.title}</th> )}
            </tr></thead>)

    }
}
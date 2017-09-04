import React, {Component} from 'react';
import Header from '../Components/Header';
import TableBody from '../Components/TableBody';
import Row from '../Components/Row';

export default class Table extends Component {
    generateRows(){
      return this.props.data.map((val,ind)=> <Row /> );
    }
    render(){
        return (
            <table>
                <Header header={this.props.header} />
                <TableBody rows={this.props.data}/>
            </table>

        )
    }
}
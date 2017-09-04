import React, {Component} from 'react';
import Row from './Row';

export default class TableBody extends Component {
    generateRows(){
        return this.props.rows.map((val,ind)=> <Row data={val} key={ind}/>);
    }
    render(){
        return <tbody>
            { this.props.rows ? this.generateRows() : null}
        </tbody>;
    }
}
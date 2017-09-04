import React, {Component} from 'react';
import Header from '../Components/Header';
import TableBody from '../Components/TableBody';
import Row from '../Components/Row';
import Pagination from '../Components/Pagination';

export default class Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage : 0,
            pageSize : 10
        }
    }
    setCurrentPage(val){
        this.setState({currentPage:val});
    }
    componentDidMount(){
        this.setState({
            currentPage:0,
            pageSize:this.props.pagination
        })
    }
    generateRows(){
      return this.props.data.map((val,ind)=> <Row /> );
    }
    render(){
        let currentPage = this.state.currentPage;
        let pageSize = this.state.pageSize;
        let startIndex = currentPage*pageSize;
        let endIndex = startIndex+pageSize;
        let pages = Math.ceil( this.props.data.length / pageSize );
        console.log(pages);
        return (
            <table>
                <Header header={this.props.header} />
                <TableBody rows={this.props.data.slice(startIndex,endIndex)}/>
                <Pagination pages={pages} pageChange={this.setCurrentPage.bind(this)} />
            </table>

        )
    }
}
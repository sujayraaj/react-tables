import React, {Component} from 'react';
import Header from '../Components/Header';
import TableBody from '../Components/TableBody';
import Row from '../Components/Row';
import Pagination from '../Components/Pagination';
import SelectBox from '../Components/SelectBox';
import SearchBox from '../Components/SearchBox';


export default class Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage : 0,
            pageSize : 10,
            searchText : ''
        }
    }
    calculateRenderData(currentPage,searchText){
        if(searchText!='' ){
            this.data = this.props.data.filter((o) => o[0].indexOf(searchText) > -1 );
            this.pages = Math.ceil(this.data.length / this.state.pageSize);
        } else {
            this.data = this.props.data;
            this.pages = this.props.data.length / this.state.pageSize;
        }
        this.data = this.data.slice(this.state.pageSize * currentPage,this.state.pageSize * (currentPage + 1 ) );
    }
    setCurrentPage(currentPage){
        if( this.state.currentPage != currentPage ){
            this.calculateRenderData(currentPage,this.state.searchText);
        }
        this.setState({currentPage:currentPage,searchText:this.state.searchText});
    }
    componentDidMount(){
        this.setState({
            currentPage:0,
            pageSize:this.props.pagination
        });
        let currentPage = this.state.currentPage;
        let pageSize = this.state.pageSize;
        let startIndex = currentPage*pageSize;
        let endIndex = startIndex+pageSize;
        this.pages = Math.ceil( this.props.data.length / pageSize );
        this.data = this.props.data.slice(startIndex,endIndex);
    }
    generateRows(){
      return this.props.data.map((val,ind)=> <Row /> );
    }
    searchCallBack(val){
        this.calculateRenderData(0,val,true);
        this.setState({
            currentPage:0,
            searchText:val
        });
        
    }
    render(){
        return (<div>
            <SelectBox />
            <SearchBox changeCallback={this.searchCallBack.bind(this)} />
            <table>
                <Header header={this.props.header} />
                <TableBody rows={this.data}/>
                <Pagination pages={this.pages} pageChange={this.setCurrentPage.bind(this)} />
            </table>
            </div>
        )
    }
}
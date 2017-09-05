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
            searchText : '',
            sortStatus:false,
            sorted:false,
            initialized:false,
            data:[]
        }
    }
    calculateRenderData(currentPage,searchText){
        if(searchText!='' ){
            this.data = this.state.data.filter((o) => o[0].indexOf(searchText) > -1 );
            this.pages = Math.ceil(this.data.length / this.state.pageSize);
        } else {
            this.data = this.state.data;
            this.pages = this.state.data.length / this.state.pageSize;
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
            pageSize:this.props.pagination,
            initialized:true,
            data:this.props.data
        });
        let currentPage = this.state.currentPage;
        let pageSize = this.state.pageSize;
        let startIndex = currentPage*pageSize;
        let endIndex = startIndex+pageSize;
        this.pages = Math.ceil( this.props.data.length / pageSize );
        this.data = this.props.data.slice(startIndex,endIndex);
    }
    searchCallBack(val){
        this.calculateRenderData(0,val,true);
        this.setState({
            currentPage:0,
            searchText:val
        });        
    }
    componentWillUpdate(nextProps, nextState){
    }
    sortByName(){
        console.log('called');
        var that = this;
        let data = [... this.state.data];
        data.sort((a,b)=>{
            if( a[0][0] < b[0][0])
                return that.state.sortStatus ? -1 : 1 ;
            if( a[0][0] > b[0][0])
                return that.state.sortStatus ? 1 : -1;
            return 0;
        });
        this.data =  data.filter((o) => o[0].indexOf(that.state.searchText) > -1 ).slice(0,this.state.pageSize  );
        this.setState({
            sortStatus:!(that.state.sortStatus),
            currentPage:0,
            sorted:true,
            data:data
        });
    }
    render(){
        return (<div>
            <SelectBox />
            <SearchBox changeCallback={this.searchCallBack.bind(this)} />
            <table>
                <Header header={this.props.header} />
                <TableBody rows={this.data}/>
                <Pagination pages={this.pages} pageChange={this.setCurrentPage.bind(this)} selected={this.state.currentPage} />
            </table>
            <button onClick={(evt)=>{this.sortByName()}} >SortByName</button>
            </div>
        )
    }
}
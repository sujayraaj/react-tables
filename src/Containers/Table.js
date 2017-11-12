import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { Map, List } from 'immutable';
import Header from '../Components/Header';
import TableBody from '../Components/TableBody';
import Pagination from '../Components/Pagination';
import SelectBox from '../Components/SelectBox';
import SearchBox from '../Components/SearchBox';


export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState(props);
    }
    getInitialState(props){
        const configuration = {
            currentPage: 0,
            pageSize: 10,
            searchText: '',
            sortStatus: false,
            sorted: false,
            initialized: false,
            pages:1,
            startIndex:0,
            endIndex:1
        };
        return {
            configuration: Map(configuration),
            data: List([]),            
        };
    }
    calculateRenderData(currentPage, searchText) {
        if (searchText !== '') {
            this.data = this.state.data.filter(o => o[0].indexOf(searchText) > -1);
            this.pages = Math.ceil(this.data.length / this.state.pageSize);
        } else {
            this.data = this.state.data;
            this.pages = this.state.data.length / this.state.pageSize;
        }
        this.data = this.data.slice(this.state.pageSize * currentPage, this.state.pageSize * (currentPage + 1));
    }
    setCurrentPage(currentPage) {
        if( currentPage >=0){
            const pageSize = this.state.configuration.get('pageSize');
            const startIndex = currentPage * pageSize;
            const endIndex = startIndex + pageSize; 
            this.setState(({configuration})=> ({configuration:configuration.set('currentPage',currentPage)
                .set('startIndex',startIndex)
                .set('endIndex',endIndex)}));
        }
    }
    componentDidMount() {
        this.setState(({configuration})=>({
            data:List(this.props.data),
            configuration:configuration.set('currentPage',0)
                .set('pageSize',this.props.pagination)
                .set('initialized',true)
                .set('pages',Math.ceil(this.props.data.length / this.props.pagination))
                .set('startIndex',0)
                .set('endIndex',0+this.props.pagination)
        }));
    }
    searchCallBack(val) {
        this.setState(({configuration})=>({configuration:configuration.set('searchText', val)}));
    }
    sortByName() {
        const sortStatus  = this.state.configuration.get('sortStatus');
        const sortFunc = (a,b) => {
            if (a[0][0] < b[0][0]) { return sortStatus ? -1 : 1; }
            if (a[0][0] > b[0][0]) { return sortStatus ? 1 : -1; }
            return 0;
        };
        this.setState(({configuration,data})=>{
            return {
                configuration: configuration.update('sortStatus', v => !v),
                data: data.sort(sortFunc),
            };
        });
    }
    filterData(){
        const searchText = this.state.configuration.get('searchText');
        if(searchText.length >=2){
            const filteredData = this.state.data.filter( val => val[0].indexOf(searchText) >= 0);
            return {
                data: filteredData,
                dataLength: filteredData.size
            } ;
        }
        return {
            data:this.state.data,
            dataLength:this.state.data.size
        };
    }
    render() {
        const {data,dataLength} = this.filterData();
        const startIndex = this.state.configuration.get('startIndex');
        const endIndex = this.state.configuration.get('endIndex');
        return (<div>
            <SelectBox />
            <SearchBox changeCallback={this.searchCallBack.bind(this)} />
            <table>
                <Header header={this.props.header} />
                <TableBody rows={data.slice(startIndex,endIndex)} />
                <Pagination dataLength={dataLength} pageSize={this.state.configuration.get('pageSize')} pageChange={this.setCurrentPage.bind(this)} selected={this.state.configuration.get('currentPage')} />
            </table>
            <button onClick={() => { this.sortByName(); }} >SortByName</button>
        </div>
        );
    }
}

Table.propTypes = {
    pagination: PropTypes.number,
    header: PropTypes.array,
    data: PropTypes.array,
};
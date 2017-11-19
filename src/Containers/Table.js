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
    getInitialState(props={}){
        const configuration = {
            currentPage: 0,
            pageSize: props.numberOfPages,
            searchText: '',
            sortStatus: null,
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
    setCurrentPage(currentPage,newPageSize) {
        let pageSize;
        if(typeof newPageSize!== 'undefined')
            pageSize = newPageSize;
        else pageSize = this.state.configuration.get('pageSize');
        if( currentPage >=0){
            const startIndex = currentPage * pageSize;
            const endIndex = +startIndex + +pageSize; 
            this.setState(({configuration})=> ({configuration:configuration.set('currentPage',currentPage)
                .set('startIndex',startIndex)
                .set('endIndex',endIndex)
                .set('pageSize',pageSize)
            }));
        }
    }
    componentDidMount() {
        this.setState(({configuration})=>{
            let pages;
            if(!this.props.numberOfPages)
                pages = this.props.data.length;
            else 
                pages = Math.ceil(this.props.data.length / this.props.numberOfPages);
            
            return ({
                data:List(this.props.data),
                configuration:configuration.set('currentPage',0)
                    .set('initialized',true)
                    .set('pages',pages)
                    .set('startIndex',0)
                    .set('endIndex',0+this.props.numberOfPages)
                    .set('sortStatus',Object.keys(this.props.metrics).reduce((acc,curr)=>{
                        acc[curr] = false;
                        return acc;
                    },{}))
            });});
    }
    searchCallBack(val) {
        this.setState(({configuration})=>({configuration:configuration.set('searchText', val)}));
    }
    sortColumn(column,curriedSortFunc) {
        const sortStatus  = this.state.configuration.get('sortStatus')[column];
        const sortFunc = curriedSortFunc(sortStatus,column);
        this.setState(({configuration,data})=>{
            return {
                configuration: configuration.update('sortStatus', v => {
                    v[column]=!v[column];
                    return {...v};
                }),
                data: data.sort(sortFunc),
            };
        });
    }
    filterData(){
        const searchText = this.state.configuration.get('searchText');
        if(searchText.length !== ''){
            const filteredData = this.state.data.filter( val => val.name.toLowerCase().indexOf(searchText) >= 0);
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
        return (<div className={this.props.className}>
            {
                this.props.numberOfPages ? <SelectBox pageChange={this.setCurrentPage.bind(this)} />:null
            }
            
            <SearchBox changeCallback={this.searchCallBack.bind(this)} />
            <table>
                <Header metrics={this.props.metrics} sortColumn={this.sortColumn.bind(this)} />
                <TableBody rows={this.props.numberOfPages ? data.slice(startIndex,endIndex) : data} metrics={this.props.metrics} />
                {this.props.numberOfPages ? 
                    <Pagination dataLength={dataLength} pageSize={this.state.configuration.get('pageSize')} pageChange={this.setCurrentPage.bind(this)} selected={this.state.configuration.get('currentPage')} />:null}
            </table>
        </div>
        );
    }
}

Table.propTypes = {
    pagination: PropTypes.number,
    metrics: PropTypes.array,
    data: PropTypes.array,
    className: PropTypes.string,
};
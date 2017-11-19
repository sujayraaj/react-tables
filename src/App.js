import React from 'react';
import Table from './Containers/Table';
import { dataSet, metrics, pagingInfo } from './data';

class App extends React.PureComponent {
    render() {
        return (<div>
            <h1> Table Examples </h1>
            <h2>Table with Pagination, and Search</h2>
            <Table className="table1" data={dataSet} metrics={metrics} {...pagingInfo} />
            <h2>Table without Pagination, with Fixed header and Search</h2>
            <Table className="table2" data={dataSet} metrics={metrics} />
        </div>
        );
    }
}

export default App;


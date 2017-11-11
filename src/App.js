import React from 'react';
import Table from './Containers/Table';
import { dataSet, columnTitles, numberOfPages } from './data';

class App extends React.PureComponent {
    render() {
        return (
            <Table data={dataSet} header={columnTitles} pagination={numberOfPages} />
        );
    }
}

export default App;


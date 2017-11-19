import React from 'react';
import PropTypes from 'proptypes';
import curry from 'lodash/fp/curry';

const sortFunctionsList = {
    nameSortFunction: (sortStatus,column,a,b) =>{
        if (a[column][0] < b[column][0]) { return sortStatus ? -1 : 1; }
        if (a[column][0] > b[column][0]) { return sortStatus ? 1 : -1; }
        return 0;
    },
    salarySortFun:(sortStatus,column,sala,salb) =>{
        let a = parseInt(sala[column].slice(1).split(',').join(''),10);
        let b = parseInt(salb[column].slice(1).split(',').join(''),10);
        if (a < b) { return sortStatus ? -1 : 1; }
        if (a > b) { return sortStatus ? 1 : -1; }
        return 0;
    },
};

const sortingFunctions = {
    0:'nameSortFunction',
    1:'nameSortFunction',
    2:'nameSortFunction',
    3:'nameSortFunction',
};

export const Header = ({metrics,sortColumn}) => (<thead><tr>
    {metrics.map((val, ind) => val.visibility ? <th key={ind} onClick={(evt)=>{ let key = sortingFunctions[ind];
        key && sortColumn(val.id,curry(sortFunctionsList[key]));}}>{val.value}</th> : null)}
</tr>
</thead>);

Header.propTypes = {
    metrics: PropTypes.array,
};
export default Header;

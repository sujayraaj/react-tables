import React from 'react';
import PropTypes from 'proptypes';

export const Pagination = ({pageSize,pageChange,selected,dataLength}) => {
    if(!dataLength) return null;
    const pages =Math.ceil(dataLength / pageSize);
    const pageButtons = [...Array(pages||0)].map((val,ind)=>(<button
        key={ind}
        onClick={() => {
            pageChange(ind);
        }}
        style={selected === ind ? { backgroundColor: 'lightblue' } : {}}
    >{(ind + 1)}
    </button>));
    return (<tfoot>
        <tr>
            <td>
                {pageButtons}
            </td>
        </tr>
    </tfoot>);
};

Pagination.propTypes = {
    pages:PropTypes.number,
    pageChange: PropTypes.func,
    selected: PropTypes.number,
    dataLength: PropTypes.number,
    pageSize: PropTypes.number,
};

Pagination.defaultProps = {
    dataLength: 0
};

export default Pagination;
import React from 'react';
import PropTypes from 'proptypes';

export const Pagination = ({pages,pageChange,selected}) => {
    if(!pages) return null;
    const pageButtons  = [];
    for (let i = 0; i < pages; i++) {
        pageButtons.push(<button
            key={i}
            onClick={() => {
                pageChange(i);
            }}
            style={selected === i ? { backgroundColor: 'lightblue' } : {}}
        >{(i + 1)}
        </button>);
    }
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
};

export default Pagination;
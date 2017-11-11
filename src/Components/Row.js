import React from 'react';
import PropTypes from 'proptypes';
import Column from './Column';

export const Row = ({data}) => <tr>
    {data.map((val, ind) => <Column data={val} key={ind} />)}
</tr>;

Row.propTypes = {
    data: PropTypes.array,
};

export default Row;
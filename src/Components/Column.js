import React from 'react';
import PropTypes from 'proptypes';

export const Column  = ({data}) => <td className='custom'>{data}</td>;

Column.propTypes = {
    data: PropTypes.any,
};

export default Column;
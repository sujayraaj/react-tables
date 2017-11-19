import React from 'react';
import PropTypes from 'proptypes';
import Column from './Column';

export const Row = ({data,metrics}) => <tr>
    {metrics.map((val,ind)=>{
        return val.visibility ? <Column data={data[val.id]} key={ind} /> : null;
    })}
</tr>;

Row.propTypes = {
    data: PropTypes.object,
};

export default Row;
import React from 'react';
import PropTypes from 'proptypes';

export const Header = ({header}) => (<thead><tr>
    {header.map((val, ind) => <th key={ind}>{val.title}</th>)}
</tr>
</thead>);

Header.propTypes = {
    header: PropTypes.array,
};
export default Header;

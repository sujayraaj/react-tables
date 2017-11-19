import React from 'react';
import PropTypes from 'proptypes';

export const SearchBox = ({changeCallback}) =><span> Search: <input type="search" onChange={(evt) => {changeCallback(evt.target.value);}} /></span>;

SearchBox.propTypes = {
    changeCallback: PropTypes.func,
};

export default SearchBox;
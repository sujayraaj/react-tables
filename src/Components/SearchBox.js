import React from 'react';
import PropTypes from 'proptypes';

export const SearchBox = ({changeCallback}) => <input type="search" onChange={(evt) => {changeCallback(evt.target.value);}} />;

SearchBox.propTypes = {
    changeCallback: PropTypes.func,
};

export default SearchBox;
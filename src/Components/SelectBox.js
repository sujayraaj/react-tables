import React from 'react';

export const SelectBox  = ({pageChange})=> {
    return (<span>Show <select onChange={(evt)=>{pageChange(0,parseInt(evt.target.value,10));} }>
        <option default >10</option>
        <option>5</option>
        <option>7</option>
    </select> Entries</span>);
};
export default  SelectBox;
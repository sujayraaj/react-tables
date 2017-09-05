import React,{Component} from 'react';

export default class Pagination extends Component{
    render(){
        if(! this.props.pages ){
            return null;
        }
        let pages = [];
        for(let i=0;i<this.props.pages;i++){
            pages.push(<button key={i} onClick={(evt)=>{
                this.props.pageChange(i);
            }} style={ this.props.selected == i ? {backgroundColor:'lightblue'}:{}} >{(i+1)}</button>)
        }

        return <tfoot>
            <tr>
                <td>
                    {pages}
                </td>
            </tr>
        </tfoot>

    }
}
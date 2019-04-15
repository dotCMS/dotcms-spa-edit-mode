import React, { Component } from 'react';

import DateFormat from '../Shared/DateFormat';



function createMarkup(html) {
    return { __html: html };
}

export default class calendarEvent extends Component {
    render() {
        
        var startDate = new Date(this.props.startDate);
        var endDate = new Date(this.props.endDate);
        var desc = (this.props.description + "") ;
        desc = desc.length>200 ? this.props.description.substring(0,200) : this.props.description
        desc+="...";
        return (
            <div className="event">
                <h2>{this.props.title}</h2>

                <b>
                    <DateFormat dateString={startDate} /></b>
                    
                <span dangerouslySetInnerHTML={createMarkup(desc)} />


            </div>
        );
    }
}

import React from 'react'

export default function CurrencyDate(props) {
    
    const {getDate} = props;
    
    return (
        <div>
            Date:{getDate}
        </div>
    )
}

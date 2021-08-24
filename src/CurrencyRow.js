import React from 'react'


export default function CurrencyRow(props) {

    const {
        currencyOpt,
        selectedCurrency
    } = props

    return (
        <div>
            <input type="number" />
            <select value={selectedCurrency}>
                {currencyOpt.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

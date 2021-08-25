import React from 'react'


export default function CurrencyRow(props) {

    const {
        currencyOpt,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props

    return (
        <div>
            <input type="number" value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOpt.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

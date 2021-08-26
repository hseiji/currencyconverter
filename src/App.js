import './App.css';
// import Button from 'react-bootstrap/Button';
// import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from 'react'
import CurrencyRow from './CurrencyRow';
import CurrencyDate from './CurrencyDate';

const BASE_URL = 'https://api.frankfurter.app/latest';

function App() {
  
  const [currencyOpt, setCurrencyOpt] = useState([]);
  const [fromCurrency, setFromCurrency] = useState([]);
  const [toCurrency, setToCurrency] = useState([]);
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmout] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [currencyDate, setCurrencyDate] = useState([]);
  const currencyRates = useRef();

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

    useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0] // Object.keys() only gets the currency name
        currencyRates.current = data.rates
        setCurrencyOpt([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
        setCurrencyDate(data.date)
        
      })
      .catch((e) => {
        // console.log("Error while fetching first time")
        return (e);
      })
  }, []);
  
  // console.log(currencyRates.current);
  // console.log(currencyRates)

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?from=${fromCurrency}&to=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
    // setExchangeRate(currencyRates.current[toCurrency]);
    // console.log(currencyRates.current[1])

  }, [fromCurrency, toCurrency])

  
  function handleFromAmountChange(e) {
    setAmout(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmout(e.target.value);
    setAmountInFromCurrency(false);
  }

  
  return (
    <div className="App">
      <h1>Currency Converter</h1><CurrencyDate getDate={currencyDate}/>
      <CurrencyRow
        currencyOpt={currencyOpt}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div>=</div>
      <CurrencyRow
        currencyOpt={currencyOpt}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}

export default App;

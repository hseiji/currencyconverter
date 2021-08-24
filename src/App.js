import './App.css';
// import Button from 'react-bootstrap/Button';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.frankfurter.app/latest';

function App() {
  
  const [currencyOpt, setCurrencyOpt] = useState([]);
  const [fromCurrency, setFromCurrency] = useState([]);
  const [toCurrency, setToCurrency] = useState([]);
  console.log(currencyOpt)

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOpt([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
      })
  }, []);

  return (
    <div className="App">
      {/* <Alert variant="primary">This a Button</Alert> */}
      {/* <Button>Test</Button> */}
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyOpt={currencyOpt}
        selectedCurrency={fromCurrency}
      />
      <div>=</div>
      <CurrencyRow
        currencyOpt={currencyOpt}
        selectedCurrency={toCurrency}
      />
    </div>
  );
}

export default App;

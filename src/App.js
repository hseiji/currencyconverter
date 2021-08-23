import './App.css';
// import Button from 'react-bootstrap/Button';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react'
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.frankfurter.app/latest';

function App() {
  
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => console.log(data))
  }, []);

  return (
    <div className="App">
      {/* <Alert variant="primary">This a Button</Alert> */}
      {/* <Button>Test</Button> */}
      <h1>Currency Converter</h1>
      <CurrencyRow/>
      <div>=</div>
      <CurrencyRow/>
    </div>
  );
}

export default App;

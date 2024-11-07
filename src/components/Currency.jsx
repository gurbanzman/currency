import { useCallback, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";
import { API_KEY, BASE_URL } from "../security";

const iconStyle = {
  fontSize: "55px",
  color: "#100",
};

function Currency() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState(0);

  const exchange = useCallback(async(e) => {
   e.preventDefault();
   const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`)
   const result = ((response.data.data[toCurrency]) * amount).toFixed(2);
   setResult(result);
 },[amount,fromCurrency,toCurrency]);

  return (
    <div className="currency-section">
      <div className="currency-title">
        <h1 className="currency-title-head">Currency Calculator</h1>
      </div>
      <form className="currency-form">
        <div className="currency-form-section">
          <input
            type="number"
            name="number"
            className="currency-input custom-input"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <select
            className="from-currency-select custom-input"
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option>USD</option>
            <option>EUR</option>
            <option>TRY</option>
          </select>

          <FaLongArrowAltRight style={iconStyle} />

          <select
            className="to-currency-select custom-input"
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option>TRY</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
          <input
            type="number"
            name="number"
            className="currency-input custom-input"
            onChange={(e) => setResult(e.target.value)}
            value={result}
          />
        </div>
        <div className="currency-function">
          <button className="btn" onClick={exchange}>
            Change Values
          </button>
        </div>
      </form>
    </div>
  );
}

export default Currency;

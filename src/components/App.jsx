import React, { useEffect, useState } from "react";
import axios from  "axios";
import '../styles.css';

const App = ()=>{
    const [ticker, setTicker] = useState([]);


    useEffect(()=>{
        axios.get("http://localhost:8000/")
        .then((response)=>{
            console.log(response)
            setTicker(response.data);
        })
        .catch((error)=>{
            console.log("Error fetching datafrom the backend:",error);
        })
    },[])

    return(
        <div className="body">
            <h1>HODLINFO</h1>
            <div className="bestPrice">
                <p>Best Price to Trade</p>
            </div>
            <div className="detailsofBest">
                <h3>0.16%</h3>
                <h3>0.58%</h3>
                <h3 className="average">&#8377;24,44,701</h3>
                <h3>9.54%</h3>
                <h4>14.12%</h4>
            </div>
            <div className="detailsTime">
                <h6>5 Mins</h6>
                <h6>1 Hour</h6>
                <h6>Average BTC/INR set price.</h6>
                <h6>1 Day</h6>
                <h6>7 Days</h6>
            </div>
            <div className="tableFull">
            <table>
                <thead>
                    <tr>
                    <th>#</th>
                        <th>Platform</th>
                        {/* <th>Platform</th> */}
                        <th>Last Traded Price</th>
                        <th>Buy</th>
                        <th>Sell</th>
                        {/* <th>Differene</th> */}
                        {/* <th>Savings</th> */}
                    </tr>
                </thead>
                <tbody>
                    {ticker.map((ticker, index)=>(
                        <tr key={index}>
                            {<td>{index + 1}</td>}
                            <td>{ticker.name}</td>
                            <td>&#8377;{ticker.last}</td>
                            <td>&#8377;{ticker.buy}</td>
                            {/* <td>{ticker.}</td> */}
                            <td>&#8377;{ticker.sell}</td>
    
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <hr></hr>
            <footer>Copyrigth@{new Date().getFullYear()} Hodlinfo</footer>
            <div className="AddHome">
            <button>Add hodolinfo to home screen</button>
            </div>
        </div>
    )
}



export default App;
import React from "react";
import Stock from "./Stock";

const Stocks = ( {stocks, handleStockSubscribe, startTimeAndPrice} ) => {

    return(
        <>
        { React.Children.toArray(stocks.map((stock) => <Stock stock={stock} handleStockSubscribe={handleStockSubscribe}/>))}
        </>
    )
} 

export default Stocks;
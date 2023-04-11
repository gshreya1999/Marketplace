import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./TransactionsInfo.css";

export default function TransactionsInfo(props) {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2023-04-9",
      buyer: "0001",
      seller: "0002",
      item: "Ball",
      price: "5 ETH",
    },
    {
      id: 2,
      date: "2023-04-09",
      buyer: "0002",
      seller: "0001",
      item: "Shirt",
      price: "5 ETH",
    }
  ]);
  
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    if (!buttonClicked) {
      setButtonClicked(true);
      alert("Request sent!");
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center mb-5 heading">Transaction History</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>
                <i className="fas fa-hashtag"></i> Transaction #
              </th>
              <th>
                <i className="far fa-calendar-alt"></i> Date
              </th>
              <th>
                <i className="fas fa-user"></i> Buyer ID
              </th>
              <th>
                <i className="fas fa-user"></i> Seller
              </th>
              <th>
                <i className="fas fa-shopping-cart"></i> Item Info
              </th>
              <th>
                <i className="fas fa-dollar-sign"></i> Price
              </th>
              <th>
                <i className="far fa-comment-alt"></i> Review/Request Refund
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.buyer}</td>
                <td>{transaction.seller}</td>
                <td>{transaction.item}</td>
                <td>{transaction.price}</td>
                <td className="text-center">
                  <button className="btn btn-primary" onClick={handleButtonClick}>
                    <i className="far fa-comment-alt"></i> Review/Request Refund
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

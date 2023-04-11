import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./TransactionsInfo.css";

export default function TransactionsInfo(props) {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2022-04-10",
      buyer: "John",
      seller: "Jane",
      item: "Product A",
      price: "$100",
    },
    {
      id: 2,
      date: "2022-04-09",
      buyer: "Mary",
      seller: "Mark",
      item: "Product B",
      price: "$50",
    },
  ]);

  return (
    <div className="container-fluid">
      <h1 className="text-center mb-5">Transaction History</h1>
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
                <i className="fas fa-user"></i> Buyer
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
                <td>
                  <button className="btn btn-primary">
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

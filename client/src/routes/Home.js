import { useState, useEffect } from "react";

export default function Home(props) {
  const [itemStatus, setItemStatus] = useState(" Posted ");

  function buyItem() {
    alert('Are you sure you want to do buy this item?');
    setItemStatus(" Sold ");
  }

  function removeItem() {
    alert('Are you sure you want to do remove this item?');
    setItemStatus(" Removed ");
  }

  return (
    <div className="product">
      
        <div key={props.itemName} className="productCard">
          {props.previews &&
            props.previews.map((pic) => {
              return (
                <img src={pic} alt="product-img" className="productImage"></img>
              );
            })}
          <div>
            <h3 className="productName">{props.itemName}</h3>
            <p>{props.itemDescription}</p>
            <span>Price: {props.itemPrice} ETH </span>
            <div className="productTime">
              Pick up Location : {props.itemPickupLocation}
            </div>
            <h4>Status:{itemStatus} </h4>
          </div>
          <div>
            <button className="button" onClick={buyItem}>
              Buy
            </button>
            <button className="button" onClick={removeItem}>
              Remove
            </button>
          </div>
        </div>
      

    </div>
  );
}

import { useState } from "react";
import Home from "./Home";

export default function Post(props) {
  const [itemStatus, setItemStatus] = useState(" Posted ");
  const [show, setShow] = useState(false);

  function showListings() {
    setShow(true);
  }

  function removeItem() {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setItemStatus(" Removed ");
    }
  }

  return (
    <div className="product">
      {!show && props.itemName?.length > 0 && (
        <div key={props.itemName} className="productCard">
          {props.previews &&
            props.previews.map((pic) => {
              return (
                <img src={pic} alt="product-img" className="productImage" />
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
            <button className="button" onClick={removeItem}>
              Remove
            </button>
            <button className="button" onClick={showListings}>
              Show Listings
            </button>
          </div>
        </div>
      )}
      {show && (
        <div>
          <Home
            itemName={props.itemName}
            itemPrice={props.itemPrice}
            itemDescription={props.itemDescription}
            itemPickupLocation={props.itemPickupLocation}
            image={props.image}
            previews={props.previews}
          />
        </div>
      )}
    </div>
  );
}

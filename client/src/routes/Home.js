import { useState, useEffect } from "react";

export default function Home(props) {
  const [itemStatus, setItemStatus] = useState(" Posted ");

  function buyItem() {
    if(itemStatus==" Posted ") {
      alert('Are you sure you want to do buy this item?');
      setItemStatus(" Sold ");
    } else {
      alert('This item cannot be bought because it is already sold or removed.');
    }
  }

  function removeItem() {
    if (itemStatus === " Posted ") {
      alert("Are you sure you want to remove this item?");
      setItemStatus(" Removed ");
    } else {
      alert("This item cannot be removed because it is already sold or removed.");
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
     {props.itemName?.length >0  && 
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
}

    </div>
  );
}

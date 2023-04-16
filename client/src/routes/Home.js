
import { useState } from "react";
import '../Home.css';
import { getContractObject } from "../info/info";

export default function Home(props) {
  const [itemStatus, setItemStatus] = useState("Available");
  const [listings, setListings] = useState([]);
  
  function buyItem(id) {
    const updatedListings = [...listings];
    if(updatedListings[id].itemStatus === "Available") {
    if(window.confirm('Are you sure you want to buy this item?')){
      const contract = getContractObject();
      contract.buyItem(id);
      updatedListings[id].itemStatus = "Sold";
      setListings(updatedListings);
    }
  }
    else {
      alert('This item cannot be bought because it is already sold or removed.');
    }
  }

  function removeItem(id) {
    alert('Are you sure you want to remove this item?');
    const contract = getContractObject();
    contract.removeAd(id);
    setItemStatus(" Removed ");
  }
  
  function handlePost(item) {
    setListings([...listings, item]);
  }
  
  return (
    <div className="listingsContainer">
      {listings.map((listing, index) => (
        <div key={index} className="product">
          {listing.itemName?.length > 0 && (
            <div key={listing.itemName} className="productCard">
              {listing.previews &&
                listing.previews.map((pic, picIndex) => (
                  <img
                    key={picIndex}
                    src={`/images/${pic}`}
                    alt="product-img"
                    className="productImage"
                  />

                ))}
              <div className="productDetails">
                <h3 className="productName">{listing.itemName}</h3>
                <p className="productDescription">{listing.itemDescription}</p>
                <div className="productPriceAndLocation">
                  <span className="productPrice">Price: {listing.itemPrice} ETH </span>
                  <div className="productLocation">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{listing.itemPickupLocation}</span>
                  </div>
                </div>
                <div className={`productStatus productStatus--${listing.itemStatus.toLowerCase()}`}>
                  {listing.itemStatus}
                </div>
              </div>
              <div className="productActions">
              <button className="button" onClick={() => buyItem(index)} >
                  <i className="fas fa-shopping-cart"></i>
                  Buy
                </button>
                
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="product">
     {props.itemName?.length >0  && 
        <div key={props.itemName} className="productCard">
          {props.previews &&
            props.previews.map((pic) => {
              return (
                <img src={pic} alt="product-img" className="productImage"></img>
              );
            })}
          <div>
          <div className="productDetails">
                <h3 className="productName">{props.itemName}</h3>
                <p className="productDescription">{props.itemDescription}</p>
                <div className="productPriceAndLocation">
                  <span className="productPrice">Price: {props.itemPrice} ETH </span>
                  <div className="productLocation">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{props.itemPickupLocation}</span>
                  </div>
                </div>
                <div className={`productStatus productStatus--available`}>
                  Available
                </div>
              </div>
              <div className="productActions">
                <button className="button" onClick={buyItem}>
                  <i className="fas fa-shopping-cart"></i>
                  Buy
                </button>
                
              </div>
            
            
          </div>
        </div>
}

    </div>
    </div>
  
  

    
    
  );
}



import { useState, useEffect } from "react";
import '../home.css';

export default function Home(props) {
  const [itemStatus, setItemStatus] = useState(" Posted ");
  const [listings, setListings] = useState([
    {
      itemName: "Blue Shirt",
      itemDescription: "A stylish blue shirt for any occasion",
      itemPrice: 0.5,
      itemPickupLocation: "New York, NY",
      itemStatus: "Available",
      previews: [
        "bluet.jpg",
      ],
    },
    {
      itemName: "Red Sneakers",
      itemDescription: "Comfortable red sneakers for running or walking",
      itemPrice: 1.2,
      itemPickupLocation: "San Francisco, CA",
      itemStatus: "Available",
      previews: [
        "reds.jpg",
      ],
    },
    {
      itemName: "Black Jeans",
      itemDescription: "Classic black jeans for everyday wear",
      itemPrice: 0.8,
      itemPickupLocation: "Los Angeles, CA",
      itemStatus: "Available",
      previews: [
        "blackj.jpg",
      ],
    },
    {
      itemName: "White Sneakers",
      itemDescription: "Comfortable white sneakers for running or walking",
      itemPrice: 1.2,
      itemPickupLocation: "San Francisco, CA",
      itemStatus: "Available",
      previews: [
        "whites.jpg",
      ],
    },
    {
      itemName: "Navy Jeans",
      itemDescription: "Classic navy jeans for everyday wear",
      itemPrice: 0.8,
      itemPickupLocation: "Los Angeles, CA",
      itemStatus: "Available",
      previews: [
        "navyj.jpg",
      ],
    },
    {
      itemName: "Red Shirt",
      itemDescription: "A stylish red shirt for any occasion",
      itemPrice: 2.4,
      itemPickupLocation: "New York, NY",
      itemStatus: "Available",
      previews: [
        "redt.jpg",
      ],
    },
  ]);
  
  function buyItem(index) {
    if(window.confirm('Are you sure you want to buy this item?')){
      const updatedListings = [...listings];
      updatedListings[index].itemStatus = "Sold";
      setListings(updatedListings);
    }
  }

  function removeItem() {
    alert('Are you sure you want to remove this item?');
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
              <button className="button" onClick={() => buyItem(index)} disabled={listing.itemStatus === 'Sold'}>
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

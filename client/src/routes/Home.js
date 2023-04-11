import { useState, useEffect } from "react";
import '../Home.css';

export default function Home(props) {
  const [itemStatus, setItemStatus] = useState(" Posted ");

  const listings = [
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
        "bluet.jpg",
       
      ],
    },
    {
      itemName: "Black Jeans",
      itemDescription: "Classic black jeans for everyday wear",
      itemPrice: 0.8,
      itemPickupLocation: "Los Angeles, CA",
      itemStatus: "Available",
      previews: [
        "bluet.jpg",
      
      ],
    },
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
        "bluet.jpg",
       
      ],
    },
    {
      itemName: "Black Jeans",
      itemDescription: "Classic black jeans for everyday wear",
      itemPrice: 0.8,
      itemPickupLocation: "Los Angeles, CA",
      itemStatus: "Available",
      previews: [
        "bluet.jpg",
      
      ],
    },
    // add more listings as needed
  ];
  
  function buyItem() {
    if(window.confirm('Are you sure you want to buy this item?')){
      setItemStatus(" Sold ");
    }
  }

  function removeItem() {
    alert('Are you sure you want to remove this item?');
    setItemStatus(" Removed ");
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
                <button className="productActionButton" onClick={buyItem}>
                  <i className="fas fa-shopping-cart"></i>
                  <span>Buy</span>
                </button>
                
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  
  

    
//     <div className="product">
//      {props.itemName?.length >0  && 
//         <div key={props.itemName} className="productCard">
//           {props.previews &&
//             props.previews.map((pic) => {
//               return (
//                 <img src={pic} alt="product-img" className="productImage"></img>
//               );
//             })}
//           <div>
//             <h3 className="productName">{props.itemName}</h3>
//             <p>{props.itemDescription}</p>
//             <span>Price: {props.itemPrice} ETH </span>
//             <div className="productTime">
//               Pick up Location : {props.itemPickupLocation}
//             </div>
//             <h4>Status:{itemStatus} </h4>
//           </div>
//           <div>
//             <button className="button" onClick={buyItem}>
//               Buy
//             </button>
//             <button className="button" onClick={removeItem}>
//               Remove
//             </button>
//           </div>
//         </div>
// }

//     </div>
  );
}

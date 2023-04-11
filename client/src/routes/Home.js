import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getContractObject } from "../info/info";

export default function Home(props) {
  const [itemStatus, setItemStatus] = useState(" Posted ");
  const location = useLocation();


  function buyItem() {
    if(itemStatus === " Posted ") {
      if (window.confirm('Are you sure you want to do buy this item?')) {
        const contract = getContractObject();
        contract.buyItem(1);
        setItemStatus(" Sold ");
       }
    } else {
      alert('This item cannot be bought because it is already sold or removed.');
    }
  }

 
  function removeItem() {
    if (itemStatus === " Posted ") {
    if(window.confirm("Are you sure you want to remove this item?")){
      const contract = getContractObject();
      contract.removeAd(1);
      setItemStatus(" Removed ");
    }
    
    } else {
      alert("This item cannot be removed because it is already sold or removed.");
    }
  }


  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
     {location.state?.itemName.length >0  && 
        <div key={location.state.itemName} className="productCard">
          
                <img src={URL.createObjectURL(location.state.image)} alt="product-img" className="productImage"></img>
          <div>
            <h3 className="productName">{location.state.itemName}</h3>
            <p>{location.state.itemDescription}</p>
            <span>Price: {location.state.itemPrice} ETH </span>
            <div className="productTime">
              Pick up Location : {location.state.itemPickupLocation}
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
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ABI, contractAddress } from "../info/info";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { getContractObject } from "../info/info";
export default function PostAd() {
  const [itemName, setItemName] = useState("");
  const [address, setAddress] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPickupLocation, setItemPickupLocation] = useState("");
  const [image, setImage] = useState();

  
  let items;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      itemName,
      itemPrice,
      itemDescription,
      itemPickupLocation,
      image,
    };
    const contract = getContractObject();
    contract.postAd(
      item.itemName,
      item.itemDescription,
      item.itemPrice,
      item.itemPickupLocation
    );
    navigate("/", {replace:true,
      state: {
        itemName,
        itemPrice,
        itemDescription,
        itemPickupLocation,
        image
        
      },
    });
  };

  return (
    <div class="form-container">
      
        <form class="register-form" onSubmit={handleSubmit}>
          <input
            id="first-name"
            class="form-field"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
            required="true"
            name="itemName"
          />
          <input
            id="text"
            class="form-field"
            type="text"
            value={itemPickupLocation}
            onChange={(e) => setItemPickupLocation(e.target.value)}
            placeholder="Pick up Location"
            name="email"
            required="true"
          />
          <input
            id="number"
            class="form-field"
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            placeholder="Item price"
            required="true"
            name="number"
          />
          <textarea
            id="last-name"
            class="form-field"
            type="text"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Item Description"
            required="true"
            name="lastName"
          />
          <input
            type="file"
            name="picture"
            accept="image/jpg, image/jpeg, image/png"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button class="form-field" type="submit">
            Post
          </button>
        </form>
      
  </div> 
  );
}

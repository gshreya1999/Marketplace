import { useState, useEffect } from "react";
import Post from "./Post";
import { getContractObject } from "../info/info";

export default function PostAd() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPickupLocation, setItemPickupLocation] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState("");

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
    // create a copy of the items array and add the new item to it
    const newItems = [...items, item];
    // set the state variable to the new items array
    setItems(newItems);
    setShow(true);
  };

  return (
    <div class="form-container">
      {!show && (
        <form class="register-form" onSubmit={handleSubmit}>
          <input
            id="first-name"
            class="form-field"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
            required="true"
            name="firstName"
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
            onChange={(e) => setImage(e.target.files)}
          />
          <button class="form-field" type="submit">
            Post
          </button>
        </form>
      )}
      {show && (
        <div>
          {" "}
          <Post
            itemName={itemName}
            itemPrice={itemPrice}
            itemDescription={itemDescription}
            itemPickupLocation={itemPickupLocation}
            image={image}
          />
        </div>
      )}
    </div>
  );
}

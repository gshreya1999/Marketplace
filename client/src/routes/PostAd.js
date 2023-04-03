import { useState } from "react";

export default function PostAd() {
const [itemName,setItemName]=useState('');
const [itemPrice,setItemPrice]=useState('');
const [itemDescription,setItemDescription]=useState('');
const [itemPickupLocation,setItemPickupLocation]=useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const item ={itemName,itemPrice,itemDescription,itemPickupLocation};
    console.log(item);
  }

interface Item { 
  itemName:string, 
  itemPrice:number, 
  itemDescription:string, 
  itemPickupLocation:string;
} 
   return (
      <div class="form-container">
        <form class="register-form" onSubmit={handleSubmit} >
          <input
            id="first-name"
            class="form-field"
            type="text"
            value={itemName}
            onChange={(e)=>setItemName(e.target.value)}
            placeholder="Item Name"
            name="firstName"
          />
          <input
            id="text"
            class="form-field"
            type="text"
            value={itemPickupLocation}
            onChange={(e)=>setItemPickupLocation(e.target.value)}
            placeholder="Pick up Location"
            name="email"
          />
          <input
            id="number"
            class="form-field"
            type="number"
            value={itemPrice}
            onChange={(e)=>setItemPrice(e.target.value)}
            placeholder="Item price"
            name="number"
          />
           <textarea
            id="last-name"
            class="form-field"
            type="text"
            value={itemDescription}
            onChange={(e)=>setItemDescription(e.target.value)}
            placeholder="Item Description"
            name="lastName"
          />
           <input type="file" name="picture" />
          <button class="form-field" type="submit">
            Post
          </button>
        </form>
      </div>
    );
    
  }
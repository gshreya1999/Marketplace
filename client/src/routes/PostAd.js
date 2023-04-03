import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ABI,contractAddress } from "../info/info";
export default function PostAd() {
const [itemName,setItemName]=useState('');
const [items,setItems]=useState('');
const [address, setAddress] = useState('');
const [itemPrice,setItemPrice]=useState('');
const [itemDescription,setItemDescription]=useState('');
const [itemPickupLocation,setItemPickupLocation]=useState('');
let contract;
let provider;
let signer;
  const handleSubmit = (e) => {
    e.preventDefault();
    const item ={itemName,itemPrice,itemDescription,itemPickupLocation};
    if(window.ethereum){
      window.ethereum.request({method:"eth_requestAccounts"})
      .then(result=>{
      console.warn(result[0])
      setAddress(result[0]);
      })
    }
     provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts", []);
     signer = provider.getSigner();
     const requestAccounts = async () => {
      await provider.send("eth_requestAccounts", []);
    } 
    console.log(signer.address)
    setAddress(requestAccounts[0]);
    console.log(address);
     contract = new ethers.Contract(contractAddress, ABI, signer);  
     contract.postAd(item.itemName,item.itemDescription,item.itemPrice,item.itemPickupLocation);
     x();
  }
 
  const x = async () => {
    const item=await contract.getAllItemIdsPostedByUser(address);
    console.warn(await contract.getItem(item[2]))
    //setItems(item);

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
        { console.log(contract)}
      </div>
      
    );

  }
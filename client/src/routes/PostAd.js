import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ABI, contractAddress } from "../info/info";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

export default function PostAd() {
  // const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [address, setAddress] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPickupLocation, setItemPickupLocation] = useState("");
  const [image, setImage] = useState();
  const [show, setShow] = useState("");
  const [previews, setPreviews] = useState();

  let contract;
  let provider;
  let signer;
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
    // if (window.ethereum) {
    //   window.ethereum
    //     .request({ method: "eth_requestAccounts" })
    //     .then((result) => {
    //       console.warn(result[0]);
    //       setAddress(result[0]);
    //     });
    // }
    // provider = new ethers.providers.Web3Provider(window.ethereum);
    // provider.send("eth_requestAccounts", []);
    // signer = provider.getSigner();
    // const requestAccounts = async () => {
    //   await provider.send("eth_requestAccounts", []);
    // };
    // console.log(signer.address);
    // setAddress(requestAccounts[0]);
    // console.log(address);
    // contract = new ethers.Contract(contractAddress, ABI, signer);
    // contract.postAd(
    //   item.itemName,
    //   item.itemDescription,
    //   item.itemPrice,
    //   item.itemPickupLocation
    // );

    // x();

    // setItems([...items,{
    //   itemName: itemName,
    //   itemDescription: itemDescription,
    //   itemPrice: itemPrice,
    //   itemPickupLocation: itemPickupLocation
    // }]);
    console.error(items);
    setShow(true);
    navigate("/", {replace:true,
      state: {
        itemName,
        itemPrice,
        itemDescription,
        itemPickupLocation,
        image,
        previews
        
      },
    });
  };

  const x = async () => {
    const item = await contract.getAllItemIdsPostedByUser(address);
    console.warn(await contract.getItem(item[2]));
    //setItems(item);
  };

  // rendering previews
  useEffect(() => {
    if (!image) return;
    let tmp = [];
    for (let i = 0; i < image.length; i++) {
      tmp.push(URL.createObjectURL(image[i]));
    }
    const objectUrls = tmp;
    setPreviews(objectUrls);

    // free memory
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [image]);

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
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button class="form-field" type="submit">
            Post
          </button>
        </form>
      
  </div> 
  );
}

import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import Navbar from "./components/Navbar"
import Home from "./routes/Home"
import About from "./routes/About"
import PostAd from "./routes/PostAd"
import { Route, Routes } from "react-router-dom"
function App() {
  const [balance, setBalance] = useState();
  const [counter, setCounter] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "buyItem",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getAllItemIdsBoughtByUser",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getAllItemIdsPostedByUser",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "itemId",
          "type": "uint256"
        }
      ],
      "name": "getItem",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint64",
              "name": "itemPrice",
              "type": "uint64"
            },
            {
              "internalType": "string",
              "name": "itemName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "itemId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "itemDescription",
              "type": "string"
            },
            {
              "internalType": "enum ThriftStore.SoldStatus",
              "name": "soldStatus",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "time",
              "type": "uint256"
            },
            {
              "internalType": "enum ThriftStore.RefundStatus",
              "name": "refundStatus",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "orderPickupAddress",
              "type": "string"
            }
          ],
          "internalType": "struct ThriftStore.ItemInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "itemName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "itemDescription",
          "type": "string"
        },
        {
          "internalType": "uint64",
          "name": "itemPrice",
          "type": "uint64"
        },
        {
          "internalType": "string",
          "name": "senderAddress",
          "type": "string"
        }
      ],
      "name": "postAd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "removeAd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "array",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "item",
          "type": "uint256"
        }
      ],
      "name": "removeItemFromArray",
      "outputs": [],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "requestRefund",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "refund",
          "type": "bool"
        }
      ],
      "name": "respondToRefundRequest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_addr",
          "type": "address"
        },
        {
          "internalType": "uint64",
          "name": "_amount",
          "type": "uint64"
        }
      ],
      "name": "sendEther",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "itemName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "itemDescription",
          "type": "string"
        },
        {
          "internalType": "uint64",
          "name": "itemPrice",
          "type": "uint64"
        },
        {
          "internalType": "string",
          "name": "senderAddress",
          "type": "string"
        }
      ],
      "name": "updateAd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const contract = new ethers.Contract(contractAddress, ABI, signer);  

  useEffect(() => {
    const requestAccounts = async () => {
      await provider.send("eth_requestAccounts", []);
    }
    
    const getCounter = async () => {
      const counter = await contract.getCounter();
      setCounter(ethers.utils.formatEther(counter));
    }

    const getBalance = async () => {
      const balance = await provider.getBalance(contractAddress);
      setBalance(ethers.utils.formatEther(balance));
    }

    requestAccounts()
      .catch(console.error);

    getBalance()
      .catch(console.error);
      
    getCounter()
      .catch(console.error)
  }, [])


  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostAd />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
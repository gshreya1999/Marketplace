// EECE 571G Team Project

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Virtual Marketplace/Thrift store", function () {
  beforeEach(async function () {
    Market = await ethers.getContractFactory("ThriftStore");
    market = await Market.deploy();
    market.idCounter = 0;
    [owner, seller, buyer,user] = await ethers.getSigners();
    await market.deployed();
  });
  
  describe("Posting an ad", function () {
    it("should not allow user to post an ad without a name", async function () {
      await expect(
        market.postAd(
          "",
          "1 Litre bottle of water",
          ethers.utils.parseEther("1.5"),
          "VanC"
        )
      ).to.be.revertedWith("You must add a name");
    });

    it("should not allow user to post an ad without a description", async function () {
      await expect(
        market.postAd(
          "Black bottle",
          "",
          ethers.utils.parseEther("1.5"),
          "VanC"
        )
      ).to.be.revertedWith("You must add a description");
    });

    it("should not allow user to post an ad without setting price", async function () {
      await expect(
        market.postAd(
          "Black bottle",
          "1 Litre bottle of water",
          ethers.utils.parseEther("0"),
          "VanC"
        )
      ).to.be.revertedWith("You must set a price");
    });

    it("should not allow user to post an ad without pickup address", async function () {
      await expect(
        market.postAd(
          "Black bottle",
          "1 Litre bottle of water",
          ethers.utils.parseEther("1.5"),
          ""
        )
      ).to.be.revertedWith("You must add your address");
    });
    it("should allow user to post an ad ", async function () {
      await market
        .postAd("item 1", "item description", 100, "123 Main St");
        const item = await market.getItem(1);
       expect(item.itemId).to.equal(1);
       expect(item.itemName).to.equal("item 1");
       expect(item.soldStatus).to.equal(0);
    });
   });


// Describe the test suite
// describe("postAd", function () {
//   // Define variables for the test
//   let itemName = "Test Item";
//   let itemDescription = "This is a test item";
//   let itemPrice = 100;
//   let senderAddress = "0x123456789";

//   // Define the test case
//   it("should create a new item with the correct information", async function () {
//     // Call the function
//     await market.postAd(itemName, itemDescription, itemPrice, senderAddress);

//     // Get the item information
//     let item = await market.getItem(1);;

//     // Check that the item information is correct
//     expect(item.price).to.equal(itemPrice);
//     expect(item.name).to.equal(itemName);
//     expect(item.id).to.equal(1);
//     expect(item.description).to.equal(itemDescription);
//     expect(item.status).to.equal(0);
//     expect(item.executionTime).to.be.above(0);
//     expect(item.refundStatus).to.equal(0);
//     expect(item.senderAddress).to.equal(senderAddress);

//     // Check that the seller's itemsPosted array has been updated
//     // let itemsPosted = await market.getItemsPostedBySeller();
//     // expect(itemsPosted).to.have.lengthOf(1);
//     // expect(itemsPosted[0]).to.equal(1);
//   });

//   // Define a test case for missing item name
//   it("should throw an error when itemName is missing", async function () {
//     await expect(
//       market.postAd("", itemDescription, itemPrice, senderAddress)
//     ).to.be.revertedWith("You must add a name");
//   });

//   // Define a test case for missing item description
//   it("should throw an error when itemDescription is missing", async function () {
//     await expect(
//       market.postAd(itemName, "", itemPrice, senderAddress)
//     ).to.be.revertedWith("You must add a description");
//   });

//   // Define a test case for missing sender address
//   it("should throw an error when senderAddress is missing", async function () {
//     await expect(
//       market.postAd(itemName, itemDescription, itemPrice, "")
//     ).to.be.revertedWith("You must add your address");
//   });

//   // Define a test case for missing item price
//   it("should throw an error when itemPrice is missing", async function () {
//     await expect(
//       market.postAd(itemName, itemDescription, 0, senderAddress)
//     ).to.be.revertedWith("You must set a price");
//   });
// });

  describe("Removing an ad", function () {
    it("should remove an ad", async function () {
      await market
        .postAd("item 1", "item description", 100, "123 Main St");
      await market.removeAd(1);
      const item = await market.getItem(1);
      expect(item.itemName).to.equal("item 1");
      expect(item.soldStatus).to.equal(2); // SoldStatus.REMOVED
    });
    
    it("should not allow seller anyone but seller to remove ad", async function () {
       [user] = await ethers.getSigners();
        await market.postAd("item 2", "item description", 10, "123 Oak St");
        expect(await market.connect(user).removeAd(1)).to.be.revertedWith("Only the seller can remove the ad");
  });
});


  describe("Buying a posted item ", function () {
    it("should  have sufficient balance to buy an item ", async function () {
      await market
        .connect(seller)
        .postAd("item 1", "item description", 100, "123 Main St");
      await expect(market.connect(buyer).buyItem(1)).to.be.revertedWith(
        "You don't have enough ether"
      );
    });
    it("should  allow user to buy an item ", async function () {
       await expect(market.buyItem(1, { value: ethers.utils.parseEther("0.1") }));
       const item = await market.getItem(1);
       expect(item.soldStatus).to.equal(1);
       
    });
  });

  describe("Getting Refund For an ad", function () {
    it("should cancel an order", async function () {
      expect(market.connect(seller).requestRefund(1234)).to.be.revertedWith(
        "Only the buyer can request a refund"
      );
    });
  });
 });

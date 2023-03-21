// EECE 571G Team Project

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Virtual Marketplace/Thrift store", function () {
  beforeEach(async function () {
    Market = await ethers.getContractFactory("ThriftStore");
    market = await Market.deploy();
    market.idCounter = 0;
    [owner, user1, user2] = await ethers.getSigners();
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
  });

  describe("Removing an ad", function () {
    it("should remove an ad", async function () {
      await market
        .connect(user1)
        .postAd("item 1", "item description", 100, "123 Main St");
      await market.connect(user1).removeAd(1);
      const item = await market.getItem(1);
      expect(item.soldStatus).to.equal(2); // SoldStatus.REMOVED
    });
  });

  describe("Getting Refund For an ad", function () {
    it("should cancel an order", async function () {
      const item = market.items[user1.address];
      expect(market.connect(user1).requestRefund(1234)).to.be.revertedWith(
        "The item has not been sold yet"
      );
    });
  });

  /*
    it("should not allow a customer to make an order with an empty Main course", async function () {
        await expect(reservation.makeReservation("Wings", "", { value: ethers.utils.parseEther("1.5") }))
                                .to.be.revertedWith("Choosing Main Course is necessary")
    });

    it("Cannot check in if isValidReservation is false", async function () {
        // isValidReservation is set to true only when makeReservation is called
        // So, if checkIn() is directly called it must be reverted
        await expect(reservation.checkIn()).to.be.reverted
    });

    it("Cannot refund if the customer has checked in", async function () {
        await reservation.makeReservation("Wings", "Biryani", { value: ethers.utils.parseEther("1.5") });
        await reservation.checkIn();

        // Verify cancelling is not allowed after checking-in
        await expect(reservation.cancelBooking()).to.be.revertedWith("Customer has already checked in");
    });

    it("Cannot make another reservation before she/he has checked in or canceled the existing order", async function () {
        await reservation.makeReservation("Wings", "Biryani", { value: ethers.utils.parseEther("1.5") });

        // Verify a new reservation without checking-in or cancelling is reverted
        await expect(reservation.makeReservation("Sushi", "Platter", { value: ethers.utils.parseEther("1.5") }))
                                .to.be.revertedWith("You can't make another reservation while another is in progress");
    })

    it("Cannot make a reservation if he/she does not send enough ether to the smart contract", async function () {
        await expect(reservation.makeReservation("Wings", "Biryani",{ value: ethers.utils.parseEther("0.1") }))
                                    .to.be.revertedWith("Not enough ethers sent")
    })

    it("Should make reservation successfully if everything is OK", async function () {
        [owner, addr1] = await ethers.getSigners();
        
        // Making a valid reservation
        await reservation.connect(addr1).makeReservation("Wings", "Biryani", { value: ethers.utils.parseEther("1.5") });
        
        // Checking if isValidReservation is set to true
        const order = await reservation.reservations(addr1.address);
        await expect(order.isValidReservation).to.be.true
    })

    
    it("Should receive money when reservation is cancelled", async function () {
        [owner, addr1] = await ethers.getSigners();

        // Make a valid reservation and check balance
        await reservation.connect(addr1).makeReservation("Wings", "Biryani", { value: ethers.utils.parseEther("1.5") });
        const initialBalance = await ethers.provider.getBalance(addr1.address);

        // Cancel the reservation and check balance again
        await reservation.connect(addr1).cancelBooking();
        const finalBalance = await ethers.provider.getBalance(addr1.address);

        // Verify the refund
        expect(finalBalance).greaterThan(initialBalance);
    });
      
    it("Should be able to check in if everything is good", async function () {
        [owner, addr1] = await ethers.getSigners();

        // Call makeReservation and checkIn functions
        await reservation.connect(addr1).makeReservation("Wings", "Biryani", { value: ethers.utils.parseEther("1.5") });
        await reservation.connect(addr1).checkIn();

        // Verify that hasCheckedIn is set to true
        const order = await reservation.reservations(addr1.address);
        await expect(order.hasCheckedIn).to.be.true
    })

    it("Should have correct balance in smart contract if reservation has been made", async function () {
        await reservation.makeReservation("Wings", "Biryani", { value: ethers.utils.parseEther("1.5") });
        const balance = await ethers.provider.getBalance(reservation.address);
        expect(balance).to.be.equal(ethers.utils.parseEther("1.5"));
    })
    */
});

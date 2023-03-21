// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;
pragma abicoder v2;

contract ThriftStore {

    // We need to check whether this will work to generate itemId
    uint64 private idCounter = 0;

    // User struct user ID, password and their address
    struct User {
        string userId;
        bytes32 passwordHash;
        address userAccountAddress;  // check it later
    }

    enum SoldStatus {POSTED, SOLD, REMOVED}
    enum RefundStatus {NONE, REQUESTED, DENIED, ACCEPTED}

    // ItemInfo struct has information of items posted by the sellers
    struct ItemInfo {
        //string contactUserName;  // Not sure
        uint64 itemPrice;
        //string imageBase64;  // We can think of adding an image with the ad
        string itemName;
        string itemDescription;
        SoldStatus soldStatus;
        //address payable seller;
        uint256 time;
        RefundStatus refundStatus;
        string orderPickupAddress;
    }

    // Not sure if we need to keep all transactions info
    struct TransactionInfo {
        //address seller;
        address buyer;
        uint256 time;
        uint256 itemID;    // Need to check if it is redundant to add order id here
        uint64 itemPrice;
    }

    // Map the itemId to the owner/seller
    mapping(uint256 => address) sellers;
    
    // Map itemId to its info
    mapping(uint256 => ItemInfo) items;
    
    // Map item id to its Transaction info
    mapping(uint256 => TransactionInfo) transactions;
    
    // User address to username
    mapping (address => bytes32) activeUsers; // NOT SURE if we are gonna keep this

    // Modifier to check a valid item
    modifier validItem(uint256 id) {
        require(items[id].soldStatus == SoldStatus.POSTED, "The item does not exist or has been sold");
        _;
    }

    // Events
    // We can decide what events we want to keep
    event OperationEvents(string eventType, string eventMsg, bool success);
    event AcquireUserInfo(string userName, address addr);
    event LoginEvent(bytes32 uuid, string eventMsg, bool success);
    event TransactionRecords(TransactionInfo[] records, string eventMsg, bool success);

    // Helper function to send ethers between users
    function sendEther(address payable recipient, uint256 amount) public {
        
        address sender = msg.sender;
        recipient.transfer(amount);
    }

    // Function to buy an item that has been posted in the marketplace
    function buyItem(uint256 id) public payable validItem(id) {

        // Login condition?
        uint64 price = items[id].itemPrice;

        // Condition to make sure buyer has enough ether
        require(msg.value >= price, "You don't have enough ether");

        sendEther(payable(sellers[id]), price);

        uint256 executionTime = block.timestamp;

        // Saving the information in transactions
        transactions[id] = TransactionInfo(msg.sender, executionTime, id, price);
        // Updating the status of the ad
        items[id].soldStatus = SoldStatus.SOLD;
    }

    // Function to post an ad on the marketplace
    function postAd(string memory itemName, string memory itemDescription, uint64 itemPrice, string memory senderAddress) public {

        // Checking that the user posts all the required information
        require(bytes(itemName).length > 0,"You must add a name");
        require(bytes(itemDescription).length > 0,"You must add a description");
        require(bytes(senderAddress).length > 0,"You must add your address");
        require(itemPrice >= 0,"You must set a price");

        uint256 executionTime = block.timestamp;

        // Updating the counter to generate the new itemId
        idCounter = idCounter+1;
        
        sellers[idCounter] = msg.sender;

        items[idCounter] = ItemInfo(itemPrice, itemName, itemDescription, SoldStatus.POSTED, executionTime, RefundStatus.NONE, senderAddress);     
    }

    // Function to remove an ad posted by the seller
    function removeAd(uint256 id) public {
        require(sellers[id] == msg.sender, "Only the seller can remove the ad");
        require(items[id].soldStatus == SoldStatus.POSTED, "This item has already been sold or removed");

        items[id].soldStatus = SoldStatus.REMOVED;
    }

    // Function to allow buyer to request a refund
    function requestRefund(uint256 id) public {

        require(items[id].soldStatus == SoldStatus.SOLD, "The item has not been sold yet");
        require(transactions[id].buyer == msg.sender, "Only the buyer can request a refund");

        // Update the refund status
        items[id].refundStatus = RefundStatus.REQUESTED;
    }

    // Function to allow the seller to accept or reject the refund
    function respondToRefundRequest(uint256 id, bool refund) public {

        require(items[id].soldStatus == SoldStatus.SOLD, "The item has not been sold yet");
        require(items[id].refundStatus == RefundStatus.REQUESTED, "The buyer did not request a refund");
        require(sellers[id] == msg.sender, "Only the seller can approve a refund");

        if (refund) { 
            sendEther(payable(transactions[id].buyer), items[id].itemPrice);

            // Update status of the item
            items[id].refundStatus = RefundStatus.ACCEPTED;
            items[id].soldStatus = SoldStatus.POSTED;
        }
        else
            items[id].refundStatus = RefundStatus.DENIED;
    }
}
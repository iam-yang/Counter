pragma solidity ^0.8.9;

contract Count {
    uint public count;
    address owner;

    constructor() {
        count = 0;
        owner = msg.sender;
    }

    function increment() public {
        require(owner == msg.sender, "only owner can add count");
        count += 1;
    }
}

pragma solidity ^0.4.23;

library SafeMath {

    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }

    function sub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }

    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }

    function div(uint a, uint b) internal pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}

contract ERC20Interface {

    function totalSupply() public constant returns (uint);

    function balanceOf(address tokenOwner) public constant returns (uint balance);

    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);

    function transfer(address to, uint tokens) public returns (bool success);

    function approve(address spender, uint tokens) public returns (bool success);

    function transferFrom(address from, address to, uint tokens) public returns (bool success);


    event Transfer(address indexed from, address indexed to, uint tokens);

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

}

contract Exchange {
    using SafeMath for uint;
    address constant ZEROxBTC_CONTRACT_ADDRESS = 0x9D2Cc383E677292ed87f63586086CfF62a009010;
    //address user;
    struct Order{
        address buyer;
        address seller;
        uint ethers;
        uint tokens;
    }
    mapping(bytes32 => Order) public getOrder; 
    bytes32 [] public OrderBook;
    constructor () public {}
    
    // Check any account balance
    function getBalance(address _user) public view returns (uint etherBalance, uint tokenbalance)
    {
        etherBalance = msg.sender.balance;
        tokenbalance = ERC20Interface(ZEROxBTC_CONTRACT_ADDRESS).balanceOf(_user);
    }
    
    // 0xBtc buyer creating new order     
    function createOrder(address _seller, uint _tokens) public payable returns (bytes32 orderID_)
    {
        // Create Order
        address _buyer = msg.sender;
        uint _ethers = msg.value;
        bytes32 orderID = keccak256(abi.encodePacked(_buyer, _seller, _ethers, _tokens));
        Order memory newOrder = Order(_buyer, _seller, _ethers, _tokens);
        getOrder[orderID] = newOrder;
        
        // Deposit Ether
        // Done
        orderID_ = orderID;
        OrderBook.push(orderID);
    }
    
    function viewOrder(bytes32 _orderID) public 
    view returns (address buyer, address seller, uint ethers, uint tokens)
    {
        buyer = getOrder[_orderID].buyer;
        seller = getOrder[_orderID].seller;
        ethers = getOrder[_orderID].ethers;
        tokens =  getOrder[_orderID].tokens;
    }
    
    
    // 0xBc seller accepting order
    function acceptOrder(bytes32 _orderID, uint _tokens) public returns (bool success)
    {
        address _seller = msg.sender;
        address buyer = getOrder[_orderID].buyer;
        uint ethers = getOrder[_orderID].ethers;
        require(_seller == getOrder[_orderID].seller, "You are not the intended seller");
        require(_tokens == getOrder[_orderID].tokens, "Incorrect token amount");
        
        // Swap eths -> seller, tokens -> buyer
    
        ERC20Interface(ZEROxBTC_CONTRACT_ADDRESS).approve(this, _tokens);
        ERC20Interface(ZEROxBTC_CONTRACT_ADDRESS).transferFrom(_seller, buyer, _tokens);    
        _seller.transfer(ethers);
        delete getOrder[_orderID];
        success = true;
    }
    
    
    function cancelOrder(bytes32 _orderID) public 
    {
        // eths -> buyer
        require(msg.sender == getOrder[_orderID].buyer, "Incorrect buyer");
        msg.sender.transfer(getOrder[_orderID].ethers);
        delete getOrder[_orderID];
    }
    
}

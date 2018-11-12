pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;


contract MessageBoard {
    struct User {
        string name;
        uint age;
    
    }
    
    struct Message {
        string title;
        string content;
    }
    
    mapping (address => User) userInfo;
    mapping (address => Message[]) userMessage;
    
    Message[] public allMessage;
    
    function () public {revert();}

    function setProfile(string _name, uint _age) public 
        returns (bool success)
    {
        User memory newUser = User(_name, _age);
        userInfo[msg.sender] = newUser;
        success = true;
    }
    
    function getUser() public view returns (User user) {
        return userInfo[msg.sender];
    }
    
    
    function postMessage(string _title, string _content) public 
        returns (bool success)
    {
        Message memory newMessage = Message(_title, _content);
        allMessage.push(newMessage);
        userMessage[msg.sender].push(newMessage);
        return true;
    }
    
    function getMessage() public view returns (Message[] message_) {
        return userMessage[msg.sender];
    }
    
    function getAllMessage() public view returns (Message[] allMessage_) {
        return allMessage;
    }
    
}
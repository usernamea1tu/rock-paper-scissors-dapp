// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RockPaperScissors {
    address public player1;
    address public player2;
    uint256 public player1Bet;
    uint256 public player2Bet;
    bytes32 public player1Hash;
    bytes32 public player2Hash;
    string public player1Move;
    string public player2Move;

    constructor() {
        player1 = address(0);
        player2 = address(0);
    }

    function register() external payable {
        require(player1 == address(0) || player2 == address(0), "Both players already registered");
        require(msg.value >= 0.0001 ether, "Minimum bet not met");
        
        if (player1 == address(0)) {
            player1 = msg.sender;
            player1Bet = msg.value;
        } else {
            player2 = msg.sender;
            player2Bet = msg.value;
        }
    }

    function play(bytes32 encrMove) external {
        require(msg.sender == player1 || msg.sender == player2, "You are not registered as a player");
        require(player1Hash == bytes32(0) || player2Hash == bytes32(0), "Both players have already made their moves");
        
        if (msg.sender == player1) {
            player1Hash = encrMove;
        } else {
            player2Hash = encrMove;
        }
    }

    function reveal(string memory clearMove) external {
        require(msg.sender == player1 || msg.sender == player2, "You are not registered as a player");
        require(keccak256(abi.encodePacked(clearMove)) == player1Hash || keccak256(abi.encodePacked(clearMove)) == player2Hash, "Invalid move or password");
        
        if (msg.sender == player1) {
            player1Move = clearMove;
        } else {
            player2Move = clearMove;
        }
    }

    function getOutcome() external {
        require(bothPlayed() && bothRevealed(), "Players have not completed the game yet");


        resetGame();
    }

    function resetGame() private {
        player1 = address(0);
        player2 = address(0);
        player1Bet = 0;
        player2Bet = 0;
        player1Hash = bytes32(0);
        player2Hash = bytes32(0);
        player1Move = "";
        player2Move = "";
    }

    function bothPlayed() public view returns (bool) {
        return (player1Hash != bytes32(0) && player2Hash != bytes32(0));
    }

    function bothRevealed() public view returns (bool) {
        return (bytes(player1Move).length > 0 && bytes(player2Move).length > 0);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function whoAmI() public view returns (uint256) {
        if (msg.sender == player1) {
            return 1;
        } else if (msg.sender == player2) {
            return 2;
        } else {
            return 0;
        }
    }

   
    
}

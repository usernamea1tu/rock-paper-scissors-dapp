// Import Web3.js library
const Web3 = require('web3');


const web3 = new Web3(Web3.givenProvider);


const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "bothPlayed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bothRevealed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
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
		"inputs": [],
		"name": "getOutcome",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "encrMove",
				"type": "bytes32"
			}
		],
		"name": "play",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "player1",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "player1Bet",
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
		"inputs": [],
		"name": "player1Hash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "player1Move",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "player2",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "player2Bet",
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
		"inputs": [],
		"name": "player2Hash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "player2Move",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "register",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "clearMove",
				"type": "string"
			}
		],
		"name": "reveal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "whoAmI",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; 
const contractAddress = '0x01132c4B1D6F758412C8a7eD482b0D6d9b16183b'; 


const contract = new web3.eth.Contract(contractABI, contractAddress);


async function register() {
    try {
        const accounts = await web3.eth.getAccounts();
        const playerAddress = accounts[0];
        
        await contract.methods.register().send({ from: playerAddress, value: web3.utils.toWei('0.0001', 'ether') });
        
        updateUI();
        
        console.log('Player registered successfully.');
    } catch (error) {
        console.error('Failed to register player:', error);
    }
}


async function play() {
    try {
        const accounts = await web3.eth.getAccounts();
        const playerAddress = accounts[0];
        const move = document.getElementById('move').value;
        const encrMove = web3.utils.keccak256(move);
        
        await contract.methods.play(encrMove).send({ from: playerAddress });
        
        updateUI();
        
        console.log('Move played successfully.');
    } catch (error) {
        console.error('Failed to play move:', error);
    }
}


async function reveal() {
    try {
        const accounts = await web3.eth.getAccounts();
        const playerAddress = accounts[0];
        const revealMove = document.getElementById('revealMove').value;
        
        await contract.methods.reveal(revealMove).send({ from: playerAddress });
        
        updateUI();
        
        console.log('Move revealed successfully.');
    } catch (error) {
        console.error('Failed to reveal move:', error);
    }
}


async function getOutcome() {
    try {
        await contract.methods.getOutcome().send({ from: accounts[0] });
        
        updateUI();
        
        console.log('Game outcome retrieved.');
    } catch (error) {
        console.error('Failed to get game outcome:', error);
    }
}


async function updateUI() {
   
    const player1Address = await contract.methods.player1().call();
    const player2Address = await contract.methods.player2().call();

    // Get player moves
    const player1Move = await contract.methods.player1Move().call();
    const player2Move = await contract.methods.player2Move().call();

    // Get contract balance
    const contractBalance = await web3.eth.getBalance(contractAddress);

    // Get the role of the current player
    const yourRole = await contract.methods.whoAmI().call({ from: accounts[0] });

    // Update the UI elements
    document.getElementById('player1Address').textContent = player1Address;
    document.getElementById('player2Address').textContent = player2Address;
    document.getElementById('player1Move').textContent = player1Move;
    document.getElementById('player2Move').textContent = player2Move;
    document.getElementById('contractBalance').textContent = web3.utils.fromWei(contractBalance, 'ether');
    document.getElementById('yourRole').textContent = (yourRole == 1) ? 'Player 1' : (yourRole == 2) ? 'Player 2' : 'Not Registered';
}

// Initialize the UI
updateUI();

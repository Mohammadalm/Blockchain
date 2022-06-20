import sha256 from "crypto-js/sha256.js";
class Block {
    constructor(index, timestamp, data, previousHash = " ") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.computeHash();
        this.nonce = 0;
    }

    computeHash() {
        return sha256(
            this.index +
            this.previousHash +
            this.timestamp +
            this.data +
            this.nonce
        ).toString();
    }

    proofOfWork(difficulty) {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
        ) {
            this.nonce++;
            this.hash = this.computeHash();
        }
    }
}

class Blockchain {
    constructor() {
        this.blockchain = [this.GenesisBlock()];
        this.difficulty = 4;
    }
    GenesisBlock() {
        return new Block(0, "01/01/2020", "First Block", "0");
    }

    GetLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.previousHash = this.GetLatestBlock().hash;
        //newBlock.hash = newBlock.computeHash();
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);
    }

    ValiditeChain() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const previousBlock = this.blockchain[i - 1];

            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }

        return true;
    }
}

let MohaCoin = new Blockchain();

console.log("Mining....");
MohaCoin.addNewBlock(
    new Block(1, "01/06/2020", {
        sender: "Chris Rock",
        recipient: "The Rock",
        quantity: 50
    })
);

MohaCoin.addNewBlock(
    new Block(2, "01/07/2020", {
        sender: "Satoshi",
        recipient: "Mohammad",
        quantity: 500
    })
);

console.log(JSON.stringify(MohaCoin, null, 10))
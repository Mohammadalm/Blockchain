import sha256 from "crypto-js/sha256.js";

class Block {
    constructor(CurrentHash, Pervioushash, Data) {

        this.Date = Date.now()
        this.CurrentHash = CurrentHash;
        this.Pervioushash = Pervioushash;
        this.Data = Data;
        this.hash = this.CalculateHash();

    }


    CalculateHash() {
        return sha256(this.CurrentHash + this.Pervioushash + this.Data).toString()
    }


}


let message, nonce, path, privateKey; // ...
const hashDigest = sha256(nonce + message);

let NewBlock = new Block('Current', 'Pervious', 'Data')
console.log(NewBlock.Date)
console.log(NewBlock.CurrentHash)
console.log(NewBlock.Pervioushash)
console.log(NewBlock.Data)

export default Block;
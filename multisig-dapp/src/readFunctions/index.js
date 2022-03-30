import React, {useState, useEffect} from 'react'
import { ethers, BigNumber } from 'ethers';
import { CONFIG } from '../blockchain/config';
import abi from "../blockchain/abi.json";

const truncate = (input, len, len2, len3) =>
  input.length > len? `${input.substring(0, len)}and ${input.substring(43, len2)}and ${input.substring(84, len3)} ` :
  input;

const ReadFunctions = () => {
    const [OwnersAddr0, setOwnersAddr0] = useState([]);
    const [OwnersAddr1, setOwnersAddr1] = useState([]);
    const [OwnersAddr2, setOwnersAddr2] = useState([]);
    const [TxId, setTxId] = useState(0);
    const [Addr, setAddr] = useState("");
    const [totalCount, setTotalCount] = useState();

    //get owners
    useEffect( async () => {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, provider);
        const ownersAddrs = await mswContract.getOwners()
        setOwnersAddr0(ownersAddrs[0]);
        setOwnersAddr1(ownersAddrs[1]);
        setOwnersAddr2(ownersAddrs[2]);
        console.log("isso: ",ownersAddrs);
    }, []);

    //num transactions
    useEffect( async() => {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, provider);
        const txCount = await mswContract.getTransactionCount();
        let total = BigNumber.from(txCount._hex).toString();
        setTotalCount(total);
    }, []);

    // get transaction

    const getTransactions = async () => {
        try {
            const { ethereum } = window;

            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, provider);
                setTxId(TxId);
                const getTrx = await mswContract.getTransaction(BigNumber.from(TxId));
                console.log("Transaction: ", getTrx);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const verifyConfirmed = async () => {
        try {
            const { ethereum } = window;
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const mswContract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi.abi, provider);
                setTxId(TxId);
                setAddr(Addr);
                const addrConfirmed = await mswContract.isConfirmed(BigNumber.from(TxId), Addr)
                console.log("Verify: ", addrConfirmed);
        }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <>
        <div>
            <h2>Owners</h2>
            <p>{"1: "+ OwnersAddr0}</p>
            <p>{"2: "+ OwnersAddr1}</p>
            <p>{"3: "+ OwnersAddr2}</p>
        </div>
        <div>
            <h2>Transaction Count: {totalCount}</h2>
        </div>
        <div>
            <h2>Transactions</h2>
            <input onChange={e => setTxId(e.target.value)} value={TxId}/>
            <button onClick={getTransactions}> Get Transaction</button>
        </div>
        <div>
            <h2>isConfirmed?</h2>
            <input onChange={e => setTxId(e.target.value)} value={TxId}/>
            <input onChange={e => setAddr(e.target.value)} value={Addr}/>
            <button onClick={verifyConfirmed}> Verify!</button>
        </div>
    </>
  )
}

export default ReadFunctions
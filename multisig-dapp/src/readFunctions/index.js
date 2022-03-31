import React, {useState, useEffect} from 'react'
import { ethers, BigNumber } from 'ethers';
import { CONFIG } from '../blockchain/config';
import abi from "../blockchain/abi.json";
import { getAddress } from 'ethers/lib/utils';

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
    const [getTrx, setGetTrx] = useState([]);
    const [AddConfirmed, setAddConfirmed] = useState();

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
                setGetTrx([
                    getAddress(getTrx[0])+ " ",
                    BigNumber.from(getTrx[1]._hex).toString() + " ",
                    getTrx[2] + " ",
                    getTrx[3] + " ",
                    (getTrx[4]).toString()
                ]);
                console.log("foi: ", getTrx)
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
                setAddConfirmed(addrConfirmed.toString());
                console.log("Verify: ", AddConfirmed);
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
            <input onChange={e => setTxId(e.target.value)} type="text"
                    name="TxId"
                    placeholder="Transaction Index"/>
            <button onClick={getTransactions} style={{marginLeft: 10}}> Get Transaction</button>
            <div>
                <ul>
                    <li>Address: {getTrx[0]}</li>
                    <li>Value: {getTrx[1]}</li>
                    <li>Data: {getTrx[2]}</li>
                    <li>Executed: {getTrx[3]}</li>
                    <li>Number of Confirmartions: {getTrx[4]}</li>
                </ul>
            </div>
        </div>
        <div>
            <h2>isConfirmed? {AddConfirmed}</h2>
            <input onChange={e => setTxId(e.target.value)} type="text"
                    name="TxId"
                    placeholder="Transaction Index" style={{marginLeft: 10}}/>
            <input onChange={e => setAddr(e.target.value)}
            name="addr"  placeholder="Owner address" style={{marginLeft: 10}}/>
            <button onClick={verifyConfirmed} style={{marginLeft: 10}}> Verify!</button>
        </div>
    </>
  )
}

export default ReadFunctions
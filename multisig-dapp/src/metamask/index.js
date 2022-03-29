import React, { useState, useEffect} from 'react'
import * as s from "./metamaskElements";

const WalletSetup = () => {
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;
        if(!ethereum) {
            console.log("Make sure you have metamask install!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Authorized account: ", account);
            setCurrentAccount(account);
        } else {
            console.log("not authorized account");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const connectWallet = async () => {
    try {
        const { ethereum } = window;

        if(!ethereum) {
            alert("Get Metamask!");
        return;
        }

        const accounts = await ethereum.request({
            method: 'eth_requestAccounts'
        });
        console.log("Connected to: ", accounts[0]);
        setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

    return (
        <>
            {currentAccount === "" ? (
                <>
                    <s.StyledButton onClick={() => { connectWallet()}}>connect Wallet</s.StyledButton>
                </>
            ) : (
                <>
                    <div> Connect to: {currentAccount}</div>
                </>
            )}
        </>
    )
}

export default WalletSetup
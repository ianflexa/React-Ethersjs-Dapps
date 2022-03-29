import React, { useState, useEffect} from 'react'
import { ethers, BigNumber } from 'ethers';
import WalletSetup from './metamask';
import * as x from './styles/geral'

function App() {

  return (
    <>
      <x.StyledApp>
        <h1 style={{fontFamily: 'Segoe UI'}}>MultiSig Wallet Dapp</h1>
        <WalletSetup />
      </x.StyledApp>
    </>
  );
}

export default App;

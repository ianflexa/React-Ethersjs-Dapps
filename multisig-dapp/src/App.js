import React, { useState, useEffect} from 'react'
import { ethers, BigNumber } from 'ethers';
import WalletSetup from './metamask';
import * as x from './styles/geral'
import ReadFunctions from './readFunctions';
import WriteContract from './writeFunctions';

function App() {

  return (
    <>
      <x.StyledApp>
        <h1>MultiSig Wallet Dapp</h1>
        <WalletSetup />
        <ReadFunctions />
        <WriteContract />
      </x.StyledApp>
    </>
  );
}

export default App;

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
        <x.StyledContainer>
        <x.TextTitle style={{ marginTop: 5, marginLeft: 10 }}>MultiSig Wallet Dapp</x.TextTitle>
        <WalletSetup />
        </x.StyledContainer>
        <ReadFunctions />
        <WriteContract />
      </x.StyledApp>
    </>
  );
}

export default App;

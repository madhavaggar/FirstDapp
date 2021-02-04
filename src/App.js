import React from 'react';
import conseiljs , { TezosNodeWriter, TezosParameterFormat } from 'conseiljs';
import './App.css';

const tezosNode = 'https://delphinet.smartpy.io';

async function VotingFunction(candidate) {
	console.log(candidate);
  const keystore = {
      publicKey: 'edpkuBiUJET9NJSkDJ4UQSqAaPbFkc47tn9rh8SuNgWpbRqcFQrymv',
      privateKey: 'edskRg9PXT5WrRogCzSKEuqfeTSnjC7gepSnMJiTkXd4YY9DhWxxhYRpvpE8ByGgXvTknovPWP7iJE5MjjCfKdXpWgzKzq9Jy5',
      publicKeyHash: 'tz1MiSt6Cyp6jDC6UPyzo88JUxJBXMojCnr5',
      seed: '',
      storeType: 1
  };
  const contractAddress = 'KT18pMFEhbXWsQSAR6j7JHNSZ4YLAD6Apzih';
  const result = await TezosNodeWriter.sendContractInvocationOperation(tezosNode, keystore, contractAddress,  1, 100000, '', 1000, 750000, undefined, `${candidate}`, TezosParameterFormat.Michelson);
  console.log(`Injected operation group id ${result.operationGroupID}`);
  //finishit("Data inserted successfully in blockchain. Reference id:"+result.operationGroupID);
  return result.operationGroupID;
}

function httpGet() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", 'https://delphinet.smartpy.io/chains/main/blocks/head/context/contracts/KT18pMFEhbXWsQSAR6j7JHNSZ4YLAD6Apzih/storage', false ); // false for synchronous request
  xmlHttp.send( null );
  console.log(JSON.parse(xmlHttp.responseText));
}

function App() {
  httpGet()
  return (
    <div className="App">
      <header className="App-header">
        <h4 className="headerName">Voting Application</h4>
      </header>

      <div className="container">
        <h1>Welcome, you can vote for your favourite candidate here.</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <button className="col" onClick={() => VotingFunction("Modi")}>
                Vote for N Modi
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <button className="col" onClick={() => VotingFunction("Kejriwal")}>
                Vote for A Kejriwal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

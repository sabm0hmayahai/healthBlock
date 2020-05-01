import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import HealthCare from '../abis/HealthCare.json'
import Web3 from 'web3';

class App extends Component {

  //do this whenever this component will mount to the react-DOM
  async componentWillMount() {
    await this.loadWeb3()  
    await this.loadBlockchainData()
    await this.showAdmin()
  }

  async showAdmin() {
    const admin = await this.state.healthCare.methods.admin().call()
    console.log(admin)
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3 (window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non-Ethereum Browser detected! Please use Meta-Mask.')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    //load current account
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    console.log(accounts)

    // Netword ID
    const networkId = await web3.eth.net.getId()
    const networkData = HealthCare.networks[networkId]
    
    if(networkData){
      const healthCare = web3.eth.Contract(HealthCare.abi, networkData.address)
      this.setState({healthCare})
    }
    else{
      window.alert("HealthCare contract has not yet been deployed on the blockchain.")
    }



    // Address
    // ABI

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      healthCare: null
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
          <li>
            <small className="text-secondary">
              <small id='account'>{this.state.account}</small>
            </small>
          </li>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
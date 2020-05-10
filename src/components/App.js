/**
 * all the bullshit needed to run the actual commands
 * 
 * app.admin() -> to get the admin address
 * app.doctorCount() -> to get number of registered doctors
 * app.patientCount() -> to get number of patients
 * app.createDoctor("kalpan", {from: accounts[1]}) -> to create an unverified doctor
 * app.verifyDoctor(accounts[1], {from: accounts[0]}) -> verify the doctor (ADMIN ONLY)
 * app.createPatient(accounts[3], "john", {from: accounts[1]}) -> create a patient (DOCTOR ONLY)
 * app.writeNote(accounts[3], "wrong", "something wrong", {from: accounts[1]}) -> write note (DOCTOR ONLY)
 * app.HealthNoteCount() -> to get number of health notes
 * app.doctors(accounts[1]) -> show doctor details
 * app.patients(accounts[3]) -> show patient details
 * 
 * call() -> read from blockchain
 * send() -> spill it onto the blockchain
 */

 // @rajesh
 // TODO: create SHOW HEALTH NOTE
 // move CREATE DOCTOR to doctor section
 // DOCTOR DETAILS & PATIENT DETAILS are something anyone can check, 
 // maybe have a public section for them?
 // change the way we are storing health notes? maybe by patients?


import React, { Component } from "react";
import "./App.css";
import HealthCare from "../abis/HealthCare.json";
import Web3 from "web3";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./App.css";
import Logo from "../assets/images.png";
class App extends Component {
  //do this whenever this component will mount to the react-DOM
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    await this.showAdmin();
  }

  async showAdmin() {
    const admin = await this.state.healthCare.methods.admin().call();
    console.log(admin);
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum Browser detected! Please use Meta-Mask.");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //load current account
    const accounts = await web3.eth.getAccounts();
    this.setState({
      account: accounts[0],
    });
    console.log(accounts);

    // Netword ID
    const networkId = await web3.eth.net.getId();
    const networkData = HealthCare.networks[networkId];

    if (networkData) {
      const healthCare = web3.eth.Contract(HealthCare.abi, networkData.address);
      this.setState({
        healthCare,
      });
    } else {
      window.alert(
        "HealthCare contract has not yet been deployed on the blockchain."
      );
    }

    // Address
    // ABI
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      healthCare: null,
      //1
      createDoctorname: "",
      //2
      verifyDoctoraddr: "",
      //3
      doctorDetailsaddr: "",
      //4
      patientDetailsaddr: "",
      //5
      createPatientname: "",
      createPatientaddr: "",
      //6
      writeNotepaddr: "",
      writeNotetitle: "",
      writeNotedesc: "",
    };
  }
  changeHandler = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  dCount = () => {};

  pCount = () => {};

  noteCount = () => {};

  //1
  createDoctor = (e) => {
    e.preventDefault();
    this.setState({
      createDoctorname: "",
    });
    console.log(this.state.createDoctorname);
    console.log(this.state.account);
    // Does not work, idk what the error is
    // Could be related to Gas
    this.state.healthCare.methods.createDoctor(
      this.state.createDoctorname
    ).send({from: this.state.account});
  };
  //2
  verifyDoctor = (e) => {
    e.preventDefault();
    this.setState({
      verifyDoctoraddr: "",
    });
  };
  //3
  doctorDetails = (e) => {
    e.preventDefault();
    this.setState({
      doctorDetailsaddr: "",
    });
  };
  //4
  patientDetails = (e) => {
    e.preventDefault();
    this.setState({
      patientDetailsaddr: "",
    });
  };
  //5
  createPatient = (e) => {
    e.preventDefault();
    this.setState({
      createPatientname: "",
      createPatientaddr: "",
    });
  };
  //6
  writeNote = (e) => {
    e.preventDefault();
    this.setState({
      writeNotepaddr: "",
      writeNotetitle: "",
      writeNotedesc: "",
    });
    console.log(this.state);
  };

  render() {
    const {
      createDoctorname,
      verifyDoctoraddr,
      doctorDetailsaddr,
      patientDetailsaddr,
      createPatientname,
      createPatientaddr,
      writeNotepaddr,
      writeNotetitle,
      writeNotedesc,
    } = this.state;
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Health-Block</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Blockchain powered health traking</Nav.Link>
          </Nav>
          <Nav className="mr-sm-2 account-name">
            Current account : {this.state.account}
          </Nav>
        </Navbar>
        <br />
        <br />
        <br />
        {/* ADMIN SECTION */}
        <div className="text-center">
          <h1>Welcome to Health-Block</h1>
          <img src={Logo} alt="logo" />
        </div>
        <br />
        <br />
        <div>
          <h1 className="text-center">Admin Section</h1>
          <div className="container col-5 justify-content-center">
            <div className="text-center">
              <Button onClick={this.dCount} variant="success">
                Doctor Count
              </Button>{" "}
              <Button onClick={this.pCount} variant="success">
                Patient Count
              </Button>{" "}
              <Button onClick={this.noteCount} variant="success">
                Health Note Count
              </Button>{" "}
            </div>
            <br />
            <br />
            <br />
            {/* 1 */}
            <form onSubmit={this.createDoctor}>
              <h3>CreateDoctor</h3>
              <div class="form-group">
                Doctor's Name:
                <input
                  type="text"
                  name="createDoctorname"
                  class="form-control"
                  placeholder="Enter Name*"
                  value={createDoctorname}
                  onChange={this.changeHandler}
                />
              </div>

              <div class="form-group">
                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>

            <br />
            <br />
            <br />
            {/* 2  */}
            <form onSubmit={this.verifyDoctor}>
              <h3>VerifyDoctor</h3>
              <div class="form-group">
                Doctor's Address:
                <input
                  type="text"
                  name="verifyDoctoraddr"
                  class="form-control"
                  placeholder="Enter Address*"
                  value={verifyDoctoraddr}
                  onChange={this.changeHandler}
                />
              </div>

              <div class="form-group">
                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Verify
                </button>
              </div>
            </form>
            <br />
            <br />
            <br />
            {/* 3 */}
            <form onSubmit={this.doctorDetails}>
              <h3>Doctor's Details</h3>
              <div class="form-group">
                Doctor's address:
                <input
                  type="text"
                  name="doctorDetailsaddr"
                  class="form-control"
                  placeholder="Enter Address*"
                  value={doctorDetailsaddr}
                  onChange={this.changeHandler}
                />
              </div>

              <div class="form-group">
                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Check
                </button>
              </div>
            </form>
            <br />
            <br />
            <br />
            {/* 4 */}
            <form onSubmit={this.patientDetails}>
              <h3>Patient's Details</h3>
              <div class="form-group">
                Patient's address:
                <input
                  type="text"
                  class="form-control"
                  name="patientDetailsaddr"
                  placeholder="Enter Address*"
                  value={patientDetailsaddr}
                  onChange={this.changeHandler}
                />
              </div>

              <div class="form-group">
                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Check
                </button>
              </div>
            </form>
          </div>
        </div>
        <br />
        <br />
        <br />
        {/* DOCTOR */}
        <div>
          <h1 className="text-center">Doctor Section</h1>
          <div className="container col-5 justify-content-center">
            {/* 5  */}
            <form onSubmit={this.createPatient}>
              <h3>CreatePatient</h3>
              <div class="form-group">
                Patient's Name:
                <input
                  type="text"
                  class="form-control"
                  name="createPatientname"
                  placeholder="Enter Name*"
                  value={createPatientname}
                  onChange={this.changeHandler}
                />
              </div>
              <div class="form-group">
                Patient's Address:
                <input
                  type="text"
                  name="createPatientaddr"
                  class="form-control"
                  placeholder="Enter Address*"
                  value={createPatientaddr}
                  onChange={this.changeHandler}
                />
              </div>

              <div class="form-group">
                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
            <br />
            <br />
            <br />
            {/* 6 */}
            <form onSubmit={this.writeNote}>
              <h3>WriteNote</h3>
              <div class="form-group">
                Patient address:
                <input
                  type="text"
                  class="form-control"
                  name="writeNotepaddr"
                  placeholder="Enter Name*"
                  value={writeNotepaddr}
                  onChange={this.changeHandler}
                />
              </div>
              <div class="form-group">
                Title:
                <input
                  type="text"
                  class="form-control"
                  name="writeNotetitle"
                  placeholder="Enter Title*"
                  value={writeNotetitle}
                  onChange={this.changeHandler}
                />
              </div>

              <div class="form-group">
                Description:
                <input
                  type="text"
                  class="form-control"
                  name="writeNotedesc"
                  placeholder="Description*"
                  value={writeNotedesc}
                  onChange={this.changeHandler}
                />
              </div>

              <div class="form-group">
                <button
                  class="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
            <br />
            <br />
            <br />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

pragma solidity ^0.5.0;


contract HealthCare {
    // admin account
    //will be the address of the account that deploys the smart contract
    address public admin;

    //set the admin to the contract deployer
    constructor() public {
        admin = msg.sender;
    }

    // to check if he is an admin
    modifier adminCheck() {
        require(msg.sender == admin);
        _;
    }

    // verifyPatient
    //admin will verify if a person registered as patient is actually a patient
    /*function verifyPatient(address _address) public adminCheck {
        patients[_address].isVerified = true;
        patientsCounter();
    }*/

    // verifyDoctor
    //admin will verify if a person registered as doctor is actually a doctor
    //doctorCount will be incremented by 1
    function verifyDoctor(address _address) public adminCheck {
        doctors[_address].isVerified = true;
        doctorsCounter();
    }

    // DOCTOR
    
    //keep count of the number of doctors
    uint256 public doctorCount = 0;
    //map of sender address to doctor structure
    mapping(address => Doctor) public doctors;
    //struct containing doctor name and verified or not
    struct Doctor {
        string name;
        bool isVerified;
    }

    //increase the count of the number of doctors existing on the blockchain
    //'internal' keyword means this wont be available for the public to view
    function doctorsCounter() internal {
        doctorCount += 1;
    }

    //doctor will be created in the mapping with address as the key
    function createDoctor(string memory _name) public {
        //check if doctor has already been created
        require(doctors[msg.sender].isVerified == false);
        
        doctors[msg.sender] = Doctor(_name, false);
    }

    // patient
    
    //keep track of number of patients
    uint256 public patientCount = 0;
    //mapping of address to patients
    mapping(address => Patient) public patients;
    struct Patient {
        string name;
        //isVerified is not needed anymore
        //TODO:check if removing it breaks anything
        bool isVerified;
    }
    
    //patient count will be incremented by 1
    function patientsCounter() internal {
        patientCount += 1;
    }

    //create a patient
    function createPatient( address _patientAddress, string memory _name) public {
        
        //only a doctor can create a patient
        require(doctors[msg.sender].isVerified == true);
        //check if patient already exists
        require(patients[_patientAddress].isVerified == false);
        
        patients[_patientAddress] = Patient(_name, true);
        patientsCounter();
    }

    //health note
    
    //number of health notes issued
    uint256 public HealthNoteCount = 0;
    //mapping of incremental numbers and health notes
    mapping(uint256 => HealthNote) public healthNotes;
    //struct of the healthnote issue by the doctor
    struct HealthNote {
        uint256 id;
        address patient;
        address doctor;
        string title;
        string description;
    }

    //increment the number of health notes1
    function HealthNoteCounter() internal {
        HealthNoteCount += 1;
    }
    
    
    //TODO: encrypt and store this Note somewhere that is not public 
    //but can be accessed by patient and doctor who is given permissions
    function writeNote(
        address _patient,
        string memory _title,
        string memory _description
    ) public {
        
        //check if doctor is creating healthNote
        require(doctors[msg.sender].isVerified == true);
        
        HealthNoteCounter();
        healthNotes[HealthNoteCount] = HealthNote(
            HealthNoteCount,
            _patient,
            msg.sender,
            _title,
            _description
        );
    }
}
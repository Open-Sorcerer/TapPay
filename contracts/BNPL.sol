// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import { OApp, Origin, MessagingFee } from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract BNPL is OApp {
    constructor(address _endpoint, address _owner) OApp(_endpoint, _owner) Ownable(_owner) {}

    // Some arbitrary data you want to deliver to the destination chain!
    string public data;

    // Loan Directory CRUD
    struct Loan {
        uint256 id;
        address borrower;
        uint256 amount;
        uint256 dueDate;
        bool isPaid;
    }

    mapping(uint256 => Loan) public loans;
    uint256 public nextLoanId;

    event LoanCreated(uint256 id, address borrower, uint256 amount, uint256 dueDate);
    event LoanUpdated(uint256 id, uint256 amount, uint256 dueDate, bool isPaid);
    event LoanDeleted(uint256 id);

    // CRUD Functions for Loan Directory

    function createLoan(address _borrower, uint256 _amount, uint256 _dueDate) external onlyOwner {
        uint256 loanId = nextLoanId++;
        loans[loanId] = Loan(loanId, _borrower, _amount, _dueDate, false);
        emit LoanCreated(loanId, _borrower, _amount, _dueDate);
    }

    function readLoan(uint256 _loanId) external view returns (Loan memory) {
        require(loans[_loanId].borrower != address(0), "Loan does not exist");
        return loans[_loanId];
    }

    function updateLoan(uint256 _loanId, uint256 _amount, uint256 _dueDate, bool _isPaid) external onlyOwner {
        require(loans[_loanId].borrower != address(0), "Loan does not exist");
        Loan storage loan = loans[_loanId];
        loan.amount = _amount;
        loan.dueDate = _dueDate;
        loan.isPaid = _isPaid;
        emit LoanUpdated(_loanId, _amount, _dueDate, _isPaid);
    }

    function deleteLoan(uint256 _loanId) external onlyOwner {
        require(loans[_loanId].borrower != address(0), "Loan does not exist");
        delete loans[_loanId];
        emit LoanDeleted(_loanId);
    }

    // Existing LayerZero functions

    /**
     * @notice Sends a message from the source to destination chain.
     * @param _dstEid Destination chain's endpoint ID.
     * @param _message The message to send.
     * @param _options Message execution options (e.g., for sending gas to destination).
     */
    function send(
        uint32 _dstEid,
        string memory _message,
        bytes calldata _options
    ) external payable {
        // Encodes the message before invoking _lzSend.
        // Replace with whatever data you want to send!
        bytes memory _payload = abi.encode(_message);
        _lzSend(
            _dstEid,
            _payload,
            _options,
            // Fee in native gas and ZRO token.
            MessagingFee(msg.value, 0),
            // Refund address in case of failed source message.
            payable(msg.sender)
        );
    }

    /**
     * @dev Called when data is received from the protocol. It overrides the equivalent function in the parent contract.
     * Protocol messages are defined as packets, comprised of the following parameters.
     * @param _origin A struct containing information about where the packet came from.
     * @param _guid A global unique identifier for tracking the packet.
     * @param payload Encoded message.
     */
    function _lzReceive(
        Origin calldata _origin,
        bytes32 _guid,
        bytes calldata payload,
        address,  // Executor address as specified by the OApp.
        bytes calldata  // Any extra data or options to trigger on receipt.
    ) internal override {
        // Decode the payload to get the message
        // In this case, type is string, but depends on your encoding!
        data = abi.decode(payload, (string));
    }
}
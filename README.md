# TapPay

A chain-agnostic mobile payment app using NFC cards for secure, seamless cross-chain transactions. Pay with your favorite token on any chain, anywhere. Powered by Chainlink CCIP and LayerZero for ultimate flexibility and security.

## Project Description

TapPay paves a new way for digital payments by offering a truly chain-agnostic mobile experience. Our application leverages battle-tested protocols Chainlink CCIP and LayerZero to enable users to pay with their preferred tokens on any blockchain, regardless of the merchant's preferred token or chain.

TapPay provides a unified payment interface for consumer crypto to pay for their daily bread and butter.

[CCIP Contract](https://ccip.chain.link/address/0x21fea77b1026245f00d572d8fcc39ba8be0df2be)
[Sign Protocol Attestation Script](https://testnet-scan.sign.global/schema/onchain_evm_10200_0x76)

## Key Features:

Chain-Agnostic Payments: Users can pay with their favorite token on their preferred chain, while merchants can receive payment in their desired token on their chosen chain. NFC Card Integration: We've incorporated NFC cards for enhanced security and ease of use. The card stores an encrypted keyshare, working in tandem with the mobile app for a seamless tap-and-pay experience. Cross-Chain Compatibility: Utilizing Chainlink CCIP and LayerZero, our app handles complex cross-chain transactions behind the scenes, providing a smooth user experience. Merchant Flexibility: Merchants can specify their preferred token and chain for receiving payments, without limiting customer options. Enhanced Security: The combination of NFC card and mobile app keyshares provides an additional layer of security for transactions.

TapPay bridges the gap between various blockchain ecosystems, making cryptocurrency payments as simple and universal as traditional payment methods. Whether you're buying coffee at a local shop or making a purchase halfway around the world, TapPay ensures that blockchain differences never hinder your transaction.

## How it's Made

TapPay is built on multiple blockchain technologies and user-centric design principles:

Mobile Application: Developed using React Native for cross-platform compatibility (iOS and Android). The app interfaces with various blockchain networks and manages user wallets and preferences. Smart Contracts: Written in Solidity, our contracts handle the core logic of cross-chain transactions. They're deployed on multiple chains to facilitate seamless interoperability. Cross-Chain Interoperability:

Chainlink CCIP (Cross-Chain Interoperability Protocol): Used for secure cross-chain messaging and token transfers. CCIP's reliability ensures that complex multi-chain transactions are executed accurately. LayerZero: Implemented for additional cross-chain capabilities, providing redundancy and expanded network coverage.

NFC Integration: We've developed a custom protocol for secure communication between the NFC card and the mobile app. The NFC card stores an encrypted keyshare, which is combined with a keyshare in the app to complete transactions.

Security Measures: Multi-factor authentication combining biometrics, NFC card, and app-based verification. End-to-end encryption for all communications. Threshold cryptography for distributing transaction signing across the NFC card and mobile app.

Token Swap Integration: We've integrated with decentralized exchanges on various chains to facilitate token swaps when necessary for cross-chain transactions.

One particularly innovative aspect is our "Chain Abstraction Layer." This custom-built middleware dynamically routes transactions through the most efficient cross-chain pathway, considering factors like gas fees, transaction speed, and network congestion. It seamlessly switches between Chainlink CCIP and LayerZero based on real-time conditions, ensuring optimal performance for each transaction.

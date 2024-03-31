# Kyte Assignment

# Watch DEMO Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/2UtbZqrcL8s?si=EnXc5wfff42gelsf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Backend (Smart Contracts):

- built with foundry, solidity

### Add variables to .env in `backend` for deploying and working with smart contracts

- ```bash
  MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
  OPTIMISM_SEPOLIA=https://sepolia.optimism.io
  BASE_SEPOLIA_RPC=https://rpc.notadegen.com/base/sepolia
  PRIVATE_KEY=0xYOUR_PRIVATE_KEY
  ```

### Interacting with contract

#### Build contract:

- ```bash
  forge build
  ```

#### Running the deploy script

- ```bash
     forge script script/Deploy.s.sol --rpc-url optimism_sepolia --broadcast
  ```

#### Running tests

- ```bash
    forge test -vvvv
  ```

## Backend (Nodejs):

### **_NOTE: Created using the API routes in Nextjs_**

### Add variables to .env in `frontend` folder

- ```bash
  DATABASE=mongoDB-URL/database
  DATABASE_PASSWORD=mongodb-password
  ```

### Running the Nextjs app

- ```bash
    npm i
    npm run dev
  ```
- In case of errors try installing using
  - ```bash
    npm i --legacy-peer-deps
    ```
- After Installation, run with
  - ```bash
    npm run dev
    ```

## Frontend (Nextjs)

- Used Web3js and Wagmi to interact with contracts
- Rainbowkit UI for wallet connection

import React, { useState } from "react";
import "./App.css";
import { connectWallet } from "./blockchain/connectWallet";

function App() {
  const [account, setAccount] = useState<string | null>(null);

  const handleConnect = async () => {
    const result = await connectWallet();
    if (result) {
      setAccount(result.account);
    }
  };

  return (
    <div className="App">
      <h1>DApp React + TypeScript</h1>
      <button onClick={handleConnect}>
        {account ? `Đã kết nối: ${account}` : "Kết nối ví"}
      </button>
    </div>
  );
}

export default App;

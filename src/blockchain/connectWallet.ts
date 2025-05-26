import { ethers } from "ethers";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const signer = await provider.getSigner();
      return {
        provider,
        signer,
        account: accounts[0],
      };
    } catch (err) {
      console.error("Lỗi kết nối ví:", err);
    }
  } else {
    alert("Vui lòng cài đặt MetaMask!");
  }
};

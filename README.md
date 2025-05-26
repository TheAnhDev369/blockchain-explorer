# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---

## Cài thư viện blockchain cần thiết

```js
npm install ethers
```

- Giải thích:
  - ethers là thư viện phổ biến dùng để kết nối tới Ethereum blockchain (Metamask, smart contract, v.v.)

## Kết nối với ví Metamask (Ethereum)

- Tạo file src/blockchain/connectWallet.ts:

```ts
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
```

## Gọi hàm kết nối trong App

- Mở file src/App.tsx và sửa như sau:

```ts
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
```

## Chạy thử

```js
npm start
```

- Mở trình duyệt và truy cập http://localhost:3000
- Nếu bạn đã cài MetaMask, app sẽ hiện nút "Kết nối ví" → bấm và chấp nhận kết nối -> Kết nối thành công nếu đã cài extension ví Metamask .
- Nếu chưa cài sẽ báo "Vui lòng cài đặt Metamask" .

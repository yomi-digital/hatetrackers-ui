import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import axios from "axios";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import "./App.css";
import MyRouter from "./MyRouter";

axios.defaults.baseURL = import.meta.env.VITE_API_URI;
// Create a client
const queryClient = new QueryClient();

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

const metadata = {
  name: "Web3Modal",
  description: "Hate Trackers Web3Modal",
  url: "https://hatetrackers.yomi.dance", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const config = defaultWagmiConfig({
  chains: [mainnet, sepolia], // required
  projectId, // required
  metadata, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default});
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MyRouter />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

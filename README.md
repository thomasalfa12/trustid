
# 🎓 TrustId – Soulbound Token-based Academic Credential System

**TrustId** adalah aplikasi Web3 yang mengeluarkan dan memverifikasi kredensial akademik berupa **Soulbound Tokens (SBTs)** di jaringan Ethereum. Proyek ini merupakan skripsi berjudul:

> “Revitalizing Digital Identity: Designing A Digital Identity Verification System by Utilizing Ethereum Blockchain Based Soulbound Token (SBT) in The Context of Web 3.0 Era.”

---

## 🗂️ Project Structure

```
trustid/
│
├── mint/              # Aplikasi untuk minting kredensial
│   ├── pages/
│   ├── components/
│   ├── ...next config, styles, public, dll.
├── verify/            # Aplikasi untuk verifikasi kredensial
│   ├── pages/
│   ├── components/
│   ├── ...next config, styles, public, dll.
├── contracts/         # Smart contract Solidity (SBT logic)
├── scripts/           # Deployment dan helper scripts
├── hardhat.config.js
└── README.md
```

---

## 🚀 Overview

### 1. `/mint`
Aplikasi web untuk:
- Login menggunakan wallet (RainbowKit)
- Issuer (institusi akademik) mint SBT dengan metadata kredensial

### 2. `/verify`
Aplikasi web publik untuk:
- Login dengan wallet
- Akses dashboard verifikasi yang diproteksi via **Collab.Land token gating**

---

## 🛠️ Core Features

- 📜 Non-transferable ERC-721 smart contract (SBT logic)
- 🔐 Wallet auth via **RainbowKit & Wagmi**
- 🛂 Gating akses verifikasi menggunakan **Collab.Land**
- ⚙️ Interaksi kontrak melalui **Ethers.js**
- 🖥️ Frontend menggunakan Next.js + TypeScript + TailwindCSS
- 📦 Deployment kontrak menggunakan Hardhat

---

## 🧩 Installation & Setup

### Clone repo dan install dependencies

```bash
git clone https://github.com/thomasalfa12/trustid.git
cd trustid
npm install
```

### Konfigurasi Environment Variables

Buat `.env.local` untuk masing-masing folder `mint/` dan `verify/`:

```
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContract
NEXT_PUBLIC_CHAIN_ID=5                          # contoh: Goerli
NEXT_PUBLIC_GATE_ID=your_collabland_gate_id     # khusus untuk verify app
```

### Menjalankan aplikasi secara lokal

```bash
# Minting app
cd mint
npm run dev

# Verifikasi app
cd verify
npm run dev
```

---

## 📐 Smart Contract (contracts/SBT.sol)

Contoh fungsi minting:
```solidity
function mint(address to, string memory uri) external onlyIssuer {
    require(balanceOf(to) == 0, "SBT already issued");
    // mint logic..
}
```

Non-transferable enforcement:
```solidity
function _beforeTokenTransfer(address from, address, uint256) internal override {
    require(from == address(0), "Cannot transfer SBT");
    super._beforeTokenTransfer(from, address(0), 0);
}
```

---

## 💡 Token Gating via Collab.Land

- Konfigurasikan melalui dashboard Collab.Land
- Gunakan `Gate ID` di `verify/.env.local` untuk akses verifikasi

---

## 🧪 Testing & Deployment

- Gunakan Hardhat untuk deploy ke testnet (`scripts/deploy.js`)
- Lokalkan menggunakan `mint` dan `verify` untuk demo

---

## 👨‍🎓 Author

**Thomas Alfa Edison**  
Electrical Engineering — Sriwijaya University  
Email: edison.thomas52@gmail.com

---

## 📄 License

MIT License — bebas digunakan, modifikasi, atau disebarluaskan

---

## 🖼️ Screenshots & Dokumentasi

Jika tersedia, tambahkan tangkapan layar halaman:
- Minting (form input + wallet connect)
- Verifikasi (akses gated + token info)

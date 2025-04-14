# 🐶 Corgi – The Game

**Corgi – The Game** is a fun and interactive web game where players can collect, reveal, and enjoy unique mystery Corgi cards. Each card has special traits and artwork, and players get a fresh surprise every time they open a mystery pack.

---

## 🎯 What We Built

Corgi – The Game is a browser-based, gamified experience with:
- 🔮 **Mystery Pack Opening**: Users can open a digital mystery box to receive a random corgi card.
- 🎲 **Verifiable Randomness**: Each card reveal uses **Randamu** to ensure randomness is fair and decentralized.
- 🏆 **Leaderboard**: Tracks and showcases top players.
- ⏱️ **Countdown Timer**: Adds excitement by timing events or limited-edition reveals.
- 🎉 **Visuals and Effects**: Confetti, sound effects, and pixel-style animations bring the experience to life.

---

## 💡 Sponsor Tech Used

### 🔁 Randamu
We used **Randamu** to generate verifiable random numbers when revealing mystery cards. This ensured fairness and made sure that each reveal couldn’t be predicted or manipulated.

Randamu was:
- ✅ Easy to use
- 📘 Well-documented
- 💡 A great fit for adding transparency and trust to game mechanics

---

## 🛠️ Tech Stack

- **React.js** & **Next.js** – Frontend Framework
- **TailwindCSS** – Styling
- **TypeScript** – Type safety
- **Randamu** – Randomness Oracle
- **Ethers.js** – For interacting with smart contracts (prepared)
- **Solidity** – Smart contract for future expansion
- **IPFS (Planned)** – For decentralized asset storage

---

## 🎮 Gameplay Flow

1. **Enter the Game**
2. **Open Mystery Pack**
3. **Get a Random Corgi Card**
4. **Check Card Traits**
5. **Watch Your Ranking on the Leaderboard**

---

## 📁 Folder Structure Highlights

- `app/` – Pages and routes
- `components/` – Reusable UI and game components
- `hooks/` – Custom hooks for sound and responsiveness
- `contracts/` – Solidity smart contract and ABI
- `public/images/` – Corgi card images and assets

---

## 🚀 How to Run

```bash
git clone https://github.com/harshajain6114/encode.git
cd Corgi-the-game
npm install --legacy-peer-deps
npm run dev

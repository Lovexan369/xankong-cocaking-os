# XanKong Cocaking OS

Полная экосистема Дмитрия Коваля:

- Telegram Bot + Private AI (NarutoAI)
- Xancoin (ERC-20 utility token)
- Exchange + Payments
- Docker + Kubernetes ready
- Auto deploy via GitHub Actions

**Author:** Dmitry Koval  
**Email:** Ivanbolwan666@gmail.com

## Quick Start (Local)

```bash
npm install
export BOT_TOKEN=your_telegram_bot_token
npm start
# or
docker compose up --build
```

## Structure

- `bot.js` — Telegram bot with NarutoAI, balance, exchange
- `index.html` — Frontend dashboard
- `contracts/Xancoin.sol` — ERC-20 smart contract
- `Dockerfile` + `docker-compose.yml`
- `k8s/` — Kubernetes manifests
- `.github/workflows/` — CI/CD

## Production

1. Add secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `BOT_TOKEN`
2. Push to `main` → auto build & push Docker image
3. Deploy to VPS / Kubernetes with domain + cert-manager SSL

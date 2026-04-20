# Forex Trading Robot

A Python trading robot scaffold for MetaTrader 5.

## What is included

- `main.py`: entrypoint that connects to MetaTrader 5 and runs a sample strategy loop.
- `metatrader_client.py`: MT5 connection and order helper functions.
- `strategy.py`: simple moving average crossover signal generation.

## Setup

1. Install MetaTrader 5 and configure a demo or live account.
2. Enable Python integration in MT5, if required.
3. Create and activate a Python virtual environment:

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## Running

```bash
python main.py
```

## Notes

- This repository is a starting point, not a complete trading system.
- Always test strategies in a demo account before trading real money.
- Review broker and account settings carefully.

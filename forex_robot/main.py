import time
import MetaTrader5 as mt5
from metatrader_client import MetaTraderClient
from strategy import compute_moving_averages, generate_signal


def main():
    login = 12345678  # replace with your MT5 login
    password = "your_password"
    server = "YourBroker-Server"
    symbol = "EURUSD"
    timeframe = mt5.TIMEFRAME_M15
    volume = 0.01

    client = MetaTraderClient(login, password, server)
    client.initialize()
    print("MetaTrader 5 connected")

    try:
        while True:
            rates = client.get_rates(symbol, timeframe, 200)
            df = compute_moving_averages(rates, short_window=20, long_window=50)
            signal = generate_signal(df)

            if signal == "buy":
                price = mt5.symbol_info_tick(symbol).ask
                print(f"Signal: BUY at {price}")
                client.place_order(symbol, mt5.ORDER_TYPE_BUY, volume, price)
            elif signal == "sell":
                price = mt5.symbol_info_tick(symbol).bid
                print(f"Signal: SELL at {price}")
                client.place_order(symbol, mt5.ORDER_TYPE_SELL, volume, price)
            else:
                print("No trade signal. Waiting...")

            time.sleep(60)
    except KeyboardInterrupt:
        print("Stopping robot...")
    finally:
        client.shutdown()
        print("MetaTrader 5 shutdown")


if __name__ == "__main__":
    main()

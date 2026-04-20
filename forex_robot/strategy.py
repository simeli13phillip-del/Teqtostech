import pandas as pd

def compute_moving_averages(rates, short_window: int = 20, long_window: int = 50):
    df = pd.DataFrame(rates)
    df["time"] = pd.to_datetime(df["time"], unit="s")
    df.set_index("time", inplace=True)
    df["close"] = df["close"]
    df["ma_short"] = df["close"].rolling(short_window).mean()
    df["ma_long"] = df["close"].rolling(long_window).mean()
    return df


def generate_signal(df):
    if len(df) < 2:
        return None
    last = df.iloc[-1]
    prev = df.iloc[-2]

    if prev["ma_short"] <= prev["ma_long"] and last["ma_short"] > last["ma_long"]:
        return "buy"
    if prev["ma_short"] >= prev["ma_long"] and last["ma_short"] < last["ma_long"]:
        return "sell"
    return None

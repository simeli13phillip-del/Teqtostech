import MetaTrader5 as mt5

class MetaTraderClient:
    def __init__(self, login: int, password: str, server: str):
        self.login = login
        self.password = password
        self.server = server

    def initialize(self) -> bool:
        if not mt5.initialize():
            raise RuntimeError(f"MT5 initialize failed: {mt5.last_error()}")
        authorized = mt5.login(self.login, password=self.password, server=self.server)
        if not authorized:
            raise RuntimeError(f"MT5 login failed: {mt5.last_error()}")
        return True

    def shutdown(self) -> None:
        mt5.shutdown()

    def get_rates(self, symbol: str, timeframe: int, n: int):
        rates = mt5.copy_rates_from_pos(symbol, timeframe, 0, n)
        if rates is None:
            raise RuntimeError(f"Failed to fetch rates for {symbol}: {mt5.last_error()}")
        return rates

    def place_order(self, symbol: str, order_type: int, volume: float, price: float, sl: float = None, tp: float = None):
        request = {
            "action": mt5.TRADE_ACTION_DEAL,
            "symbol": symbol,
            "volume": volume,
            "type": order_type,
            "price": price,
            "deviation": 20,
            "magic": 234000,
            "comment": "python-forex-robot",
            "type_time": mt5.ORDER_TIME_GTC,
            "type_filling": mt5.ORDER_FILLING_FOK,
        }
        if sl is not None:
            request["sl"] = sl
        if tp is not None:
            request["tp"] = tp
        result = mt5.order_send(request)
        if result.retcode != mt5.TRADE_RETCODE_DONE:
            raise RuntimeError(f"Order send failed: {result.comment} ({result.retcode})")
        return result

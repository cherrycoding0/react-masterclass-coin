import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { isDarkAtom } from "../atom";
import { useRecoilValue } from "recoil";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const candlestickData =
    data?.map((price) => ({
      x: new Date(price.time_close), // Use the closing time for the x-axis
      y: [price.open, price.high, price.low, price.close], // OHLC values
    })) ?? [];

    
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="candlestick" // Change to candlestick
          series={[
            {
              name: "Candlestick Data",
              data: candlestickData,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light", // Adjust theme based on dark mode
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            xaxis: {
              type: "datetime", // Use datetime for x-axis
              labels: {
                style: { colors: isDark ? "#ffffff" : "#000000" }, // Adjust label colors
              },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: {
              labels: {
                style: { colors: isDark ? "#ffffff" : "#000000" }, // Adjust label colors
              },
              tooltip: { enabled: true }, // Enable tooltip for y-axis
            },
            tooltip: {
              enabled: true,
              theme: isDark ? "dark" : "light", // Adjust tooltip theme
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

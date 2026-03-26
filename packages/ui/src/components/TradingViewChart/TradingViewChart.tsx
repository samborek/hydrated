import { hexToRgba } from "@galacticcouncil/utils"
import { createChart, LineType, SeriesType } from "lightweight-charts"
import { useEffect, useRef, useState } from "react"

import { Box } from "../Box"
import { Crosshair } from "./components/Crosshair"
import { PriceIndicator } from "./components/PriceIndicator"
import {
  crosshair,
  grid,
  layout,
  leftPriceScale,
  rightPriceScale,
  timeScale,
} from "./config"
import {
  BaselineChartData,
  CrosshairCallbackData,
  OhlcData,
  renderSeries,
  subscribeCrosshairMove,
} from "./utils"
import { useTheme } from "@/theme"

type ChartTypeProps =
  | {
    type: Extract<SeriesType, "Candlestick">
    onCrosshairMove?: (data: OhlcData | null) => void
  }
  | {
    type?: Extract<SeriesType, "Baseline">
    onCrosshairMove?: (data: BaselineChartData | null) => void
  }

export type TradingViewChartProps = ChartTypeProps & {
  data: Array<OhlcData>
  height?: number
  hidePriceIndicator?: boolean
  preventTouchDrag?: boolean
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({
  data,
  type = "Baseline",
  height = 400,
  hidePriceIndicator,
  preventTouchDrag,
  onCrosshairMove,
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const crosshairRef = useRef<HTMLDivElement | null>(null)
  const priceIndicatorRef = useRef<HTMLDivElement | null>(null)

  const onCrosshairMoveRef = useRef(onCrosshairMove)
  useEffect(() => {
    onCrosshairMoveRef.current = onCrosshairMove
  }, [onCrosshairMove])

  const [crosshairData, setCrosshairData] =
    useState<CrosshairCallbackData>(null)

  const { themeProps } = useTheme()

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      autoSize: true,
      height,
      layout: layout(themeProps),
      rightPriceScale,
      leftPriceScale,
      grid,
      timeScale,
      crosshair: crosshair(themeProps),
      handleScroll: preventTouchDrag
        ? {
          horzTouchDrag: true,
          vertTouchDrag: false,
        }
        : undefined,
      handleScale: preventTouchDrag
        ? {
          axisPressedMouseMove: true,
          mouseWheel: true,
          pinch: true,
        }
        : undefined,
    })

    const [series, volumeSeries] = renderSeries(
      chart,
      type,
      data,
      {
        upColor: themeProps.details.values.positive,
        downColor: themeProps.details.values.negative,
        lineColor: themeProps.details.chart,
        volumeBarColor: hexToRgba(themeProps.details.chart, 0.3),
      },
      {
        lineType: LineType.Curved,
      },
    )

    chart.timeScale().fitContent()

    if (
      crosshairRef.current &&
      (hidePriceIndicator || !!priceIndicatorRef.current)
    ) {
      subscribeCrosshairMove(
        chart,
        [series, volumeSeries],
        chartContainerRef.current,
        crosshairRef.current,
        priceIndicatorRef.current,
        (data) => {
          setCrosshairData(data)
          onCrosshairMoveRef.current?.((data?.data ?? null) as never)
        },
      )
    }

    return () => {
      chart.remove()
    }
  }, [data, height, themeProps, type, hidePriceIndicator, preventTouchDrag])

  return (
    <Box sx={{ position: "relative", touchAction: preventTouchDrag ? "pan-y pinch-zoom" : undefined }}>
      <div ref={chartContainerRef} />
      <Crosshair ref={crosshairRef} {...crosshairData} />
      {!hidePriceIndicator && <PriceIndicator ref={priceIndicatorRef} />}
    </Box>
  )
}

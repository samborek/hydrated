import { hexToRgba } from "@galacticcouncil/utils"
import {
  createChart,
  IChartApi,
  IPriceLine,
  LineStyle,
  LineType,
  SeriesType,
} from "lightweight-charts"
import {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

import { Box } from "@/components"
import { Crosshair } from "@/components/TradingViewChart/components/Crosshair"
import { PriceIndicator } from "@/components/TradingViewChart/components/PriceIndicator"
import {
  crosshair,
  grid,
  layout,
  leftPriceScale,
  rightPriceScale,
  timeScale,
} from "@/components/TradingViewChart/config"
import {
  BaselineChartData,
  CrosshairCallbackData,
  OhlcData,
  renderSeries,
  subscribeCrosshairMove,
  TradingViewChartSeries,
} from "@/components/TradingViewChart/utils"
import { useBreakpoints, useUiScale } from "@/styles/media"
import { useTheme } from "@/theme"

export type TradingViewChartRef = {
  resetZoom: () => void
}

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
  ref?: RefObject<TradingViewChartRef | null>
  data: Array<OhlcData>
  height?: number
  hidePriceIndicator?: boolean
  priceLines?: Array<number>
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({
  ref,
  data,
  type = "Baseline",
  height = 400,
  hidePriceIndicator,
  priceLines,
  onCrosshairMove,
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const crosshairRef = useRef<HTMLDivElement | null>(null)
  const priceIndicatorRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const priceLinesRef = useRef<IPriceLine[]>([])
  const seriesRef = useRef<TradingViewChartSeries | null>(null)

  useImperativeHandle(ref, () => ({
    resetZoom: () => {
      chartRef.current = null
    },
  }))

  const onCrosshairMoveRef = useRef(onCrosshairMove)
  useEffect(() => {
    onCrosshairMoveRef.current = onCrosshairMove
  }, [onCrosshairMove])

  const [crosshairData, setCrosshairData] =
    useState<CrosshairCallbackData>(null)

  const { themeProps } = useTheme()
  const uiScale = useUiScale()
  const { isMobile } = useBreakpoints()

  // Create chart and series
  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      autoSize: true,
      height,
      layout: layout(themeProps, uiScale),
      rightPriceScale,
      leftPriceScale,
      grid,
      timeScale,
      crosshair: crosshair(themeProps),
      handleScroll: isMobile
        ? {
            horzTouchDrag: true,
            vertTouchDrag: false,
          }
        : undefined,
      handleScale: isMobile
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
    seriesRef.current = series

    const previousVisibleRange = chartRef.current?.timeScale().getVisibleRange()

    if (previousVisibleRange) {
      chart.timeScale().setVisibleRange(previousVisibleRange)
    }

    chartRef.current = chart

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
      seriesRef.current = null
      priceLinesRef.current = []
    }
  }, [data, height, themeProps, type, hidePriceIndicator, uiScale, isMobile])

  // Handle price lines separately so they update without recreating the chart
  useEffect(() => {
    const series = seriesRef.current
    if (!series) return

    // Remove old price lines
    priceLinesRef.current.forEach((line) => {
      series.removePriceLine(line)
    })
    priceLinesRef.current = []

    // Add new price lines
    if (priceLines && priceLines.length > 0) {
      const newLines = priceLines.map((price) => {
        return series.createPriceLine({
          price,
          color: themeProps.details.values.positive,
          lineWidth: 1,
          lineStyle: LineStyle.Dashed,
          axisLabelVisible: true,
          title: "Limit",
        })
      })
      priceLinesRef.current = newLines
    }
  }, [priceLines, themeProps.details.values.positive])

  return (
    <Box
      sx={{
        position: "relative",
        touchAction: isMobile ? "pan-y pinch-zoom" : undefined,
      }}
    >
      <div ref={chartContainerRef} />
      <Crosshair ref={crosshairRef} {...crosshairData} />
      {!hidePriceIndicator && <PriceIndicator ref={priceIndicatorRef} />}
    </Box>
  )
}

import { formatNumber } from "@galacticcouncil/utils"
import { FC, useEffect, useRef, useState } from "react"

import { Box } from "@/components"
import {
  SPriceMarkerLine,
  SPriceMarkerTag,
} from "@/components/TradingViewChart/components/PriceMarkers.styled"
import { TradingViewChartSeries } from "@/components/TradingViewChart/utils"

type PriceMarkersProps = {
  priceLines: Array<number>
  seriesApi: TradingViewChartSeries
}

export const PriceMarkers: FC<PriceMarkersProps> = ({
  priceLines,
  seriesApi,
}) => {
  const [positions, setPositions] = useState<
    ReadonlyArray<{ readonly top: number; readonly price: number }>
  >([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const updatePositions = () => {
      const newPositions = priceLines
        .map((price) => {
          const priceY = seriesApi.priceToCoordinate(price)

          if (priceY === null) {
            return null
          }

          return {
            top: priceY,
            price,
          }
        })
        .filter((position) => !!position)

      setPositions(newPositions)

      // Keep updating to handle chart resizes/zooms
      rafRef.current = requestAnimationFrame(updatePositions)
    }

    // Start updating
    rafRef.current = requestAnimationFrame(updatePositions)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [priceLines, seriesApi])

  if (positions.length === 0) {
    return null
  }

  return (
    <>
      {positions.map((pos, index) => (
        <Box key={index}>
          <SPriceMarkerLine
            sx={{
              top: pos.top,
            }}
          />
          <SPriceMarkerTag
            sx={{ top: pos.top }}
          >
            {formatNumber(pos.price)}
          </SPriceMarkerTag>
        </Box>
      ))}
    </>
  )
}

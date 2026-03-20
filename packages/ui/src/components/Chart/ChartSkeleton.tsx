import { StylePropertyValue } from "@theme-ui/css"

import { LineChartSkeleton } from "@/assets/visuals"
import { Box, Flex } from "@/components"
import { getToken } from "@/utils"

export type ChartSkeletonProps = {
  children?: React.ReactNode
  color?: StylePropertyValue<"color">
  className?: string
}

export const ChartSkeleton: React.FC<ChartSkeletonProps> = ({
  children,
  color,
  className,
}) => {
  return (
    <Flex
      align="end"
      justify="center"
      sx={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
      className={className}
    >
      <LineChartSkeleton
        preserveAspectRatio="none"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          filter: "blur(15px)",
          color: color || getToken("details.chart"),
        }}
      />
      {children && (
        <Box
          sx={{
            color: getToken("text.medium"),
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {children}
        </Box>
      )}
    </Flex>
  )
}

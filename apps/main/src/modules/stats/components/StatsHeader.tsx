import {
  Flex,
  FlexProps,
  Separator,
  ValueStats,
  ValueStatsSize,
  ValueStatsValue,
} from "@galacticcouncil/ui/components"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { FC, Fragment, ReactNode } from "react"

type StatItem = {
  readonly label: string
  readonly value?: string
  readonly valueColor?: string
  readonly customValue?: ReactNode
  readonly bottomLabel?: string
  readonly customBottomLabel?: ReactNode
  readonly isLoading?: boolean
  readonly size?: ValueStatsSize
  readonly wrap?: boolean
}

type StatsHeaderProps = Omit<FlexProps, "children"> & {
  readonly stats: StatItem[]
}

export const StatsHeader: FC<StatsHeaderProps> = ({
  stats,
  gap = getTokenPx("containers.paddings.primary"),
  justify = "space-between",
  className,
  sx,
  ...props
}) => {
  const mergedClassName = ["no-scrollbar", className].filter(Boolean).join(" ")

  return (
    <Flex
      gap={gap}
      justify={justify}
      className={mergedClassName}
      sx={{
        pt: getTokenPx("containers.paddings.secondary"),
        pb: getTokenPx("containers.paddings.secondary"),
        my: 0,
        overflowX: "auto",
        ...sx,
      }}
      {...props}
    >
      {stats.map((stat, index) => {
        const size = stat.size ?? "header"
        const customValue =
          stat.customValue ??
          (stat.valueColor ? (
            <ValueStatsValue size={size} style={{ color: stat.valueColor }}>
              {stat.value}
            </ValueStatsValue>
          ) : undefined)

        return (
          <Fragment key={`${stat.label}-${index}`}>
            <ValueStats
              label={stat.label}
              size={size}
              wrap={stat.wrap ?? true}
              value={!customValue ? stat.value : undefined}
              customValue={customValue}
              bottomLabel={stat.bottomLabel}
              customBottomLabel={stat.customBottomLabel}
              isLoading={stat.isLoading}
            />
            {index < stats.length - 1 && (
              <Separator
                orientation="vertical"
                sx={{
                  my: getTokenPx("containers.paddings.quart"),
                  flexShrink: 0,
                }}
              />
            )}
          </Fragment>
        )
      })}
    </Flex>
  )
}

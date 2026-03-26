import { FC } from "react"

import { type BoxProps } from "../Box"
import { SChip, type SChipProps } from "./Chip.styled"

export type ChipProps = BoxProps &
  SChipProps & {
    ref?: React.Ref<HTMLDivElement>
  }

export const Chip: FC<ChipProps> = (props) => <SChip {...props} />

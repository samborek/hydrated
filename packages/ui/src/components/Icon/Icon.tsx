import { Box, BoxProps } from "@/components/Box"

type IconProps = BoxProps & {
  component: React.ComponentType
}

// Convert px to rem for scalable icons
const toRem = (size: number | string | undefined): string => {
  if (size === undefined) return "1.5rem" // default 24px
  if (typeof size === "string") return size
  return `${size / 16}rem`
}

export const Icon: React.FC<IconProps> = ({
  component: SvgComponent,
  size = 24,
  color = "currentColor",
  ...props
}) => {
  const remSize = toRem(typeof size === "number" || typeof size === "string" ? size : 24)
  return (
    <Box
      color={color}
      size={remSize}
      css={{
        "& > *": { width: "100%", height: "100%" },
      }}
      {...props}
    >
      <SvgComponent />
    </Box>
  )
}

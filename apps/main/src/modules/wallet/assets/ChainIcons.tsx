import { FC } from "react"

type IconProps = {
  readonly size?: number
  readonly className?: string
}

// Hydration pink swirl icon (from Figma)
export const HydrationIcon: FC<IconProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 17 17"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip-hydration)">
      <circle cx="8.065" cy="8" r="8.0705" fill="#F6297C" />
      <path
        d="M12.5524 8.73096C12.6755 8.60805 12.8338 8.44986 12.9911 8.29297C13.3419 7.9428 13.3421 7.37485 12.9913 7.0245L12.6197 6.65335C11.2893 7.98216 9.29842 8.24915 7.70237 7.4545C8.78109 7.65372 9.89903 7.4985 10.8896 6.96657C11.5523 6.61065 11.6782 5.71295 11.1462 5.18157L8.95248 2.99052C8.46229 2.50092 7.66761 2.50092 7.17761 2.99052L4.81309 5.3522C6.37029 4.69141 8.24089 4.99776 9.50736 6.27143C7.57522 5.33475 5.18171 5.66709 3.57749 7.2692C3.45443 7.39212 3.29587 7.55049 3.1386 7.70756C2.78802 8.05791 2.7882 8.6255 3.1386 8.97566L3.51001 9.34663C4.84042 8.01781 6.8313 7.75082 8.42734 8.54547C7.34863 8.34625 6.23069 8.50147 5.24008 9.03341C4.57739 9.38933 4.45154 10.287 4.98356 10.8184L7.17723 13.0095C7.66742 13.4991 8.4621 13.4991 8.95211 13.0095L11.3166 10.6478C9.75942 11.3086 7.88882 11.0022 6.62217 9.72854C8.5543 10.6652 10.9478 10.3329 12.552 8.73077L12.5524 8.73096Z"
        fill="#F6F6EC"
      />
    </g>
    <defs>
      <clipPath id="clip-hydration">
        <rect width="16.13" height="16.13" rx="8.065" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// Ethereum icon (from Figma)
export const EthereumIcon: FC<IconProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 17 17"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip-ethereum)">
      <circle cx="8.065" cy="8" r="9.01758" fill="#EDF0F4" />
      <path d="M8.04049 2.58945L7.96875 2.83311V9.90315L8.04049 9.97472L11.3223 8.03484L8.04049 2.58945Z" fill="#343434" />
      <path d="M8.0404 2.58945L4.75854 8.03484L8.0404 9.97472V6.54312V2.58945Z" fill="#8C8C8C" />
      <path d="M8.04043 10.5961L8 10.6454V13.1638L8.04043 13.2819L11.3242 8.6572L8.04043 10.5961Z" fill="#3C3C3B" />
      <path d="M8.04052 13.2819V10.5961L4.75867 8.6572L8.04052 13.2819Z" fill="#8C8C8C" />
      <path d="M8.04053 9.97472L11.3223 8.03484L8.04053 6.54312V9.97472Z" fill="#141414" />
      <path d="M4.75867 8.03484L8.04052 9.97472V6.54312L4.75867 8.03484Z" fill="#393939" />
    </g>
    <defs>
      <clipPath id="clip-ethereum">
        <rect width="16.13" height="16.13" rx="8.065" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// Solana icon (from Figma)
export const SolanaIcon: FC<IconProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 17 17"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip-solana)">
      <circle cx="8.065" cy="8" r="8.065" fill="black" />
      <path
        d="M4.99967 9.91069C5.05556 9.85481 5.13241 9.8222 5.21391 9.8222H12.6051C12.7402 9.8222 12.8077 9.98521 12.7123 10.0807L11.2522 11.5408C11.1963 11.5967 11.1194 11.6293 11.0379 11.6293H3.64671C3.51164 11.6293 3.44411 11.4663 3.53959 11.3708L4.99967 9.91069Z"
        fill="url(#paint0-solana)"
      />
      <path
        d="M4.99967 4.45925C5.05789 4.40336 5.13473 4.37076 5.21391 4.37076H12.6051C12.7402 4.37076 12.8077 4.53377 12.7123 4.62924L11.2522 6.08933C11.1963 6.14521 11.1194 6.17781 11.0379 6.17781H3.64671C3.51164 6.17781 3.44411 6.01481 3.53959 5.91933L4.99967 4.45925Z"
        fill="url(#paint1-solana)"
      />
      <path
        d="M11.2522 7.1675C11.1963 7.11161 11.1194 7.07901 11.0379 7.07901H3.64671C3.51164 7.07901 3.44411 7.24202 3.53959 7.33749L4.99967 8.79758C5.05556 8.85347 5.13241 8.88607 5.21391 8.88607H12.6051C12.7402 8.88607 12.8077 8.72306 12.7123 8.62758L11.2522 7.1675Z"
        fill="url(#paint2-solana)"
      />
    </g>
    <defs>
      <linearGradient id="paint0-solana" x1="-13.2106" y1="2.99954" x2="-13.4073" y2="12.8952" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient id="paint1-solana" x1="-15.4473" y1="1.8318" x2="-15.644" y2="11.7274" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient id="paint2-solana" x1="-14.3361" y1="2.41194" x2="-14.5327" y2="12.3076" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <clipPath id="clip-solana">
        <rect width="16.13" height="16.13" rx="8.065" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// Base icon (from Figma)
export const BaseIcon: FC<IconProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 17 17"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip-base)">
      <path d="M0 0H16.13V16.13H0V0Z" fill="white" />
      <path
        d="M4.03247 4.66964C4.03247 4.45138 4.03247 4.342 4.0738 4.25832C4.11307 4.17789 4.17797 4.11281 4.25829 4.07333C4.34247 4.0325 4.45135 4.0325 4.66961 4.0325H11.4603C11.6786 4.0325 11.788 4.0325 11.8717 4.07383C11.9521 4.1131 12.0172 4.178 12.0566 4.25832C12.0975 4.3425 12.0975 4.45138 12.0975 4.66964V11.4604C12.0975 11.6786 12.0975 11.788 12.0566 11.8717C12.0172 11.9522 11.9521 12.0172 11.8717 12.0567C11.788 12.0975 11.6786 12.0975 11.4603 12.0975H4.66961C4.45135 12.0975 4.34197 12.0975 4.25829 12.0567C4.17797 12.0172 4.11307 11.9521 4.0738 11.8717C4.03247 11.788 4.03247 11.6786 4.03247 11.4604V4.66964Z"
        fill="#0000FF"
      />
    </g>
    <defs>
      <clipPath id="clip-base">
        <rect width="16.13" height="16.13" rx="8.065" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const ChainIcon: FC<IconProps & { chain: string }> = ({
  chain,
  ...props
}) => {
  switch (chain) {
    case "hydration":
      return <HydrationIcon {...props} />
    case "ethereum":
      return <EthereumIcon {...props} />
    case "solana":
      return <SolanaIcon {...props} />
    case "base":
      return <BaseIcon {...props} />
    default:
      return null
  }
}

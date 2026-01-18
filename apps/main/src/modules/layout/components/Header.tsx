import { FC, forwardRef, lazy, LazyExoticComponent, SVGProps } from "react"

import { useScrollDirection } from "@/hooks/useScrollDirection"
import { SHeader } from "@/modules/layout/components/Header.styled"
import { HeaderToolbar } from "@/modules/layout/components/HeaderToolbar"
import { useHasTopNavbar } from "@/modules/layout/use-has-top-navbar"

const HeaderMenu = lazy(async () => ({
  default: await import("@/modules/layout/components/HeaderMenu").then(
    (m) => m.HeaderMenu,
  ),
}))

const HydrationLogo = lazy(async () => ({
  default: await import("@galacticcouncil/ui/assets/icons").then(
    (m) => m.HydrationLogo,
  ),
}))

const HydrationLogoFull = lazy(async () => ({
  default: await import("@galacticcouncil/ui/assets/icons").then(
    (m) => m.HydrationLogoFull,
  ),
}))

type Props = {
  onDepositClick?: () => void
}

export const Header = forwardRef<HTMLDivElement, Props>(
  ({ onDepositClick }, ref) => {
    const hasTopNavbar = useHasTopNavbar()
    const { scrollDirection, isAtTop } = useScrollDirection()

    const Logo: LazyExoticComponent<FC<SVGProps<SVGSVGElement>>> = hasTopNavbar
      ? HydrationLogoFull
      : HydrationLogo

    // Hide header when scrolling down, show when scrolling up or at top
    const isHidden = scrollDirection === "down" && !isAtTop

    return (
      <SHeader ref={ref} $hidden={isHidden}>
        <Logo />
        {hasTopNavbar && <HeaderMenu />}
        <HeaderToolbar onDepositClick={onDepositClick} />
      </SHeader>
    )
  },
)

Header.displayName = "Header"

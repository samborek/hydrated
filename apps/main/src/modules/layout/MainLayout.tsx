import { Outlet } from "@tanstack/react-router"

import { Header } from "@/modules/layout/components/Header"
import { OldUiPlaceholder } from "@/modules/layout/components/OldUiPlaceholder"
import { useUiContext } from "@/providers/uiProvider"

import { MarketingBanner } from "@/components/MarketingModal/MarketingBanner"
import { MarketingModal } from "@/components/MarketingModal/MarketingModal"
import { DepositModal } from "@/components/DepositModal/DepositModal"
import { useState } from "react"
import styled from "@emotion/styled"
import { Gift } from "lucide-react"
import { ButtonIcon, Icon } from "@galacticcouncil/ui/components"

const SPromoButton = styled(ButtonIcon)`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  z-index: 1000;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(255, 215, 0, 0.4);
  }
`

export const MainLayout = () => {
  const { uiVersion } = useUiContext()
  const [marketingState, setMarketingState] = useState<{
    modalOpen: boolean
    bannerVisible: boolean
    dismissed: boolean
    initialStep?: "intro" | "connect" | "trade"
  }>({
    modalOpen: true,
    bannerVisible: false,
    dismissed: false,
    initialStep: "intro"
  })

  const [depositOpen, setDepositOpen] = useState(false)

  const handleModalClose = (open: boolean) => {
    if (!open) {
      setMarketingState((prev) => ({ ...prev, modalOpen: false, bannerVisible: true }))
    } else {
      setMarketingState((prev) => ({ ...prev, modalOpen: true }))
    }
  }

  const handleBannerOpen = () => {
    setMarketingState({ modalOpen: true, bannerVisible: false, dismissed: false, initialStep: "intro" })
  }

  const handleBannerClose = () => {
    setMarketingState((prev) => ({ ...prev, bannerVisible: false, dismissed: true }))
  }

  const handlePromoButtonClick = () => {
    setMarketingState({ modalOpen: true, bannerVisible: false, dismissed: false, initialStep: "intro" })
  }

  const handleDepositOpen = () => {
    setDepositOpen(true)
  }

  if (uiVersion === "old") {
    return (
      <>
        <Header onDepositClick={handleDepositOpen} />
        <OldUiPlaceholder />
      </>
    )
  }

  return (
    <>
      <Header onDepositClick={handleDepositOpen} />
      <Outlet />
      <MarketingModal
        open={marketingState.modalOpen}
        onOpenChange={handleModalClose}
        initialStep={marketingState.initialStep}
      />
      <DepositModal
        open={depositOpen}
        onOpenChange={setDepositOpen}
      />
      {marketingState.bannerVisible && (
        <MarketingBanner onOpen={handleBannerOpen} onClose={handleBannerClose} />
      )}
      {marketingState.dismissed && !marketingState.bannerVisible && !marketingState.modalOpen && (
        <SPromoButton onClick={handlePromoButtonClick}>
          <Icon component={Gift} size={24} color="#1A1D26" />
        </SPromoButton>
      )}
    </>
  )
}

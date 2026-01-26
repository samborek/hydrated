import { Web3ConnectButton } from "@galacticcouncil/web3-connect"
import { useLocation } from "@tanstack/react-router"
import React from "react"

export const HeaderWeb3ConnectButton: React.FC<
  React.ComponentPropsWithoutRef<typeof Web3ConnectButton>
> = (props) => {
  const location = useLocation()
  const isCrossChainPage = location.pathname.startsWith("/cross-chain")
  return (
    <Web3ConnectButton
      {...props}
      size="medium"
      variant="secondary"
      allowIncompatibleAccounts={isCrossChainPage}
      sx={{ height: "2.5rem", px: "1.25rem", fontSize: "0.875rem" }}
    />
  )
}

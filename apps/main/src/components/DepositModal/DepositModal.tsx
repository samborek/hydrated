import { getToken } from "@galacticcouncil/ui/utils"
import styled from "@emotion/styled"
import {
  Icon,
  Modal,
  ModalBody,
  ModalHeader,
  Text,
} from "@galacticcouncil/ui/components"
import { useAccount, useWeb3ConnectModal } from "@galacticcouncil/web3-connect"
import { ArrowRight } from "lucide-react"
import { FC, useEffect, useRef, useState } from "react"

import { CexDeposit } from "./CexDeposit"
import { CexDepositAddress } from "./CexDepositAddress"

const SOptionCard = styled.button`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`

type Step = "deposit" | "cex-deposit" | "cex-address" | "on-chain" | "crypto"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DepositModal: FC<Props> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState<Step>("deposit")
  const [pendingStep, setPendingStep] = useState<Step | null>(null)
  const [selectedExchange, setSelectedExchange] = useState<{
    id: string
    name: string
  } | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const { isConnected } = useAccount()
  const { toggle } = useWeb3ConnectModal()
  const wasDisconnected = useRef(false)

  // Track if user was disconnected when they clicked an action
  useEffect(() => {
    if (isConnected && pendingStep && wasDisconnected.current) {
      // User just connected, advance to pending step
      setStep(pendingStep)
      setPendingStep(null)
      wasDisconnected.current = false
    }
  }, [isConnected, pendingStep])

  const handleAction = (nextStep: Step) => {
    if (!isConnected) {
      setPendingStep(nextStep)
      wasDisconnected.current = true
      toggle()
      return
    }
    setStep(nextStep)
  }

  const handleCexSelect = (
    exchange: { id: string; name: string },
    asset: any,
  ) => {
    setSelectedExchange(exchange)
    setSelectedAsset(asset)
    setStep("cex-address")
  }

  // Reset step when modal closes
  useEffect(() => {
    if (!open) {
      setStep("deposit")
      setPendingStep(null)
      wasDisconnected.current = false
    }
  }, [open])

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      {step === "deposit" && (
        <>
          <ModalHeader
            title="Deposit"
            description="Choose your preferred method to deposit funds and start trading"
            align="center"
            onBack={() => onOpenChange(false)}
          />
          <ModalBody>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <SOptionCard onClick={() => handleAction("cex-deposit")}>
                <div>
                  <Text fw={600} style={{ marginBottom: 4 }}>
                    Deposit from Centralized Exchange
                  </Text>
                  <Text fs={12} color={getToken("text.medium")}>
                    Transfer assets from exchanges like Kraken, Binance, etc.
                  </Text>
                </div>
                <Icon
                  component={ArrowRight}
                  size={20}
                  color="rgba(255,255,255,0.5)"
                />
              </SOptionCard>

              <SOptionCard onClick={() => handleAction("on-chain")}>
                <div>
                  <Text fw={600} style={{ marginBottom: 4 }}>
                    On-chain transfer
                  </Text>
                  <Text fs={12} color={getToken("text.medium")}>
                    Bridge assets from other chains
                  </Text>
                </div>
                <Icon
                  component={ArrowRight}
                  size={20}
                  color="rgba(255,255,255,0.5)"
                />
              </SOptionCard>

              <SOptionCard onClick={() => handleAction("crypto")}>
                <div>
                  <Text fw={600} style={{ marginBottom: 4 }}>
                    Fund with crypto
                  </Text>
                  <Text fs={12} color={getToken("text.medium")}>
                    Use existing crypto to fund your account
                  </Text>
                </div>
                <Icon
                  component={ArrowRight}
                  size={20}
                  color="rgba(255,255,255,0.5)"
                />
              </SOptionCard>
            </div>
          </ModalBody>
        </>
      )}

      {step === "cex-deposit" && (
        <>
          <ModalHeader
            title="Exchange and asset to deposit"
            align="center"
            onBack={() => setStep("deposit")}
          />
          <div style={{ padding: 0 }}>
            <CexDeposit onSelect={handleCexSelect} />
          </div>
        </>
      )}

      {step === "cex-address" && (
        <>
          <ModalHeader
            title="How to deposit?"
            align="center"
            onBack={() => setStep("cex-deposit")}
          />
          <CexDepositAddress
            exchange={selectedExchange}
            asset={selectedAsset}
          />
        </>
      )}
    </Modal>
  )
}

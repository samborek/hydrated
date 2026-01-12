import { Modal, ModalHeader, ModalBody, Stepper } from "@galacticcouncil/ui/components"
import { FC, useMemo, useState, useEffect } from "react"
import { Text, Button, Icon } from "@galacticcouncil/ui/components"
import { Check, ArrowRight } from "lucide-react"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/react"
import {
    ProviderSelectContent,
    ExternalWalletContent,
    AccountSelectContent,
    ErrorContent,
    Web3ConnectProvider,
    Web3ConnectContextType,
    Web3ConnectModalPage,
    useWeb3ConnectInit,
    useAccount,
    WalletMode
} from "@galacticcouncil/web3-connect"
import { useSquidClient } from "@/api/provider"
import { AssetIcon } from "@galacticcouncil/ui/assets/icons"
import { MarketingTradeForm } from "./MarketingTradeForm"

const SCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const SRow = styled.div`
  display: flex;
  gap: 12px;
`

const SListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`


const SOptionCard = styled.button`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 12px;
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

const SSkipButton = styled.span`
  cursor: pointer;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  text-align: center;
  display: block;
  margin-top: 16px;
`

const STradeContainer = styled.div`
  padding: 16px;
`

import { CexDeposit } from "../DepositModal/CexDeposit"
import { CexDepositAddress } from "../DepositModal/CexDepositAddress"

type Step = "intro" | "connect" | "deposit" | "trade" | "cex-deposit" | "cex-address"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialStep?: Step
}

const STEPS = ["Hey there", "Deposit", "Get BTC/PAX Gold"]

const contentMap: Record<Web3ConnectModalPage, React.ReactNode> = {
    [Web3ConnectModalPage.ProviderSelect]: <ProviderSelectContent />,
    [Web3ConnectModalPage.ExternalWallet]: <ExternalWalletContent />,
    [Web3ConnectModalPage.AccountSelect]: <AccountSelectContent />,
    [Web3ConnectModalPage.Error]: <ErrorContent />,
}

const SIntroWrapper = styled.div`
  position: relative;
  
  && {
    [class*="Paper"] {
      border-top: none !important;
      border-top-left-radius: 12px !important;
      border-top-right-radius: 12px !important;
      max-width: 640px !important;
    }
    
    * {
      border-top: none !important;
    }
  }
`

const SHeaderWrapper = styled.div`
  && {
    * {
      border-top: none !important;
    }
  }
`

const SModalHero = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280px;
  background-image: url("/gold-rush.png");
  background-size: cover;
  background-position: center;
  z-index: 0;
  border-radius: 12px 12px 0 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(13, 21, 37, 0.5) 60%, #0D1525 100%);
  }
`

const SHeroContent = styled.div`
  position: relative;
  z-index: 1;
  padding-top: 200px; // Push text down over the gradient
  border-top: none;
`

const NoBorderWrapper = styled.div`
  && {
    border-top: none !important;
  }
`

const MarketingModalContent: FC<Props> = ({ open, onOpenChange, initialStep = "intro" }) => {
    const [step, setStep] = useState<Step>(initialStep)
    const squidSdk = useSquidClient()
    const { page, setPage } = useWeb3ConnectInit({ mode: WalletMode.Default })
    const { isConnected } = useAccount()

    useEffect(() => {
        if (open) {
            setStep(initialStep)
        }
    }, [open, initialStep])

    // Auto-advance to deposit when user connects
    useEffect(() => {
        if (isConnected && step === "connect") {
            setStep("deposit")
        }
    }, [isConnected, step])

    const [selectedExchange, setSelectedExchange] = useState<{ id: string, name: string } | null>(null)
    const [selectedAsset, setSelectedAsset] = useState<any>(null)

    const handleBackToIntro = () => {
        setStep("intro")
    }

    const handleCexSelect = (exchange: { id: string, name: string }, asset: any) => {
        setSelectedExchange(exchange)
        setSelectedAsset(asset)
        setStep("cex-address")
    }

    const context = useMemo<Web3ConnectContextType>(
        () => ({
            isControlled: false,
            page,
            setPage,
            squidSdk,
            onAccountSelect: () => { },
            mode: WalletMode.Default,
            onBackToParent: handleBackToIntro,
        }),
        [page, setPage, squidSdk],
    )

    const getStepIndex = () => {
        if (step === "intro") return 0
        if (step === "connect") return 0
        if (step === "deposit") return 1
        if (step === "cex-deposit") return 1
        if (step === "cex-address") return 1
        if (step === "trade") return 2
        return 0
    }

    const isDepositFlow = initialStep === "deposit"

    return (
        <>
            <Global
                styles={css`
                    .marketing-modal {
                        max-width: 640px !important;
                        width: 100% !important;
                    }
                    .marketing-modal [class*="Paper"] {
                        width: 100% !important;
                        max-width: none !important;
                    }
                `}
            />
            <Modal
                className="marketing-modal"
                open={open}
                onOpenChange={onOpenChange}
                topContent={
                    !isDepositFlow && (
                        <Stepper
                            maxWidth={400}
                            steps={STEPS}
                            activeStepIndex={getStepIndex()}
                        />
                    )
                }
            >
                <Web3ConnectProvider value={context}>
                    {step === "intro" && (
                        <SIntroWrapper>
                            <SHeaderWrapper>
                                <ModalHeader
                                    title="Ready to stack some sats?"
                                    customTitle={<div />}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        zIndex: 10,
                                        border: 'none',
                                        borderTop: 'none',
                                        borderBottom: 'none',
                                        background: 'transparent',
                                        padding: 0
                                    }}
                                />
                            </SHeaderWrapper>
                            <SModalHero />
                            <SHeroContent>
                                <Text fs={32} fw={600} style={{ fontFamily: "Gazpacho", lineHeight: 1.4, textAlign: 'center' }}>
                                    Ready to stack some sats?
                                </Text>
                            </SHeroContent>
                            <NoBorderWrapper>
                                <ModalBody
                                    style={{ position: 'relative', zIndex: 1, background: 'transparent', paddingTop: 0 }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                                        <Text color="neutral.gray.300" style={{ textAlign: 'center', lineHeight: 1.5, fontSize: 14 }}>
                                            Time to get your hands on some real value. Whether you're stacking BTC or hedging with PAX Gold, we've got you covered. Let's get you set up in just a few clicks.
                                        </Text>

                                        <SRow>
                                            <SCard>
                                                <Icon component={AssetIcon} size={32} />
                                                <Text fw={700}>BTC</Text>
                                                <Text fs={12} color="neutral.gray.300">Digital gold standard</Text>
                                            </SCard>
                                            <SCard>
                                                <Icon component={AssetIcon} size={32} />
                                                <Text fw={700}>PAX Gold</Text>
                                                <Text fs={12} color="neutral.gray.300">Physical gold backed</Text>
                                            </SCard>
                                        </SRow>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            <SListItem>
                                                <Icon component={Check} size={16} color="#45D678" />
                                                <Text fs={12} fw={500}>Multiple deposit options</Text>
                                            </SListItem>
                                            <div style={{ marginLeft: 24 }}>
                                                <Text fs={11} color="neutral.gray.400">Fund from exchanges, on-chain, or with crypto</Text>
                                            </div>
                                            <SListItem>
                                                <Icon component={Check} size={16} color="#45D678" />
                                                <Text fs={12} fw={500}>Trade instantly</Text>
                                            </SListItem>
                                            <div style={{ marginLeft: 24 }}>
                                                <Text fs={11} color="neutral.gray.400">Swap between BTC, PAX Gold and other assets</Text>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 12, width: '100%' }}>
                                            <Button variant="primary" size="large" style={{ width: '70%' }} onClick={() => setStep("connect")}>
                                                Let's Go &rarr;
                                            </Button>
                                            <Button variant="muted" outline size="large" style={{ flex: 1 }} onClick={() => onOpenChange(false)}>
                                                Explore platform
                                            </Button>
                                        </div>
                                    </div>
                                </ModalBody>
                            </NoBorderWrapper>
                        </SIntroWrapper>
                    )}
                    {step === "connect" && (
                        <>
                            {contentMap[page]}
                        </>
                    )}
                    {step === "deposit" && (
                        <>
                            <ModalHeader
                                title="Deposit"
                                description="Choose your preferred method to deposit funds and start trading BTC and PAX Gold"
                                onBack={() => setStep("intro")}
                                align="center"
                            />
                            <ModalBody>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <SOptionCard onClick={() => setStep("cex-deposit")}>
                                        <div>
                                            <Text fs={16} fw={600} style={{ marginBottom: 4 }}>Deposit from Centralized Exchange</Text>
                                            <Text fs={13} color="neutral.gray.400">Some short description here so all less and more experienced people would understand the choice</Text>
                                        </div>
                                        <Icon component={ArrowRight} size={20} color="rgba(255,255,255,0.5)" />
                                    </SOptionCard>

                                    <SOptionCard onClick={() => setStep("trade")}>
                                        <div>
                                            <Text fs={16} fw={600} style={{ marginBottom: 4 }}>On-chain transfer</Text>
                                            <Text fs={13} color="neutral.gray.400">Some short description here so all less and more experienced people would understand the choice</Text>
                                        </div>
                                        <Icon component={ArrowRight} size={20} color="rgba(255,255,255,0.5)" />
                                    </SOptionCard>

                                    <SOptionCard onClick={() => setStep("trade")}>
                                        <div>
                                            <Text fs={16} fw={600} style={{ marginBottom: 4 }}>Fund with crypto</Text>
                                            <Text fs={13} color="neutral.gray.400">Some short description here so all less and more experienced people would understand the choice</Text>
                                        </div>
                                        <Icon component={ArrowRight} size={20} color="rgba(255,255,255,0.5)" />
                                    </SOptionCard>
                                </div>

                                <SSkipButton onClick={() => onOpenChange(false)}>
                                    Skip
                                </SSkipButton>
                            </ModalBody>
                        </>
                    )}
                    {step === "cex-deposit" && (
                        <>
                            <ModalHeader
                                title="Exchange and asset to deposit"
                                onBack={() => setStep("deposit")}
                            />
                            <div style={{ padding: "0 0px 14px" }}>
                                <CexDeposit onSelect={handleCexSelect} />
                            </div>
                        </>
                    )}
                    {step === "cex-address" && (
                        <>
                            <ModalHeader
                                title="How to deposit?"
                                onBack={() => setStep("cex-deposit")}
                            />
                            <CexDepositAddress
                                exchange={selectedExchange}
                                asset={selectedAsset}
                            />
                        </>
                    )}
                    {step === "trade" && (
                        <>
                            <ModalHeader
                                title="Get your PAXg, BTC & more"
                                onBack={() => setStep("deposit")}
                            />
                            <STradeContainer>
                                <MarketingTradeForm />
                            </STradeContainer>
                        </>
                    )}
                </Web3ConnectProvider>
            </Modal>
        </>
    )
}

export const MarketingModal: FC<Props> = (props) => {
    if (!props.open) return null

    return <MarketingModalContent {...props} />
}

import { css, Global } from "@emotion/react"
import styled from "@emotion/styled"
import { AssetIcon, Close } from "@galacticcouncil/ui/assets/icons"
import {
  Modal,
  ModalBody,
  ModalCloseTrigger,
  ModalHeader,
  Stepper,
} from "@galacticcouncil/ui/components"
import { Button, ButtonIcon, Icon, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import {
  AccountSelectContent,
  ErrorContent,
  ExternalWalletContent,
  ProviderSelectContent,
  useAccount,
  useWeb3ConnectInit,
  WalletMode,
  Web3ConnectContextType,
  Web3ConnectModalPage,
  Web3ConnectProvider,
} from "@galacticcouncil/web3-connect"
import { ArrowRight, Coins, Sparkles } from "lucide-react"
import { FC, useEffect, useMemo, useState } from "react"

import { useSquidClient } from "@/api/provider"
import { AssetLogo } from "@/components/AssetLogo"
import { useAssets } from "@/providers/assetsProvider"

import { MarketingTradeForm } from "./MarketingTradeForm"

const SCard = styled.div`
  &&&& {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.details.borders};
    border-top: 1px solid ${({ theme }) => theme.details.borders};
    border-radius: ${({ theme }) => theme.scales.cornerRadius.m}px;
    padding: ${({ theme }) => theme.containers.paddings.secondary}px;
    flex: 1 1 0;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.scales.paddings.m}px;
    min-width: 0;
    overflow: hidden;
  }
`

const SCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
`

const SRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.scales.paddings.base}px;
  width: 100%;
`

const SReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.scales.paddings.l}px;
  width: 100%;
  padding-top: ${({ theme }) => theme.containers.paddings.primary}px;
  padding-bottom: ${({ theme }) => theme.containers.paddings.primary}px;
  padding-left: 12px;
  padding-right: 12px;
  overflow: visible;
`

const SFeatureRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.scales.paddings.l}px;
  align-items: center;
  padding: ${({ theme }) => theme.scales.paddings.base}px 0;
  width: 100%;
  min-width: 0;
`

const SFeatureIcon = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex-shrink: 0;
`

const SFeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.scales.paddings.xs}px;
  min-width: 0;
  flex: 1;
`

const SFeatureDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.details.separators};
`

const SFullWidthDivider = styled.div`
  width: calc(100% + 2 * var(--modal-content-padding, 20px));
  height: 1px;
  background: ${({ theme }) => theme.details.separators};
  margin-inline: calc(-1 * var(--modal-content-padding, 20px));
`

const SModalActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  margin-top: ${({ theme }) => theme.scales.paddings.s}px;
  width: 100%;
`

const SModalActionsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.scales.paddings.xl}px;
  width: 100%;
  padding-top: ${({ theme }) => theme.containers.paddings.primary}px;
  padding-bottom: ${({ theme }) => theme.containers.paddings.primary}px;
  box-sizing: border-box;
  justify-content: stretch;
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
  margin-top: ${({ theme }) => theme.scales.paddings.l}px;
`

const STradeContainer = styled.div`
  padding: ${({ theme }) => theme.scales.paddings.l}px;
`

import { CexDeposit } from "../DepositModal/CexDeposit"
import { CexDepositAddress } from "../DepositModal/CexDepositAddress"

type Step =
  | "intro"
  | "connect"
  | "deposit"
  | "trade"
  | "cex-deposit"
  | "cex-address"

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
      border-top-left-radius: 16px !important;
      border-top-right-radius: 16px !important;
      max-width: 640px !important;
    }

    [class*="ModalHeader"],
    [class*="ModalBody"],
    [class*="SHeroContent"],
    [class*="NoBorderWrapper"] {
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

const SCloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 11;
  padding: var(--modal-content-padding);
`

// Hero section configuration - adjust these values to control layout
const HERO_CONFIG = {
  imageHeight: 387, // Total height of the hero image area
  imageFadeStart: 60, // Percentage where fade starts (higher = more visible image)
  imageFadeEnd: 100, // Percentage where fade ends
  textOverlap: 60, // How much the text section overlaps into the hero image (negative margin)
  textGap: 8, // Gap between title and subtitle
}

const SHeroImageSection = styled.div<{ $height?: number }>`
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height ?? HERO_CONFIG.imageHeight}px;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  flex-shrink: 0;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/hollar-cans.png");
    background-size: cover;
    background-position: center top;
    mask-image: linear-gradient(
      180deg,
      black 0%,
      black ${HERO_CONFIG.imageFadeStart}%,
      transparent ${HERO_CONFIG.imageFadeEnd}%
    );
    -webkit-mask-image: linear-gradient(
      180deg,
      black 0%,
      black ${HERO_CONFIG.imageFadeStart}%,
      transparent ${HERO_CONFIG.imageFadeEnd}%
    );
  }
`

const SHeroTextSection = styled.div<{ $overlap?: number; $gap?: number }>`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $gap }) => $gap ?? HERO_CONFIG.textGap}px;
  margin-top: ${({ $overlap }) => -($overlap ?? HERO_CONFIG.textOverlap)}px;
  padding-left: ${({ theme }) => theme.scales.paddings.xxxl}px;
  padding-right: ${({ theme }) => theme.scales.paddings.xxxl}px;
  box-sizing: border-box;
`

const NoBorderWrapper = styled.div`
  && {
    border-top: none !important;
  }
`

const MarketingModalContent: FC<Props> = ({
  open,
  onOpenChange,
  initialStep = "intro",
}) => {
  const [step, setStep] = useState<Step>(initialStep)
  const squidSdk = useSquidClient()
  const { page, setPage } = useWeb3ConnectInit({ mode: WalletMode.Default })
  const { isConnected } = useAccount()
  const { all } = useAssets()
  const theme = useTheme()

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

  const [selectedExchange, setSelectedExchange] = useState<{
    id: string
    name: string
  } | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)

  const handleBackToIntro = () => {
    setStep("intro")
  }

  const handleCexSelect = (
    exchange: { id: string; name: string },
    asset: any,
  ) => {
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
      onAccountSelect: () => {},
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

  const { btcLogoId, paxgLogoId } = useMemo(() => {
    const assets = Array.from(all.values())

    const pickBySymbol = (symbols: string[]) =>
      assets.find((a) => symbols.includes((a.symbol ?? "").toUpperCase()))?.id

    return {
      btcLogoId: pickBySymbol(["BTC", "WBTC", "IBTC"]),
      paxgLogoId: pickBySymbol(["PAXG"]),
    }
  }, [all])

  return (
    <>
      <Global
        styles={css`
          .marketing-modal,
          .marketing-modal > *,
          .marketing-modal [data-radix-dialog-content],
          .marketing-modal > div > div {
            max-width: 640px !important;
            width: 100% !important;
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
                  closable={false}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 10,
                    border: "none",
                    borderTop: "none",
                    borderBottom: "none",
                    background: "transparent",
                    padding: 0,
                  }}
                />
                <SCloseButton>
                  <ModalCloseTrigger asChild>
                    <ButtonIcon>
                      <Icon component={Close} size={20} />
                    </ButtonIcon>
                  </ModalCloseTrigger>
                </SCloseButton>
              </SHeaderWrapper>
              {/* Hero Image - adjust $height to make image taller/shorter */}
              <SHeroImageSection />

              {/* Hero Text - adjust $overlap to move text up/down, $gap for spacing */}
              <SHeroTextSection>
                <Text
                  fs={28}
                  fw={500}
                  color="text.high"
                  style={{
                    fontFamily: "Gazpacho",
                    lineHeight: "30px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  Ready to stack some sats?
                </Text>
                <Text
                  fs={14}
                  fw={400}
                  color="text.high"
                  style={{
                    fontFamily: "Geist",
                    lineHeight: 1.3,
                    textAlign: "center",
                    width: 483,
                    maxWidth: "100%",
                    fontSize: 14,
                  }}
                >
                  Time to get your hands on some real value. Whether you're
                  stacking BTC or hedging with PAX Gold, we've got you covered.
                  Let's get you set up in just a few clicks.
                </Text>
              </SHeroTextSection>
              <NoBorderWrapper>
                <ModalBody
                  style={{
                    position: "relative",
                    zIndex: 1,
                    background: "transparent",
                    paddingTop: 0,
                  }}
                >
                  <SReviewContent>
                    <SRow>
                      <SCard>
                        {btcLogoId ? (
                          <AssetLogo id={btcLogoId} size="large" />
                        ) : (
                          <Icon component={AssetIcon} size={30} />
                        )}
                        <SCardText>
                          <Text
                            fs={14}
                            fw={500}
                            color="text.high"
                            style={{
                              fontFamily: "Gazpacho",
                              lineHeight: "15px",
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          >
                            Get BTC
                          </Text>
                          <Text
                            fs={12}
                            fw={400}
                            color="text.medium"
                            style={{
                              fontFamily: "Geist",
                              lineHeight: "15px",
                              fontSize: 12,
                              fontWeight: 400,
                              marginTop: 0,
                            }}
                          >
                            Digital gold standard
                          </Text>
                        </SCardText>
                      </SCard>

                      <SCard>
                        {paxgLogoId ? (
                          <AssetLogo id={paxgLogoId} size="large" />
                        ) : (
                          <Icon component={AssetIcon} size={30} />
                        )}
                        <SCardText>
                          <Text
                            fs={14}
                            fw={500}
                            color="text.high"
                            style={{
                              fontFamily: "Gazpacho",
                              lineHeight: "15px",
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          >
                            Get PAXG
                          </Text>
                          <Text
                            fs={12}
                            fw={400}
                            color="text.medium"
                            style={{
                              fontFamily: "Geist",
                              lineHeight: "15px",
                              fontSize: 12,
                              fontWeight: 400,
                              marginTop: 0,
                            }}
                          >
                            Physical gold backed
                          </Text>
                        </SCardText>
                      </SCard>
                    </SRow>

                    <SFeatureRow>
                      <SFeatureIcon>
                        <Icon component={Coins} size={24} color="#9CA3AF" />
                      </SFeatureIcon>
                      <SFeatureText>
                        <Text
                          fs={14}
                          fw={600}
                          color="text.high"
                          style={{ fontFamily: "Geist", lineHeight: "18px" }}
                        >
                          Easy deposit from multiple sources
                        </Text>
                        <Text
                          fs={12}
                          fw={400}
                          color="text.medium"
                          style={{ fontFamily: "Geist", lineHeight: "15px" }}
                        >
                          Fund from exchanges, on-chain, or with crypto.
                        </Text>
                      </SFeatureText>
                    </SFeatureRow>

                    <SFeatureDivider />

                    <SFeatureRow>
                      <SFeatureIcon>
                        <Icon component={Sparkles} size={24} color="#9CA3AF" />
                      </SFeatureIcon>
                      <SFeatureText>
                        <Text
                          fs={14}
                          fw={600}
                          color="text.high"
                          style={{ fontFamily: "Geist", lineHeight: "18px" }}
                        >
                          Trade instantly after deposit, self custody
                        </Text>
                        <Text
                          fs={12}
                          fw={400}
                          color="text.medium"
                          style={{ fontFamily: "Geist", lineHeight: "15px" }}
                        >
                          Swap between BTC, PAX Gold and other assets.
                        </Text>
                      </SFeatureText>
                    </SFeatureRow>
                  </SReviewContent>
                  <SModalActions>
                    <SFullWidthDivider />
                    <SModalActionsRow>
                      <Button
                        variant="tertiary"
                        size="large"
                        sx={{
                          borderRadius: theme.themeProps.scales.cornerRadius.m,
                          height: 48,
                          flex: "0 0 auto",
                          minWidth: 140,
                        }}
                        onClick={() => onOpenChange(false)}
                      >
                        Explore platform
                      </Button>
                      <Button
                        variant="primary"
                        size="large"
                        sx={{
                          borderRadius: theme.themeProps.scales.cornerRadius.m,
                          height: 48,
                          flex: 2,
                          minWidth: 180,
                        }}
                        onClick={() => setStep("connect")}
                      >
                        Lets go
                      </Button>
                    </SModalActionsRow>
                  </SModalActions>
                </ModalBody>
              </NoBorderWrapper>
            </SIntroWrapper>
          )}
          {step === "connect" && <>{contentMap[page]}</>}
          {step === "deposit" && (
            <>
              <ModalHeader
                title="Deposit"
                description="Choose your preferred method to deposit funds and start trading BTC and PAX Gold"
                onBack={() => setStep("intro")}
                align="center"
              />
              <ModalBody>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: `${theme.themeProps.scales.paddings.m}px`,
                  }}
                >
                  <SOptionCard onClick={() => setStep("cex-deposit")}>
                    <div>
                      <Text
                        fs={16}
                        fw={600}
                        style={{
                          marginBottom: `${theme.themeProps.scales.paddings.s}px`,
                        }}
                      >
                        Deposit from Centralized Exchange
                      </Text>
                      <Text fs={13} color="neutral.gray.400">
                        Some short description here so all less and more
                        experienced people would understand the choice
                      </Text>
                    </div>
                    <Icon
                      component={ArrowRight}
                      size={20}
                      color="rgba(255,255,255,0.5)"
                    />
                  </SOptionCard>

                  <SOptionCard onClick={() => setStep("trade")}>
                    <div>
                      <Text
                        fs={16}
                        fw={600}
                        style={{
                          marginBottom: `${theme.themeProps.scales.paddings.s}px`,
                        }}
                      >
                        On-chain transfer
                      </Text>
                      <Text fs={13} color="neutral.gray.400">
                        Some short description here so all less and more
                        experienced people would understand the choice
                      </Text>
                    </div>
                    <Icon
                      component={ArrowRight}
                      size={20}
                      color="rgba(255,255,255,0.5)"
                    />
                  </SOptionCard>

                  <SOptionCard onClick={() => setStep("trade")}>
                    <div>
                      <Text
                        fs={16}
                        fw={600}
                        style={{
                          marginBottom: `${theme.themeProps.scales.paddings.s}px`,
                        }}
                      >
                        Fund with crypto
                      </Text>
                      <Text fs={13} color="neutral.gray.400">
                        Some short description here so all less and more
                        experienced people would understand the choice
                      </Text>
                    </div>
                    <Icon
                      component={ArrowRight}
                      size={20}
                      color="rgba(255,255,255,0.5)"
                    />
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
              <div
                style={{
                  padding: `0 0 ${theme.themeProps.scales.paddings.l}px`,
                }}
              >
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

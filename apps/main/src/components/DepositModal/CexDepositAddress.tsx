import styled from "@emotion/styled"
import { Button, Icon, Text } from "@galacticcouncil/ui/components"
import { useAccount } from "@galacticcouncil/web3-connect"
import { Copy, Info, Loader2 } from "lucide-react"
import { FC } from "react"

import { AssetLogo } from "@/components/AssetLogo"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 24px 24px;
`

const FromRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const AssetSelector = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`

const AddressCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`

const AddressText = styled(Text)`
  word-break: break-all;
  font-family: "Space Mono", monospace;
  font-size: 14px;
  color: #fff;
  line-height: 1.5;
  max-width: 80%;
`

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
`

const ActionButton = styled(Button)`
  height: 36px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`

const PinkButton = styled(ActionButton)`
  background: #f43c6d;
  color: white;
  border: none;
  &:hover {
    background: #d92b5a;
  }
`

const GhostButton = styled(ActionButton)`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: white;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const StatusPill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.06);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  margin-top: 8px;
`

const InstructionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`

const StepItem = styled.div`
  display: flex;
  gap: 16px;
`

const StepNumber = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  color: white;
`

const AlertBox = styled.div`
  background: rgba(65, 126, 255, 0.15);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 24px;
`

type Props = {
  exchange: { id: string; name: string } | null
  asset: any
  accountName?: string
  accountAddress?: string
}

export const CexDepositAddress: FC<Props> = ({
  exchange,
  asset,
  accountName,
  accountAddress,
}) => {
  const { account } = useAccount()

  const displayAddress =
    accountAddress || account?.address || "Address not connected"
  const displayName = accountName || account?.name || "Account"

  return (
    <Container>
      <FromRow>
        <Text color="neutral.gray.300" fs={14}>
          From
        </Text>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#F43C6D",
          }}
        />
        <Text fw={600} fs={14}>
          {exchange?.name || "Exchange"}
        </Text>
      </FromRow>

      <AssetSelector>
        {asset?.id ? (
          <AssetLogo id={asset.id} size="small" />
        ) : (
          <div
            style={{
              width: 24,
              height: 24,
              background: "#333",
              borderRadius: "50%",
            }}
          />
        )}
        <Text fw={600} fs={16}>
          {asset?.symbol || "Select Asset"}
        </Text>
        <div style={{ flex: 1 }} />
      </AssetSelector>

      <AddressCard>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Text color="neutral.gray.400" fs={13}>
            Deposit to
          </Text>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#666",
            }}
          />
          <Text fw={600} fs={13}>
            {displayName}
          </Text>
        </div>

        <AddressText>{displayAddress}</AddressText>

        <ButtonRow>
          <GhostButton
            onClick={() => navigator.clipboard.writeText(displayAddress)}
          >
            <Icon component={Copy} size={14} />
            Copy address
          </GhostButton>
          <PinkButton
            onClick={() =>
              window.open(
                `https://www.${exchange?.id || "google"}.com`,
                "_blank",
              )
            }
          >
            Open {exchange?.name || "Exchange"}
          </PinkButton>
        </ButtonRow>

        <div
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.06)",
            margin: "8px 0",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text color="neutral.gray.400" fs={12}>
            Minimal deposit amount:
          </Text>
          <Text fw={600} fs={12}>
            2 {asset?.symbol || "DOT"}
          </Text>
        </div>

        <StatusPill>
          <Loader2 size={14} className="animate-spin" />
          AWAITING DEPOSIT
        </StatusPill>
      </AddressCard>

      <div>
        <Text
          fs={18}
          fw={600}
          style={{ fontFamily: "Gazpacho", color: "#EFB0FF", marginBottom: 8 }}
        >
          How to bridge assets into Hydration from a CEX?
        </Text>

        <InstructionList>
          <StepItem>
            <StepNumber>1</StepNumber>
            <div>
              <Text fw={600} fs={14} style={{ marginBottom: 4 }}>
                Login to your CEX account
              </Text>
              <Text
                color="neutral.gray.400"
                fs={13}
                style={{ lineHeight: 1.4 }}
              >
                Log in and check that you've got the asset you want to send.
              </Text>
            </div>
          </StepItem>
          <StepItem>
            <StepNumber>2</StepNumber>
            <div>
              <Text fw={600} fs={14} style={{ marginBottom: 4 }}>
                Select 'Withdraw'
              </Text>
              <Text
                color="neutral.gray.400"
                fs={13}
                style={{ lineHeight: 1.4 }}
              >
                Hit the “Withdraw” button next to the asset you want to
                transfer.
              </Text>
            </div>
          </StepItem>
          <StepItem>
            <StepNumber>3</StepNumber>
            <div>
              <Text fw={600} fs={14} style={{ marginBottom: 4 }}>
                Chose Polkadot network
              </Text>
              <Text
                color="neutral.gray.400"
                fs={13}
                style={{ lineHeight: 1.4 }}
              >
                Pick Polkadot from the list of tokens.
              </Text>
            </div>
          </StepItem>
          <StepItem>
            <StepNumber>4</StepNumber>
            <div>
              <Text fw={600} fs={14} style={{ marginBottom: 4 }}>
                Don't have HDX?
              </Text>
              <Text
                color="neutral.gray.400"
                fs={13}
                style={{ lineHeight: 1.4 }}
              >
                Make sure you are pasting the same wallet as copied below
              </Text>
            </div>
          </StepItem>
          <StepItem>
            <StepNumber>5</StepNumber>
            <div>
              <Text fw={600} fs={14} style={{ marginBottom: 4 }}>
                Enter the amount
              </Text>
              <Text
                color="neutral.gray.400"
                fs={13}
                style={{ lineHeight: 1.4 }}
              >
                Just enter how much cryptocurrency you want to send. Keep in
                mind there’s usually a minimum amount and a fee for withdrawing.
              </Text>
            </div>
          </StepItem>
        </InstructionList>
      </div>

      <AlertBox>
        <Icon
          component={Info}
          size={20}
          color="#85D1FF"
          style={{ marginTop: 2 }}
        />
        <Text fs={12} color="#85D1FF" style={{ lineHeight: 1.4 }}>
          Please don't close this tab while proceeding with your deposit, it
          might cause unexpected errors. Only click shiny buttons.
        </Text>
      </AlertBox>
    </Container>
  )
}

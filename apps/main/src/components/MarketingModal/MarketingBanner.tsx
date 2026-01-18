import styled from "@emotion/styled"
import { ButtonIcon, Icon, Text } from "@galacticcouncil/ui/components"
import { mq } from "@galacticcouncil/ui/theme"
import { ExternalLink, X } from "lucide-react"
import { FC } from "react"

const SBanner = styled.div`
  position: fixed;
  bottom: 80px;
  left: 20px;
  width: calc(100% - 40px);
  max-width: 382px;
  height: 120px;
  border-radius: 8px;
  background: linear-gradient(135deg, #e8f4fd 0%, #d6e8f7 100%);
  box-shadow: 0px 19px 23px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  z-index: 1000;
  cursor: pointer;
  box-sizing: border-box;

  // No overflow hidden so the close button can pop out

  ${mq("sm")} {
    max-width: 420px;
  }

  ${mq("lg")} {
    bottom: 20px;
  }
`

const STextArea = styled.div`
  position: relative;
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  z-index: 2;
`

const SImageArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 240px;
  background-image: url("/gold-rush.png");
  background-size: cover;
  background-position: center;
  border-radius: 0 8px 8px 0;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent 0%, black 10%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 80%);
`

const SCloseButton = styled(ButtonIcon)`
  position: absolute;
  top: -12px;
  right: -12px;
  background: #a0aec0;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &:hover {
    background: #718096;
  }
`

const SLearnMore = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
  margin-top: 12px;
  color: #1a1d26;
  font-size: 11px;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    opacity: 0.8;
  }
`

type Props = {
  onOpen: () => void
  onClose: () => void
}

export const MarketingBanner: FC<Props> = ({ onOpen, onClose }) => {
  return (
    <SBanner onClick={onOpen}>
      <SCloseButton
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        <Icon component={X} size={16} color="#1A1D26" />
      </SCloseButton>
      <STextArea>
        <Text
          fs={17.5}
          fw={500}
          color="#1A1D26"
          style={{
            marginBottom: 4,
            lineHeight: "21px",
            fontFamily: "Gazpacho",
          }}
        >
          BTC / PAX Gold Trading
        </Text>
        <Text
          fs={12}
          fw={400}
          color="#1A1D26"
          style={{ lineHeight: "15px", opacity: 0.9 }}
        >
          Get started with BTC and PAX Gold. <br /> Start trading in just a few
          steps.
        </Text>
        <SLearnMore
          onClick={(e) => {
            e.stopPropagation()
            onOpen()
          }}
        >
          LEARN MORE <Icon component={ExternalLink} size={11} />
        </SLearnMore>
      </STextArea>
      <SImageArea />
    </SBanner>
  )
}

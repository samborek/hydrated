import styled from "@emotion/styled"
import { X } from "@galacticcouncil/ui/assets/icons"
import { ButtonIcon, Icon, Text } from "@galacticcouncil/ui/components"
import { mq } from "@galacticcouncil/ui/theme"
import { FC, useState } from "react"

import BannerBg from "@/assets/banner_bg.png"

const SBanner = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: calc(100% - 40px);
  max-width: 580px;
  min-width: 490px;
  height: auto;
  min-height: 120px;
  padding: 16px;
  border-radius: 12px;
  background-image: url(${BannerBg});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 19px 23px 0px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1000;

  box-sizing: border-box;

  ${mq("sm")} {
    padding: 32px;
  }
`

const SCloseButton = styled(ButtonIcon)`
  position: absolute;
  top: -12px;
  right: -12px;
  background: rgba(20, 21, 26, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 50%;

  &:hover {
    background: rgba(20, 21, 26, 0.4);
  }
`

const SLink = styled.a`
  color: #1a1d26;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid #1a1d26;
  width: fit-content;
  margin-top: 24px;
  line-height: 1.5;

  &:hover {
    opacity: 0.8;
  }
`

export const OldUiBanner: FC<{ onOpenMarketing: () => void }> = ({
  onOpenMarketing,
}) => {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <SBanner>
      <SCloseButton onClick={() => setVisible(false)}>
        <Icon component={X} size={24} />
      </SCloseButton>
      <Text
        fs={[24, 22]}
        fw={500}
        color="#1A1D26"
        style={{ marginBottom: 12, lineHeight: 1.1, fontFamily: "Gazpacho" }}
      >
        New UI preview is here
      </Text>
      <Text
        fs={14}
        fw={500}
        color="#1A1D26"
        style={{ maxWidth: 360, lineHeight: 1.5 }}
      >
        Check new UI switch in bottom right corner and share your thoughts on
        Discord.
      </Text>
      <SLink
        as="button"
        onClick={onOpenMarketing}
        style={{
          background: "none",
          border: "none",
          borderBottom: "1px solid #1A1D26",
          padding: 0,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        GO to Discord &gt;
      </SLink>
    </SBanner>
  )
}

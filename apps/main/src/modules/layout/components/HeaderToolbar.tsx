import { QuestionCircleRegular } from "@galacticcouncil/ui/assets/icons"
import {
  Button,
  ButtonIcon,
  ExternalLink,
  Icon,
} from "@galacticcouncil/ui/components"
import { FC, lazy } from "react"

import { HYDRATION_DOCS_LINK } from "@/config/links"
import { SHeaderToolbar } from "@/modules/layout/components/HeaderToolbar.styled"
import { HeaderWeb3ConnectButton } from "@/modules/layout/components/HeaderWeb3ConnectButton"
import { NotificationCenter } from "@/modules/layout/components/NotificationCenter/NotificationCenter"
import { useHasTopNavbar } from "@/modules/layout/use-has-top-navbar"

const Settings = lazy(async () => ({
  default: await import("@/modules/layout/components/Settings/Settings").then(
    (m) => m.Settings,
  ),
}))

type Props = {
  onDepositClick?: () => void
}

export const HeaderToolbar: FC<Props> = ({ onDepositClick }) => {
  const hasTopNavbar = useHasTopNavbar()

  return (
    <SHeaderToolbar>
      {hasTopNavbar && (
        <ButtonIcon asChild>
          <ExternalLink href={HYDRATION_DOCS_LINK}>
            <Icon component={QuestionCircleRegular} size={20} />
          </ExternalLink>
        </ButtonIcon>
      )}
      <NotificationCenter />
      {hasTopNavbar && <Settings />}
      {onDepositClick && (
        <Button
          onClick={onDepositClick}
          variant="accent"
          outline
          sx={{ height: 40, px: 20, fontSize: 14, fontWeight: 500 }}
        >
          Deposit
        </Button>
      )}
      <HeaderWeb3ConnectButton />
    </SHeaderToolbar>
  )
}

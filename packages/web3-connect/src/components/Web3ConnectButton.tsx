import { CaretDown, Wallet } from "@galacticcouncil/ui/assets/icons"
import {
  AccountAvatar,
  Box,
  Button,
  ButtonProps,
  Flex,
  Icon,
  Text,
} from "@galacticcouncil/ui/components"
import { getToken } from "@galacticcouncil/ui/utils"
import { shortenAccountAddress, stringEquals } from "@galacticcouncil/utils"
import { FC, Ref } from "react"

import { SConnectedButton } from "@/components/Web3ConnectButton.styled"
import { useAccount } from "@/hooks/useAccount"
import { useWeb3ConnectModal } from "@/hooks/useWeb3ConnectModal"
import { getAccountAvatarTheme } from "@/utils"

export type Web3ConnectButtonProps = ButtonProps & {
  allowIncompatibleAccounts?: boolean
}

export const Web3ConnectButton: FC<
  Web3ConnectButtonProps & { ref?: Ref<HTMLButtonElement> }
> = ({ ref, allowIncompatibleAccounts = false, ...props }) => {
  const { account } = useAccount()
  const { toggle } = useWeb3ConnectModal()

  if (!allowIncompatibleAccounts && account?.isIncompatible) {
    return (
      <Button
        ref={ref}
        onClick={() => toggle()}
        {...props}
        variant="accent"
        outline
      >
        <Icon size={16} component={Wallet} mr={4} />
        <Text fs="p3">Select Account</Text>
      </Button>
    )
  }

  if (account) {
    const shortDisplayAddr = shortenAccountAddress(account.displayAddress)

    return (
      <SConnectedButton
        ref={ref}
        onClick={() => toggle()}
        {...props}
        variant="tertiary"
        sx={{ px: 10, gap: 8 }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "full",
          }}
        >
          <AccountAvatar
            size={24}
            address={account.displayAddress}
            theme={getAccountAvatarTheme(account)}
          />
        </Box>
        <Flex direction="column" align="start">
          <Text fs="p3" lh={1.2} truncate={140}>
            {account.name}
          </Text>
          {!stringEquals(account.name, shortDisplayAddr) && (
            <Text fs="p6" color={getToken("text.medium")}>
              {shortDisplayAddr}
            </Text>
          )}
        </Flex>
        <Icon size={8} component={CaretDown} />
      </SConnectedButton>
    )
  }

  return (
    <Button ref={ref} onClick={() => toggle()} {...props}>
      <Icon size={16} component={Wallet} mr={4} />
      <Text fs="p3">Connect Wallet</Text>
    </Button>
  )
}

import {
  AccountInput,
  Button,
  Flex,
  FormError,
  FormLabel,
  Separator,
  Stack,
} from "@galacticcouncil/ui/components"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { pick } from "remeda"
import { useShallow } from "zustand/shallow"

import { AddressBookButton } from "@/components/address-book/AddressBookButton"
import { ExternalWalletFormValues } from "@/components/external/ExternalWalletForm.form"
import { WalletProviderType } from "@/config/providers"
import { useWeb3Connect, useWeb3Enable } from "@/hooks"
import { toStoredAccount } from "@/utils"
import { ExternalWallet, getWallet } from "@/wallets"

type ExternalWalletFormProps = {
  readonly onAddressBookOpen: () => void
  readonly onSuccess: () => void
}

export const ExternalWalletForm: React.FC<ExternalWalletFormProps> = ({
  onAddressBookOpen,
  onSuccess,
}) => {
  const { t } = useTranslation()
  const { enable } = useWeb3Enable()
  const { setAccount } = useWeb3Connect(useShallow(pick(["setAccount"])))

  const form = useFormContext<ExternalWalletFormValues>()
  const wallet = getWallet(WalletProviderType.ExternalWallet)

  const onSubmit = async (values: ExternalWalletFormValues) => {
    const isExternalWallet = wallet instanceof ExternalWallet

    if (!isExternalWallet) return

    wallet.setAccount(values.address)
    await enable(WalletProviderType.ExternalWallet)

    const accounts = await wallet.getAccounts()
    const added = accounts.find((a) => a.address === values.address.trim())

    if (added) {
      setAccount(toStoredAccount(added))
      onSuccess()
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack gap="var(--modal-content-padding)">
        <Controller
          name="address"
          control={form.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Stack gap="m">
              <Flex justify="space-between" align="center">
                <FormLabel>{t("external.addressLabel")}</FormLabel>
                <AddressBookButton onClick={onAddressBookOpen} />
              </Flex>
              <AccountInput
                value={value}
                onChange={onChange}
                placeholder={t("external.addressPlaceholder")}
                isError={!!error}
              />
              {error && <FormError>{error.message}</FormError>}
            </Stack>
          )}
        />
        <Separator mx="var(--modal-content-inset)" />
        <Button type="submit" size="large" width="100%">
          {t("external.confirm")}
        </Button>
      </Stack>
    </form>
  )
}

import { ModalBody, ModalHeader } from "@galacticcouncil/ui/components"
import { useState } from "react"
import { FormProvider } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { AddressBookModal } from "@/components/address-book"
import { ExternalWalletForm } from "@/components/external/ExternalWalletForm"
import { useExternalWalletForm } from "@/components/external/ExternalWalletForm.form"
import { Web3ConnectModalPage } from "@/config/modal"
import { WalletProviderType } from "@/config/providers"
import { useWeb3ConnectContext } from "@/context/Web3ConnectContext"
import { useWeb3Connect, WalletProviderStatus } from "@/hooks/useWeb3Connect"

export const ExternalWalletContent = () => {
  const { t } = useTranslation()
  const [isAddressBookOpen, setIsAddressBookOpen] = useState(false)
  const form = useExternalWalletForm()
  const { setPage } = useWeb3ConnectContext()

  const providers = useWeb3Connect((state) => state.providers)
  const hasOtherConnected = providers.some(
    (p) =>
      p.type !== WalletProviderType.ExternalWallet &&
      p.status === WalletProviderStatus.Connected,
  )
  const backPage = hasOtherConnected
    ? Web3ConnectModalPage.AccountSelect
    : Web3ConnectModalPage.ProviderSelect

  if (isAddressBookOpen) {
    return (
      <AddressBookModal
        header={
          <ModalHeader
            title={t("external.selectAccount")}
            onBack={() => setIsAddressBookOpen(false)}
          />
        }
        onSelect={(address) => {
          form.setValue("address", address.address, { shouldValidate: true })
          setIsAddressBookOpen(false)
        }}
      />
    )
  }

  return (
    <FormProvider {...form}>
      <ModalHeader
        title={t("external.viewAccount")}
        description={t("external.description")}
        align="center"
        onBack={() => setPage(backPage)}
      />
      <ModalBody>
        <ExternalWalletForm
          onAddressBookOpen={() => setIsAddressBookOpen(true)}
          onSuccess={() => setPage(Web3ConnectModalPage.AccountSelect)}
        />
      </ModalBody>
    </FormProvider>
  )
}

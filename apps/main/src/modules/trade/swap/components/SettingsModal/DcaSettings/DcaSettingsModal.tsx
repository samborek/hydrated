import {
  Flex,
  FormError,
  ModalBody,
  ModalHeader,
  NumberInput,
  Text,
} from "@galacticcouncil/ui/components"
import { getToken, getTokenRem } from "@galacticcouncil/ui/utils"
import { preventDefault } from "@galacticcouncil/utils"
import { FC } from "react"
import { Controller, FormProvider } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { useDcaSettingsForm } from "@/modules/trade/swap/components/SettingsModal/DcaSettings/useDcaSettingsForm"
import { SettingLabel } from "@/modules/trade/swap/components/SettingsModal/SettingLabel"
import { SettingsSection } from "@/modules/trade/swap/components/SettingsModal/SettingsSection"
import { TradeSlippage } from "@/modules/trade/swap/components/SettingsModal/TradeSlippage"
import { DCA_SLIPPAGE_SETTINGS, useTradeSettings } from "@/states/tradeSettings"

export const DcaSettingsModal: FC = () => {
  const { t } = useTranslation("trade")

  const { update, ...tradeSettings } = useTradeSettings()
  const form = useDcaSettingsForm(tradeSettings.dca, (dca) =>
    update({ ...tradeSettings, dca }),
  )

  return (
    <FormProvider {...form}>
      <ModalHeader
        title={t("dca.settings.modal.title")}
        description={t("dca.settings.modal.description")}
      />
      <ModalBody sx={{ minHeight: ["auto", "25rem"], pt: 0 }}>
        <form onSubmit={preventDefault}>
          <SettingsSection label="">
            <Controller
              control={form.control}
              name="slippage"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TradeSlippage
                  slippage={value}
                  options={DCA_SLIPPAGE_SETTINGS}
                  helpTooltip={t("dca.settings.modal.slippage.help")}
                  error={error?.message}
                  onSlippageChange={onChange}
                />
              )}
            />
            <Text fs="p4" lh="1.125rem" color={getToken("text.medium")}>
              {t("dca.settings.modal.description")}
            </Text>
            <Controller
              control={form.control}
              name="maxRetries"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div>
                  <Flex justify="space-between" align="center">
                    <SettingLabel
                      label={t("dca.settings.modal.maxRetries")}
                      helpTooltip={t("dca.settings.modal.maxRetries.help")}
                    />
                    <NumberInput
                      sx={{ width: "5.3125rem" }}
                      value={value}
                      allowNegative={false}
                      decimalScale={0}
                      isError={!!error}
                      onValueChange={({ floatValue }) =>
                        onChange(floatValue ?? null)
                      }
                    />
                  </Flex>
                  {error && (
                    <FormError sx={{ textAlign: "end" }}>
                      {error.message}
                    </FormError>
                  )}
                </div>
              )}
            />
          </SettingsSection>
        </form>
      </ModalBody>
    </FormProvider>
  )
}

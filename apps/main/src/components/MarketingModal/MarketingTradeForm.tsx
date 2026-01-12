import { Flex, Modal, Separator } from "@galacticcouncil/ui/components"
import { Settings } from "lucide-react"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"

import { SettingsModal } from "@/modules/trade/swap/components/SettingsModal/SettingsModal"
import { Market } from "@/modules/trade/swap/sections/Market/Market"
import { Dca } from "@/modules/trade/swap/sections/DCA/Dca"
import { SFormHeader, SHeaderTab, SSettingsIcon } from "@/modules/trade/swap/components/FormHeader/FormHeader.styled"

type TabType = "market" | "dca"

/**
 * Standalone trade form for use outside of the router context.
 * Uses local tab state instead of URL navigation to avoid page reloads.
 */
export const MarketingTradeForm: FC = () => {
    const { t } = useTranslation("trade")
    const [activeTab, setActiveTab] = useState<TabType>("market")
    const [openSettings, setOpenSettings] = useState(false)

    return (
        <div>
            <SFormHeader justify="space-between" align="center">
                <Flex>
                    <SHeaderTab
                        as="button"
                        data-status={activeTab === "market" ? "active" : undefined}
                        onClick={() => setActiveTab("market")}
                    >
                        {t("swap.header.market")}
                    </SHeaderTab>
                    <SHeaderTab
                        as="button"
                        data-status={activeTab === "dca" ? "active" : undefined}
                        onClick={() => setActiveTab("dca")}
                    >
                        {t("swap.header.dca")}
                    </SHeaderTab>
                </Flex>

                <SSettingsIcon
                    m={8}
                    as="button"
                    aria-label="Settings"
                    size={18}
                    component={Settings}
                    onClick={() => setOpenSettings(true)}
                />

                <Modal open={openSettings} onOpenChange={setOpenSettings}>
                    <SettingsModal />
                </Modal>
            </SFormHeader>

            <Separator sx={{ mx: -20 }} />

            {activeTab === "market" && <Market />}
            {activeTab === "dca" && <Dca />}
        </div>
    )
}

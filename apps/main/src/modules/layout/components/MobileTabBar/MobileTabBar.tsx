import { IconPlaceholder, MenuSlanted } from "@galacticcouncil/ui/assets/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuContentDivider,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Modal,
} from "@galacticcouncil/ui/components"
import { useBreakpoints } from "@galacticcouncil/ui/theme"
import { preventDefault } from "@galacticcouncil/utils"
import { Link, useLocation } from "@tanstack/react-router"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"

import {
  bottomNavOrder,
  NAV_ITEMS_SHOWN_MOBILE,
  NAV_ITEMS_SHOWN_TABLET,
  NAVIGATION,
} from "@/config/navigation"
import { useScrollDirection } from "@/hooks/useScrollDirection"
import { useMenuTranslations } from "@/modules/layout/components/HeaderMenu.utils"
import {
  SMobileTabBar,
  STabBarIcon,
  STabBarItem,
  STabBarLabel,
} from "@/modules/layout/components/MobileTabBar/MobileTabBar.styled"
import { MobileTabBarActions } from "@/modules/layout/components/MobileTabBar/MobileTabBarActions"
import { MobileTabBarSubmenuItem } from "@/modules/layout/components/MobileTabBar/MobileTabBarSubMenu"
import { SettingsModal } from "@/modules/layout/components/Settings/SettingsModal"
import { useHasMobNavbar } from "@/modules/layout/use-has-mob-navbar"

export enum MobileTabBarDrawer {
  Settings = "Settings",
}

export const MobileTabBar: FC = () => {
  const { t } = useTranslation()
  const translations = useMenuTranslations()
  const { isMobile } = useBreakpoints()
  const hasMobNavbar = useHasMobNavbar()
  const { scrollDirection, isScrolling } = useScrollDirection()
  const location = useLocation()

  const [drawer, setDrawer] = useState<MobileTabBarDrawer | null>(null)
  const closeDrawer = () => setDrawer(null)

  const itemsShown = isMobile ? NAV_ITEMS_SHOWN_MOBILE : NAV_ITEMS_SHOWN_TABLET
  const navItems = NAVIGATION.toSorted(
    (item1, item2) =>
      bottomNavOrder.indexOf(item1.key) - bottomNavOrder.indexOf(item2.key),
  )
  const moreItems = navItems.slice(itemsShown)

  if (!hasMobNavbar) return null

  const isHidden = scrollDirection === "down" && isScrolling

  return (
    <SMobileTabBar $hidden={isHidden}>
      {navItems
        .slice(0, itemsShown)
        .map(
          ({ key, icon, to, children, activeOptions, inactiveOn }, index) => {
            const isInactive = inactiveOn?.some((path) =>
              location.pathname.startsWith(path),
            )

            return (
              <DropdownMenu key={key} modal={false}>
                <DropdownMenuTrigger asChild>
                  <STabBarItem
                    {...({
                      as: Link,
                      to: to,
                      activeOptions: {
                        ...activeOptions,
                        exact: isInactive ? true : activeOptions?.exact,
                      },
                      "data-status": isInactive ? "inactive" : undefined,
                      tabIndex: index + 1,
                      onClick:
                        children && children.length > 1
                          ? preventDefault
                          : undefined,
                    } as any)}
                  >
                    <STabBarIcon component={icon ?? IconPlaceholder} />
                    <STabBarLabel>{translations[key]?.title}</STabBarLabel>
                  </STabBarItem>
                </DropdownMenuTrigger>
                {children && children.length > 1 && (
                  <DropdownMenuContent fullWidth animation="slide-bottom">
                    {children.map((item) => (
                      <DropdownMenuItem key={item.key} asChild>
                        <MobileTabBarSubmenuItem item={item} />
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            )
          },
        )}
      {moreItems.length > 0 && (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <STabBarItem sx={{ cursor: "pointer" }} tabIndex={itemsShown + 1}>
              <STabBarIcon component={MenuSlanted} />
              <STabBarLabel>{t("more")}</STabBarLabel>
            </STabBarItem>
          </DropdownMenuTrigger>
          {!drawer && (
            <DropdownMenuContent fullWidth animation="slide-bottom">
              <MobileTabBarActions onOpenDrawer={setDrawer} />
              <DropdownMenuContentDivider />
              {moreItems.map((item) => (
                <DropdownMenuItem key={item.key} asChild>
                  <MobileTabBarSubmenuItem item={item} />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      )}
      <Modal
        open={drawer === MobileTabBarDrawer.Settings}
        onOpenChange={closeDrawer}
      >
        <SettingsModal />
      </Modal>
    </SMobileTabBar>
  )
}

import { IconPlaceholder } from "@galacticcouncil/ui/assets/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@galacticcouncil/ui/components"
import { Link, useLocation } from "@tanstack/react-router"


import { DetailedLink } from "@/components/DetailedLink"
import { NAVIGATION } from "@/config/navigation"
import { useMenuTranslations } from "@/modules/layout/components/HeaderMenu.utils"

export const HeaderMenu: React.FC<
  React.ComponentProps<typeof NavigationMenu>
> = (props) => {
  const translations = useMenuTranslations()
  const location = useLocation()

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="no-scrollbar">
        {NAVIGATION.map(
          ({ key, children, to, search, activeOptions, inactiveOn }) => {
            const isInactive = inactiveOn?.some((path) =>
              location.pathname.startsWith(path),
            )

            return (
              <NavigationMenuItem key={key} data-intersect={key}>
                <NavigationMenuTrigger asChild>
                  <Link
                    to={to}
                    search={search as any}
                    activeOptions={{
                      ...activeOptions,
                      exact: isInactive ? true : activeOptions?.exact,
                    }}
                    data-status={isInactive ? "inactive" : undefined}
                  >
                    {translations[key].title}
                  </Link>
                </NavigationMenuTrigger>
                {children && children.length > 1 && key !== "stats" && (
                  <NavigationMenuContent>
                    {children.map(({ to, search, key, icon }) => (
                      <DetailedLink
                        key={key}
                        to={to}
                        search={search}
                        title={translations[key].title}
                        description={translations[key].description}
                        icon={icon ?? IconPlaceholder}
                      />
                    ))}
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            )
          },
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

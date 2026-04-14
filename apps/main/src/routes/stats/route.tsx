import { css, styled } from "@galacticcouncil/ui/utils"
import { mq } from "@galacticcouncil/ui/theme"
import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router"
import { Button } from "@galacticcouncil/ui/components"

import { getPageMeta, LINKS } from "@/config/navigation"
import { MainContent } from "@/modules/layout/components/Content"
import {
  HEADER_HEIGHT,
  HEADER_HEIGHT_MOBILE,
} from "@/modules/layout/components/Header.styled"
import { TOP_NAVBAR_BREAKPOINT } from "@/modules/layout/constants"
import { useScrollDirection } from "@/hooks/useScrollDirection"

const STATS_TABS = [
  { label: "Overview", to: LINKS.statsOverview },
  { label: "Treasury", to: LINKS.statsTreasury },
  { label: "Hollar", to: LINKS.statsHollar },
  { label: "Fees", to: LINKS.statsFees },
] as const

type SStickyNavProps = { $headerVisible?: boolean }

const SStickyNav = styled.div<SStickyNavProps>(
  ({ theme, $headerVisible }) => css`
    position: sticky;
    top: ${$headerVisible ? HEADER_HEIGHT_MOBILE : 0};
    z-index: ${theme.zIndices.header - 1};
    background: ${theme.surfaces.themeBasePalette.background};
    padding-top: 12px;
    padding-bottom: 12px;
    margin-left: calc(-1 * var(--layout-gutter));
    margin-right: calc(-1 * var(--layout-gutter));
    padding-left: var(--layout-gutter);
    padding-right: var(--layout-gutter);
    border-bottom: 1px solid ${theme.details.separators};
    overflow-x: auto;
    transition: top 0.3s linear;

    &::-webkit-scrollbar { display: none; }
    scrollbar-width: none;

    ${mq(TOP_NAVBAR_BREAKPOINT)} {
      top: ${$headerVisible ? HEADER_HEIGHT : 0};
    }
  `,
)

const SNavFlex = styled.div`
  display: flex;
  gap: 0.5rem;
  white-space: nowrap;
`

const STabsWrapper = styled(MainContent)`
  padding-bottom: 0;
`

const StatsLayoutComponent = () => {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { scrollDirection, isAtTop } = useScrollDirection()
  const isHeaderHidden = scrollDirection === "down" && !isAtTop

  return (
    <>
      <STabsWrapper>
        <SStickyNav $headerVisible={!isHeaderHidden}>
          <SNavFlex>
            {STATS_TABS.map(({ label, to }) => (
              <Button
                key={to}
                size="small"
                variant={pathname === to || pathname.startsWith(to) ? "secondary" : "muted"}
                onClick={() => navigate({ to })}
              >
                {label}
              </Button>
            ))}
          </SNavFlex>
        </SStickyNav>
      </STabsWrapper>
      <Outlet />
    </>
  )
}

export const Route = createFileRoute("/stats")({
  component: StatsLayoutComponent,
  head: ({
    match: {
      context: { i18n },
    },
  }) => ({
    meta: getPageMeta("stats", i18n.t),
  }),
})

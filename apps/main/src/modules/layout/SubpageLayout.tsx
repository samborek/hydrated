import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { Box, Grid } from "@galacticcouncil/ui/components"
import { mq } from "@galacticcouncil/ui/theme"
import { getToken } from "@galacticcouncil/ui/utils"
import { Outlet } from "@tanstack/react-router"
import { FC, ReactNode } from "react"

import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb"
import { useScrollDirection } from "@/hooks/useScrollDirection"
import { Content, MainContent } from "@/modules/layout/components/Content"
import { SubpageMenu } from "@/modules/layout/components/SubpageMenu"

import {
  HEADER_HEIGHT,
  HEADER_HEIGHT_MOBILE,
} from "@/modules/layout/components/Header.styled"
import { TOP_NAVBAR_BREAKPOINT } from "@/modules/layout/constants"

type SStickyTabsWrapperProps = {
  $headerVisible?: boolean
}

const SStickyTabsWrapper = styled.div<SStickyTabsWrapperProps>(
  ({ theme, $headerVisible }) => css`
    position: sticky;
    top: ${$headerVisible ? HEADER_HEIGHT_MOBILE : 0}px;
    z-index: ${theme.zIndices.header - 1};
    background: ${theme.surfaces.themeBasePalette.background};
    padding-top: 20px;
    padding-bottom: 12px;
    margin-left: calc(-1 * var(--layout-gutter));
    margin-right: calc(-1 * var(--layout-gutter));
    padding-left: var(--layout-gutter);
    padding-right: var(--layout-gutter);

    /* Match header's transition timing */
    transition: top 0.3s linear;

    ${mq(TOP_NAVBAR_BREAKPOINT)} {
      top: ${$headerVisible ? HEADER_HEIGHT : 0}px;
    }
  `,
)

type Props = {
  readonly actions?: ReactNode
  readonly subpageMenu?: ReactNode
  readonly crumbs?: BreadcrumbItem[]
  readonly ignoreCurrentSearch?: boolean
  readonly subpageMenuHidden?: boolean
}

export const SubpageLayout: FC<Props> = ({
  actions,
  subpageMenu,
  crumbs = [],
  ignoreCurrentSearch,
  subpageMenuHidden = false,
}) => {
  const { scrollDirection, isAtTop } = useScrollDirection()

  // Header is hidden when scrolling down and not at top
  const isHeaderHidden = scrollDirection === "down" && !isAtTop

  return (
    <>
      {crumbs.length > 0 && (
        <Box
          py={8}
          sx={{
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderBottomColor: getToken("details.separators"),
          }}
        >
          <Content>
            <Breadcrumb crumbs={crumbs} />
          </Content>
        </Box>
      )}
      <MainContent>
        <SStickyTabsWrapper $headerVisible={!isHeaderHidden}>
          <Grid columnTemplate="1fr auto" align="center">
            {(!subpageMenuHidden && subpageMenu) ?? (
              <SubpageMenu ignoreCurrentSearch={ignoreCurrentSearch} />
            )}
            <Box sx={{ gridColumn: 2 }}>{actions}</Box>
          </Grid>
        </SStickyTabsWrapper>
        <Outlet />
      </MainContent>
    </>
  )
}

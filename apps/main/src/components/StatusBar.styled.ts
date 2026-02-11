import styled from "@emotion/styled"
import { mq } from "@galacticcouncil/ui/theme"

export const SStatusBar = styled.div`
  display: none;

  ${mq("lg")} {
    display: flex;
    position: fixed;
    right: 0;
    bottom: 0;
    padding-bottom: 8px;
    gap: 0;
    align-items: center;
    z-index: 1001;
  }
`

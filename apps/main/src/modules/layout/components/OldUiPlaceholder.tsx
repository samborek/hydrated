import styled from "@emotion/styled"
import { FC } from "react"

import { OldUiBanner } from "./OldUiBanner"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
`

export const OldUiPlaceholder: FC = () => {
  return (
    <Container>
      Old UI
      <OldUiBanner onOpenMarketing={() => {}} />
    </Container>
  )
}

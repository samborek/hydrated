import { Grid, LoadingButton } from "@galacticcouncil/ui/components"
import { FC } from "react"

import { AuthorizedAction } from "@/components/AuthorizedAction/AuthorizedAction"

type Props = {
    readonly isEnabled: boolean
    readonly isLoading: boolean
}

export const LimitOrderSubmit: FC<Props> = ({ isEnabled, isLoading }) => {

    return (
        <Grid py="xl">
            <AuthorizedAction size="large">
                <LoadingButton
                    type="submit"
                    size="large"
                    disabled={!isEnabled || isLoading}
                    isLoading={isLoading}
                >
                    Place limit order
                </LoadingButton>
            </AuthorizedAction>
        </Grid>
    )
}

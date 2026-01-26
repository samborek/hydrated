import {
  Box,
  Flex,
  LoadingButton,
  Paper,
  Separator,
  Skeleton,
  Stack,
  Text,
} from "@galacticcouncil/ui/components"
import { getTokenRem } from "@galacticcouncil/ui/utils"
import { useTranslation } from "react-i18next"

const XcmSectionSkeleton = () => {
  return (
    <Stack p={getTokenRem("containers.paddings.primary")} gap={getTokenRem("scales.paddings.m")} height="6.625rem">
      <Flex justify="space-between">
        <Flex gap={getTokenRem("scales.paddings.m")} direction="column">
          <Text fs="p5">
            <Skeleton width="6.25rem" />
          </Text>
          <Flex>
            <Skeleton width="2.1875rem" height="2.1875rem" sx={{ borderRadius: "full" }} />
            <Skeleton width="2.1875rem" height="2.1875rem" sx={{ borderRadius: "full" }} />
          </Flex>
        </Flex>
        <Flex gap={getTokenRem("scales.paddings.m")} direction="column" align="end">
          <Text fs="p6">
            <Skeleton width="5rem" />
          </Text>
          <Box height="2.1875rem">
            <Skeleton width="6.25rem" height="1.3125rem" />
          </Box>
        </Flex>
      </Flex>
    </Stack>
  )
}

export const XcmTransferSkeleton = () => {
  const { t } = useTranslation("xcm")
  return (
    <Stack
      gap={getTokenRem("scales.paddings.s")}
      maxWidth="31.25rem"
      mx="auto"
      pt={getTokenRem("containers.paddings.primary")}
      sx={{ pointerEvents: "none" }}
    >
      <Paper>
        <Box p={getTokenRem("containers.paddings.primary")}>
          <Text fs="h7" fw={500} align="center" font="primary">
            {t("form.title")}
          </Text>
        </Box>
        <Separator />
        <XcmSectionSkeleton />
      </Paper>
      <Flex align="center" justify="center" position="relative">
        <Separator sx={{ flexShrink: 0, flex: 1 }} />
        <Skeleton
          width="2.125rem"
          height="2.125rem"
          sx={{ display: "inline-flex", borderRadius: "full" }}
        />
        <Separator sx={{ flexShrink: 0, flex: 1 }} />
      </Flex>
      <Paper>
        <XcmSectionSkeleton />
        <Separator />
        <Stack p={getTokenRem("containers.paddings.primary")}>
          <LoadingButton isLoading size="large" loadingVariant="muted" />
        </Stack>
      </Paper>
    </Stack>
  )
}

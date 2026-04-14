import styled from "@emotion/styled"
import { Text, Flex } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC } from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts"

import { useBorrowReserves, useGhoReserveData } from "@/api/borrow"
import { getGhoReserve } from "@galacticcouncil/money-market/utils"
import { formatUSD } from "@/api/stats"

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const SGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SCard = styled.div`
  background: ${({ theme }) => theme.surfaces.containers.high.primary};
  border: 1px solid ${({ theme }) => theme.details.borders};
  border-radius: 16px;
  padding: 24px;
`

const SProgressBarWrapper = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.surfaces.containers.dim.dimOnBg};
  overflow: hidden;
  margin-top: 12px;
`

const SProgressBarFill = styled.div<{ $progress: number; $color: string }>`
  height: 100%;
  width: ${({ $progress }) => Math.min(Math.max($progress, 0), 100)}%;
  background: ${({ $color }) => $color};
  border-radius: 4px;
  transition: width 0.3s ease;
`

const SDonutInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const SDonutWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SLegendDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: ${({ $color }) => $color};
`

export const HollarCollateralBacking: FC = () => {
  const { themeProps: theme } = useTheme()
  
  const { data: gho } = useGhoReserveData()
  const { data: reserves } = useBorrowReserves()

  // --- MM Capacity (Aave Hooked) ---
  const aaveFacilLevel = gho?.formattedGhoReserveData?.aaveFacilitatorBucketLevel || 0
  const aaveFacilMax = gho?.formattedGhoReserveData?.aaveFacilitatorBucketMaxCapacity || 1
  const mmBucketProgress = (aaveFacilLevel / aaveFacilMax) * 100

  // --- HSM Capacity (Mocked) ---
  const hsmFacilLevel = 3300000 
  const hsmFacilMax = 5000000
  const hsmBucketProgress = (hsmFacilLevel / hsmFacilMax) * 100

  // --- MM Collateral pie chart math ---
  const mmTotalDebt = reserves?.formattedReserves?.reduce((acc, r) => acc + parseFloat(r.totalDebtUSD), 0) || 1
  const ghoReserve = reserves?.formattedReserves ? getGhoReserve(reserves.formattedReserves) : null
  const hollarDebt = ghoReserve ? parseFloat(ghoReserve.totalDebtUSD) : 0

  const hollarShare = hollarDebt / mmTotalDebt

  const mmCollaterals = reserves?.formattedReserves?.filter(r => r.symbol !== 'HOLLAR' && parseFloat(r.totalLiquidityUSD) > 0).map(r => {
     const totalLiqUSD = parseFloat(r.totalLiquidityUSD)
     return {
       name: r.symbol,
       value: totalLiqUSD * hollarShare,
     }
  }).sort((a,b) => b.value - a.value) || []

  const mmTotalCollateralAttributed = mmCollaterals.reduce((acc, c) => acc + c.value, 0)
  const mmOvercollateralization = hollarDebt > 0 ? (mmTotalCollateralAttributed / hollarDebt).toFixed(2) : "0.00"

  // --- HSM Collateral pie chart math (Mocked) ---
  const hsmCollaterals = [
     { name: "aUSDT", value: hsmFacilLevel * 0.4 },
     { name: "aUSDC", value: hsmFacilLevel * 0.3 },
     { name: "sUSDe", value: hsmFacilLevel * 0.2 },
     { name: "sUSDS", value: hsmFacilLevel * 0.1 },
  ]

  const hsmTotalCollateralAttributed = hsmCollaterals.reduce((acc, c) => acc + c.value, 0)

  // Colors Arrays
  const mmColors = [
    "#EC4899",
    "#14B8A6",
    theme.colors.lavender?.["500"] || "#8B5CF6",
    "#3B82F6",
    "#F59E0B",
    "#10B981",
  ]
  
  const hsmColors = [
    "#26A17B", // aUSDT
    "#2775CA", // aUSDC
    "#8B5CF6", // sUSDe
    "#F4B731", // sUSDS
  ]

  return (
    <SContainer>
      <SGrid>
        {/* Bucket 1: MM */}
        <SCard>
          <Flex justify="space-between" align="center">
            <Text fs={16} fw={600} color="text.primary">MM Facilitator Bucket</Text>
            <Text fs={14} color="text.medium" style={{ fontFamily: "Gazpacho, sans-serif" }}>
               {formatUSD(aaveFacilLevel)} / {formatUSD(aaveFacilMax)}
            </Text>
          </Flex>
          <SProgressBarWrapper>
            <SProgressBarFill 
               $progress={mmBucketProgress} 
               $color={theme.colors.lavender?.["600"] || "#8B5CF6"} 
            />
          </SProgressBarWrapper>
        </SCard>

        {/* Bucket 2: HSM */}
        <SCard>
          <Flex justify="space-between" align="center">
            <Text fs={16} fw={600} color="text.primary">HSM Facilitator Bucket</Text>
            <Text fs={14} color="text.medium" style={{ fontFamily: "Gazpacho, sans-serif" }}>
               {formatUSD(hsmFacilLevel)} / {formatUSD(hsmFacilMax)}
            </Text>
          </Flex>
          <SProgressBarWrapper>
            <SProgressBarFill 
               $progress={hsmBucketProgress} 
               $color="#EC4899"
            />
          </SProgressBarWrapper>
        </SCard>
      </SGrid>

      <SGrid>
        {/* Pie 1: MM */}
        <SCard>
           <Text fs={16} fw={600} color="text.primary">Backing via Money Market</Text>
           <Text fs={13} color="text.medium" sx={{ mt: 4 }}>Overcollateralized proportional backing</Text>

           <SDonutWrapper>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={mmCollaterals}
                   cx="50%"
                   cy="50%"
                   innerRadius={65}
                   outerRadius={85}
                   stroke="none"
                   paddingAngle={2}
                   dataKey="value"
                 >
                   {mmCollaterals.map((_entry, index) => (
                     <Cell key={`cell-${index}`} fill={mmColors[index % mmColors.length]} />
                   ))}
                 </Pie>
                 <Tooltip 
                   formatter={((value: number) => formatUSD(value)) as any}
                   contentStyle={{ borderRadius: 8, background: theme.surfaces.containers.high.primary, border: `1px solid ${theme.details.borders}` }} 
                 />
               </PieChart>
             </ResponsiveContainer>
             <SDonutInner>
                <Text fs={11} color="text.medium" style={{ textTransform: "uppercase" }}>Overcollateralized</Text>
                <Text fs={22} fw={700} color={theme.details.values.positive} style={{ fontFamily: "Gazpacho, sans-serif" }}>
                   {mmOvercollateralization}x
                </Text>
             </SDonutInner>
           </SDonutWrapper>

           <Flex direction="column" gap={10} sx={{ mt: 16 }}>
              {mmCollaterals.slice(0, 6).map((item, index) => {
                 const percentage = mmTotalCollateralAttributed > 0 ? ((item.value / mmTotalCollateralAttributed) * 100).toFixed(1) : "0"
                 return (
                   <Flex justify="space-between" align="center" key={item.name}>
                      <Flex align="center" gap={8}>
                         <SLegendDot $color={mmColors[index % mmColors.length]!} />
                         <Text fs={13} color="text.medium">{item.name}</Text>
                      </Flex>
                      <Flex align="center" gap={12}>
                         <Text fs={13} color="text.primary">{formatUSD(item.value)}</Text>
                         <Text fs={12} color="text.medium" style={{ opacity: 0.7, width: 35, textAlign: "right" }}>{percentage}%</Text>
                      </Flex>
                   </Flex>
                 )
              })}
           </Flex>
        </SCard>

        {/* Pie 2: HSM */}
        <SCard>
           <Text fs={16} fw={600} color="text.primary">Backing via HSM</Text>
           <Text fs={13} color="text.medium" sx={{ mt: 4 }}>1:1 backing from Stablepool deposits</Text>
           
           <SDonutWrapper>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={hsmCollaterals}
                   cx="50%"
                   cy="50%"
                   innerRadius={65}
                   outerRadius={85}
                   stroke="none"
                   paddingAngle={2}
                   dataKey="value"
                 >
                   {hsmCollaterals.map((_entry, index) => (
                     <Cell key={`cell-${index}`} fill={hsmColors[index % hsmColors.length]} />
                   ))}
                 </Pie>
                 <Tooltip 
                   formatter={((value: number) => formatUSD(value)) as any}
                   contentStyle={{ borderRadius: 8, background: theme.surfaces.containers.high.primary, border: `1px solid ${theme.details.borders}` }} 
                 />
               </PieChart>
             </ResponsiveContainer>
             <SDonutInner>
                <Text fs={11} color="text.medium" style={{ textTransform: "uppercase" }}>Overcollateralized</Text>
                <Text fs={22} fw={700} color={theme.details.values.positive} style={{ fontFamily: "Gazpacho, sans-serif" }}>
                   1.00x
                </Text>
             </SDonutInner>
           </SDonutWrapper>

           <Flex direction="column" gap={10} sx={{ mt: 16 }}>
              {hsmCollaterals.map((item, index) => {
                 const percentage = hsmTotalCollateralAttributed > 0 ? ((item.value / hsmTotalCollateralAttributed) * 100).toFixed(1) : "0"
                 return (
                   <Flex justify="space-between" align="center" key={item.name}>
                      <Flex align="center" gap={8}>
                         <SLegendDot $color={hsmColors[index % hsmColors.length]!} />
                         <Text fs={13} color="text.medium">{item.name}</Text>
                      </Flex>
                      <Flex align="center" gap={12}>
                         <Text fs={13} color="text.primary">{formatUSD(item.value)}</Text>
                         <Text fs={12} color="text.medium" style={{ opacity: 0.7, width: 35, textAlign: "right" }}>{percentage}%</Text>
                      </Flex>
                   </Flex>
                 )
              })}
           </Flex>
        </SCard>
      </SGrid>
    </SContainer>
  )
}

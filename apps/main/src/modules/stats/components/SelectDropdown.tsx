// @ts-nocheck
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@galacticcouncil/ui/components"
import { ChevronDown } from "lucide-react"
import { FC } from "react"

const STrigger = styled.button`
  ${({ theme }) => css`
    padding: 0 12px;
    height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    width: 100%;

    border-radius: ${theme.containers.cornerRadius.buttonsPrimary}px;
    border: 1px solid ${theme.buttons.outlineDark.onOutline};
    background: ${theme.surfaces.themeBasePalette.surfaceHigh};
    transition: all 0.3s ease-in-out;
    color: ${theme.text.high};

    &:hover {
      background: ${theme.buttons.secondary.low.hover};
      border-color: ${theme.buttons.secondary.low.hover};
    }

    & > span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `}
`

const SContent = styled(DropdownMenuContent)`
  ${({ theme }) => css`
    border-radius: 12px;
    border: 1px solid ${theme.details.borders};
    background: ${theme.surfaces.containers.high.primary};
    padding: 10px;
    box-shadow: 0px 8px 30px 0px rgba(41, 41, 60, 0.41);
    z-index: ${theme.zIndices.popover};
    min-width: var(--radix-dropdown-menu-trigger-width);
    display: flex;
    flex-direction: column;
    gap: 4px;
  `}
`

const SItem = styled(DropdownMenuItem)`
  ${({ theme }) => css`
    all: unset;
    font-size: ${theme.paragraphSize.p3};
    line-height: 140%;
    cursor: pointer;
    min-width: 100px;
    color: ${theme.text.medium};
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1 0 0;
    padding: ${theme.buttons.paddings.quart}px
      ${theme.buttons.paddings.secondary}px;
    border-radius: ${theme.containers.cornerRadius.buttonsPrimary}px;
    transition: all 0.3s ease-in-out;

    &:hover,
    &[data-highlighted] {
      color: ${theme.text.high};
      background: ${theme.buttons.secondary.low.hover};
    }

    &[data-state="selected"] {
      color: ${theme.text.tint.secondary};
      background: ${theme.buttons.secondary.low.hover};
    }
  `}
`

const Label = styled.span`
  ${({ theme }) => css`
    font-size: 12px;
    font-weight: 600;
    color: ${theme.text.medium};
    white-space: nowrap;
  `}
`

const Value = styled.span`
  ${({ theme }) => css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`

export interface SelectDropdownItem {
  key: string
  label: string
}

export interface SelectDropdownProps {
  value: string | number
  onValueChange: (value: string) => void
  items: SelectDropdownItem[]
  label?: string
  placeholder?: string
}

export const SelectDropdown: FC<SelectDropdownProps> = ({
  value,
  onValueChange,
  items,
  label,
  placeholder,
}) => {
  const selectedLabel =
    items.find((i) => i.key === value)?.label || value || placeholder

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <STrigger>
          <span>
            {label && <Label>{label}</Label>}
            <Value>{selectedLabel}</Value>
          </span>
          <ChevronDown size={14} style={{ opacity: 0.5 }} />
        </STrigger>
      </DropdownMenuTrigger>
      <SContent>
        {items.map((item) => (
          <SItem
            key={item.key}
            onSelect={() => onValueChange(item.key)}
            data-state={item.key === value ? "selected" : undefined}
          >
            {item.label}
          </SItem>
        ))}
      </SContent>
    </DropdownMenu>
  )
}

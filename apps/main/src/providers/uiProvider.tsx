import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react"

export type UiVersion = "current" | "old"

interface UiContextType {
  uiVersion: UiVersion
  setUiVersion: Dispatch<SetStateAction<UiVersion>>
}

export const UiContext = createContext<UiContextType>({
  uiVersion: "current",
  setUiVersion: () => {},
})

export const useUiContext = () => useContext(UiContext)

export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [uiVersion, setUiVersion] = useState<UiVersion>("current")

  return (
    <UiContext.Provider value={{ uiVersion, setUiVersion }}>
      {children}
    </UiContext.Provider>
  )
}

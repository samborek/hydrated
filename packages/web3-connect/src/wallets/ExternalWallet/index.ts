import {
  isH160Address,
  isSS58Address,
  updateQueryString,
} from "@galacticcouncil/utils"

import { WalletProviderType } from "@/config/providers"
import { DummySigner, Wallet, WalletAccount } from "@/types/wallet"

import logo from "./logo.svg"

type DummyExtension = object

const STORAGE_KEY = "web3-connect-external-wallet-accounts"

const loadAccounts = (): WalletAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveAccounts = (accounts: WalletAccount[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
  } catch {}
}

export class ExternalWallet implements Wallet {
  provider = WalletProviderType.ExternalWallet
  accessor = ""
  title = "View as wallet"
  installUrl = ""
  logo = logo
  _rawExtension: DummyExtension | undefined
  _extension: DummyExtension | undefined
  _signer: DummySigner | undefined = {}
  _enabled: boolean = false

  accounts: WalletAccount[] = loadAccounts()

  get extension() {
    return this._extension
  }

  get signer() {
    return this._signer
  }

  get installed() {
    return true
  }

  get enabled() {
    return this._enabled
  }

  get rawExtension() {
    return this._rawExtension
  }

  handleAnnounceProvider = () => {}

  enable = async () => {
    this._enabled = true
    this._extension = {}
  }

  transformError = (err: Error): Error => {
    return new Error(err.message)
  }

  setAccount = (address: string) => {
    if (isSS58Address(address) || isH160Address(address)) {
      const already = this.accounts.some((a) => a.address === address)
      if (!already) {
        this.accounts = [
          ...this.accounts,
          {
            address,
            name: "External Account",
            provider: this.provider,
          },
        ]
        saveAccounts(this.accounts)
      }
      updateQueryString("address", address)
    }
  }

  removeAccount = (address: string) => {
    this.accounts = this.accounts.filter((a) => a.address !== address)
    saveAccounts(this.accounts)
  }

  getAccounts = async (): Promise<WalletAccount[]> => {
    return Promise.resolve([...this.accounts])
  }

  subscribeAccounts = () => {
    return () => {}
  }

  disconnect = () => {
    this._enabled = false
    this.accounts = []
    saveAccounts([])
    updateQueryString("address", undefined)
  }
}

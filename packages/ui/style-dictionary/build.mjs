import fs from "node:fs/promises"
import path from "node:path"

import { permutateThemes, register } from "@tokens-studio/sd-transforms"
import { dirname } from "path"
import StyleDictionary from "style-dictionary"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

register(StyleDictionary)

const fetchRemoteTokens = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/galacticcouncil/hydration-styles/refs/heads/tertiary/tokens.json",
  )
  const tokens = await res.text()

  return JSON.parse(tokens.replace(/lch/g, "srgb"))
}

const fetchLocalTokens = async () => {
  const tokensPath = path.resolve(__dirname, "../../tokens/tokens.json")
  const tokens = await fs.readFile(tokensPath, "utf-8")
  return JSON.parse(tokens.replace(/lch/g, "srgb"))
}

const USE_LOCAL = true

const fetchTokens = async () => {
  if (USE_LOCAL) {
    console.log("Using local tokens from packages/tokens/tokens.json")
    return fetchLocalTokens()
  } else {
    console.log("Using remote tokens from GitHub")
    return fetchRemoteTokens()
  }
}

const saveFile = async (path, content) => {
  const directory = path.substring(0, path.lastIndexOf("/"))
  await fs.mkdir(directory, { recursive: true })
  await fs.writeFile(path, JSON.stringify(content, null, 2))
}

async function run() {
  const tokens = await fetchTokens()

  const tokenFiles = Object.entries(tokens).map(async ([name, value]) => {
    await saveFile(`./style-dictionary/tokens/${name}.json`, value)
  })

  await Promise.all(tokenFiles)

  const $themes = JSON.parse(
    await fs.readFile(path.resolve(__dirname, "tokens/$themes.json")),
  )

  const themes = permutateThemes($themes)

  delete themes["Core-Light-Mobile"]
  delete themes["Core-Dark-Mobile"]

  const configs = Object.entries(themes).map(([theme, sets]) => ({
    source: sets.map((tokenset) =>
      path.resolve(__dirname, `tokens/${tokenset}.json`),
    ),
    preprocessors: ["tokens-studio"],
    platforms: {
      js: {
        transformGroup: "tokens-studio",
        buildPath: "./src/",
        files: [
          {
            format: "json/nested",
            destination: `theme/tokens/${theme.split("-")[1].toLowerCase()}.json`,
          },
        ],
      },
    },
  }))

  async function build(cfg) {
    const sd = new StyleDictionary(cfg)
    await sd.buildAllPlatforms()
  }
  await Promise.all(configs.map(build))
}

run()

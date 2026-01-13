import{y as a,j as o,O as d,F as f,R as n,T as l,W as s,X as m}from"./assets/index-DwF5AQa2.js";import{r as y}from"./chunk-Ca9K0fUM.js";import{V as v}from"./chunk-DAlwQzb_.js";import"./chunk-TqV8ayKd.js";import"./chunk-BljNS4KZ.js";const g=l.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 0 24px 0;
`,p=l.section(({theme:e})=>m`
    background: ${e.surfaces.containers.high.primary};
    border: 1px solid ${e.details.borders};
    border-radius: 16px;
    padding: ${e.containers.paddings.secondary}px;
  `),u=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,c=l.div(({theme:e})=>m`
    background: ${e.surfaces.containers.high.accent};
    border: 1px solid ${e.details.borders};
    border-radius: 8px;
    padding: 16px;
  `),x=l.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,b=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }
`,$={omnipool:{tvl:"$10.3M",volume24h:"$2.5M",fees24h:"$12,500",color:"#3B82F6",pools:[{name:"Omnipool",assets:"DOT, HDX, USDC, WETH, WBTC, +12",tvl:"$10.3M",volume:"$2.5M",apy:"8.5%"}]},stableswap:{tvl:"$5.2M",volume24h:"$1.8M",fees24h:"$3,600",color:"#22C55E",pools:[{name:"4pool",assets:"HUSDT, HUSDC, HUSDe, HUSDs",tvl:"$3.2M",volume:"$1.2M",apy:"4.2%"},{name:"USDC-USDT",assets:"USDC, USDT",tvl:"$2.0M",volume:"$0.6M",apy:"3.1%"}]},xyk:{tvl:"$1.8M",volume24h:"$0.4M",fees24h:"$1,200",color:"#A855F7",pools:[{name:"HDX-DOT",assets:"HDX, DOT",tvl:"$0.8M",volume:"$0.2M",apy:"12.5%"},{name:"HDX-USDC",assets:"HDX, USDC",tvl:"$0.6M",volume:"$0.15M",apy:"9.8%"},{name:"DOT-USDC",assets:"DOT, USDC",tvl:"$0.4M",volume:"$0.05M",apy:"5.2%"}]}};function U(){const[e,t]=y.useState("omnipool"),r=$[e];return a(g,{children:[o(d,{as:"h1",sx:{p:0},mb:-12,children:"AMM Dashboard"}),a(f,{gap:8,sx:{marginBottom:24},children:[o(n,{variant:e==="omnipool"?"secondary":"tertiary",outline:e!=="omnipool",onClick:()=>t("omnipool"),children:"Omnipool"}),o(n,{variant:e==="stableswap"?"secondary":"tertiary",outline:e!=="stableswap",onClick:()=>t("stableswap"),children:"Stableswap"}),o(n,{variant:e==="xyk"?"secondary":"tertiary",outline:e!=="xyk",onClick:()=>t("xyk"),children:"XYK Pools"})]}),a(u,{children:[a(c,{children:[o(s,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"TVL"}),o(s,{fs:28,fw:700,color:r.color,style:{fontFamily:"Gazpacho, sans-serif"},children:r.tvl})]}),a(c,{children:[o(s,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Volume (24h)"}),o(s,{fs:24,fw:700,style:{fontFamily:"Gazpacho, sans-serif"},children:r.volume24h})]}),a(c,{children:[o(s,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Fees (24h)"}),o(s,{fs:24,fw:700,style:{fontFamily:"Gazpacho, sans-serif"},children:r.fees24h})]})]}),o(p,{children:o(v,{title:"Volume History",value:r.volume24h})}),a(p,{children:[o(d,{children:e==="omnipool"?"Composition":"Pools"}),o(x,{children:r.pools.map((i,h)=>a(b,{children:[a("div",{children:[o(s,{fw:500,fs:16,children:i.name}),o(s,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginTop:4},children:i.assets})]}),a("div",{style:{textAlign:"right"},children:[o(s,{fw:600,children:i.tvl}),a("div",{style:{display:"flex",gap:12,marginTop:4},children:[a(s,{fs:12,color:"rgba(255,255,255,0.5)",children:["Vol: ",i.volume]}),a(s,{fs:12,color:"#4CAF50",children:["APY: ",i.apy]})]})]})]},h))})]})]})}export{U as component};

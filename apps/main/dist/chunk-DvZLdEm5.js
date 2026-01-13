import{y as e,j as r,W as o,ba as l,bb as m,F as w,R as S,O as y,T as n,bc as C,X as x}from"./assets/index-DwF5AQa2.js";import{r as $}from"./chunk-Ca9K0fUM.js";import{q as M,C as F,X as A,Y as B,T as k,t as g}from"./chunk-TqV8ayKd.js";const D=l("div",{target:"e67q9is5"})({name:"1d3w5wq",styles:"width:100%"}),v=l("div",{target:"e67q9is4"})({name:"5bhc30",styles:"margin-bottom:8px"}),z=l("div",{target:"e67q9is3"})({name:"11u7he5",styles:"display:flex;justify-content:flex-end;align-items:center;margin-top:16px;flex-wrap:wrap;gap:16px"}),E=l("div",{target:"e67q9is2"})({name:"1clrpnn",styles:"display:flex;gap:24px;margin-top:16px;flex-wrap:wrap"}),f=l("div",{target:"e67q9is1"})({name:"1yydxi7",styles:"display:flex;align-items:center;gap:8px"}),b=l("div",{target:"e67q9is0"})("width:12px;height:12px;border-radius:4px;background:",({$color:t})=>t,";"),T=()=>{const t=[],a=new Date;for(let s=90;s>=0;s--){const c=new Date(a);c.setDate(c.getDate()-s);const d=10+(90-s)*.03+Math.random()*1,p=5+(90-s)*.02+Math.random()*.8;t.push({date:c.toLocaleDateString("en-US",{month:"short",day:"numeric"}),supply:d,borrow:p})}return t},G=T(),L=({title:t="Supply / Borrow History"})=>{const[a,s]=$.useState("30D"),d=(()=>{const i=a==="7D"?7:a==="30D"?30:90;return G.slice(-i)})(),p=d[d.length-1];return e(D,{children:[r(v,{children:r("div",{children:r(o,{fs:14,color:"rgba(255,255,255,0.6)",children:t})})}),r(m,{width:"100%",height:280,children:e(M,{data:d,margin:{top:10,right:0,left:0,bottom:0},children:[e("defs",{children:[e("linearGradient",{id:"supplyGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[r("stop",{offset:"5%",stopColor:"#22C55E",stopOpacity:.6}),r("stop",{offset:"95%",stopColor:"#22C55E",stopOpacity:.1})]}),e("linearGradient",{id:"borrowGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[r("stop",{offset:"5%",stopColor:"#F59E0B",stopOpacity:.6}),r("stop",{offset:"95%",stopColor:"#F59E0B",stopOpacity:.1})]})]}),r(F,{strokeDasharray:"3 3",stroke:"rgba(255,255,255,0.05)"}),r(A,{dataKey:"date",tick:{fill:"rgba(255,255,255,0.4)",fontSize:10},axisLine:{stroke:"rgba(255,255,255,0.1)"},tickLine:!1}),r(B,{tick:{fill:"rgba(255,255,255,0.4)",fontSize:10},axisLine:{stroke:"rgba(255,255,255,0.1)"},tickLine:!1,tickFormatter:i=>`$${i.toFixed(0)}M`}),r(k,{contentStyle:{background:"rgba(20, 20, 30, 0.95)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#fff"},formatter:i=>[`$${i.toFixed(2)}M`,""]}),r(g,{type:"monotone",dataKey:"supply",stroke:"#22C55E",fill:"url(#supplyGrad)",strokeWidth:2,name:"Supply"}),r(g,{type:"monotone",dataKey:"borrow",stroke:"#F59E0B",fill:"url(#borrowGrad)",strokeWidth:2,name:"Borrow"})]})}),e(E,{children:[e(f,{children:[r(b,{$color:"#22C55E"}),r(o,{fs:12,color:"rgba(255,255,255,0.6)",children:"Supply:"}),e(o,{fs:12,fw:500,children:["$",p?.supply.toFixed(2),"M"]})]}),e(f,{children:[r(b,{$color:"#F59E0B"}),r(o,{fs:12,color:"rgba(255,255,255,0.6)",children:"Borrow:"}),e(o,{fs:12,fw:500,children:["$",p?.borrow.toFixed(2),"M"]})]})]}),r(z,{children:r(w,{gap:6,children:["7D","30D","MAX"].map(i=>r(S,{size:"small",variant:a===i?"secondary":"tertiary",outline:a!==i,onClick:()=>s(i),sx:{px:12,minWidth:42},children:i},i))})})]})},q=n.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 0 24px 0;
`,u=n.section(({theme:t})=>x`
    background: ${t.surfaces.containers.high.primary};
    border: 1px solid ${t.details.borders};
    border-radius: 16px;
    padding: ${t.containers.paddings.secondary}px;
  `),O=n.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,h=n.div(({theme:t})=>x`
    background: ${t.surfaces.containers.high.accent};
    border: 1px solid ${t.details.borders};
    border-radius: 8px;
    padding: 16px;
  `),R=n.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  
  th {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
  }
  
  tbody tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`,W=n.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,H=n.div`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  width: 100px;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({$value:t})=>t}%;
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    border-radius: 4px;
  }
`,j=[{id:"5",asset:"DOT",supply:"$2.5M",borrow:"$1.2M",utilization:48,supplyApy:"3.2%",borrowApy:"5.8%"},{id:"22",asset:"USDC",supply:"$5.1M",borrow:"$3.8M",utilization:75,supplyApy:"4.5%",borrowApy:"7.2%"},{id:"20",asset:"WETH",supply:"$1.8M",borrow:"$0.9M",utilization:50,supplyApy:"2.8%",borrowApy:"4.9%"},{id:"21",asset:"WBTC",supply:"$3.2M",borrow:"$1.6M",utilization:50,supplyApy:"2.5%",borrowApy:"4.5%"}];function K(){return e(q,{children:[r(y,{as:"h1",sx:{p:0},mb:-12,children:"Money Market"}),e(O,{children:[e(h,{children:[r(o,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Total Value Locked"}),r(o,{fs:28,fw:700,color:"#F59E0B",style:{fontFamily:"Gazpacho, sans-serif"},children:"$12.6M"})]}),e(h,{children:[r(o,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Total Supplied"}),r(o,{fs:24,fw:700,color:"#22C55E",style:{fontFamily:"Gazpacho, sans-serif"},children:"$12.6M"})]}),e(h,{children:[r(o,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Total Borrowed"}),r(o,{fs:24,fw:700,color:"#F59E0B",style:{fontFamily:"Gazpacho, sans-serif"},children:"$7.5M"})]}),e(h,{children:[r(o,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Liquidations (24h)"}),r(o,{fs:24,fw:700,color:"#EF4444",style:{fontFamily:"Gazpacho, sans-serif"},children:"$45,230"})]})]}),r(u,{children:r(L,{title:"Supply / Borrow History"})}),e(u,{children:[r(y,{children:"Markets"}),e(R,{children:[r("thead",{children:e("tr",{children:[r("th",{children:"Asset"}),r("th",{children:"Total Supply"}),r("th",{children:"Total Borrow"}),r("th",{children:"Utilization"}),r("th",{children:"Supply APY"}),r("th",{children:"Borrow APY"})]})}),r("tbody",{children:j.map((t,a)=>e("tr",{children:[r("td",{children:e(W,{children:[r(C,{id:t.id,size:"small"}),r(o,{fw:500,children:t.asset})]})}),r("td",{children:t.supply}),r("td",{children:t.borrow}),r("td",{children:e("div",{style:{display:"flex",alignItems:"center",gap:8},children:[r(H,{$value:t.utilization}),e(o,{fs:12,children:[t.utilization,"%"]})]})}),r("td",{children:r(o,{color:"#4CAF50",children:t.supplyApy})}),r("td",{children:r(o,{color:"#FF9800",children:t.borrowApy})})]},a))})]})]})]})}export{K as component};

import{y as a,j as e,ba as f,W as s,R as b,F as g,bb as m,O as h,T as n,bc as x,X as y}from"./assets/index-DwF5AQa2.js";import{r as S}from"./chunk-Ca9K0fUM.js";import{q as k,C as v,X as D,Y as C,T,t as $}from"./chunk-TqV8ayKd.js";const w=f("div",{target:"eqzaar01"})({name:"1d3w5wq",styles:"width:100%"}),z=f("div",{target:"eqzaar00"})({name:"1lw1gk3",styles:"display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px"}),A=()=>{const t=[],o=new Date;for(let i=90;i>=0;i--){const l=new Date(o);l.setDate(l.getDate()-i);const c=2.5+(90-i)*.005+Math.random()*.2;t.push({date:l.toLocaleDateString("en-US",{month:"short",day:"numeric"}),value:c})}return t},F=A(),G=({title:t="Treasury Value",value:o="$2.85M"})=>{const[i,l]=S.useState("30D"),u=(()=>{const r=i==="7D"?7:i==="30D"?30:90;return F.slice(-r)})();return a(w,{children:[a(z,{children:[a("div",{children:[e(s,{fs:14,color:"rgba(255,255,255,0.6)",children:t}),e(s,{fs:28,fw:700,color:"#22C55E",style:{fontFamily:"Gazpacho, sans-serif"},children:o})]}),e(g,{gap:6,children:["7D","30D","MAX"].map(r=>e(b,{size:"small",variant:i===r?"secondary":"tertiary",outline:i!==r,onClick:()=>l(r),sx:{px:12,minWidth:42},children:r},r))})]}),e(m,{width:"100%",height:280,children:a(k,{data:u,margin:{top:10,right:0,left:0,bottom:0},children:[e("defs",{children:a("linearGradient",{id:"treasuryGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e("stop",{offset:"5%",stopColor:"#22C55E",stopOpacity:.6}),e("stop",{offset:"95%",stopColor:"#22C55E",stopOpacity:.1})]})}),e(v,{strokeDasharray:"3 3",stroke:"rgba(255,255,255,0.05)"}),e(D,{dataKey:"date",tick:{fill:"rgba(255,255,255,0.4)",fontSize:10},axisLine:{stroke:"rgba(255,255,255,0.1)"},tickLine:!1}),e(C,{tick:{fill:"rgba(255,255,255,0.4)",fontSize:10},axisLine:{stroke:"rgba(255,255,255,0.1)"},tickLine:!1,tickFormatter:r=>`$${r.toFixed(1)}M`}),e(T,{contentStyle:{background:"rgba(20, 20, 30, 0.95)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#fff"},formatter:r=>[`$${r.toFixed(2)}M`,"Treasury Value"]}),e($,{type:"monotone",dataKey:"value",stroke:"#22C55E",fill:"url(#treasuryGrad)",strokeWidth:2})]})})]})},M=n.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 0 24px 0;
`,p=n.section(({theme:t})=>y`
    background: ${t.surfaces.containers.high.primary};
    border: 1px solid ${t.details.borders};
    border-radius: 16px;
    padding: ${t.containers.paddings.secondary}px;
  `),V=n.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,d=n.div(({theme:t})=>y`
    background: ${t.surfaces.containers.high.accent};
    border: 1px solid ${t.details.borders};
    border-radius: 8px;
    padding: 16px;
  `),L=n.table`
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
`,E=n.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,B=[{id:"5",asset:"DOT",balance:"125,000",value:"$562,500",type:"Native"},{id:"0",asset:"HDX",balance:"50,000,000",value:"$615,000",type:"Native"},{id:"22",asset:"USDC",balance:"250,000",value:"$250,000",type:"Stablecoin"},{id:"10",asset:"USDT",balance:"150,000",value:"$150,000",type:"Stablecoin"},{id:"5",asset:"DOT Staked",balance:"50,000",value:"$225,000",type:"Staked"}];function j(){return a(M,{children:[e(h,{as:"h1",sx:{p:0},mb:-12,children:"Treasury"}),a(V,{children:[a(d,{children:[e(s,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Total Treasury Value"}),e(s,{fs:28,fw:700,color:"#22C55E",style:{fontFamily:"Gazpacho, sans-serif"},children:"$2,852,500"})]}),a(d,{children:[e(s,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"LP Positions Value"}),e(s,{fs:24,fw:700,style:{fontFamily:"Gazpacho, sans-serif"},children:"$1,200,000"})]}),a(d,{children:[e(s,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Staked Assets Value"}),e(s,{fs:24,fw:700,style:{fontFamily:"Gazpacho, sans-serif"},children:"$225,000"})]})]}),e(p,{children:e(G,{title:"Treasury Value History",value:"$2.85M"})}),a(p,{children:[e(h,{children:"Assets & Positions"}),a(L,{children:[e("thead",{children:a("tr",{children:[e("th",{children:"Asset"}),e("th",{children:"Type"}),e("th",{children:"Balance"}),e("th",{children:"Value"})]})}),e("tbody",{children:B.map((t,o)=>a("tr",{children:[e("td",{children:a(E,{children:[e(x,{id:t.id,size:"small"}),e(s,{fw:500,children:t.asset})]})}),e("td",{children:e(s,{color:"rgba(255,255,255,0.6)",children:t.type})}),e("td",{children:t.balance}),e("td",{children:e(s,{fw:500,children:t.value})})]},o))})]})]})]})}export{j as component};

import{y as a,j as e,ba as h,W as t,R as y,F as u,bb as x,O as d,T as l,X as f}from"./assets/index-DwF5AQa2.js";import{r as b}from"./chunk-Ca9K0fUM.js";import{q as S,C,X as $,Y as D,T as M,t as w}from"./chunk-TqV8ayKd.js";const v=h("div",{target:"e1634v8a1"})({name:"1d3w5wq",styles:"width:100%"}),F=h("div",{target:"e1634v8a0"})({name:"1lw1gk3",styles:"display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px"}),H=()=>{const r=[],c=new Date;for(let s=90;s>=0;s--){const i=new Date(c);i.setDate(i.getDate()-s);const g=5+(90-s)*.04+Math.random()*.5;r.push({date:i.toLocaleDateString("en-US",{month:"short",day:"numeric"}),supply:g})}return r},k=H(),B=({title:r="Hollar Supply",value:c="$8.5M"})=>{const[s,i]=b.useState("30D"),m=(()=>{const o=s==="7D"?7:s==="30D"?30:90;return k.slice(-o)})();return a(v,{children:[a(F,{children:[a("div",{children:[e(t,{fs:14,color:"rgba(255,255,255,0.6)",children:r}),e(t,{fs:28,fw:700,color:"#8B5CF6",style:{fontFamily:"Gazpacho, sans-serif"},children:c})]}),e(u,{gap:6,children:["7D","30D","MAX"].map(o=>e(y,{size:"small",variant:s===o?"secondary":"tertiary",outline:s!==o,onClick:()=>i(o),sx:{px:12,minWidth:42},children:o},o))})]}),e(x,{width:"100%",height:280,children:a(S,{data:m,margin:{top:10,right:0,left:0,bottom:0},children:[e("defs",{children:a("linearGradient",{id:"hollarGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[e("stop",{offset:"5%",stopColor:"#8B5CF6",stopOpacity:.6}),e("stop",{offset:"95%",stopColor:"#8B5CF6",stopOpacity:.1})]})}),e(C,{strokeDasharray:"3 3",stroke:"rgba(255,255,255,0.05)"}),e($,{dataKey:"date",tick:{fill:"rgba(255,255,255,0.4)",fontSize:10},axisLine:{stroke:"rgba(255,255,255,0.1)"},tickLine:!1}),e(D,{tick:{fill:"rgba(255,255,255,0.4)",fontSize:10},axisLine:{stroke:"rgba(255,255,255,0.1)"},tickLine:!1,tickFormatter:o=>`$${o.toFixed(0)}M`}),e(M,{contentStyle:{background:"rgba(20, 20, 30, 0.95)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#fff"},formatter:o=>[`$${o.toFixed(2)}M`,"Supply"]}),e(w,{type:"monotone",dataKey:"supply",stroke:"#8B5CF6",fill:"url(#hollarGrad)",strokeWidth:2})]})})]})},G=l.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 0 24px 0;
`,p=l.section(({theme:r})=>f`
    background: ${r.surfaces.containers.high.primary};
    border: 1px solid ${r.details.borders};
    border-radius: 16px;
    padding: ${r.containers.paddings.secondary}px;
  `),T=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`,n=l.div(({theme:r})=>f`
    background: ${r.surfaces.containers.high.accent};
    border: 1px solid ${r.details.borders};
    border-radius: 8px;
    padding: 16px;
  `),A=l.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,U=l.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,z=l.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 16px;
`,R=l.div`
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({$value:r})=>r}%;
    background: ${({$color:r})=>r};
    border-radius: 4px;
  }
`,j=[{asset:"HUSDT",value:"$2.1M",percentage:"25%",color:"#26A17B"},{asset:"HUSDC",value:"$1.8M",percentage:"27%",color:"#2775CA"},{asset:"HUSDe",value:"$1.5M",percentage:"29%",color:"#8B5CF6"},{asset:"HUSDs",value:"$1.2M",percentage:"19%",color:"#F4B731"}],L=[{asset:"HUSDT",current:"$1.2M",cap:"$2M",percentage:60,apy:"4.2%",color:"#26A17B"},{asset:"HUSDC",current:"$0.8M",cap:"$2M",percentage:40,apy:"3.8%",color:"#2775CA"},{asset:"HUSDe",current:"$0.6M",cap:"$1.5M",percentage:40,apy:"5.1%",color:"#8B5CF6"},{asset:"HUSDs",current:"$0.7M",cap:"$1.5M",percentage:47,apy:"4.5%",color:"#F4B731"}];function W(){return a(G,{children:[e(d,{as:"h1",sx:{p:0},mb:-12,children:"Hollar (HUSD)"}),a(T,{children:[a(n,{children:[e(t,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Total Hollar Supply"}),e(t,{fs:28,fw:700,color:"#8B5CF6",style:{fontFamily:"Gazpacho, sans-serif"},children:"$8.5M"})]}),a(n,{children:[e(t,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Total Borrowed"}),e(t,{fs:24,fw:700,style:{fontFamily:"Gazpacho, sans-serif"},children:"$5.2M"})]}),a(n,{children:[e(t,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Total from HSM"}),e(t,{fs:24,fw:700,style:{fontFamily:"Gazpacho, sans-serif"},children:"$3.3M"})]}),a(n,{children:[e(t,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginBottom:8},children:"Hollar Peg"}),e(t,{fs:24,fw:700,color:"#4CAF50",style:{fontFamily:"Gazpacho, sans-serif"},children:"$1.0001"})]})]}),e(p,{children:e(B,{title:"Hollar Supply History",value:"$8.5M"})}),a(p,{children:[e(d,{children:"Stablepool Reserves"}),e(A,{children:j.map(r=>a(n,{children:[e(t,{fs:14,fw:500,color:r.color,children:r.asset}),e(t,{fs:18,fw:600,style:{marginTop:8},children:r.value}),a(t,{fs:12,color:"rgba(255,255,255,0.5)",children:[r.percentage," of pool"]})]},r.asset))})]}),a(p,{children:[e(d,{children:"HSM Collateral Caps"}),e(U,{children:L.map(r=>a(z,{children:[a("div",{style:{display:"flex",justifyContent:"space-between"},children:[e(t,{fw:500,color:r.color,children:r.asset}),a(t,{fs:12,color:"rgba(255,255,255,0.5)",children:[r.current," / ",r.cap]})]}),e(R,{$value:r.percentage,$color:r.color}),a(t,{fs:12,color:"rgba(255,255,255,0.5)",style:{marginTop:4},children:["APY: ",r.apy]})]},r.asset))})]})]})}export{W as component};

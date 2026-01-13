import{r as m}from"./chunk-Ca9K0fUM.js";import{x as h,T as i,aq as d,cV as r,X as u,F as x,n as f,q as A,aS as E,aH as B,b_ as _,hG as y,y as o,j as a,N as c,W as l,R as S,w as T,E as k,bX as D,l as I,bc as R,c7 as $,hH as v,hI as G,hJ as j,hK as w,hL as L}from"./assets/index-DwF5AQa2.js";const q=()=>{const{reserves:e,loading:n}=h();return{data:m.useMemo(()=>e.filter(s=>s.isActive&&!s.isFrozen&&!s.isPaused),[e]),isLoading:n}},O="/assets/VendingMachine-DkaEBOTe.webp",P=i(x)(({theme:e})=>u`
    gap: 10px;
    flex-direction: column;

    overflow: hidden;

    padding: 18px;
    position: relative;

    border: 1px solid ${e.details.tooltips};
    border-radius: ${e.radii.xl}px;

    ${r("md")} {
      padding-block: 18px;
      padding-inline: 30px;
    }
  `),C=i.div(({theme:e})=>u`
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;

    z-index: -1;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(
        91.42% 82.21% at 93.32% 85.93%,
        ${d(e.surfaces.themeBasePalette.background,0)},
        ${e.surfaces.themeBasePalette.background} 81.85%
      );
    }

    ${r("md")} {
      &::after {
        background: linear-gradient(
            270deg,
            ${d(e.surfaces.themeBasePalette.background,0)} 25%,
            ${e.surfaces.themeBasePalette.background} 55%
          ),
          no-repeat;
      }
    }
  `),F=i.img`
  object-fit: cover;
  object-position: 70%;
  opacity: 0.6;

  ${r("md")} {
    object-position: top right;
  }
`,z=()=>{const{t:e}=f(["borrow"]),n=A(),{account:t}=E(),s=t?.address??"",{data:g,isSuccess:p}=B(_(n,s)),{mutate:b}=y(s);return!p||g?null:o(P,{children:[o(c,{maxWidth:["100%",null,"400px"],children:[a(l,{font:"primary",fw:700,mb:4,color:T("text.tint.primary"),children:e("binding.banner.title")}),a(l,{fs:"p5",children:e("binding.banner.description")})]}),a(c,{children:a(S,{onClick:()=>b(),children:e("binding.banner.cta")})}),a(C,{children:a(F,{src:O,loading:"lazy"})})]})},H={[L]:j,[w]:G},Q=({reserve:e,size:n,withName:t=!1})=>{const s=k(e)?D:I(e.underlyingAsset);return o(v,{children:[a(R,{id:H[s]??s,size:n}),a($,{size:n==="large"?"large":"medium",name:t?e.name:void 0,symbol:e.symbol})]})};export{z as A,Q as R,q as u};

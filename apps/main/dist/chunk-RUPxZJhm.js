import{ba as l,K as C,X as p,y as o,j as t,w as _,bd as j,W as E,n as D,ae as H,be as W,bf as k,bg as R,bh as z,bi as V,bj as q,bk as G,bl as K,bm as F,u as P,bn as Q,bo as v,bp as U,bq as X,br as J,bs as Y}from"./assets/index-DwF5AQa2.js";import{c as Z,d as ee,e as A,r as te,f as ne}from"./chunk-Ca9K0fUM.js";import{D as S,a as M,b as I,c as T,d as oe}from"./chunk-Bf5xMumY.js";import{S as ae}from"./chunk-BedCsdkt.js";import"./chunk-CP2L7v0M.js";import"./chunk-DeKub-VW.js";const se=l("nav",{target:"euzv97u4"})(({theme:e})=>p`
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: ${e.zIndices.header};

    width: 100%;
    height: 60px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: ${e.surfaces.containers.high.accent};
    border-top: 1px solid ${e.details.separators};
  `,""),r=l("div",{target:"euzv97u3"})({name:"b3big",styles:"display:flex;flex-direction:column;align-items:center;gap:5px;height:50px;padding:7px 17px 5px 17px;text-decoration:none;&:focus{outline:none;}"}),w=l(C,{target:"euzv97u2"})(({theme:e})=>p`
    color: ${e.icons.onSurface};
    width: 20px;
    height: 20px;

    *[data-status="active"] &,
    ${r}[data-state="open"] &,
    ${r}:hover & {
      color: ${e.controls.solid.activeHover};
    }
  `,""),y=l("span",{target:"euzv97u1"})(({theme:e})=>p`
    font-family: ${e.fontFamilies1.secondary};
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;

    color: ${e.text.low};

    white-space: nowrap;

    *[data-status="active"] &,
    ${r}[data-state="open"] &,
    ${r}:hover & {
      color: ${e.textButtons.small.hover};
    }
  `,""),re=l("div",{target:"euzv97u0"})(({theme:e})=>p`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;

    padding: ${e.scales.paddings.m}px
      ${e.containers.paddings.tertiary}px;

    cursor: pointer;

    & svg {
      height: 20px;
      width: 20px;

      color: ${e.icons.onSurface};
    }

    &:active svg,
    &:focus svg,
    &:hover svg {
      color: ${e.controls.solid.activeHover};
    }
  `,""),$=({icon:e,label:n,onClick:i})=>o(re,{onClick:i,children:[t(C,{component:e}),t(E,{fw:600,fs:13,lh:j(18),color:_("text.high"),children:n})]}),ie=({onOpenDrawer:e})=>{const{t:n}=D();return o(W,{gap:4,sx:{gridTemplateColumns:"1fr auto 1fr"},children:[t($,{icon:Z,label:n("settings"),onClick:()=>e(O.Settings)}),t(H,{orientation:"vertical"}),t($,{icon:ee,label:n("docs")})]})},B=({item:e,...n})=>{const i=k(),{key:b,icon:d,to:u}=e,{title:g,description:s}=i[b]??{};return o(R,{as:z,to:u,...n,children:[t(V,{component:d??A}),t(q,{children:g}),s&&t(G,{children:s}),t(K,{})]})},ce=["/liquidity/$id"],le=()=>{const e=F();return!ce.some(n=>e({to:n,fuzzy:!0}))};var O=(e=>(e.Settings="Settings",e))(O||{});const me=()=>{const{t:e}=D(),n=k(),{isMobile:i}=P(),b=le(),[d,u]=te.useState(null),g=()=>u(null),s=i?U:X,m=Q.toSorted((a,h)=>v.indexOf(a.key)-v.indexOf(h.key)),x=m.slice(s);return b?o(se,{children:[m.slice(0,s).map(({key:a,icon:h,to:N,children:c},L)=>o(S,{modal:!1,children:[t(M,{asChild:!0,children:o(r,{as:z,to:N,tabIndex:L+1,onClick:c&&c.length>1?J:void 0,children:[t(w,{component:h??A}),t(y,{children:n[a]?.title})]})}),c&&c.length>1&&t(T,{fullWidth:!0,animation:"slide-bottom",children:c.map(f=>t(I,{asChild:!0,children:t(B,{item:f})},f.key))})]},a)),x.length>0&&o(S,{modal:!1,children:[t(M,{asChild:!0,children:o(r,{sx:{cursor:"pointer"},tabIndex:s+1,children:[t(w,{component:ne}),t(y,{children:e("more")})]})}),!d&&o(T,{fullWidth:!0,animation:"slide-bottom",children:[t(ie,{onOpenDrawer:u}),t(oe,{}),x.map(a=>t(I,{asChild:!0,children:t(B,{item:a})},a.key))]})]}),t(Y,{open:d==="Settings",onOpenChange:g,children:t(ae,{})})]}):null};export{me as MobileTabBar,O as MobileTabBarDrawer};

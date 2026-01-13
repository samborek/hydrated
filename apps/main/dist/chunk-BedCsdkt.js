import{n as d,y as a,j as e,bi as i,bj as r,bk as l,bl as m,bg as S,k as M,hM as f,bc as x,ek as I,al as C,T as y,cV as b,hN as k,X as P,aA as T,hO as $,hP as B,b5 as O,hQ as D,hR as j,aS as v,cq as w,cr as F,cp as u,hS as _,e2 as q,hr as L,d6 as R,K as V,hl as z,hn as E}from"./assets/index-DwF5AQa2.js";import{I as K,r as c,J as N,K as G,L as H,c as J}from"./chunk-Ca9K0fUM.js";const Q=({onClick:t})=>{const{t:n}=d();return a(S,{onClick:t,children:[e(i,{component:K}),e(r,{children:n("contacts")}),e(l,{children:n("contacts.description")}),e(m,{})]})},X=({onClick:t})=>{const{t:n}=d(),{getAsset:s}=M(),{data:o,isLoading:A}=f(),h=s(o?.toString()??"");return a(S,{onClick:t,children:[!A&&h?a(c.Fragment,{children:[e(i,{sx:{width:"auto"},component:()=>e(x,{id:h.id})}),e(r,{children:n("paymentAsset")}),e(l,{children:h.symbol})]}):a(c.Fragment,{children:[e(i,{component:I}),e(r,{children:n("paymentAsset")}),e(l,{children:e(C,{width:50})})]}),e(m,{})]})},U=y.div(({theme:t})=>P`
    display: flex;
    flex-direction: column;
    gap: ${t.scales.paddings.s}px;

    padding: ${t.buttons.paddings.tertiary}px
      ${t.containers.paddings.quart}px;

    ${b(k)} {
      gap: 4px;

      padding: ${t.containers.paddings.quart}px
        ${t.containers.paddings.tertiary}px;
    }
  `),p=y.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=t=>{switch(t){case"light":return H;case"dark":return G;case"system":return N}},W=["light","dark","system"],Y=()=>{const{t}=d(),{themePreference:n,setThemePreference:s}=T();return a(j,{children:[e(i,{component:g(n)}),e(r,{children:t("theme.title")}),e(l,{children:t("theme.description",{theme:t(`theme.${n}`)})}),e(D,{children:e($,{type:"single",size:"small",value:n,onValueChange:o=>s(o),children:W.map(o=>e(B,{value:o,children:e(O,{text:t(`theme.${o}`),side:"top",sideOffset:10,asChild:!0,children:c.createElement(g(o))})},o))})})]})},Z=({onPaymentAssetClick:t,onContactsClick:n})=>{const{isConnected:s}=v();return e(F,{sx:{padding:0},children:a(U,{children:[a(p,{children:[s&&e(X,{onClick:t}),e(Q,{onClick:n})]}),e(w,{}),e(p,{children:e(Y,{})})]})})},ee=()=>{const{t}=d(),[n,s]=c.useState("Default");switch(n){case"PaymentAsset":return a(c.Fragment,{children:[e(u,{title:t("paymentAsset"),align:"center",onBack:()=>s("Default")}),e(q,{searchInputVariant:"standalone",onSubmitted:()=>s("Default")})]});case"Contacts":return e(_,{align:"center",header:e(u,{title:t("contacts"),align:"center",onBack:()=>s("Default")})});default:return a(c.Fragment,{children:[e(u,{title:t("settings"),align:"center"}),e(Z,{onPaymentAssetClick:()=>s("PaymentAsset"),onContactsClick:()=>s("Contacts")})]})}},te=()=>a(L,{children:[e(z,{asChild:!0,children:e(R,{children:e(V,{component:J,size:20})})}),e(E,{children:e(ee,{})})]}),ae=Object.freeze(Object.defineProperty({__proto__:null,Settings:te},Symbol.toStringTag,{value:"Module"}));export{ee as S,ae as a};

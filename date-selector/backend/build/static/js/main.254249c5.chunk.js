(this["webpackJsonpdate-selector"]=this["webpackJsonpdate-selector"]||[]).push([[0],{139:function(e,t,n){},528:function(e,t,n){"use strict";n.r(t);var a,c,s,r,l,o=n(133),i=n(0),j=n(81),d=n.n(j),u=n(26),b=n(204),h=n(529),m=n(536),O=n(530),v=n(531),x=n(532),p=n(533),f=n(534),g=n(535),N=(n(139),n(140),n(4)),S=function(e){var t=e.month,n=e.setMonth;return Object(N.jsxs)("div",{className:"header row flex-middle",children:[Object(N.jsx)("div",{className:"col col-start",children:Object(N.jsx)("div",{className:"icon",onClick:function(){n(h.a(t,1))},children:"chevron_left"})}),Object(N.jsx)("div",{className:"col col-center",children:Object(N.jsx)("span",{children:m.a(t,"MMMM YYYYY")})}),Object(N.jsx)("div",{className:"col col-end",onClick:function(){n(b.a(t,1))},children:Object(N.jsx)("div",{className:"icon",children:"chevron_right"})})]})},w=function(e){var t=e.month,n=O.a(t),a=Array.from(Array(7)).map((function(e,t){return Object(N.jsx)("div",{className:"col col-center",children:m.a(v.a(n,t),"EEEEEE")},t)}));return Object(N.jsx)("div",{className:"days row",children:a})},y=function(e){for(var t=e.month,n=x.a(t),a=p.a(n),c=O.a(n),s=f.a(a),r=[],l=[],o=c,i="";o<=s;){for(var j=0;j<7;j++){i=m.a(o,"d");var d=o;l.push(Object(N.jsx)(k,{formattedDate:i,day:d,monthStart:n})),o=v.a(o,1)}r.push(Object(N.jsx)("div",{className:"row",children:l},o)),l=[]}return Object(N.jsx)("div",{className:"body",children:r})},k=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart,c=Object(i.useState)(!1),s=Object(u.a)(c,2),r=s[0],l=s[1],o=function(e){l(!r)};return r?Object(N.jsxs)("div",{className:"col cell clicked",onClick:function(){return o()},children:[Object(N.jsx)("span",{className:"number",children:t}),Object(N.jsx)("span",{className:"bg",children:t})]},n):Object(N.jsxs)("div",{className:"col cell ".concat(g.a(n,a)?"":"disabled"),onClick:function(){return o()},children:[Object(N.jsx)("span",{className:"number",children:t}),Object(N.jsx)("span",{className:"bg",children:t})]},n)},C=function(){var e=Object(i.useState)(new Date),t=Object(u.a)(e,2),n=t[0],a=t[1];return Object(N.jsxs)("div",{className:"calendar",children:[Object(N.jsx)(S,{month:n,setMonth:a}),Object(N.jsx)(w,{month:n}),Object(N.jsx)(y,{month:n})]})},E=n(107),M=n(18),D=n(53),Y=Object(M.gql)(a||(a=Object(D.a)(["\nmutation login($username: String!, $password: String!){\n  login(username: $username, password: $password){value}\n}"]))),$=Object(M.gql)(c||(c=Object(D.a)(["\nmutation addEvent($name: String! $group: String! $dates: [String!]!){\n  addEvent(name: $name, group: $group dates: $dates){name}\n}"]))),q=(Object(M.gql)(s||(s=Object(D.a)(["\nquery{\n  me{\n    name\n  }\n}"]))),Object(M.gql)(r||(r=Object(D.a)(["\nquery{\n  allEvents{\n    name\n  }\n}"]))),Object(M.gql)(l||(l=Object(D.a)(["\nquery{\n  userGroups{name}\n}"])))),A=n(210),B=function(e){var t=e.month,n=e.setMonth;return Object(N.jsxs)("div",{className:"header row flex-middle",children:[Object(N.jsx)("div",{className:"col col-start",children:Object(N.jsx)("div",{className:"icon",onClick:function(){n(h.a(t,1))},children:"chevron_left"})}),Object(N.jsx)("div",{className:"col col-center",children:Object(N.jsx)("span",{children:m.a(t,"MMMM YYYYY")})}),Object(N.jsx)("div",{className:"col col-end",onClick:function(){n(b.a(t,1))},children:Object(N.jsx)("div",{className:"icon",children:"chevron_right"})})]})},I=function(e){var t=e.month,n=O.a(t),a=Array.from(Array(7)).map((function(e,t){return Object(N.jsx)("div",{className:"col col-center",children:m.a(v.a(n,t),"EEEEEE")},t)}));return Object(N.jsx)("div",{className:"days row",children:a})},_=function(e){for(var t=e.month,n=e.setDates,a=e.dates,c=x.a(t),s=p.a(c),r=O.a(c),l=f.a(s),o=[],i=[],j=r,d="";j<=l;){for(var u=0;u<7;u++){d=m.a(j,"d");var b=j;i.push(Object(N.jsx)(L,{formattedDate:d,day:b,monthStart:c,setDates:n,dates:a})),j=v.a(j,1)}o.push(Object(N.jsx)("div",{className:"row",children:i},j)),i=[]}return Object(N.jsx)("div",{className:"body",children:o})},L=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart,c=e.setDates,s=e.dates,r=Object(i.useState)(!1),l=Object(u.a)(r,2),o=l[0],j=l[1],d=function(e){j(!o),c(s.concat(e.toString()))};return o?Object(N.jsxs)("div",{className:"col cell clicked",onClick:function(){return d(n)},children:[Object(N.jsx)("span",{className:"number",children:t}),Object(N.jsx)("span",{className:"bg",children:t})]},n):Object(N.jsxs)("div",{className:"col cell ".concat(g.a(n,a)?"":"disabled"),onClick:function(){return d(n)},children:[Object(N.jsx)("span",{className:"number",children:t}),Object(N.jsx)("span",{className:"bg",children:t})]},n)},F=function(e){var t=e.setDates,n=e.dates,a=Object(i.useState)(new Date),c=Object(u.a)(a,2),s=c[0],r=c[1];return Object(N.jsxs)("div",{className:"calendar",children:[Object(N.jsx)(B,{month:s,setMonth:r}),Object(N.jsx)(I,{month:s}),Object(N.jsx)(_,{month:s,setDates:t,dates:n})]})},G=function(){var e=Object(i.useState)([]),t=Object(u.a)(e,2),n=t[0],a=t[1],c=Object(i.useState)(null),s=Object(u.a)(c,2),r=s[0],l=s[1],o=Object(M.useQuery)(q),j=[];o.data&&(j=o.data.userGroups.map((function(e){return{value:e.name,label:e.name}})));var d=Object(M.useMutation)($),b=Object(u.a)(d,1)[0];return Object(N.jsxs)("div",{children:[Object(N.jsx)("h1",{children:"New Event"}),Object(N.jsx)(E.a,{initialValues:{name:""},onSubmit:function(e,t){var a=e.name,c=t.resetForm;b({variables:{name:a,group:r,dates:n}}),c({})},children:function(e){var t=e.values,n=(e.errors,e.touched,e.handleChange),a=e.handleBlur,c=e.handleSubmit;return Object(N.jsxs)("form",{onSubmit:c,children:["event name: ",Object(N.jsx)("input",{type:"text",name:"name",onChange:n,onBlur:a,value:t.name}),Object(N.jsx)("button",{type:"submit",children:"Submit"})]})}}),Object(N.jsx)(A.a,{options:j,onChange:function(e){l(e.value)}}),Object(N.jsx)("h2",{children:"Choose possible days"}),Object(N.jsx)(F,{dates:n,setDates:a})]})},J=function(e){var t=e.setToken,n=Object(M.useMutation)(Y),a=Object(u.a)(n,2),c=a[0],s=a[1];return Object(i.useEffect)((function(){if(s.data){var e=s.data.login.value;t(e),localStorage.setItem("user-token",e)}}),[s.data]),Object(N.jsxs)("div",{children:[Object(N.jsx)("h1",{children:"Login"}),Object(N.jsx)(E.a,{initialValues:{username:"",password:""},onSubmit:function(e,t){var n=e.username,a=e.password,s=t.resetForm;c({variables:{username:n,password:a}}),s({values:{username:"",password:""}})},children:function(e){var t=e.values,n=(e.errors,e.touched,e.handleChange),a=e.handleBlur,c=e.handleSubmit;return Object(N.jsxs)("form",{onSubmit:c,children:["username: ",Object(N.jsx)("input",{type:"text",name:"username",onChange:n,onBlur:a,value:t.username}),Object(N.jsx)("br",{}),"password: ",Object(N.jsx)("input",{type:"password",name:"password",onChange:n,onBlur:a,value:t.password}),Object(N.jsx)("br",{}),Object(N.jsx)("button",{type:"submit",children:"Submit"})]})}})]})},T=n(135),V=n(15),z=n(211),H=function(){var e=Object(i.useState)(localStorage.getItem("user-token")),t=Object(u.a)(e,2),n=t[0],a=t[1],c=Object(M.useApolloClient)();return n?Object(N.jsx)(T.a,{children:Object(N.jsxs)(V.c,{children:[Object(N.jsx)(V.a,{path:"/addevent",children:Object(N.jsx)(G,{})}),Object(N.jsxs)(V.a,{path:"/",children:[Object(N.jsx)(C,{}),Object(N.jsx)(z.a,{children:Object(N.jsx)(T.b,{to:"/addevent",children:"add event"})}),Object(N.jsx)("button",{onClick:function(){a(null),localStorage.clear(),c.resetStore()},children:"Log Out"})]})]})}):Object(N.jsx)(J,{setToken:a})},P=n(212),Q=Object(P.a)((function(e,t){var n=t.headers,a=localStorage.getItem("user-token");return{headers:Object(o.a)(Object(o.a)({},n),{},{authorization:a?"bearer ".concat(a):null})}})),K=new M.HttpLink({uri:"/graphql"}),R=new M.ApolloClient({cache:new M.InMemoryCache,link:Q.concat(K)});d.a.render(Object(N.jsx)(M.ApolloProvider,{client:R,children:Object(N.jsx)(H,{})}),document.getElementById("root"))}},[[528,1,2]]]);
//# sourceMappingURL=main.254249c5.chunk.js.map
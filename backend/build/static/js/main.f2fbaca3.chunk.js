(this["webpackJsonpdate-selector"]=this["webpackJsonpdate-selector"]||[]).push([[0],{129:function(e,t,n){"use strict";n.r(t);var a,c,s,r,i,o,l,j,d=n(45),u=n(0),b=n(48),m=n.n(b),O=n(16),h=n(44),x=n(12),v=n(30),p=Object(x.gql)(a||(a=Object(v.a)(["\nmutation login($username: String!, $password: String!){\n  login(username: $username, password: $password){value}\n}"]))),f=Object(x.gql)(c||(c=Object(v.a)(["\nmutation addEvent($name: String! $group: String! $dates: [String!]!){\n  addEvent(name: $name, group: $group dates: $dates){name}\n}"]))),g=Object(x.gql)(s||(s=Object(v.a)(["\nmutation createUser($name: String! $username: String! $password: String!){\n  createUser(name: $name, username: $username, password: $password)\n}"]))),N=n(29),w=n(3),y=function(e){var t=e.setToken,n=Object(x.useMutation)(p,{onError:function(e){console.log(e)}}),a=Object(O.a)(n,2),c=a[0],s=a[1];return Object(u.useEffect)((function(){if(s.data){var e=s.data.login.value;t(e),localStorage.setItem("user-token",e)}}),[s.data,t]),Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"Login"}),Object(w.jsx)(h.a,{initialValues:{username:"",password:""},onSubmit:function(e,t){var n=e.username,a=e.password,s=t.resetForm;c({variables:{username:n,password:a}}),s({values:{username:"",password:""}})},children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,c=e.handleSubmit;return Object(w.jsxs)("form",{onSubmit:c,children:["username: ",Object(w.jsx)("input",{id:"username",type:"text",name:"username",onChange:n,onBlur:a,value:t.username}),Object(w.jsx)("br",{}),"password: ",Object(w.jsx)("input",{id:"password",type:"password",name:"password",onChange:n,onBlur:a,value:t.password}),Object(w.jsx)("br",{}),Object(w.jsx)("button",{type:"submit",id:"login-button",children:"Login"})]})}}),Object(w.jsx)("h2",{children:"Not yet signed in?"}),Object(w.jsx)("button",{children:Object(w.jsx)(N.b,{to:"SignIn",children:"Sign In"})})]})},S=n(100),E=(Object(x.gql)(r||(r=Object(v.a)(["\nquery{\n  me{\n    name\n  }\n}"]))),Object(x.gql)(i||(i=Object(v.a)(["\nquery{\n  allEvents{\n    name\n  }\n}"]))),Object(x.gql)(o||(o=Object(v.a)(["\nquery{\n  userGroups{name}\n}"])))),k=Object(x.gql)(l||(l=Object(v.a)(["\nquery{\n  userEvents{\n    name\n    id\n  }\n}"]))),C=Object(x.gql)(j||(j=Object(v.a)(["\nquery event($id: ID!){\n  event(id: $id){\n    name\n    id\n    dates\n  }\n}"]))),M=n(96),D=n(130),$=n(137),q=n(131),Y=n(132),I=n(133),B=n(134),A=n(135),T=n(136),_=(n(69),function(e){var t=e.month,n=e.setMonth;return Object(w.jsxs)("div",{className:"header row flex-middle",children:[Object(w.jsx)("div",{className:"col col-start",children:Object(w.jsx)("div",{className:"icon",onClick:function(){n(D.a(t,1))},children:"chevron_left"})}),Object(w.jsx)("div",{className:"col col-center",children:Object(w.jsx)("span",{children:$.a(t,"MMMM YYYYY")})}),Object(w.jsx)("div",{className:"col col-end",onClick:function(){n(M.a(t,1))},children:Object(w.jsx)("div",{className:"icon",children:"chevron_right"})})]})}),L=function(e){var t=e.month,n=q.a(t),a=Array.from(Array(7)).map((function(e,t){return Object(w.jsx)("div",{className:"col col-center",children:$.a(Y.a(n,t),"EEEEEE")},t)}));return Object(w.jsx)("div",{className:"days row",children:a})},Q=function(e){for(var t=e.month,n=I.a(t),a=B.a(n),c=q.a(n),s=A.a(a),r=[],i=[],o=c,l="";o<=s;){for(var j=0;j<7;j++){l=$.a(o,"d");var d=o;i.push(Object(w.jsx)(F,{formattedDate:l,day:d,monthStart:n})),o=Y.a(o,1)}r.push(Object(w.jsx)("div",{className:"row",children:i},o)),i=[]}return Object(w.jsx)("div",{className:"body",children:r})},F=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart,c=Object(u.useState)(!1),s=Object(O.a)(c,2),r=s[0],i=s[1],o=function(){i(!r)};return r?Object(w.jsxs)("div",{className:"col cell clicked",onClick:function(){return o()},children:[Object(w.jsx)("span",{className:"number",children:t}),Object(w.jsx)("span",{className:"bg",children:t})]},n):Object(w.jsxs)("div",{className:"col cell ".concat(T.a(n,a)?"":"disabled"),onClick:function(){return o()},children:[Object(w.jsx)("span",{className:"number",children:t}),Object(w.jsx)("span",{className:"bg",children:t})]},n)},V=function(){var e=Object(u.useState)(new Date),t=Object(O.a)(e,2),n=t[0],a=t[1];return Object(w.jsxs)("div",{className:"calendar",children:[Object(w.jsx)(_,{month:n,setMonth:a}),Object(w.jsx)(L,{month:n}),Object(w.jsx)(Q,{month:n})]})},z=n(53),G=n(99),H=function(e){var t=e.month,n=e.setMonth;return Object(w.jsxs)("div",{className:"header row flex-middle",children:[Object(w.jsx)("div",{className:"col col-start",children:Object(w.jsx)("div",{className:"icon",onClick:function(){n(D.a(t,1))},children:"chevron_left"})}),Object(w.jsx)("div",{className:"col col-center",children:Object(w.jsx)("span",{children:$.a(t,"MMMM YYYYY")})}),Object(w.jsx)("div",{className:"col col-end",onClick:function(){n(M.a(t,1))},children:Object(w.jsx)("div",{className:"icon",children:"chevron_right"})})]})},J=function(e){var t=e.month,n=q.a(t),a=Array.from(Array(7)).map((function(e,t){return Object(w.jsx)("div",{className:"col col-center",children:$.a(Y.a(n,t),"EEEEEE")},t)}));return Object(w.jsx)("div",{className:"days row",children:a})},P=function(e){for(var t=e.month,n=e.setDates,a=e.dates,c=I.a(t),s=B.a(c),r=q.a(c),i=A.a(s),o=[],l=[],j=r,d="";j<=i;){for(var u=0;u<7;u++){d=$.a(j,"d");var b=j;l.push(Object(w.jsx)(U,{formattedDate:d,day:b,monthStart:c,setDates:n,dates:a})),j=Y.a(j,1)}o.push(Object(w.jsx)("div",{className:"row",children:l},j)),l=[]}return Object(w.jsx)("div",{className:"body",children:o})},U=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart,c=e.setDates,s=e.dates,r=Object(u.useState)(!1),i=Object(O.a)(r,2),o=i[0],l=i[1],j=function(e){l(!o),c(s.concat($.a(e,"DDD")))};return o?Object(w.jsxs)("div",{className:"col cell clicked",onClick:function(){return j(n)},children:[Object(w.jsx)("span",{className:"number",children:t}),Object(w.jsx)("span",{className:"bg",children:t})]},n):Object(w.jsxs)("div",{className:"col cell ".concat(T.a(n,a)?"":"disabled"),onClick:function(){return j(n)},children:[Object(w.jsx)("span",{className:"number",children:t}),Object(w.jsx)("span",{className:"bg",children:t})]},n)},K=function(e){var t=e.setDates,n=e.dates,a=Object(u.useState)(new Date),c=Object(O.a)(a,2),s=c[0],r=c[1];return Object(w.jsxs)("div",{className:"calendar",children:[Object(w.jsx)(H,{month:s,setMonth:r}),Object(w.jsx)(J,{month:s}),Object(w.jsx)(P,{month:s,setDates:t,dates:n})]})},R=function(){var e=Object(u.useState)([]),t=Object(O.a)(e,2),n=t[0],a=t[1],c=Object(u.useState)(null),s=Object(O.a)(c,2),r=s[0],i=s[1],o=Object(x.useQuery)(E),l=[];o.data&&(l=o.data.userGroups.map((function(e){return{value:e.name,label:e.name}})));var j=Object(x.useMutation)(f,{update:function(e,t){var n=e.readQuery({query:k});e.writeQuery({query:k,data:Object(d.a)(Object(d.a)({},n),{},{userEvents:[].concat(Object(z.a)(n.userEvents),[t.data.addEvent])})})}}),b=Object(O.a)(j,1)[0];return Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"New Event"}),Object(w.jsx)(h.a,{initialValues:{name:""},onSubmit:function(e,t){var a=e.name,c=t.resetForm;b({variables:{name:a,group:r,dates:n}}),c({})},children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,c=e.handleSubmit;return Object(w.jsxs)("form",{onSubmit:c,children:["event name: ",Object(w.jsx)("input",{id:"name",type:"text",name:"name",onChange:n,onBlur:a,value:t.name}),Object(w.jsx)("button",{id:"submit-button",type:"submit",children:"Submit"})]})}}),Object(w.jsx)(G.a,{id:"group-options",options:l,onChange:function(e){i(e.value)}}),Object(w.jsx)("h2",{children:"Choose possible days"}),Object(w.jsx)(K,{dates:n,setDates:a}),Object(w.jsxs)("button",{id:"homepage-button",children:[" ",Object(w.jsx)(N.b,{to:"/",children:"Home Page"})]})]})},W=function(e){var t=e.events.map((function(e){return Object(w.jsx)("li",{children:Object(w.jsx)(N.b,{to:"/events/".concat(e.id),children:e.name})},e.id)}));return Object(w.jsx)("div",{children:Object(w.jsx)("ul",{children:t})})},X=n(15),Z=function(e){var t=e.month,n=e.setMonth;return Object(w.jsxs)("div",{className:"header row flex-middle",children:[Object(w.jsx)("div",{className:"col col-start",children:Object(w.jsx)("div",{className:"icon",onClick:function(){n(D.a(t,1))},children:"chevron_left"})}),Object(w.jsx)("div",{className:"col col-center",children:Object(w.jsx)("span",{children:$.a(t,"MMMM YYYYY")})}),Object(w.jsx)("div",{className:"col col-end",onClick:function(){n(M.a(t,1))},children:Object(w.jsx)("div",{className:"icon",children:"chevron_right"})})]})},ee=function(e){var t=e.month,n=q.a(t),a=Array.from(Array(7)).map((function(e,t){return Object(w.jsx)("div",{className:"col col-center",children:$.a(Y.a(n,t),"EEEEEE")},t)}));return Object(w.jsx)("div",{className:"days row",children:a})},te=function(e){for(var t=e.month,n=e.dates,a=I.a(t),c=B.a(a),s=q.a(a),r=A.a(c),i=[],o=[],l=s,j="";l<=r;){for(var d=0;d<7;d++){j=$.a(l,"d");var u=l;o.push(Object(w.jsx)(ne,{formattedDate:j,day:u,monthStart:a,dates:n})),l=Y.a(l,1)}i.push(Object(w.jsx)("div",{className:"row",children:o},l)),o=[]}return Object(w.jsx)("div",{className:"body",children:i})},ne=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart;return e.dates.includes($.a(n,"DDD"))?Object(w.jsxs)("div",{className:"col cell clicked",children:[Object(w.jsx)("span",{className:"number",children:t}),Object(w.jsx)("span",{className:"bg",children:t})]},n):Object(w.jsxs)("div",{className:"col cell ".concat(T.a(n,a)?"":"disabled"),children:[Object(w.jsx)("span",{className:"number",children:t}),Object(w.jsx)("span",{className:"bg",children:t})]},n)},ae=function(e){var t=e.dates,n=Object(u.useState)(new Date),a=Object(O.a)(n,2),c=a[0],s=a[1];return Object(w.jsxs)("div",{className:"calendar",children:[Object(w.jsx)(Z,{month:c,setMonth:s}),Object(w.jsx)(ee,{month:c}),Object(w.jsx)(te,{month:c,dates:t}),Object(w.jsx)("ul",{children:t})]})},ce=function(){var e=Object(X.f)().id,t=Object(x.useQuery)(C,{variables:{id:e}});return t.data?Object(w.jsxs)("div",{children:[t.data.event.name,Object(w.jsx)(ae,{dates:t.data.event.dates})]}):Object(w.jsx)("div",{children:"...loading"})},se=function(e){var t=e.setToken,n=Object(x.useApolloClient)(),a=Object(x.useLazyQuery)(k),c=Object(O.a)(a,2),s=c[0],r=c[1];return Object(u.useEffect)((function(){s()}),[]),Object(w.jsx)(N.a,{children:Object(w.jsxs)(X.c,{children:[Object(w.jsx)(X.a,{path:"/events/:id",children:Object(w.jsx)(ce,{})}),Object(w.jsx)(X.a,{path:"/addevent",children:Object(w.jsx)(R,{})}),Object(w.jsxs)(X.a,{path:"/",children:[Object(w.jsx)(V,{}),r.data?Object(w.jsx)(W,{events:r.data.userEvents}):null,Object(w.jsx)(S.a,{id:"addEvent-button",children:Object(w.jsx)(N.b,{to:"/addevent",children:"add event"})}),Object(w.jsx)("button",{id:"logout-button",onClick:function(){t(null),localStorage.clear(),n.resetStore()},children:"Log Out"})]})]})})},re=n(75),ie=n.n(re),oe=n(97),le=function(e){var t=e.setToken,n=Object(x.useMutation)(p,{onError:function(e){console.log(e)}}),a=Object(O.a)(n,2),c=a[0],s=a[1],r=Object(x.useMutation)(g),i=Object(O.a)(r,1)[0];return Object(u.useEffect)((function(){if(s.data){var e=s.data.login.value;t(e),localStorage.setItem("user-token",e)}}),[s.data,t]),Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"Sign In"}),Object(w.jsx)(h.a,{initialValues:{username:"",password:"",name:""},onSubmit:function(){var e=Object(oe.a)(ie.a.mark((function e(t,n){var a,s,r,o;return ie.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.username,s=t.name,r=t.password,o=n.resetForm,e.next=4,i({variables:{username:a,name:s,password:r}});case 4:c({variables:{username:a,password:r}}),o({values:{username:"",password:"",name:""}});case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,c=e.handleSubmit;return Object(w.jsxs)("form",{onSubmit:c,children:["username: ",Object(w.jsx)("input",{id:"username",type:"text",name:"username",onChange:n,onBlur:a,value:t.username}),Object(w.jsx)("br",{}),"name: ",Object(w.jsx)("input",{id:"name",type:"text",name:"name",onChange:n,onBlur:a,value:t.name}),Object(w.jsx)("br",{}),"password: ",Object(w.jsx)("input",{id:"password",type:"password",name:"password",onChange:n,onBlur:a,value:t.password}),Object(w.jsx)("br",{}),Object(w.jsx)("button",{type:"submit",id:"login-button",children:"Sign In"})]})}})]})},je=function(){var e=Object(u.useState)(localStorage.getItem("user-token")),t=Object(O.a)(e,2),n=t[0],a=t[1];return n?Object(w.jsx)(se,{setToken:a}):Object(w.jsx)(N.a,{children:Object(w.jsxs)(X.c,{children:[Object(w.jsx)(X.a,{path:"/SignIn",children:Object(w.jsx)(le,{setToken:a})}),Object(w.jsx)(X.a,{path:"/",children:Object(w.jsx)(y,{setToken:a})})]})})},de=n(101),ue=Object(de.a)((function(e,t){var n=t.headers,a=localStorage.getItem("user-token");return{headers:Object(d.a)(Object(d.a)({},n),{},{authorization:a?"bearer ".concat(a):null})}})),be=new x.HttpLink({uri:"/graphql"}),me=new x.ApolloClient({cache:new x.InMemoryCache,link:ue.concat(be)});m.a.render(Object(w.jsx)(x.ApolloProvider,{client:me,children:Object(w.jsx)(je,{})}),document.getElementById("root"))},69:function(e,t,n){}},[[129,1,2]]]);
//# sourceMappingURL=main.f2fbaca3.chunk.js.map
(this["webpackJsonpdate-selector"]=this["webpackJsonpdate-selector"]||[]).push([[0],{129:function(e,t,n){"use strict";n.r(t);var a,s,r,c,o,i,u,l,j,d,b,O,m,h,v,x,p=n(47),g=n(0),f=n(50),y=n.n(f),w=n(14),N=n(20),S=n.n(N),D=n(34),E=n(44),$=n(12),q=n(1),C=function(e){var t=e.login;return Object(q.jsxs)("div",{children:[Object(q.jsx)("h1",{children:"Login"}),Object(q.jsx)(E.a,{initialValues:{username:"",password:""},onSubmit:function(){var e=Object(D.a)(S.a.mark((function e(n,a){var s,r,c;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=n.username,r=n.password,c=a.resetForm,e.next=4,t({username:s,password:r});case 4:c({values:{username:"",password:""}});case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,s=e.handleSubmit;return Object(q.jsxs)("form",{onSubmit:s,children:["username: ",Object(q.jsx)("input",{id:"username",type:"text",name:"username",onChange:n,onBlur:a,value:t.username}),Object(q.jsx)("br",{}),"password: ",Object(q.jsx)("input",{id:"password",type:"password",name:"password",onChange:n,onBlur:a,value:t.password}),Object(q.jsx)("br",{}),Object(q.jsx)("button",{type:"submit",id:"login-button",children:"Login"})]})}}),Object(q.jsx)("h2",{children:"Not yet signed in?"}),Object(q.jsx)("button",{id:"signIn-button",children:Object(q.jsx)($.b,{to:"SignIn",children:"Sign In"})})]})},k=function(e){var t=e.login,n=e.signIn,a=function(){var e=Object(D.a)(S.a.mark((function e(a,s){var r,c,o,i;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.username,c=a.name,o=a.password,i=s.resetForm,e.next=4,n(r,c,o);case 4:if(!e.sent){e.next=8;break}return e.next=8,t({username:r,password:o});case 8:i({values:{username:"",password:"",name:""}});case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object(q.jsxs)("div",{children:[Object(q.jsx)("h1",{children:"Sign In"}),Object(q.jsx)(E.a,{initialValues:{username:"",password:"",name:""},onSubmit:a,children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,s=e.handleSubmit;return Object(q.jsxs)("form",{onSubmit:s,children:["username: ",Object(q.jsx)("input",{id:"username",type:"text",name:"username",onChange:n,onBlur:a,value:t.username}),Object(q.jsx)("br",{}),"name: ",Object(q.jsx)("input",{id:"name",type:"text",name:"name",onChange:n,onBlur:a,value:t.name}),Object(q.jsx)("br",{}),"password: ",Object(q.jsx)("input",{id:"password",type:"password",name:"password",onChange:n,onBlur:a,value:t.password}),Object(q.jsx)("br",{}),Object(q.jsx)("button",{type:"submit",id:"submit-button",children:"Sign In"})]})}})]})},I=n(6),M=n(19),Y=Object(I.gql)(a||(a=Object(M.a)(["\nmutation login($username: String!, $password: String!){\n  login(username: $username, password: $password){value}\n}"]))),G=Object(I.gql)(s||(s=Object(M.a)(["\nmutation addEvent($name: String! $group: String! $dates: [String!]!){\n  addEvent(name: $name, group: $group dates: $dates){name id}\n}"]))),V=Object(I.gql)(r||(r=Object(M.a)(["\nmutation createUser($name: String! $username: String! $password: String!){\n  createUser(name: $name, username: $username, password: $password){name}\n}"]))),B=Object(I.gql)(c||(c=Object(M.a)(["\nmutation addGroup($name: String! $users: [String]!){\n  createGroup(name: $name, users: $users){name}\n}"]))),Q=Object(I.gql)(o||(o=Object(M.a)(["\nmutation joinGroup($id: ID!){\n  joinGroup(id: $id){name}\n}"]))),A=Object(I.gql)(i||(i=Object(M.a)(["\nmutation voteEvent($id: ID!, $votes: [VoteInput]!){\n  voteEvent(id: $id, votes: $votes){dates{votes{voter vote}}}\n}"]))),H=Object(I.gql)(u||(u=Object(M.a)(["\nmutation leaveGroup($id: ID!){\n  leaveGroup(id: $id){name}\n}"]))),L=Object(I.gql)(l||(l=Object(M.a)(["\nquery{\n  me{\n    name\n    username\n    id\n    events{\n      name\n      id\n      status\n      finalDate\n    }\n  }\n}"]))),U=(Object(I.gql)(j||(j=Object(M.a)(["\nquery{\n  allEvents{\n    name\n  }\n}"]))),Object(I.gql)(d||(d=Object(M.a)(["\nquery{\n  me{\n    id\n    groups{\n      name\n      id\n    }\n  }\n}"])))),_=(Object(I.gql)(b||(b=Object(M.a)(["\nquery{\n  userEvents{\n    name\n    id\n  }\n}"]))),Object(I.gql)(O||(O=Object(M.a)(["\nquery event($id: ID!){\n  event(id: $id){\n    name\n    id\n    status\n    dates{\n      date\n      votes{\n        voter\n        vote\n      }\n    }\n  }\n}"])))),F=Object(I.gql)(m||(m=Object(M.a)(["\nquery group($id: ID!){\n  group(id: $id){\n    name\n    id\n    users{\n      name\n      username\n      id\n    }\n  }\n}"]))),J=Object(I.gql)(h||(h=Object(M.a)(["\nquery{\n  me{\n    id\n    groupsUserNotIn{\n      name\n      id\n    }\n  }\n}"]))),P=Object(I.gql)(v||(v=Object(M.a)(["\nquery user($username: String!){\n  user(username: $username){\n    name\n    id\n  }\n}"]))),T=(Object(I.gql)(x||(x=Object(M.a)(["\nquery{\n  allGroups{\n    name\n    id\n  }\n}"]))),n(99)),W=n(97),z=n(130),K=n(137),R=n(131),X=n(132),Z=n(133),ee=n(134),te=n(135),ne=n(136),ae=(n(72),function(e){var t=e.month,n=e.setMonth;return Object(q.jsxs)("div",{className:"header row flex-middle",children:[Object(q.jsx)("div",{className:"col col-start",children:Object(q.jsx)("div",{className:"icon",onClick:function(){n(z.a(t,1))},children:"chevron_left"})}),Object(q.jsx)("div",{className:"col col-center",children:Object(q.jsx)("span",{children:K.a(t,"MMMM YYYYY")})}),Object(q.jsx)("div",{className:"col col-end",onClick:function(){n(W.a(t,1))},children:Object(q.jsx)("div",{className:"icon",children:"chevron_right"})})]})}),se=function(e){var t=e.month,n=R.a(t),a=Array.from(Array(7)).map((function(e,t){return Object(q.jsx)("div",{className:"col col-center",children:K.a(X.a(n,t),"EEEEEE")},t)}));return Object(q.jsx)("div",{className:"days row",children:a})},re=function(e){for(var t=e.month,n=e.setDates,a=e.dates,s=Z.a(t),r=ee.a(s),c=R.a(s),o=te.a(r),i=[],u=[],l=c,j="";l<=o;){for(var d=0;d<7;d++){j=K.a(l,"d");var b=l;u.push(Object(q.jsx)(ce,{formattedDate:j,day:b,monthStart:s,setDates:n,dates:a},b)),l=X.a(l,1)}i.push(Object(q.jsx)("div",{className:"row",children:u},l)),u=[]}return Object(q.jsx)("div",{className:"body",children:i})},ce=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart,s=e.setDates,r=e.dates,c=Object(g.useState)(!1),o=Object(w.a)(c,2),i=o[0],u=o[1],l="col cell default";return ne.a(n,a)||(l="col cell disabled"),i&&(l="col cell green"),Object(q.jsxs)("div",{id:"dates-".concat(t),className:l,onClick:function(){return function(e){u(!i),s(r.concat(e))}(n)},children:[Object(q.jsx)("span",{className:"number",children:t}),Object(q.jsx)("span",{className:"bg",children:t})]},n)},oe=function(e){var t=e.setDates,n=e.dates,a=Object(g.useState)(new Date),s=Object(w.a)(a,2),r=s[0],c=s[1];return Object(q.jsxs)("div",{className:"calendar",children:[Object(q.jsx)(ae,{month:r,setMonth:c}),Object(q.jsx)(se,{month:r}),Object(q.jsx)(re,{month:r,setDates:t,dates:n})]})},ie=function(){return Object(q.jsx)("div",{children:"...loading"})},ue=function(e){var t=e.setNotification,n=Object(g.useState)([]),a=Object(w.a)(n,2),s=a[0],r=a[1],c=Object(g.useState)(null),o=Object(w.a)(c,2),i=o[0],u=o[1],l=Object(I.useQuery)(U),j=[];l.data&&(j=l.data.me.groups.map((function(e){return{value:e.name,label:e.name}})));var d=Object(I.useMutation)(G,{update:function(e,t){console.log("dataInStore:");var n=e.readQuery({query:L}),a=n.me.events;console.log(n.me),console.log(a),console.log(t),e.writeQuery({query:L,data:{me:Object(p.a)(Object(p.a)({},n.me),{},{events:a.concat(t.data.addEvent)})}})}}),b=Object(w.a)(d,1)[0];return l.data?0===j.length&&l.data?Object(q.jsxs)("div",{children:[Object(q.jsx)("h2",{children:"You need to be part of group to add events"}),Object(q.jsx)("h2",{children:Object(q.jsx)($.b,{to:"/joinGroup",children:"Join Here"})})]}):Object(q.jsxs)("div",{children:[Object(q.jsx)("h1",{children:"New Event"}),Object(q.jsx)(E.a,{initialValues:{name:""},onSubmit:function(e,n){var a=e.name,r=n.resetForm;0===s.length?(t({message:"pick possible dates",error:!0}),setTimeout((function(){t(null)}),5e3)):(b({variables:{name:a,group:i,dates:s}}),r({}))},children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,s=e.handleSubmit;return Object(q.jsxs)("form",{onSubmit:s,children:["event name: ",Object(q.jsx)("input",{id:"name",type:"text",name:"name",onChange:n,onBlur:a,value:t.name}),Object(q.jsx)("button",{id:"submit-button",type:"submit",children:"Submit"})]})}}),Object(q.jsx)(T.a,{id:"group-options",options:j,onChange:function(e){u(e.value)}}),Object(q.jsx)("h2",{children:"Choose possible days"}),Object(q.jsx)(oe,{dates:s,setDates:r}),Object(q.jsxs)("button",{id:"homepage-button",children:[" ",Object(q.jsx)($.b,{to:"/",children:"Home Page"})]})]}):Object(q.jsx)(ie,{})},le=function(){var e=Object(I.useMutation)(B),t=Object(w.a)(e,1)[0],n=Object(g.useState)([]),a=Object(w.a)(n,2),s=a[0],r=a[1];return Object(q.jsxs)("div",{children:[Object(q.jsx)("h1",{children:"New Group"}),Object(q.jsx)(E.a,{initialValues:{name:"",user:""},onSubmit:function(){var e=Object(D.a)(S.a.mark((function e(n,a){var r,c,o;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.name,c=a.resetForm,console.log(r),console.log(s),e.next=6,t({variables:{name:r,users:s}});case 6:o=e.sent,console.log(o.data),c({});case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,c=e.handleSubmit,o=e.setFieldValue;return Object(q.jsxs)("form",{onSubmit:c,children:["group name: ",Object(q.jsx)("input",{id:"name",type:"text",name:"name",onChange:n,onBlur:a,value:t.name}),Object(q.jsx)("br",{}),"users: ",Object(q.jsx)("input",{id:"user",type:"text",name:"user",onChange:n,onBlur:a,value:t.user}),Object(q.jsx)("button",{type:"button",id:"add-user-button",onClick:function(){r(s.concat(t.user)),o("user","")},children:"add user"}),Object(q.jsx)("br",{}),s.join(" "),Object(q.jsx)("br",{}),Object(q.jsx)("button",{id:"submit-button",type:"submit",children:"Submit"})]})}}),Object(q.jsxs)("button",{id:"homepage-button",children:[" ",Object(q.jsx)($.b,{to:"/",children:"Home Page"})]})]})},je=n(17),de=n(55),be=function(e){var t=e.month,n=e.setMonth;return Object(q.jsxs)("div",{className:"header row flex-middle",children:[Object(q.jsx)("div",{className:"col col-start",children:Object(q.jsx)("div",{className:"icon",onClick:function(){n(z.a(t,1))},children:"chevron_left"})}),Object(q.jsx)("div",{className:"col col-center",children:Object(q.jsx)("span",{children:K.a(t,"MMMM YYYYY")})}),Object(q.jsx)("div",{className:"col col-end",onClick:function(){n(W.a(t,1))},children:Object(q.jsx)("div",{className:"icon",children:"chevron_right"})})]})},Oe=function(e){var t=e.month,n=R.a(t),a=Array.from(Array(7)).map((function(e,t){return Object(q.jsx)("div",{className:"col col-center",children:K.a(X.a(n,t),"EEEEEE")},t)}));return Object(q.jsx)("div",{className:"days row",children:a})},me=function(e){for(var t=e.month,n=e.dates,a=e.setVotes,s=e.votes,r=Z.a(t),c=ee.a(r),o=R.a(r),i=te.a(c),u=[],l=[],j=o,d="";j<=i;){for(var b=0;b<7;b++){d=K.a(j,"d");var O=j;l.push(Object(q.jsx)(ve,{formattedDate:d,day:O,monthStart:r,dates:n,setVotes:a,votes:s},O)),j=X.a(j,1)}u.push(Object(q.jsx)("div",{className:"row",children:l},j)),l=[]}return Object(q.jsx)("div",{className:"body",children:u})},he=function(e){var t=e.day,n=e.formattedDate,a=e.votes,s=e.setVotes,r=Object(g.useState)(""),c=Object(w.a)(r,2),o=c[0],i=c[1],u=Object(de.a)(a),l=u.findIndex((function(e){return e.date===K.a(t,"DDD")}));Object(g.useEffect)((function(){u[l]&&i(u[l].vote)}),[l]);return console.log("dates-".concat(n)),Object(q.jsxs)("div",{onClick:function(){return function(e){"blue"===e?(i("green"),u[l].vote="green",console.log(t),console.log(l),console.log(u),s(u)):"green"===e?(i("red"),u[l].vote="red",console.log(t),console.log(l),console.log(u),s(u)):(i("blue"),u[l].vote="blue",console.log(t),console.log(l),console.log(u),s(u))}(o)},id:"dates-".concat(n),className:"col cell ".concat(o),children:[Object(q.jsx)("span",{className:"number",children:n}),Object(q.jsx)("span",{className:"bg",children:n})]},t)},ve=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart,s=e.dates,r=e.setVotes,c=e.votes;return s.includes(K.a(n,"DDD"))?Object(q.jsx)(he,{setVotes:r,votes:c,day:n,formattedDate:t}):Object(q.jsxs)("div",{className:"col cell ".concat(ne.a(n,a)?"":"disabled"),children:[Object(q.jsx)("span",{className:"number",children:t}),Object(q.jsx)("span",{className:"bg",children:t})]},n)},xe=function(e){var t=e.dates,n=e.setVotes,a=e.votes,s=Object(g.useState)(new Date),r=Object(w.a)(s,2),c=r[0],o=r[1];return Object(q.jsxs)("div",{className:"calendar",children:[Object(q.jsx)(be,{month:c,setMonth:o}),Object(q.jsx)(Oe,{month:c}),Object(q.jsx)(me,{month:c,dates:t,setVotes:n,votes:a}),Object(q.jsx)("ul",{children:t})]})},pe=function(e){var t=new Date(e);return console.log(t),t=K.a(t,"DDD")},ge=function(){var e=Object(g.useState)([]),t=Object(w.a)(e,2),n=t[0],a=t[1],s=Object(I.useMutation)(A,{onError:function(e){console.log(e)}}),r=Object(w.a)(s,2),c=r[0],o=r[1];console.log(o);var i=Object(je.h)().id,u=Object(I.useQuery)(L),l=Object(I.useQuery)(_,{variables:{id:i}});return Object(g.useEffect)((function(){if(l.data&&u.data){console.log(l.data.event),console.log(l.data.event.dates),console.log(u.data.me.username);var e=l.data.event.dates.map((function(e){return{date:pe(e.date),vote:"blue"}}));0!==l.data.event.dates[0].votes.filter((function(e){return e.voter===u.data.me.username})).length&&(e=l.data.event.dates.map((function(e){return{date:e.date,vote:e.votes.find((function(e){return e.voter===u.data.me.username})).vote}}))),a(e)}}),[l.data]),l.data?(console.log(n),Object(q.jsxs)("div",{children:[l.data.event.name,Object(q.jsx)(xe,{dates:l.data.event.dates.map((function(e){return pe(e.date)})),setVotes:a,votes:n}),Object(q.jsx)("button",{id:"voting-button",onClick:function(){return c({variables:{id:l.data.event.id,votes:n}})},children:"Vote"}),Object(q.jsxs)("button",{id:"homepage-button",children:[" ",Object(q.jsx)($.b,{to:"/",children:"Home Page"})]})]})):Object(q.jsx)("div",{children:"...loading"})},fe=function(e){var t=e.month,n=e.setMonth;return Object(q.jsxs)("div",{className:"header row flex-middle",children:[Object(q.jsx)("div",{className:"col col-start",children:Object(q.jsx)("div",{className:"icon",onClick:function(){n(z.a(t,1))},children:"chevron_left"})}),Object(q.jsx)("div",{className:"col col-center",children:Object(q.jsx)("span",{children:K.a(t,"MMMM YYYYY")})}),Object(q.jsx)("div",{className:"col col-end",onClick:function(){n(W.a(t,1))},children:Object(q.jsx)("div",{className:"icon",children:"chevron_right"})})]})},ye=function(e){var t=e.month,n=R.a(t),a=Array.from(Array(7)).map((function(e,t){return Object(q.jsx)("div",{className:"col col-center",children:K.a(X.a(n,t),"EEEEEE")},t)}));return Object(q.jsx)("div",{className:"days row",children:a})},we=function(e){for(var t=e.month,n=e.dates,a=Z.a(t),s=ee.a(a),r=R.a(a),c=te.a(s),o=[],i=[],u=r,l="";u<=c;){for(var j=0;j<7;j++){l=K.a(u,"d");var d=u;i.push(Object(q.jsx)(Ne,{formattedDate:l,day:d,monthStart:a,dates:n},d)),u=X.a(u,1)}o.push(Object(q.jsx)("div",{className:"row",children:i},u)),i=[]}return Object(q.jsx)("div",{className:"body",children:o})},Ne=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart,s=e.dates.find((function(e){return e.date===K.a(n,"DDD")}));return console.log(s),Object(q.jsxs)("div",{className:"col cell ".concat(ne.a(n,a)?"":"disabled"),children:[Object(q.jsx)("span",{className:"number",children:t}),Object(q.jsx)("span",{className:"bg",children:t}),Object(q.jsx)("div",{children:s?s.name:null})]},n)},Se=function(e){var t=e.events;console.log(t);var n=t.filter((function(e){return"done"===e.status})).map((function(e){return{date:e.finalDate,name:e.name}}));console.log(n);var a=Object(g.useState)(new Date),s=Object(w.a)(a,2),r=s[0],c=s[1];return Object(q.jsxs)("div",{className:"calendar",children:[Object(q.jsx)(fe,{month:r,setMonth:c}),Object(q.jsx)(ye,{month:r}),Object(q.jsx)(we,{month:r,dates:n})]})},De=function(e){var t=e.events.map((function(e){return Object(q.jsx)("li",{children:Object(q.jsx)($.b,{to:"/events/".concat(e.id),children:e.name})},e.id)}));return Object(q.jsx)("div",{children:Object(q.jsx)("ul",{children:t})})},Ee=n(100),$e=function(e){var t=e.logout,n=Object(I.useQuery)(L);return n.data&&console.log(n.data.me.events),Object(g.useEffect)((function(){n.error&&"user needs to be logged in"===n.error.message&&t()}),[n]),n.data?Object(q.jsxs)("div",{children:[Object(q.jsxs)("h2",{children:["Hello ",n.data.me.name," "]}),Object(q.jsx)(Se,{events:n.data.me.events}),Object(q.jsx)(De,{events:n.data.me.events}),Object(q.jsx)(Ee.a,{id:"addEvent-button",children:Object(q.jsx)($.b,{to:"/addevent",children:"add event"})}),Object(q.jsx)("button",{id:"logout-button",onClick:t,children:"Log Out"}),Object(q.jsx)("button",{id:"addGroup-button",children:Object(q.jsx)($.b,{to:"/addGroup",children:"add group"})}),Object(q.jsx)("button",{id:"groups-button",children:Object(q.jsx)($.b,{to:"/groups",children:"groups"})}),Object(q.jsx)("button",{id:"join-group-button",children:Object(q.jsx)($.b,{to:"/joinGroup",children:"join group"})})]}):Object(q.jsx)(ie,{})},qe=function(){var e=Object(I.useQuery)(U),t=e.data?e.data.me.groups.map((function(e){return Object(q.jsx)("li",{children:Object(q.jsx)($.b,{to:"/groups/".concat(e.id),children:e.name})},e.name)})):[];return e.data?0===t.length&&e.data?Object(q.jsxs)("div",{children:[Object(q.jsx)("h2",{children:"It seems you aren't part any group yet"}),Object(q.jsx)("h2",{children:Object(q.jsx)($.b,{to:"/joinGroup",children:"Join Here"})})]}):Object(q.jsx)("div",{children:Object(q.jsx)("ul",{children:t})}):Object(q.jsx)(ie,{})},Ce=function(e){var t=e.users.map((function(e){return Object(q.jsx)("li",{children:Object(q.jsx)($.b,{to:"/users/".concat(e.username),children:e.name})},e.id)}));return Object(q.jsx)("div",{children:Object(q.jsx)("ul",{children:t})})},ke=function(){var e=Object(I.useMutation)(H),t=Object(w.a)(e,1)[0],n=Object(je.h)().id,a=Object(I.useQuery)(F,{variables:{id:n}}),s=function(){var e=Object(D.a)(S.a.mark((function e(){var n;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t({variables:{id:a.data.group.id}});case 2:n=e.sent,console.log(n);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return a.data?Object(q.jsxs)("div",{children:[Object(q.jsxs)("span",{children:[a.data.group.name,Object(q.jsx)("button",{onClick:s,children:"leave"})]}),Object(q.jsx)(Ce,{users:a.data.group.users})]}):Object(q.jsx)(ie,{})},Ie=function(){var e=Object(je.h)().username,t=Object(I.useQuery)(P,{variables:{username:e}});return console.log(t),t.data?Object(q.jsx)("div",{children:t.data.user.name}):Object(q.jsx)("div",{children:"...loading"})},Me=function(e){var t=e.group,n=Object(I.useMutation)(Q),a=Object(w.a)(n,1)[0];return Object(q.jsx)("li",{children:Object(q.jsxs)("span",{children:[t.name,Object(q.jsx)("button",{onClick:function(){return a({variables:{id:t.id}})},children:"Join"})]})})},Ye=function(){var e=Object(I.useQuery)(J);return e.data?Object(q.jsxs)("div",{children:["Hello World",Object(q.jsx)("ul",{children:e.data?e.data.me.groupsUserNotIn.map((function(e){return Object(q.jsx)(Me,{group:e},e.id)})):null}),Object(q.jsxs)("button",{id:"homepage-button",children:[" ",Object(q.jsx)($.b,{to:"/",children:"Home Page"})]})]}):Object(q.jsx)(ie,{})},Ge=function(e){var t=e.notification;if(null===t)return null;var n="success";return t.error&&(n="error"),Object(q.jsx)("div",{id:"notification",className:n,children:t.message})},Ve=function(e,t){var n=Object(je.g)(),a=Object(I.useApolloClient)();console.log("history",n);var s=Object(I.useMutation)(V,{onError:function(e){var n=e.graphQLErrors[0].message;n.startsWith("User validation failed: username: Error, expected `username` to be unique")&&(n="Username needs to be unique"),t({message:n,error:!0}),setTimeout((function(){t(null)}),5e3)}}),r=Object(w.a)(s,1)[0],c=Object(I.useMutation)(Y,{onError:function(e){t({message:e.graphQLErrors[0].message,error:!0}),setTimeout((function(){t(null)}),5e3)}}),o=Object(w.a)(c,1)[0];return{login:function(){var t=Object(D.a)(S.a.mark((function t(a){var s,r,c;return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=a.username,r=a.password,console.log(s,r),t.next=4,o({variables:{username:s,password:r}});case 4:c=t.sent,console.log(c),c.data.login.value&&(e(c.data.login.value),localStorage.setItem("user-token",c.data.login.value),n.push("/"));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),logout:function(){e(null),localStorage.clear(),a.resetStore()},signIn:function(){var e=Object(D.a)(S.a.mark((function e(t,n,a){var s;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r({variables:{username:t,name:n,password:a}});case 2:return s=e.sent,e.abrupt("return",s);case 4:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}()}},Be=function(e){var t=e.setNotification,n=Object(g.useState)(localStorage.getItem("user-token")),a=Object(w.a)(n,2),s=a[0],r=a[1],c=Ve(r,t),o=c.logout,i=c.login,u=c.signIn;return Object(q.jsxs)(je.d,{children:[Object(q.jsx)(je.b,{path:"/joinGroup",children:s?Object(q.jsx)(Ye,{}):Object(q.jsx)(je.a,{to:"/login"})}),Object(q.jsx)(je.b,{path:"/users/:username",children:s?Object(q.jsx)(Ie,{}):Object(q.jsx)(je.a,{to:"/login"})}),Object(q.jsx)(je.b,{path:"/groups/:id",children:s?Object(q.jsx)(ke,{}):Object(q.jsx)(je.a,{to:"/login"})}),Object(q.jsx)(je.b,{path:"/groups",children:s?Object(q.jsx)(qe,{}):Object(q.jsx)(je.a,{to:"/login"})}),Object(q.jsx)(je.b,{path:"/addGroup",children:s?Object(q.jsx)(le,{}):Object(q.jsx)(je.a,{to:"/login"})}),Object(q.jsx)(je.b,{path:"/SignIn",children:Object(q.jsx)(k,{login:i,signIn:u})}),Object(q.jsx)(je.b,{path:"/login",children:Object(q.jsx)(C,{login:i})}),Object(q.jsx)(je.b,{path:"/events/:id",children:s?Object(q.jsx)(ge,{}):Object(q.jsx)(je.a,{to:"/login"})}),Object(q.jsx)(je.b,{path:"/addevent",children:s?Object(q.jsx)(ue,{setNotification:t}):Object(q.jsx)(je.a,{to:"/login"})}),Object(q.jsx)(je.b,{path:"/",children:s?Object(q.jsx)($e,{logout:o}):Object(q.jsx)(je.a,{to:"/login"})})]})},Qe=function(){var e=Object(g.useState)(null),t=Object(w.a)(e,2),n=t[0],a=t[1];return Object(q.jsxs)("div",{children:[Object(q.jsx)(Ge,{notification:n}),Object(q.jsx)($.a,{children:Object(q.jsx)(Be,{setNotification:a})})]})},Ae=n(101),He=Object(Ae.a)((function(e,t){var n=t.headers,a=localStorage.getItem("user-token");return{headers:Object(p.a)(Object(p.a)({},n),{},{authorization:a?"bearer ".concat(a):null})}})),Le=new I.HttpLink({uri:"/graphql"}),Ue=new I.ApolloClient({cache:new I.InMemoryCache,link:He.concat(Le)});y.a.render(Object(q.jsx)(I.ApolloProvider,{client:Ue,children:Object(q.jsx)(Qe,{})}),document.getElementById("root"))},72:function(e,t,n){}},[[129,1,2]]]);
//# sourceMappingURL=main.68024bfc.chunk.js.map
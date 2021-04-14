(this["webpackJsonpdate-selector"]=this["webpackJsonpdate-selector"]||[]).push([[0],{129:function(e,t,n){"use strict";n.r(t);var a,s,r,c,o,i,u,l,d,j,b,O,m,h,v,x=n(47),g=n(0),p=n(50),f=n.n(p),y=n(15),w=n(24),N=n.n(w),S=n(39),E=n(44),D=n(13),$=n(1),q=function(e){var t=e.login;return Object($.jsxs)("div",{children:[Object($.jsx)("h1",{children:"Login"}),Object($.jsx)(E.a,{initialValues:{username:"",password:""},onSubmit:function(){var e=Object(S.a)(N.a.mark((function e(n,a){var s,r,c;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=n.username,r=n.password,c=a.resetForm,e.next=4,t({username:s,password:r});case 4:c({values:{username:"",password:""}});case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,s=e.handleSubmit;return Object($.jsxs)("form",{onSubmit:s,children:["username: ",Object($.jsx)("input",{id:"username",type:"text",name:"username",onChange:n,onBlur:a,value:t.username}),Object($.jsx)("br",{}),"password: ",Object($.jsx)("input",{id:"password",type:"password",name:"password",onChange:n,onBlur:a,value:t.password}),Object($.jsx)("br",{}),Object($.jsx)("button",{type:"submit",id:"login-button",children:"Login"})]})}}),Object($.jsx)("h2",{children:"Not yet signed in?"}),Object($.jsx)("button",{id:"signIn-button",children:Object($.jsx)(D.b,{to:"SignIn",children:"Sign In"})})]})},C=function(e){var t=e.login,n=e.signIn,a=function(){var e=Object(S.a)(N.a.mark((function e(a,s){var r,c,o,i;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.username,c=a.name,o=a.password,i=s.resetForm,e.next=4,n(r,c,o);case 4:if(!e.sent){e.next=8;break}return e.next=8,t({username:r,password:o});case 8:i({values:{username:"",password:"",name:""}});case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object($.jsxs)("div",{children:[Object($.jsx)("h1",{children:"Sign In"}),Object($.jsx)(E.a,{initialValues:{username:"",password:"",name:""},onSubmit:a,children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,s=e.handleSubmit;return Object($.jsxs)("form",{onSubmit:s,children:["username: ",Object($.jsx)("input",{id:"username",type:"text",name:"username",onChange:n,onBlur:a,value:t.username}),Object($.jsx)("br",{}),"name: ",Object($.jsx)("input",{id:"name",type:"text",name:"name",onChange:n,onBlur:a,value:t.name}),Object($.jsx)("br",{}),"password: ",Object($.jsx)("input",{id:"password",type:"password",name:"password",onChange:n,onBlur:a,value:t.password}),Object($.jsx)("br",{}),Object($.jsx)("button",{type:"submit",id:"submit-button",children:"Sign In"})]})}})]})},k=n(6),I=n(19),M=Object(k.gql)(a||(a=Object(I.a)(["\nmutation login($username: String!, $password: String!){\n  login(username: $username, password: $password){value}\n}"]))),G=Object(k.gql)(s||(s=Object(I.a)(["\nmutation addEvent($name: String! $group: String! $dates: [String!]!){\n  addEvent(name: $name, group: $group dates: $dates){name id}\n}"]))),V=Object(k.gql)(r||(r=Object(I.a)(["\nmutation createUser($name: String! $username: String! $password: String!){\n  createUser(name: $name, username: $username, password: $password){name}\n}"]))),Y=Object(k.gql)(c||(c=Object(I.a)(["\nmutation addGroup($name: String! $users: [String]!){\n  createGroup(name: $name, users: $users){name}\n}"]))),B=Object(k.gql)(o||(o=Object(I.a)(["\nmutation joinGroup($id: ID!){\n  joinGroup(id: $id){name}\n}"]))),Q=Object(k.gql)(i||(i=Object(I.a)(["\nmutation voteEvent($id: ID!, $votes: [VoteInput]!){\n  voteEvent(id: $id, votes: $votes){dates{votes{voter vote}}}\n}"]))),A=Object(k.gql)(u||(u=Object(I.a)(["\nquery{\n  me{\n    name\n    username\n    events{\n      name\n      id\n      status\n      finalDate\n    }\n  }\n}"]))),H=(Object(k.gql)(l||(l=Object(I.a)(["\nquery{\n  allEvents{\n    name\n  }\n}"]))),Object(k.gql)(d||(d=Object(I.a)(["\nquery{\n  userGroups{name id}\n}"])))),L=(Object(k.gql)(j||(j=Object(I.a)(["\nquery{\n  userEvents{\n    name\n    id\n  }\n}"]))),Object(k.gql)(b||(b=Object(I.a)(["\nquery event($id: ID!){\n  event(id: $id){\n    name\n    id\n    status\n    dates{\n      date\n      votes{\n        voter\n        vote\n      }\n    }\n  }\n}"])))),U=Object(k.gql)(O||(O=Object(I.a)(["\nquery group($id: ID!){\n  group(id: $id){\n    name\n    id\n    users{\n      name\n      username\n      id\n    }\n  }\n}"]))),_=Object(k.gql)(m||(m=Object(I.a)(["\nquery{\n  groupsUserNotIn{\n    name\n    id\n  }\n}"]))),F=Object(k.gql)(h||(h=Object(I.a)(["\nquery user($username: String!){\n  user(username: $username){\n    name\n    id\n  }\n}"]))),P=(Object(k.gql)(v||(v=Object(I.a)(["\nquery{\n  allGroups{\n    name\n    id\n  }\n}"]))),n(99)),J=n(97),T=n(130),W=n(137),z=n(131),K=n(132),R=n(133),X=n(134),Z=n(135),ee=n(136),te=(n(71),function(e){var t=e.month,n=e.setMonth;return Object($.jsxs)("div",{className:"header row flex-middle",children:[Object($.jsx)("div",{className:"col col-start",children:Object($.jsx)("div",{className:"icon",onClick:function(){n(T.a(t,1))},children:"chevron_left"})}),Object($.jsx)("div",{className:"col col-center",children:Object($.jsx)("span",{children:W.a(t,"MMMM YYYYY")})}),Object($.jsx)("div",{className:"col col-end",onClick:function(){n(J.a(t,1))},children:Object($.jsx)("div",{className:"icon",children:"chevron_right"})})]})}),ne=function(e){var t=e.month,n=z.a(t),a=Array.from(Array(7)).map((function(e,t){return Object($.jsx)("div",{className:"col col-center",children:W.a(K.a(n,t),"EEEEEE")},t)}));return Object($.jsx)("div",{className:"days row",children:a})},ae=function(e){for(var t=e.month,n=e.setDates,a=e.dates,s=R.a(t),r=X.a(s),c=z.a(s),o=Z.a(r),i=[],u=[],l=c,d="";l<=o;){for(var j=0;j<7;j++){d=W.a(l,"d");var b=l;u.push(Object($.jsx)(se,{formattedDate:d,day:b,monthStart:s,setDates:n,dates:a},b)),l=K.a(l,1)}i.push(Object($.jsx)("div",{className:"row",children:u},l)),u=[]}return Object($.jsx)("div",{className:"body",children:i})},se=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart,s=e.setDates,r=e.dates,c=Object(g.useState)(!1),o=Object(y.a)(c,2),i=o[0],u=o[1],l="col cell default";return ee.a(n,a)||(l="col cell disabled"),i&&(l="col cell green"),Object($.jsxs)("div",{id:"dates-".concat(t),className:l,onClick:function(){return function(e){u(!i),s(r.concat(W.a(e,"DDD")))}(n)},children:[Object($.jsx)("span",{className:"number",children:t}),Object($.jsx)("span",{className:"bg",children:t})]},n)},re=function(e){var t=e.setDates,n=e.dates,a=Object(g.useState)(new Date),s=Object(y.a)(a,2),r=s[0],c=s[1];return Object($.jsxs)("div",{className:"calendar",children:[Object($.jsx)(te,{month:r,setMonth:c}),Object($.jsx)(ne,{month:r}),Object($.jsx)(ae,{month:r,setDates:t,dates:n})]})},ce=function(e){var t=e.setNotification,n=Object(g.useState)([]),a=Object(y.a)(n,2),s=a[0],r=a[1],c=Object(g.useState)(null),o=Object(y.a)(c,2),i=o[0],u=o[1],l=Object(k.useQuery)(H),d=[];l.data&&(d=l.data.userGroups.map((function(e){return{value:e.name,label:e.name}})));var j=Object(k.useMutation)(G,{update:function(e,t){console.log("dataInStore:");var n=e.readQuery({query:A}),a=n.me.events;console.log(n.me),console.log(a),console.log(t),e.writeQuery({query:A,data:{me:Object(x.a)(Object(x.a)({},n.me),{},{events:a.concat(t.data.addEvent)})}})}}),b=Object(y.a)(j,1)[0];return Object($.jsxs)("div",{children:[Object($.jsx)("h1",{children:"New Event"}),Object($.jsx)(E.a,{initialValues:{name:""},onSubmit:function(e,n){var a=e.name,r=n.resetForm;0===s.length?(t({message:"pick possible dates",error:!0}),setTimeout((function(){t(null)}),5e3)):(b({variables:{name:a,group:i,dates:s}}),r({}))},children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,s=e.handleSubmit;return Object($.jsxs)("form",{onSubmit:s,children:["event name: ",Object($.jsx)("input",{id:"name",type:"text",name:"name",onChange:n,onBlur:a,value:t.name}),Object($.jsx)("button",{id:"submit-button",type:"submit",children:"Submit"})]})}}),Object($.jsx)(P.a,{id:"group-options",options:d,onChange:function(e){u(e.value)}}),Object($.jsx)("h2",{children:"Choose possible days"}),Object($.jsx)(re,{dates:s,setDates:r}),Object($.jsxs)("button",{id:"homepage-button",children:[" ",Object($.jsx)(D.b,{to:"/",children:"Home Page"})]})]})},oe=function(){var e=Object(k.useMutation)(Y),t=Object(y.a)(e,1)[0],n=Object(g.useState)([]),a=Object(y.a)(n,2),s=a[0],r=a[1];return Object($.jsxs)("div",{children:[Object($.jsx)("h1",{children:"New Group"}),Object($.jsx)(E.a,{initialValues:{name:"",user:""},onSubmit:function(){var e=Object(S.a)(N.a.mark((function e(n,a){var r,c,o;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.name,c=a.resetForm,console.log(r),console.log(s),e.next=6,t({variables:{name:r,users:s}});case 6:o=e.sent,console.log(o.data),c({});case 9:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var t=e.values,n=e.handleChange,a=e.handleBlur,c=e.handleSubmit,o=e.setFieldValue;return Object($.jsxs)("form",{onSubmit:c,children:["group name: ",Object($.jsx)("input",{id:"name",type:"text",name:"name",onChange:n,onBlur:a,value:t.name}),Object($.jsx)("br",{}),"users: ",Object($.jsx)("input",{id:"user",type:"text",name:"user",onChange:n,onBlur:a,value:t.user}),Object($.jsx)("button",{type:"button",id:"add-user-button",onClick:function(){r(s.concat(t.user)),o("user","")},children:"add user"}),Object($.jsx)("br",{}),s.join(" "),Object($.jsx)("br",{}),Object($.jsx)("button",{id:"submit-button",type:"submit",children:"Submit"})]})}}),Object($.jsxs)("button",{id:"homepage-button",children:[" ",Object($.jsx)(D.b,{to:"/",children:"Home Page"})]})]})},ie=n(17),ue=n(55),le=function(e){var t=e.month,n=e.setMonth;return Object($.jsxs)("div",{className:"header row flex-middle",children:[Object($.jsx)("div",{className:"col col-start",children:Object($.jsx)("div",{className:"icon",onClick:function(){n(T.a(t,1))},children:"chevron_left"})}),Object($.jsx)("div",{className:"col col-center",children:Object($.jsx)("span",{children:W.a(t,"MMMM YYYYY")})}),Object($.jsx)("div",{className:"col col-end",onClick:function(){n(J.a(t,1))},children:Object($.jsx)("div",{className:"icon",children:"chevron_right"})})]})},de=function(e){var t=e.month,n=z.a(t),a=Array.from(Array(7)).map((function(e,t){return Object($.jsx)("div",{className:"col col-center",children:W.a(K.a(n,t),"EEEEEE")},t)}));return Object($.jsx)("div",{className:"days row",children:a})},je=function(e){for(var t=e.month,n=e.dates,a=e.setVotes,s=e.votes,r=R.a(t),c=X.a(r),o=z.a(r),i=Z.a(c),u=[],l=[],d=o,j="";d<=i;){for(var b=0;b<7;b++){j=W.a(d,"d");var O=d;l.push(Object($.jsx)(Oe,{formattedDate:j,day:O,monthStart:r,dates:n,setVotes:a,votes:s},O)),d=K.a(d,1)}u.push(Object($.jsx)("div",{className:"row",children:l},d)),l=[]}return Object($.jsx)("div",{className:"body",children:u})},be=function(e){var t=e.day,n=e.formattedDate,a=e.votes,s=e.setVotes,r=Object(g.useState)(""),c=Object(y.a)(r,2),o=c[0],i=c[1],u=Object(ue.a)(a),l=u.findIndex((function(e){return e.date===W.a(t,"DDD")}));Object(g.useEffect)((function(){u[l]&&i(u[l].vote)}),[l]);return console.log("dates-".concat(n)),Object($.jsxs)("div",{onClick:function(){return function(e){"blue"===e?(i("green"),u[l].vote="green",console.log(t),console.log(l),console.log(u),s(u)):"green"===e?(i("red"),u[l].vote="red",console.log(t),console.log(l),console.log(u),s(u)):(i("blue"),u[l].vote="blue",console.log(t),console.log(l),console.log(u),s(u))}(o)},id:"dates-".concat(n),className:"col cell ".concat(o),children:[Object($.jsx)("span",{className:"number",children:n}),Object($.jsx)("span",{className:"bg",children:n})]},t)},Oe=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart,s=e.dates,r=e.setVotes,c=e.votes;return s.includes(W.a(n,"DDD"))?Object($.jsx)(be,{setVotes:r,votes:c,day:n,formattedDate:t}):Object($.jsxs)("div",{className:"col cell ".concat(ee.a(n,a)?"":"disabled"),children:[Object($.jsx)("span",{className:"number",children:t}),Object($.jsx)("span",{className:"bg",children:t})]},n)},me=function(e){var t=e.dates,n=e.setVotes,a=e.votes,s=Object(g.useState)(new Date),r=Object(y.a)(s,2),c=r[0],o=r[1];return Object($.jsxs)("div",{className:"calendar",children:[Object($.jsx)(le,{month:c,setMonth:o}),Object($.jsx)(de,{month:c}),Object($.jsx)(je,{month:c,dates:t,setVotes:n,votes:a}),Object($.jsx)("ul",{children:t})]})},he=function(){var e=Object(g.useState)([]),t=Object(y.a)(e,2),n=t[0],a=t[1],s=Object(k.useMutation)(Q,{onError:function(e){console.log(e)}}),r=Object(y.a)(s,2),c=r[0],o=r[1];console.log(o);var i=Object(ie.h)().id,u=Object(k.useQuery)(A),l=Object(k.useQuery)(L,{variables:{id:i}});return Object(g.useEffect)((function(){if(l.data&&u.data){console.log(l.data.event),console.log(l.data.event.dates),console.log(u.data.me.username);var e=l.data.event.dates.map((function(e){return{date:e.date,vote:"blue"}}));0!==l.data.event.dates[0].votes.filter((function(e){return e.voter===u.data.me.username})).length&&(e=l.data.event.dates.map((function(e){return{date:e.date,vote:e.votes.find((function(e){return e.voter===u.data.me.username})).vote}}))),a(e)}}),[l.data]),l.data?(console.log(n),Object($.jsxs)("div",{children:[l.data.event.name,Object($.jsx)(me,{dates:l.data.event.dates.map((function(e){return e.date})),setVotes:a,votes:n}),Object($.jsx)("button",{id:"voting-button",onClick:function(){return c({variables:{id:l.data.event.id,votes:n}})},children:"Vote"}),Object($.jsxs)("button",{id:"homepage-button",children:[" ",Object($.jsx)(D.b,{to:"/",children:"Home Page"})]})]})):Object($.jsx)("div",{children:"...loading"})},ve=function(e){var t=e.month,n=e.setMonth;return Object($.jsxs)("div",{className:"header row flex-middle",children:[Object($.jsx)("div",{className:"col col-start",children:Object($.jsx)("div",{className:"icon",onClick:function(){n(T.a(t,1))},children:"chevron_left"})}),Object($.jsx)("div",{className:"col col-center",children:Object($.jsx)("span",{children:W.a(t,"MMMM YYYYY")})}),Object($.jsx)("div",{className:"col col-end",onClick:function(){n(J.a(t,1))},children:Object($.jsx)("div",{className:"icon",children:"chevron_right"})})]})},xe=function(e){var t=e.month,n=z.a(t),a=Array.from(Array(7)).map((function(e,t){return Object($.jsx)("div",{className:"col col-center",children:W.a(K.a(n,t),"EEEEEE")},t)}));return Object($.jsx)("div",{className:"days row",children:a})},ge=function(e){for(var t=e.month,n=e.dates,a=R.a(t),s=X.a(a),r=z.a(a),c=Z.a(s),o=[],i=[],u=r,l="";u<=c;){for(var d=0;d<7;d++){l=W.a(u,"d");var j=u;i.push(Object($.jsx)(pe,{formattedDate:l,day:j,monthStart:a,dates:n},j)),u=K.a(u,1)}o.push(Object($.jsx)("div",{className:"row",children:i},u)),i=[]}return Object($.jsx)("div",{className:"body",children:o})},pe=function(e){var t=e.formattedDate,n=e.day,a=e.monthStart,s=e.dates.find((function(e){return e.date===W.a(n,"DDD")}));return console.log(s),Object($.jsxs)("div",{className:"col cell ".concat(ee.a(n,a)?"":"disabled"),children:[Object($.jsx)("span",{className:"number",children:t}),Object($.jsx)("span",{className:"bg",children:t}),Object($.jsx)("div",{children:s?s.name:null})]},n)},fe=function(e){var t=e.events;console.log(t);var n=t.filter((function(e){return"done"===e.status})).map((function(e){return{date:e.finalDate,name:e.name}}));console.log(n);var a=Object(g.useState)(new Date),s=Object(y.a)(a,2),r=s[0],c=s[1];return Object($.jsxs)("div",{className:"calendar",children:[Object($.jsx)(ve,{month:r,setMonth:c}),Object($.jsx)(xe,{month:r}),Object($.jsx)(ge,{month:r,dates:n})]})},ye=function(e){var t=e.events.map((function(e){return Object($.jsx)("li",{children:Object($.jsx)(D.b,{to:"/events/".concat(e.id),children:e.name})},e.id)}));return Object($.jsx)("div",{children:Object($.jsx)("ul",{children:t})})},we=n(100),Ne=function(e){var t=e.logout,n=Object(k.useQuery)(A);return n.data&&console.log(n.data.me.events),Object(g.useEffect)((function(){n.error&&"user needs to be logged in"===n.error.message&&t()}),[n]),n.data?Object($.jsxs)("div",{children:[Object($.jsxs)("h2",{children:["Hello ",n.data.me.name," "]}),Object($.jsx)(fe,{events:n.data.me.events}),Object($.jsx)(ye,{events:n.data.me.events}),Object($.jsx)(we.a,{id:"addEvent-button",children:Object($.jsx)(D.b,{to:"/addevent",children:"add event"})}),Object($.jsx)("button",{id:"logout-button",onClick:t,children:"Log Out"}),Object($.jsx)("button",{id:"addGroup-button",children:Object($.jsx)(D.b,{to:"/addGroup",children:"add group"})}),Object($.jsx)("button",{id:"groups-button",children:Object($.jsx)(D.b,{to:"/groups",children:"groups"})}),Object($.jsx)("button",{id:"join-group-button",children:Object($.jsx)(D.b,{to:"/joinGroup",children:"join group"})})]}):Object($.jsx)("div",{children:"loading..."})},Se=function(){var e=Object(k.useQuery)(H),t=e.data?e.data.userGroups.map((function(e){return Object($.jsx)("li",{children:Object($.jsx)(D.b,{to:"/groups/".concat(e.id),children:e.name})},e.name)})):[];return 0===t.length&&e.data?Object($.jsxs)("div",{children:[Object($.jsx)("h2",{children:"It seems you aren't part any group yet"}),Object($.jsx)("h2",{children:Object($.jsx)(D.b,{to:"/joinGroup",children:"Join Here"})})]}):Object($.jsx)("div",{children:Object($.jsx)("ul",{children:t})})},Ee=function(e){var t=e.users.map((function(e){return Object($.jsx)("li",{children:Object($.jsx)(D.b,{to:"/users/".concat(e.username),children:e.name})},e.id)}));return Object($.jsx)("div",{children:Object($.jsx)("ul",{children:t})})},De=function(){var e=Object(ie.h)().id,t=Object(k.useQuery)(U,{variables:{id:e}});return console.log(t.data),Object($.jsxs)("div",{children:[t.data?t.data.group.name:null,t.data?Object($.jsx)(Ee,{users:t.data.group.users}):null]})},$e=function(){var e=Object(ie.h)().username,t=Object(k.useQuery)(F,{variables:{username:e}});return console.log(t),t.data?Object($.jsx)("div",{children:t.data.user.name}):Object($.jsx)("div",{children:"...loading"})},qe=function(e){var t=e.group,n=Object(k.useMutation)(B),a=Object(y.a)(n,1)[0];return Object($.jsx)("li",{children:Object($.jsxs)("span",{children:[t.name,Object($.jsx)("button",{onClick:function(){return a({variables:{id:t.id}})},children:"Join"})]})})},Ce=function(){var e=Object(k.useQuery)(_);return Object($.jsxs)("div",{children:["Hello World",Object($.jsx)("ul",{children:e.data?e.data.groupsUserNotIn.map((function(e){return Object($.jsx)(qe,{group:e},e.id)})):null}),Object($.jsxs)("button",{id:"homepage-button",children:[" ",Object($.jsx)(D.b,{to:"/",children:"Home Page"})]})]})},ke=function(e){var t=e.notification;if(null===t)return null;var n="success";return t.error&&(n="error"),Object($.jsx)("div",{id:"notification",className:n,children:t.message})},Ie=function(e,t){var n=Object(ie.g)(),a=Object(k.useApolloClient)();console.log("history",n);var s=Object(k.useMutation)(V,{onError:function(e){var n=e.graphQLErrors[0].message;n.startsWith("User validation failed: username: Error, expected `username` to be unique")&&(n="Username needs to be unique"),t({message:n,error:!0}),setTimeout((function(){t(null)}),5e3)}}),r=Object(y.a)(s,1)[0],c=Object(k.useMutation)(M,{onError:function(e){t({message:e.graphQLErrors[0].message,error:!0}),setTimeout((function(){t(null)}),5e3)}}),o=Object(y.a)(c,1)[0];return{login:function(){var t=Object(S.a)(N.a.mark((function t(a){var s,r,c;return N.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=a.username,r=a.password,console.log(s,r),t.next=4,o({variables:{username:s,password:r}});case 4:c=t.sent,console.log(c),c.data.login.value&&(e(c.data.login.value),localStorage.setItem("user-token",c.data.login.value),n.push("/"));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),logout:function(){e(null),localStorage.clear(),a.resetStore()},signIn:function(){var e=Object(S.a)(N.a.mark((function e(t,n,a){var s;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r({variables:{username:t,name:n,password:a}});case 2:return s=e.sent,e.abrupt("return",s);case 4:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}()}},Me=function(e){var t=e.setNotification,n=Object(g.useState)(localStorage.getItem("user-token")),a=Object(y.a)(n,2),s=a[0],r=a[1],c=Ie(r,t),o=c.logout,i=c.login,u=c.signIn;return Object($.jsxs)(ie.d,{children:[Object($.jsx)(ie.b,{path:"/joinGroup",children:s?Object($.jsx)(Ce,{}):Object($.jsx)(ie.a,{to:"/login"})}),Object($.jsx)(ie.b,{path:"/users/:username",children:s?Object($.jsx)($e,{}):Object($.jsx)(ie.a,{to:"/login"})}),Object($.jsx)(ie.b,{path:"/groups/:id",children:s?Object($.jsx)(De,{}):Object($.jsx)(ie.a,{to:"/login"})}),Object($.jsx)(ie.b,{path:"/groups",children:s?Object($.jsx)(Se,{}):Object($.jsx)(ie.a,{to:"/login"})}),Object($.jsx)(ie.b,{path:"/addGroup",children:s?Object($.jsx)(oe,{}):Object($.jsx)(ie.a,{to:"/login"})}),Object($.jsx)(ie.b,{path:"/SignIn",children:Object($.jsx)(C,{login:i,signIn:u})}),Object($.jsx)(ie.b,{path:"/login",children:Object($.jsx)(q,{login:i})}),Object($.jsx)(ie.b,{path:"/events/:id",children:s?Object($.jsx)(he,{}):Object($.jsx)(ie.a,{to:"/login"})}),Object($.jsx)(ie.b,{path:"/addevent",children:s?Object($.jsx)(ce,{setNotification:t}):Object($.jsx)(ie.a,{to:"/login"})}),Object($.jsx)(ie.b,{path:"/",children:s?Object($.jsx)(Ne,{logout:o}):Object($.jsx)(ie.a,{to:"/login"})})]})},Ge=function(){var e=Object(g.useState)(null),t=Object(y.a)(e,2),n=t[0],a=t[1];return Object($.jsxs)("div",{children:[Object($.jsx)(ke,{notification:n}),Object($.jsx)(D.a,{children:Object($.jsx)(Me,{setNotification:a})})]})},Ve=n(101),Ye=Object(Ve.a)((function(e,t){var n=t.headers,a=localStorage.getItem("user-token");return{headers:Object(x.a)(Object(x.a)({},n),{},{authorization:a?"bearer ".concat(a):null})}})),Be=new k.HttpLink({uri:"/graphql"}),Qe=new k.ApolloClient({cache:new k.InMemoryCache,link:Ye.concat(Be)});f.a.render(Object($.jsx)(k.ApolloProvider,{client:Qe,children:Object($.jsx)(Ge,{})}),document.getElementById("root"))},71:function(e,t,n){}},[[129,1,2]]]);
//# sourceMappingURL=main.27ec96d0.chunk.js.map
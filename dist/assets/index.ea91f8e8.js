var st=Object.defineProperty;var We=Object.getOwnPropertySymbols;var dt=Object.prototype.hasOwnProperty,ct=Object.prototype.propertyIsEnumerable;var Ae=(e,t,n)=>t in e?st(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_e=(e,t)=>{for(var n in t||(t={}))dt.call(t,n)&&Ae(e,n,t[n]);if(We)for(var n of We(t))ct.call(t,n)&&Ae(e,n,t[n]);return e};import{r as R,c as Q,o as c,O as ge,R as Ie,V as Ee,W as Z,P as ee,S as te,C as lt,T as de,B as mt,M as Y,a as K,L as Fe,D as je,A as ne,b as ce,d as ut,e as Re,f as Be,G as He,g as oe,h as w,i as le,j as ve,k as _,s as pt,l as ft,m as ht,n as wt,U as _t,p as gt,q as vt,t as bt,u as yt,v as xt,w as St,x as me,y as $t,z as Mt,E as Pt,F as ie,H as De,I as u,J as Ct,K as Te,N as Oe,Q as Ue,X as be,Y as Ve,Z as X,_ as ye,$ as xe,a0 as Ge,a1 as Se,a2 as $e,a3 as Lt,a4 as Me,a5 as Pe,a6 as ue,a7 as pe,a8 as kt,a9 as zt,aa as Wt,ab as At,ac as It,ad as Et,ae as Ft}from"./vendor.a377251d.js";const jt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}};jt();var v=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n};const Rt={data(){return{}},mounted(){}};function Bt(e,t,n,r,o,i){const a=R("router-view");return c(),Q(a)}var Ht=v(Rt,[["render",Bt]]);let B,p,C,b,H,D;const Ce=new Ee(1,1),Ne=new ge,qe=new Ie,Dt={routeInfo:{meta:{title:"Pages3d"},icon:"el-icon-menu",hidden:!0,sort:1},components:{},data(){return{}},beforeCreate(){},created(){},beforeMount(){},mounted(){this.init(),this.render()},beforeUpdate(){},updated(){},activated(){},deactivated(){},beforeUnmount(){},unmounted(){},methods:{init(){C=new Z({antialias:!0}),C.setPixelRatio(window.devicePixelRatio),C.setSize(window.innerWidth,window.innerHeight),C.shadowMap.enabled=!0,this.container=document.getElementById("container"),this.container.appendChild(C.domElement),B=new ee(70,window.innerWidth/window.innerHeight,.1,2e4),B.position.set(0,0,5),p=new te;const e=new lt().setPath("./image/box/").load(["scene1_pano2_f.jpg","scene1_pano2_b.jpg","scene1_pano2_u.jpg","scene1_pano2_d.jpg","scene1_pano2_l.jpg","scene1_pano2_r.jpg"]);p.add(Ne),this.addSky(),this.textureLoader=new de;const t=this.textureLoader.load("./image/box/scene1_pano2_f.jpg"),n=this.textureLoader.load("./image/box/scene1_pano2_b.jpg"),r=this.textureLoader.load("./image/box/scene1_pano2_l.jpg"),o=this.textureLoader.load("./image/box/scene1_pano2_r.jpg"),i=this.textureLoader.load("./image/box/scene1_pano2_u.jpg"),a=this.textureLoader.load("./image/box/scene1_pano2_d.jpg"),s=new mt(100,100,100,8,8,8);s.scale(1,1,-1);const d=[new Y({map:o}),new Y({map:r}),new Y({map:i}),new Y({map:a}),new Y({map:t}),new Y({map:n})],m=new K(s,d);m.name="\u5168\u666F\u76D2\u5B50",p.add(m);const F=new Fe;p.add(F);const q=new je(16777215,.2);q.position.set(100,100,100),p.add(q),p.add(new ne(16777215,.2));const j=new ce(1,64,32),re=new ut({color:16777215,metalness:.9,roughness:0,envMap:e,envMapIntensity:1}),J=new K(j,re);J.name="\u53CD\u5149\u7403\u4F53",p.add(J);const it=new de().load("./image/point.png"),at=new Re({map:it,color:16777215});H=new Be(at),H.scale.set(1,1,1),H.position.set(0,1.5,0),H.name="\u95EE\u53F7\u6807\u70B91",p.add(H);const se=new Be(new Re({map:new de().load("./image/point.png"),color:16777215}));se.scale.set(1,1,1),se.position.set(10,10,10),se.name="\u95EE\u53F7\u6807\u70B92",p.add(se),new He().load("./image/Bicycle.glb",rt=>{D=rt.scene.children[0],D.scale.set(1,1,1),D.position.set(0,-50,0),D.name="\u81EA\u884C\u8F66",p.add(D)}),b=new oe(B,C.domElement),b.enableDamping=!0,b.dampingFactor=.1,b.rotateSpeed=-.3,b.zoomSpeed=2,b.enablePan=!0,b.autoRotate=!0,b.autoRotateSpeed=.1,this.animate(),window.addEventListener("resize",this.onWindowResize),window.addEventListener("mousemove",this.raycasterEventEnd,!1)},onWindowResize(){B.aspect=window.innerWidth/window.innerHeight,B.updateProjectionMatrix(),C.setSize(window.innerWidth,window.innerHeight),this.render()},render(){D&&(D.rotation.y+=.01),C.render(p,B)},animate(){requestAnimationFrame(this.animate),b.update(),this.render()},addSky(){const e="varying vec3 vWorldPosition;void main() {vec4 worldPosition = modelMatrix * vec4( position, 1.0 );vWorldPosition = worldPosition.xyz;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}",t="uniform vec3 topColor;uniform vec3 bottomColor;uniform float offset;uniform float exponent;varying vec3 vWorldPosition;void main() {float h = normalize( vWorldPosition + offset ).y;gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );}",n={topColor:{type:"c",value:new w(0)},bottomColor:{type:"c",value:new w(30719)},offset:{type:"f",value:500},exponent:{type:"f",value:1}},r=new ce(4e3,32,15),o=new le({uniforms:n,vertexShader:e,fragmentShader:t,side:ve});Ne.add(new K(r,o))},raycasterEventEnd(e){Ce.x=e.clientX/window.innerWidth*2-1,Ce.y=-(e.clientY/window.innerHeight)*2+1,qe.setFromCamera(Ce,B);const t=qe.intersectObjects(p.children);if(t.length>0){const n=t[0].object;console.log(n.name),n.name==="\u95EE\u53F7\u6807\u70B91"?H.scale.set(2,2,2):n.name==="\u95EE\u53F7\u6807\u70B92"?console.log("\u95EE\u53F7\u6807\u70B92"):H.scale.set(1,1,1)}}},computed:{},watch:{}},Tt={id:"container"};function Ot(e,t,n,r,o,i){return c(),_("div",Tt)}var Ut=v(Dt,[["render",Ot],["__scopeId","data-v-6511fdc7"]]),Vt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Ut});let T,l,f,O,y,ae;const Le=new Ee(1,1),Ye=new ge,Ke=new Ie,Gt={routeInfo:{meta:{title:"Pages3d"},icon:"el-icon-menu",hidden:!0,sort:1},components:{},data(){return{}},beforeCreate(){},created(){},beforeMount(){},mounted(){this.init(),this.animate()},beforeUpdate(){},updated(){},activated(){},deactivated(){},beforeUnmount(){},unmounted(){},methods:{init(){f=new Z({antialias:!0}),f.setPixelRatio(window.devicePixelRatio),f.setSize(window.innerWidth,window.innerHeight),f.shadowMap.enabled=!0,f.outputEncoding=pt,f.toneMapping=ft,f.shadowMap.type=ht,this.container=document.getElementById("container"),this.container.appendChild(f.domElement),T=new ee(45,window.innerWidth/window.innerHeight,.1,2e4),T.position.set(0,8,12),l=new te,l.add(Ye),this.addSky();const e=new Fe;l.add(e);const t=new je(16777215,1);t.position.set(2,5,2),t.castShadow=!0,l.add(t),l.add(new ne(16777215,.5));const n=new wt(256,{generateMipmaps:!0,minFilter:_t});ae=new gt(.1,2e4,n),ae.position.set(0,0,0),l.add(ae);const r=new vt({color:16777215,envMap:n.texture,roughness:.5,metalness:.5}),o=new bt(6,64),i=new K(o,r);i.rotation.x=-Math.PI/2,i.receiveShadow=!0,l.add(i);const a=new He;a.load("./image/Bicycle.glb",s=>{y=s.scene.children[0],y.scale.set(.1,.1,.1),y.position.set(0,0,0),y.name="\u81EA\u884C\u8F66",y.traverse(d=>{d.isMesh&&(d.castShadow=!0,d.receiveShadow=!0)}),y.rotation.y=-Math.PI/2,l.add(y)}),a.load("./image/AppleTree.glb",s=>{const d=s.scene.children[0];d.scale.set(.1,.1,.1),d.position.set(0,0,-4),d.name="\u6811",d.traverse(m=>{m.isMesh&&(m.castShadow=!0,m.receiveShadow=!0)}),l.add(d)}),O=new oe(T,f.domElement),O.enableDamping=!0,O.dampingFactor=.1,O.rotateSpeed=.3,O.zoomSpeed=2,O.enablePan=!0,window.addEventListener("resize",this.onWindowResize)},onWindowResize(){T.aspect=window.innerWidth/window.innerHeight,T.updateProjectionMatrix(),f.setSize(window.innerWidth,window.innerHeight),this.render()},render(){y&&(y.rotation.y+=.01),f.render(l,T)},animate(){requestAnimationFrame(this.animate),O.update(),ae&&ae.update(f,l),this.render()},addSky(){const e="varying vec3 vWorldPosition;void main() {vec4 worldPosition = modelMatrix * vec4( position, 1.0 );vWorldPosition = worldPosition.xyz;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}",t="uniform vec3 topColor;uniform vec3 bottomColor;uniform float offset;uniform float exponent;varying vec3 vWorldPosition;void main() {float h = normalize( vWorldPosition + offset ).y;gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );}",n={topColor:{type:"c",value:new w(0)},bottomColor:{type:"c",value:new w(10004566)},offset:{type:"f",value:500},exponent:{type:"f",value:1}},r=new ce(4e3,32,15),o=new le({uniforms:n,vertexShader:e,fragmentShader:t,side:ve});Ye.add(new K(r,o))},addMeteor(){const e={};e.uniforms={map:{type:"t",value:null},offsetRepeat:{type:"v4",value:new yt(0,0,1,1)},time:{type:"f",value:0},color:{type:"c",value:new w(16777215)},size:{type:"f",value:.5},scale:{type:"f",value:500},direction:{type:"v3",value:new xt(0,0,1)}},e.vertexShader="uniform float time;uniform float size;uniform float scale;uniform vec3 direction; attribute float pulseSpeed; attribute float orbitSpeed; attribute float orbitSize;void main() { vec3 animatedPosition = position;animatedPosition.xyz += direction * time * orbitSize;vec3 transformed = vec3( animatedPosition ); vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );  gl_Position =  projectionMatrix * mvPosition; float animatedSize = size * ( scale / - mvPosition.z ); animatedSize *= 1.0 + sin(time * pulseSpeed); gl_PointSize = animatedSize; }",e.fragmentShader="uniform sampler2D map; uniform vec4 offsetRepeat; uniform vec3 color; void main() { gl_FragColor = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy ); gl_FragColor.rgb *= color.rgb; }";let t,n,r,o,i,a,s,d,m,F,q,j,re,J;for(J=new de,re=J.load("./image/meteor.png"),i=150,t=new St,F=new Float32Array(3*i),q=new Float32Array(i),a=new Float32Array(i),s=new Float32Array(i),n=r=0,j=i;j>=0?j>r:r>j;n=j>=0?++r:--r)m=3*n,F[m]=1e3*Math.random()-500,F[m+1]=1e3*Math.random()-500,F[m+2]=1e3*Math.random()-500,q[n]=1+1*Math.random(),a[n]=-60-150*Math.random(),s[n]=-2-4*Math.random(),t.setAttribute("position",new me(F,3)),t.setAttribute("pulseSpeed",new me(q,1)),t.setAttribute("orbitSize",new me(a,1)),t.setAttribute("orbitSpeed",new me(s,1)),o=new le({uniforms:$t.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,blending:Mt,transparent:!0}),o.uniforms.map.value=re,o.uniforms.size.value=8,d=new Pt(t,o),l.add(d),l.children.pop(),l.children.unshift(d)},raycasterEventEnd(e){Le.x=e.clientX/window.innerWidth*2-1,Le.y=-(e.clientY/window.innerHeight)*2+1,Ke.setFromCamera(Le,T);const t=Ke.intersectObjects(l.children);if(t.length>0){const n=t[0].object;console.log(n.name)}}},computed:{},watch:{}},Nt={id:"container"};function qt(e,t,n,r,o,i){return c(),_("div",Nt)}var Yt=v(Gt,[["render",qt],["__scopeId","data-v-6cdc7752"]]),Kt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Yt});const Xt={name:"Home",routeInfo:{meta:{title:"\u9996\u9875"}},data(){return{list:[{title:"\u6211\u7684\u7F51\u9875\u662FMMD\u505A\u7684",img:"/image/\u6211\u7684\u7F51\u9875\u662FMMD\u505A\u7684.png",locLink:"/mmd1",bLink:"https://www.bilibili.com/video/BV1Yr4y1J7Kj/"},{title:"\u8FD8\u662F\u4F60\u7684\u7B11\u5BB9\u6700\u53EF\u7231",img:"/image/\u8FD8\u662F\u4F60\u7684\u7B11\u5BB9\u6700\u53EF\u7231.png",locLink:"/mmd2",bLink:"https://www.bilibili.com/video/BV1Nu411r7vs/"},{title:"\u5371\u9669\u6D3E\u5BF9",img:"/image/\u5371\u9669\u6D3E\u5BF9.png",locLink:"/mmd3",bLink:"https://www.bilibili.com/video/BV1Nu411r7vs/"}]}},mounted(){},methods:{}},Jt={class:"list"},Qt=["src","alt"],Zt={class:"title"},en={class:"buttons"},tn=Ue(" \u5728\u7EBF\u770B "),nn=["href"];function on(e,t,n,r,o,i){const a=R("router-link");return c(),_("div",Jt,[(c(!0),_(ie,null,De(o.list,(s,d)=>(c(),_("div",{key:d,class:"list-item"},[u("img",{src:s.img,alt:s.title},null,8,Qt),u("div",Zt,Ct(s.title),1),u("div",en,[Te(a,{to:s.locLink,class:"button"},{default:Oe(()=>[tn]),_:2},1032,["to"]),u("a",{class:"button",href:s.bLink,target:"_blank"}," B\u7AD9\u770B ",8,nn)])]))),128)),(c(),_(ie,null,De(3,(s,d)=>u("div",{key:"blank"+d,class:"list-item blank"})),64))])}var an=v(Xt,[["render",on],["__scopeId","data-v-0b459b84"]]),rn=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:an});let Xe,x,L,k,z,S,fe=!1,$;const sn=new Pe,dn={routeInfo:{meta:{title:"\u6211\u7684MMD\u662F\u7F51\u9875\u505A\u7684"},hidden:!0,sort:1},components:{},data(){return{isStarted:!1,process:"100%"}},beforeCreate(){},created(){},beforeMount(){},mounted(){this.$nextTick(()=>{window.Ammo().then(e=>{this.init()})})},beforeUpdate(){},updated(){},activated(){},deactivated(){},beforeUnmount(){},unmounted(){},methods:{play(){fe=!fe,S.enable("cameraAnimation",fe),S.enable("animation",fe),$&&($.isPlaying?$.pause():$.play())},init(){k=new Z({antialias:!0,logarithmicDepthBuffer:!0}),k.setPixelRatio(window.devicePixelRatio),k.setSize(window.innerWidth,window.innerHeight),k.shadowMap.enabled=!0,Xe=document.getElementById("container"),Xe.appendChild(k.domElement),x=new ee(45,window.innerWidth/window.innerHeight,.1,2e4),x.position.set(0,15,20),L=new te,L.background=new w(16777215);const e=new be(16777215,1,150);e.position.set(50,100,-40),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048;const t=50;e.shadow.camera.left=-t,e.shadow.camera.right=t,e.shadow.camera.top=t,e.shadow.camera.bottom=-t,e.shadow.camera.far=110,e.shadow.bias=-1e-4,L.add(e),L.add(new Ve(e,1)),L.add(new ne(16777215,.8));const n=new X;S=new ye({afterglow:2}),S.enable("animation",!1),S.enable("cameraAnimation",!1),n.loadWithAnimation("./model/\u5FC3\u6D77/\u73CA\u745A\u5BAB\u5FC3\u6D77.pmx",["./motion/\u6211\u7684\u60B2\u4F24\u662F\u6C34\u505A\u7684.vmd"],function(i){const a=i.mesh;a.castShadow=!0,a.receiveShadow=!0,L.add(a),S.add(a,{animation:i.animation,physics:!0});const s=new xe;x.add(s),$=new Ge(s),new Se().load("./audio/\u6211\u7684\u60B2\u4F24\u662F\u662F\u6C34\u505A\u7684.mp3",function(d){$.setBuffer(d),$.setRefDistance(20),$.setLoop(!0),a.add($)})}),n.loadAnimation(["./camera/\u6211\u7684\u60B2\u4F24\u662F\u6C34\u505A\u7684_\u955C\u5934_\u80F6\u9F99\u517D.vmd"],x,function(i){S.add(x,{animation:i})}),new X().load("./stage/\u7B80\u7EA6\u65F6\u5C1A\u821E\u53F0/Stage.pmx",function(i){i.position.set(0,0,50),i.castShadow=!0,i.receiveShadow=!0,L.add(i)}),z=new oe(x,k.domElement),z.enableDamping=!0,z.dampingFactor=.2,z.rotateSpeed=.6,z.zoomSpeed=2,z.enablePan=!0,z.target.set(0,15,0),$e.onProgress=(i,a,s)=>{this.process=100-a/s*100+"%",this.process==="0%"&&this.animate()};const r={camera:!0};new Lt().add(r,"camera").onChange(function(){S.enable("cameraAnimation",r.camera)}),window.addEventListener("resize",this.onWindowResize)},onWindowResize(){x.aspect=window.innerWidth/window.innerHeight,x.updateProjectionMatrix(),k.setSize(window.innerWidth,window.innerHeight),this.render()},render(){S.update(sn.getDelta()),k.render(L,x)},animate(){this.hasInit=!0,requestAnimationFrame(this.animate),z.update(),this.render()}},computed:{},watch:{}},cn=e=>(ue("data-v-1f675310"),e=e(),pe(),e),ln=cn(()=>u("div",{id:"container"},null,-1));function mn(e,t,n,r,o,i){const a=R("loading");return c(),_(ie,null,[ln,u("button",{id:"startButton",onClick:t[0]||(t[0]=(...s)=>i.play&&i.play(...s))}),o.process!=="0%"?(c(),Q(a,{key:0,process:o.process},null,8,["process"])):Me("",!0)],64)}var un=v(dn,[["render",mn],["__scopeId","data-v-1f675310"]]),pn=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:un});let Je,U,V,W,h,A,he=!1,M;const fn=new ge,hn=new Pe,wn={routeInfo:{meta:{title:"\u8FD8\u662F\u4F60\u7684\u7B11\u5BB9\u6700\u53EF\u7231"},hidden:!0,sort:1},components:{},data(){return{isStarted:!1,process:"100%"}},beforeCreate(){},created(){},beforeMount(){},mounted(){this.$nextTick(()=>{window.Ammo().then(e=>{this.init()})})},beforeUpdate(){},updated(){},activated(){},deactivated(){},beforeUnmount(){},unmounted(){},methods:{play(){he=!he,A.enable("cameraAnimation",he),A.enable("animation",he),M&&(M.isPlaying?M.pause():M.play())},init(){W=new Z({antialias:!0,logarithmicDepthBuffer:!0}),W.setPixelRatio(window.devicePixelRatio),W.setSize(window.innerWidth,window.innerHeight),W.shadowMap.enabled=!0,Je=document.getElementById("container"),Je.appendChild(W.domElement),U=new ee(45,window.innerWidth/window.innerHeight,.1,2e4),U.position.set(0,100,200),V=new te,V.background=new w(15921906);const e=1,t=20,n=10;[{position:[-8.5,5,-3],color:16759635,lightFar:t,lightIntensity:e,decay:n},{position:[8.8,5,-5.2],color:16759635,lightFar:t,lightIntensity:e,decay:n},{position:[18.5,-3,36.5],color:16759635,lightFar:t,lightIntensity:e,decay:n},{position:[18.5,-3,36.5],color:16759635,lightFar:t,lightIntensity:e,decay:n},{position:[28,-3,36.5],color:16759635,lightFar:t,lightIntensity:e,decay:n},{position:[-28,-3,36.5],color:16759635,lightFar:t,lightIntensity:e,decay:n},{position:[-18.5,-3,36.5],color:16759635,lightFar:t,lightIntensity:e,decay:n},{position:[-20,80,60],color:16777215,lightFar:200,lightIntensity:1,decay:1}].forEach(a=>{const s=new be(a.color,a.lightIntensity,a.lightFar,a.decay);s.position.set(...a.position),s.castShadow=!0,V.add(s)}),V.add(new ne(13619199,.5));const o=new X;A=new ye({afterglow:2}),A.enable("animation",!1),A.enable("cameraAnimation",!1);const i={model:"./model/\u80E1\u6843/\u80E1\u6843.pmx",motion:["./motion/\u4F60\u7684\u7B11\u5BB9\u52A8\u4F5C+\u8868\u60C5\u5B8C\u6574\u6574\u5408.vmd"],audio:"./audio/\u8FD8\u662F\u4F60\u7684\u7B11\u5BB9\u6700\u53EF\u7231.mp3",stage:"./stage/\u5927\u559C\u573A\u666F/\u5927\u559C\u573A\u666F.pmx"};o.loadWithAnimation(i.model,i.motion,function(a){const s=a.mesh;s.castShadow=!0,s.position.set(0,0,25),V.add(s),A.add(s,{animation:a.animation,physics:!0}),A.enable("ik",!1);const d=new xe;U.add(d),M=new Ge(d),new Se().load(i.audio,function(m){M.setBuffer(m),M.setRefDistance(50),M.setLoop(!0),s.add(M)})}),new X().load(i.stage,function(a){a.position.set(0,0,0),a.receiveShadow=!0,V.add(a)}),h=new oe(U,W.domElement),h.enableDamping=!0,h.dampingFactor=.2,h.rotateSpeed=.6,h.zoomSpeed=2,h.enablePan=!0,h.maxDistance=3e3,h.target.set(0,15,0),h.listenToKeyEvents(window),h.keys={LEFT:"KeyA",UP:"KeyW",RIGHT:"KeyD",BOTTOM:"KeyS"},$e.onProgress=(a,s,d)=>{this.process=100-s/d*100+"%",this.process==="0%"&&this.animate()},window.addEventListener("resize",this.onWindowResize)},onWindowResize(){U.aspect=window.innerWidth/window.innerHeight,U.updateProjectionMatrix(),W.setSize(window.innerWidth,window.innerHeight),this.render()},render(){A.update(hn.getDelta()),W.render(V,U)},animate(){this.hasInit=!0,requestAnimationFrame(this.animate),h.update(),this.render()},addSky(){const e="varying vec3 vWorldPosition;void main() {vec4 worldPosition = modelMatrix * vec4( position, 1.0 );vWorldPosition = worldPosition.xyz;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}",t="uniform vec3 topColor;uniform vec3 bottomColor;uniform float offset;uniform float exponent;varying vec3 vWorldPosition;void main() {float h = normalize( vWorldPosition + offset ).y;gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );}",n={topColor:{type:"c",value:new w(0)},bottomColor:{type:"c",value:new w(30719)},offset:{type:"f",value:500},exponent:{type:"f",value:1}},r=new ce(4e3,32,15),o=new le({uniforms:n,vertexShader:e,fragmentShader:t,side:ve});fn.add(new K(r,o))}},computed:{},watch:{}},_n=e=>(ue("data-v-db86a0fe"),e=e(),pe(),e),gn=_n(()=>u("div",{id:"container"},null,-1));function vn(e,t,n,r,o,i){const a=R("loading");return c(),_(ie,null,[gn,u("button",{id:"startButton",onClick:t[0]||(t[0]=(...s)=>i.play&&i.play(...s))}),o.process!=="0%"?(c(),Q(a,{key:0,process:o.process},null,8,["process"])):Me("",!0)],64)}var bn=v(wn,[["render",vn],["__scopeId","data-v-db86a0fe"]]),yn=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:bn});let Qe,G,P,I,E,g,we=!1,N;const xn=new Pe,Sn={routeInfo:{meta:{title:"\u5371\u9669\u6D3E\u5BF9"},hidden:!0,sort:1},components:{},data(){return{isStarted:!1,process:"100%"}},beforeCreate(){},created(){},beforeMount(){},mounted(){this.$nextTick(()=>{window.Ammo().then(e=>{this.init()})})},beforeUpdate(){},updated(){},activated(){},deactivated(){},beforeUnmount(){},unmounted(){},methods:{play(){we=!we,g.enable("cameraAnimation",we),g.enable("animation",we),N&&(N.isPlaying?N.pause():N.play())},init(){I=new Z({antialias:!0,logarithmicDepthBuffer:!0}),I.setPixelRatio(window.devicePixelRatio),I.setSize(window.innerWidth,window.innerHeight),I.shadowMap.enabled=!0,Qe=document.getElementById("container"),Qe.appendChild(I.domElement),G=new ee(45,window.innerWidth/window.innerHeight,.1,2e4),G.position.set(0,80,80),P=new te,P.background=new w(16777215);const e=new be(16777215,1,150);e.position.set(50,50,-70),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048;const t=50;e.shadow.camera.left=-t,e.shadow.camera.right=t,e.shadow.camera.top=t,e.shadow.camera.bottom=-t,e.shadow.camera.far=110,e.shadow.bias=-1e-4,P.add(e),P.add(new Ve(e,1)),P.add(new ne(16777215,.8));const n=new X;g=new ye({afterglow:2}),g.enable("animation",!1),g.enable("cameraAnimation",!1),n.loadWithAnimation("./model/\u8352\u6CF7\u4E00\u6597/\u8352\u6CF7\u4E00\u6597.pmx",["./motion/\u5371\u9669\u6D3E\u5BF9/\u7A7A\u57A9 \u52A8\u4F5C\u7248/motion 2.vmd","./motion/\u5371\u9669\u6D3E\u5BF9/eye 2.vmd"],function(o){const i=o.mesh;i.castShadow=!0,i.receiveShadow=!0,P.add(i),g.add(i,{animation:o.animation,physics:!0})}),n.loadWithAnimation("./model/\u4E5D\u6761/\u4E5D\u6761\u88DF\u7F57.pmx",["./motion/\u5371\u9669\u6D3E\u5BF9/\u7A7A\u57A9 \u52A8\u4F5C\u7248/motion 1.vmd","./motion/\u5371\u9669\u6D3E\u5BF9/eye 1.vmd"],function(o){const i=o.mesh;i.castShadow=!0,i.receiveShadow=!0,P.add(i),g.add(i,{animation:o.animation,physics:!0})});const r=new xe;G.add(r),N=new kt(r),new Se().load("./audio/\u5371\u9669\u6D3E\u5BF9.wav",function(o){N.setBuffer(o),N.setLoop(!0)}),new X().load("./stage/\u7B80\u7EA6\u65F6\u5C1A\u821E\u53F0/Stage.pmx",function(o){o.position.set(0,0,20),o.castShadow=!0,o.receiveShadow=!0,P.add(o)}),E=new oe(G,I.domElement),E.enableDamping=!0,E.dampingFactor=.2,E.rotateSpeed=.6,E.zoomSpeed=2,E.enablePan=!0,E.target.set(0,15,0),$e.onProgress=(o,i,a)=>{this.process=100-i/a*100+"%",this.process==="0%"&&(this.animate(),g.enable("animation",!0),setTimeout(()=>{g.enable("animation",!1)},10))},window.addEventListener("resize",this.onWindowResize)},onWindowResize(){G.aspect=window.innerWidth/window.innerHeight,G.updateProjectionMatrix(),I.setSize(window.innerWidth,window.innerHeight),this.render()},render(){g.update(xn.getDelta()),I.render(P,G)},animate(){this.hasInit=!0,requestAnimationFrame(this.animate),E.update(),this.render()}},computed:{},watch:{}},$n=e=>(ue("data-v-8ac90bb6"),e=e(),pe(),e),Mn=$n(()=>u("div",{id:"container"},null,-1));function Pn(e,t,n,r,o,i){const a=R("loading");return c(),_(ie,null,[Mn,u("button",{id:"startButton",onClick:t[0]||(t[0]=(...s)=>i.play&&i.play(...s))}),o.process!=="0%"?(c(),Q(a,{key:0,process:o.process},null,8,["process"])):Me("",!0)],64)}var Cn=v(Sn,[["render",Pn],["__scopeId","data-v-8ac90bb6"]]),Ln=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Cn});const Ze={"/src/pages/3d.vue":Vt,"/src/pages/3dShow.vue":Kt,"/src/pages/index.vue":rn,"/src/pages/mmd1.vue":pn,"/src/pages/mmd2.vue":yn,"/src/pages/mmd3.vue":Ln},ke={};for(const e in Ze){const t=Ze[e],n=e.replace("/src/pages/","").replace(".vue","").replace(/\//g,".");zt.set(ke,n,{component:t.default,filePath:e})}const et=[],ze=(e,t,n)=>{var o,i;let r;if(t.index){r=_e({name:n,component:t.index.component,path:`/${n}`,children:[]},(o=t.index.component)==null?void 0:o.routeInfo),e.push(r);for(const a in t)["component","index"].includes(a)||ze(r.children,t[a],`${n}/${a.replace("_",":")}`);return}if(!t.component){for(const a in t)ze(e,t[a],`${n}/${a.replace("_",":")}`);return}r=_e({name:n,component:t.component,path:`/${n}`},(i=t.component)==null?void 0:i.routeInfo),e.push(r)};for(const e in ke)ze(et,ke[e],e);const kn={name:"Home"};function zn(e,t,n,r,o,i){const a=R("router-view");return c(),Q(a)}var Wn=v(kn,[["render",zn],["__scopeId","data-v-7001b652"]]);const An={name:"Views404",components:{},data(){return{}},beforeCreate(){},created(){},beforeMount(){},mounted(){},beforeUpdate(){},updated(){},activated(){},deactivated(){},beforeUnmount(){},unmounted(){},methods:{},computed:{},watch:{}},In=e=>(ue("data-v-08686dcc"),e=e(),pe(),e),En={class:"not-found"},Fn=In(()=>u("i",{class:"iconfont icon-404"},null,-1)),jn=Ue(" \u56DE\u5230\u9996\u9875 ");function Rn(e,t,n,r,o,i){const a=R("router-link");return c(),_("div",En,[Fn,u("p",null,[Te(a,{to:"/"},{default:Oe(()=>[jn]),_:1})])])}var Bn=v(An,[["render",Rn],["__scopeId","data-v-08686dcc"]]);const tt=Wt({history:At("/"),routes:[{name:"Home",path:"/",redirect:"/index",component:Wn,children:et},{name:"NotFound",path:"/:pathMatch(.*)*",component:Bn,meta:{title:"\u9875\u9762\u4E0D\u5B58\u5728"}}]});tt.beforeEach((e,t,n)=>{const r=e.meta.title?e.meta.title+" - MMD":"MMD";document.title=r,n()});var Hn=It({state:{},mutations:{},actions:{},modules:{}});const Dn="modulepreload",nt={},Tn="/",On=function(t,n){return!n||n.length===0?t():Promise.all(n.map(r=>{if(r=`${Tn}${r}`,r in nt)return;nt[r]=!0;const o=r.endsWith(".css"),i=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${i}`))return;const a=document.createElement("link");if(a.rel=o?"stylesheet":Dn,o||(a.as="script",a.crossOrigin=""),a.href=r,document.head.appendChild(a),o)return new Promise((s,d)=>{a.addEventListener("load",s),a.addEventListener("error",d)})})).then(()=>t())};var Un={install:e=>{const t={"./Loading.vue":()=>On(()=>import("./Loading.c46c116d.js"),["assets/Loading.c46c116d.js","assets/Loading.306cfd50.css","assets/vendor.a377251d.js"])};for(const n in t)e.component(n.match(/\.\/(.+?)\.vue/)[1],Et(t[n]))}},Vn={install:(e,t)=>{}};const ot=Ft(Ht);ot.use(Hn).use(Un).use(tt).use(Vn);ot.mount("#app");export{v as _};

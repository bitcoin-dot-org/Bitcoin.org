function addEvent(a,b,c){
//Attach event to a DOM node.
//Ex. addEvent(node,'click',function);
return (a.addEventListener)?a.addEventListener(b,c,false):(a.attachEvent)?a.attachEvent('on'+b,c):false;
}

function removeEvent(a,b,c){
//Detach event from a DOM node.
//Ex. removeEvent(node,'click',function);
return (a.removeEventListener)?a.removeEventListener(b,c,false):(a.detachEvent)?a.detachEvent('on'+b,c):false;
}

function cancelEvent(e){
//Cancel current event.
//Ex. cancelEvent(event);
if(!e)var e=window.event;(e.preventDefault)?e.preventDefault():e.returnValue=false;
}

function getEventTarget(e){
//Return target DOM node on which the event is triggered.
//Ex. getEventTarget(event);
if(!e)var e=window.event;return (e.target&&e.target.nodeType==3)?e.target.parentNode:(e.target)?e.target:e.srcElement;
}

function getStyle(a,b){
//Return the value of the computed style on a DOM node.
//Ex. getStyle(node,'padding-bottom');
if(window.getComputedStyle)return document.defaultView.getComputedStyle(a,null).getPropertyValue(b);
var n=b.indexOf('-');
if(n!==-1)b=b.substr(0,n)+b.substr(n+1,1).toUpperCase()+b.substr(n+2);
return a.currentStyle[b];
}

function getWidth(a){
//Return the integer value of the computed width of a DOM node.
//Ex. getWidth(node);
var w=getStyle(a,'width');
if(w.indexOf('px')!==-1)return parseInt(w.replace('px',''));
var p=[getStyle(a,'padding-top'),getStyle(a,'padding-right'),getStyle(a,'padding-bottom'),getStyle(a,'padding-left')];
for(var i=0;i<4;i++){
	if(p[i].indexOf('px')!==-1)p[i]=parseInt(p[i]);
	else p[i]=0;
}
return Math.max(0,a.offsetWidth-p[1]-p[3]);
}

function getHeight(a){
//Return the integer value of the computed height of a DOM node.
//Ex. getHeight(node);
var h=getStyle(a,'height');
if(h.indexOf('px')!==-1)return parseInt(h.replace('px',''));
var p=[getStyle(a,'padding-top'),getStyle(a,'padding-right'),getStyle(a,'padding-bottom'),getStyle(a,'padding-left')];
for(var i=0;i<4;i++){
	if(p[i].indexOf('px')!==-1)p[i]=parseInt(p[i]);
	else p[i]=0;
}
return Math.max(0,a.offsetHeight-p[0]-p[2]);
}

function supportsSVG(){
//Return true if the browser supports SVG.
//Ex. if(!supportsSVG()){..apply png fallback..}
//Old FF 3.5 and Safari 3 versions have svg support, but a very poor one
//http://www.w3.org/TR/SVG11/feature#Image Defeat FF 3.5 only
//http://www.w3.org/TR/SVG11/feature#Animation Defeat Saf 3 but also returns false in IE9
//http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute Defeat Saf 3 but also returns false in Chrome and safari4
//http://www.w3.org/TR/SVG11/feature#Text Defeat Saf 3 but also returns false in FF and safari4
if(!document.createElementNS||!document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect)return false;
if(!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"))return false;
if(!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute","1.1")&&!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Animation","1.1")&&!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Text","1.1"))return false;
return true;
}

function fallbackSVG(){
//Replace all images extensions from .svg to .png if browser doesn't support SVG files.
if(supportsSVG())return;  
for(var i=0,nd=document.getElementsByTagName('*'),n=nd.length;i<n;i++){
	if(nd[i].nodeName=='IMG'&&/.*\.svg$/.test(nd[i].src))nd[i].src=nd[i].src.slice(0,-3)+'png';
	if(/\.svg/.test(getStyle(nd[i],'background-image')))nd[i].style.backgroundImage=getStyle(nd[i],'background-image').replace('.svg','.png');
	if(/\.svg/.test(getStyle(nd[i],'background')))nd[i].style.background=getStyle(nd[i],'background').replace('.svg','.png');
}
}

function walletShow(e){
//Replace a wallet disclaimer by the wallet description in the "Choose your wallet" page when the user click the button.
var t=getEventTarget(e);
while(t.getAttribute('data-id')===null||t.getAttribute('data-id')=='')t=t.parentNode;
var d=t.getElementsByTagName('DIV')[0];
var s=document.getElementById(t.getAttribute('data-id')).getElementsByTagName('DIV')[0];
cancelEvent(e);
//Add a delay before replacing wallet bubble for mobiles to prevent accidental clicks
setTimeout(function(){
	d.getElementsByTagName('H2')[0].innerHTML=s.getElementsByTagName('H2')[0].innerHTML;
	d.getElementsByTagName('SPAN')[0].innerHTML=s.getElementsByTagName('SPAN')[0].innerHTML;
	d.getElementsByTagName('P')[0].innerHTML=s.getElementsByTagName('P')[0].innerHTML;
	d.getElementsByTagName('P')[1].getElementsByTagName('A')[0].innerHTML=s.getElementsByTagName('P')[1].getElementsByTagName('A')[0].innerHTML;
	d.getElementsByTagName('P')[1].getElementsByTagName('A')[0].href=s.getElementsByTagName('P')[1].getElementsByTagName('A')[0].href;
	d.getElementsByTagName('P')[1].getElementsByTagName('A')[0].onclick='';
	d.className='';
	//Workaround for browsers that don't handle re-rendering class styles and svg (they have backgroundImage hardcoded in HTML)
	for(var ii=0,nn=d.childNodes.length;ii<nn;ii++){if(d.childNodes[ii].nodeType==1&&d.childNodes[ii].style.backgroundImage!='')d.childNodes[ii].style.backgroundImage=d.childNodes[ii].style.backgroundImage.replace('bubblewarn','bubble').replace('bubbleinfo','bubble');}
	for(var ii=0,as=d.parentNode.getElementsByTagName('A'),nn=as.length;ii<nn;ii++){if(as[ii].parentNode==d.parentNode){var dd=as[ii];break;}}
	for(var ii=0,as=s.parentNode.getElementsByTagName('A'),nn=as.length;ii<nn;ii++){if(as[ii].parentNode==s.parentNode){var ss=as[ii];break;}}
	dd.innerHTML=ss.innerHTML;
},1);
}

function mobileMenuShow(e){
//Show the mobile menu when the visitors touch the menu icon.
var mm=document.getElementById('menusimple');
var ml=document.getElementById('langselect');
var t=document.getElementById('menumobile');
if(mm.style.display=='block'){mm.style.display='';ml.style.display='';}
else{mm.style.display='block';ml.style.display='inline-block';}
t.parentNode.removeChild(t);
cancelEvent(e);
}

function mobileMenuHover(e){
//Add a delay before hidding menu for mobiles to prevent accidental clicks
var t=getEventTarget(e);
while(t.nodeName!='LI'||!t.parentNode.id)t=t.parentNode;
var p=t.getElementsByTagName('UL')[0];
p.className='hover';
setTimeout(function(){
for(var i=0,nd=t.parentNode.getElementsByTagName('UL'),n=nd.length;i<n;i++){
	if(nd[i]==p)continue;
	nd[i].className='';
}
},1);
cancelEvent(e);
}

function boxShow(e){
//Display the box content when the user click a box on the "Secure your wallet" page.
var p=t=getEventTarget(e);
while(p.nodeName!='DIV')p=p.parentNode;
var sh=getHeight(p);
for(var i=0,nds=p.childNodes,n=nds.length;i<n;i++)if(nds[i].nodeType==1)nds[i].style.display='block';
t.removeAttribute('href');
t.onclick='';
var dh=getHeight(p);
p.style.height=sh+'px';
setTimeout(function(){
	p.style.transition='height 400ms ease-out';
	p.style.MozTransition='height 400ms ease-out';
	p.style.WebkitTransition='height 400ms ease-out';
	setTimeout(function(){p.style.height=dh+'px';},20);
},20);
cancelEvent(e);
}

function faqShow(e){
//Display the content of a question in the FAQ at user request.
var p=t=getEventTarget(e);
while(p.nodeType!=1||p.nodeName!='DIV')p=p.nextSibling;
var pp=p.cloneNode(true);
pp.style.visibility='hidden';
pp.style.height='auto';
p.parentNode.appendChild(pp);
var nhe=getHeight(pp);
pp.parentNode.removeChild(pp);
if(p.style.height!='0px'&&p.style.height!='')p.style.height='0px';
else p.style.height=nhe+'px';
cancelEvent(e);
}

function materialShow(e){
//Display more materials on the "Press center" page at user request.
var p=t=getEventTarget(e);
while(p.nodeType!=1||p.nodeName!='DIV')p=p.previousSibling;
var pp=p.cloneNode(true);
pp.style.visibility='hidden';
pp.style.height='auto';
p.parentNode.appendChild(pp);
var nhe=getHeight(pp);
pp.parentNode.removeChild(pp);
if(p.style.height!='0px'&&p.style.height!='')p.style.height='0px';
else p.style.height=nhe+'px';
t.style.display='none';
cancelEvent(e);
}

function librariesShow(e){
//Display more open source projects on the "Development" page at user request.
var p=t=getEventTarget(e);
while(p.nodeType!=1||p.nodeName!='UL')p=p.parentNode;
var sh=getHeight(p);
for(var i=0,nds=p.getElementsByTagName('LI'),n=nds.length;i<n;i++)nds[i].style.display='list-item';
t.parentNode.parentNode.removeChild(t.parentNode);
var dh=getHeight(p);
p.style.height=sh+'px';
setTimeout(function(){
	p.style.transition='height 400ms ease-out';
	p.style.MozTransition='height 400ms ease-out';
	p.style.WebkitTransition='height 400ms ease-out';
	setTimeout(function(){p.style.height=dh+'px';},20);
},20);
cancelEvent(e);
}

function freenodeShow(e){
//Display freenode chat window on the "Development" page at user request.
document.getElementById('chatbox').innerHTML='<iframe style=width:98%;min-width:400px;height:600px src="http://webchat.freenode.net/?channels=bitcoin-dev" />';
cancelEvent(e);
}

function mobileWHover(e){
//Display wallet bubbles for mobiles
var div=t=getEventTarget(e);
while(div.nodeName!='DIV')div=div.parentNode;
//Hide bubbles when clicking outside of a bubble
if(div.className.indexOf('previewmobile')!==-1)mobileWHide();
//Show bubble when clicking on their icon
if(div.parentNode.className.indexOf('previewmobile')!==-1){
	mobileWHide();
	t=div.getElementsByTagName('DIV')[0];
	t.style.opacity=0;
	t.style.display='block';
	//Add a delay before displaying wallet for mobiles to prevent accidental clicks
	setTimeout(function(){t.style.opacity=100;},1);
	//Add event listener to hide bubble on scroll
	addEvent(window,'scroll',mobileWHide);
}
}
  
function mobileWHide(){
//Hide all wallet bubbles on mobiles
for(var i=0,nds=document.getElementsByTagName('DIV'),n=nds.length;i<n;i++){
	if(nds[i].parentNode&&nds[i].parentNode.parentNode&&nds[i].parentNode.parentNode.className.indexOf('previewmobile')!==-1){
	nds[i].style.opacity=0;nds[i].style.display='none';}
}
removeEvent(window,'scroll',mobileWHide);
}

function makeEditable(e){
//An easter egg that makes the page editable when user click on the page and hold their mouse button for one second.
//This trick allows translators and writers to preview their work.
if(!e)var e=window.event;
switch(e.type){
case 'mousedown':
if((e.which&&e.which==3)||(e.button&&e.button==2))return;
addEvent(document.body,'mouseup',makeEditable);
addEvent(document.body,'mousemove',makeEditable);
document.body.setAttribute('timeoutEdit',setTimeout(function(){
	removeEvent(document.body,'mouseup',makeEditable);
	removeEvent(document.body,'mousemove',makeEditable);
	var c=document.getElementById('content');
	c.contentEditable=true;
	c.style.borderColor='#bfbfbf';
	setTimeout(function(){c.style.borderColor='';},200);
},1000));
break;
case 'mouseup':
case 'mousemove':
removeEvent(document.body,'mouseup',makeEditable);
removeEvent(document.body,'mousemove',makeEditable);
clearTimeout(document.body.getAttribute('timeoutEdit'));
break;
}
}

//Add makeEditable event listener
var xint=setInterval(function(){
if(!document.body)return;
addEvent(document.body,'mousedown',makeEditable);
clearInterval(xint);
},200);

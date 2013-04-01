function cancelEvent(e){if(!e)var e=window.event;(e.preventDefault)?e.preventDefault():e.returnValue=false;}
function supportsSVG(){
//Old FF 3.5 and Safari 3 versions have a very poor svg support
//http://www.w3.org/TR/SVG11/feature#Image Defeat FF 3.5 only
//http://www.w3.org/TR/SVG11/feature#Animation Defeat Saf 3 but also returns false in IE9
//http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute Defeat Saf 3 but also returns false in Chrome and safari4
//http://www.w3.org/TR/SVG11/feature#Text Defeat Saf 3 but also returns false in FF and safari4
if(!document.createElementNS||!document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect)return false;
if(!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"))return false;
if(!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicGraphicsAttribute","1.1")&&!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Animation","1.1")&&!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Text","1.1"))return false;
return true;
}
function getStyle(a,b){
if(window.getComputedStyle)return document.defaultView.getComputedStyle(a,null).getPropertyValue(b);
var n=b.indexOf('-');
if(n!==-1)b=b.substr(0,n)+b.substr(n+1,1).toUpperCase()+b.substr(n+2);
return a.currentStyle[b];
}
function svgfallback(){
if(supportsSVG())return;  
for(var i=0,nd=document.getElementsByTagName('*'),n=nd.length;i<n;i++){
	if(nd[i].nodeName=='IMG'&&/.*\.svg$/.test(nd[i].src))nd[i].src=nd[i].src.slice(0,-3)+'png';
	if(/\.svg/.test(getStyle(nd[i],'background-image')))nd[i].style.backgroundImage=getStyle(nd[i],'background-image').replace('.svg','.png');
	if(/\.svg/.test(getStyle(nd[i],'background')))nd[i].style.background=getStyle(nd[i],'background').replace('.svg','.png');
}
}
function walletshow(){
for(var i=0,nd=document.getElementsByTagName('*'),n=nd.length;i<n;i++){
	if(nd[i].getAttribute('data-id')===null||nd[i].getAttribute('data-id')=='')continue;
	var d=nd[i].getElementsByTagName('DIV')[0];
	var s=document.getElementById(nd[i].getAttribute('data-id')).getElementsByTagName('DIV')[0];
	d.innerHTML=s.innerHTML;
	d.className='';
	//Workaround for browsers that don't handle re-rendering class styles and svg (they have backgroundImage hardcoded in HTML)
	if(d.style.backgroundImage!='')d.style.backgroundImage=d.style.backgroundImage.replace('bubblewarn','bubble');
	for(var ii=0,as=d.parentNode.getElementsByTagName('A'),nn=as.length;ii<nn;ii++){if(as[ii].parentNode==d.parentNode){var dd=as[ii];break;}}
	for(var ii=0,as=s.parentNode.getElementsByTagName('A'),nn=as.length;ii<nn;ii++){if(as[ii].parentNode==s.parentNode){var ss=as[ii];break;}}
	dd.innerHTML=ss.innerHTML;
}
}
function mobileshow(e){
cancelEvent(e);
var mm=document.getElementById('menu');
var mf=document.getElementById('menufor');
var ml=document.getElementById('langselect');
var t=document.getElementById('menumobile');
if(mf.style.display=='block'){mf.style.display='';mm.style.display='';ml.style.display='';}
else{mf.style.display='block';mm.style.display='block';ml.style.display='inline-block';}
t.parentNode.removeChild(t);
return false;
}

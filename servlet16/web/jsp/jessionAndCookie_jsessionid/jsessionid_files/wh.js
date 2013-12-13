/* Baidu Inc. Copyright. */
;(function(){
if(!PluginDetect)var PluginDetect={getNum:function(a,b){if(!this.num(a))return null;var c;return(c="undefined"==typeof b?/[\d][\d\.\_,-]*/.exec(a):RegExp(b).exec(a))?c[0].replace(/[\.\_-]/g,","):null},hasMimeType:function(a){if(PluginDetect.isIE)return null;var b,c,d=a.constructor==String?[a]:a;for(c=0;c<d.length;c++)if((a=navigator.mimeTypes[d[c]])&&a.enabledPlugin)if(b=a.enabledPlugin,b.name||b.description)return a;return null},findNavPlugin:function(a,b){for(var c=a.constructor==String?a:a.join(".*"),
d=!1===b?"":"\\d",d=RegExp(c+".*"+d+"|"+d+".*"+c,"i"),f=navigator.plugins,c=0;c<f.length;c++)if(d.test(f[c].description)||d.test(f[c].name))return f[c];return null},AXO:window.ActiveXObject,getAXO:function(a,b){var c=null,d=!1;try{c=new this.AXO(a),d=!0}catch(f){}return"undefined"!=typeof b?(delete c,d):c},num:function(a){return"string"!=typeof a?!1:/\d/.test(a)},compareNums:function(a,b){var c,d,f,k=window.parseInt;if(!this.num(a)||!this.num(b))return 0;if(this.plugin&&this.plugin.compareNums)return this.plugin.compareNums(a,
b);c=a.split(",");d=b.split(",");for(f=0;f<Math.min(c.length,d.length);f++){if(k(c[f],10)>k(d[f],10))return 1;if(k(c[f],10)<k(d[f],10))return-1}return 0},formatNum:function(a){if(!this.num(a))return null;for(var b=a.replace(/\s/g,"").replace(/[\.\_]/g,",").split(",").concat(["0","0","0","0"]),a=0;4>a;a++)/^(0+)(.+)$/.test(b[a])&&(b[a]=RegExp.$2);/\d/.test(b[0])||(b[0]="0");return b[0]+","+b[1]+","+b[2]+","+b[3]},initScript:function(){var a=navigator.userAgent;this.IEver=(this.isIE=!1,-1);this.ActiveXEnabled=
!1;if(this.isIE){var b,c="Msxml2.XMLHTTP,Msxml2.DOMDocument,Microsoft.XMLDOM,ShockwaveFlash.ShockwaveFlash,TDCCtl.TDCCtl,Shell.UIHelper,Scripting.Dictionary,wmplayer.ocx".split(",");for(b=0;b<c.length;b++)if(this.getAXO(c[b],1)){this.ActiveXEnabled=!0;break}this.head="undefined"!=typeof document.getElementsByTagName?document.getElementsByTagName("head")[0]:null}this.GeckoRV=(this.isGecko=!this.isIE&&"string"==typeof navigator.product&&/Gecko/i.test(navigator.product)&&/Gecko\s*\/\s*\d/i.test(a)?!0:
!1)?this.formatNum(/rv\s*\:\s*([\.\,\d]+)/i.test(a)?RegExp.$1:"0.9"):null;this.isSafari=!this.isIE&&/Safari\s*\/\s*\d/i.test(a)?!0:!1;this.isChrome=/Chrome\s*\/\s*\d/i.test(a)?!0:!1;this.onWindowLoaded(0)},init:function(a,b){if("string"!=typeof a)return-3;var a=a.toLowerCase().replace(/\s/g,""),c;if("undefined"==typeof this[a])return-3;this.plugin=c=this[a];if("undefined"==typeof c.installed||!0==b)c.installed=null,c.version=null,c.version0=null,c.getVersionDone=null,c.$=this;this.garbage=!1;return this.isIE&&
!this.ActiveXEnabled&&this.plugin!=this.java?-2:1},isMinVersion:function(){return-3},getVersion:function(a,b,c){var d=PluginDetect;if(0>d.init(a))return null;a=d.plugin;1!=a.getVersionDone&&(a.getVersion(b,c),null===a.getVersionDone&&(a.getVersionDone=1));d.cleanup();return a.version||a.version0},getInfo:function(a,b,c){var d={},f=PluginDetect,k;if(0>f.init(a))return d;k=f.plugin;"undefined"!=typeof k.getInfo&&(null===k.getVersionDone&&f.getVersion(a,b,c),d=k.getInfo());return d},cleanup:function(){this.garbage&&
"undefined"!=typeof window.CollectGarbage&&window.CollectGarbage()},isActiveXObject:function(a){a='<object width="1" height="1" style="display:none" '+this.plugin.getCodeBaseVersion(a)+">"+this.plugin.HTML+"</object>";this.head.firstChild?this.head.insertBefore(document.createElement("object"),this.head.firstChild):this.head.appendChild(document.createElement("object"));this.head.firstChild.outerHTML=a;try{this.head.firstChild.classid=this.plugin.classID}catch(b){}a=!1;try{this.head.firstChild.object&&
(a=!0)}catch(c){}try{a&&4>this.head.firstChild.readyState&&(this.garbage=!0)}catch(d){}this.head.removeChild(this.head.firstChild);return a},codebaseSearch:function(a){var b=this;if(!b.ActiveXEnabled)return null;if("undefined"!=typeof a)return b.isActiveXObject(a);for(var c=[0,0,0,0],d,f=b.plugin.digits,k=function(a,l){return b.isActiveXObject((0==a?l:c[0])+","+(1==a?l:c[1])+","+(2==a?l:c[2])+","+(3==a?l:c[3]))},l,e,m=!1,a=0;a<f.length;a++){l=2*f[a];for(d=c[a]=0;20>d&&!(1==l&&0<a&&m);d++)if(1<l-c[a])e=
Math.round((l+c[a])/2),k(a,e)?(c[a]=e,m=!0):l=e;else{1==l-c[a]&&l--;!m&&k(a,l)&&(m=!0);break}if(!m)return null}return c.join(",")},dummy1:0};PluginDetect.onDetectionDone=function(){return-1};
PluginDetect.onWindowLoaded=function(a){var b=PluginDetect,c=window;!0!==b.EventWinLoad&&(b.winLoaded=!1,b.EventWinLoad=!0,"undefined"!=typeof c.addEventListener?c.addEventListener("load",b.runFuncs,!1):"undefined"!=typeof c.attachEvent?c.attachEvent("onload",b.runFuncs):("function"==typeof c.onload&&(b.funcs[b.funcs.length]=c.onload),c.onload=b.runFuncs));"function"==typeof a&&(b.funcs[b.funcs.length]=a)};PluginDetect.funcs=[0];
PluginDetect.runFuncs=function(){var a=PluginDetect,b;a.winLoaded=!0;for(b=0;b<a.funcs.length;b++)"function"==typeof a.funcs[b]&&(a.funcs[b](a),a.funcs[b]=null)};
PluginDetect.quicktime={mimeType:["video/quicktime","application/x-quicktimeplayer","image/x-macpaint","image/x-quicktime"],progID:"QuickTimeCheckObject.QuickTimeCheck.1",progID0:"QuickTime.QuickTime",classID:"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",minIEver:7,HTML:'<param name="src" value="A14999.mov" /><param name="controller" value="false" />',getCodeBaseVersion:function(a){return'codebase="#version='+a+'"'},digits:[8,64,16,0],clipTo3digits:function(a){if(null===a||"undefined"==typeof a)return null;
var b,c=this.$;b=a.split(",");a=(0>c.compareNums(a,"7,60,0,0")&&0<=c.compareNums(a,"7,50,0,0")?b[0]+","+b[1].charAt(0)+","+b[1].charAt(1)+","+b[2]:b[0]+","+b[1]+","+b[2]+","+b[3]).split(",");return a[0]+","+a[1]+","+a[2]+",0"},getVersion:function(){var a=null,b,c=this.$;b=!0;if(c.isIE){if(c.IEver>=this.minIEver&&c.getAXO(this.progID0,1))a=c.codebaseSearch();else if((b=c.getAXO(this.progID))&&b.QuickTimeVersion)a=b.QuickTimeVersion.toString(16),a=a.charAt(0)+"."+a.charAt(1)+"."+a.charAt(2);this.installed=
a?1:c.getAXO(this.progID0,1)?0:-1}else navigator.platform&&/linux/i.test(navigator.platform)&&(b=!1),b&&(b=c.findNavPlugin(["QuickTime","(Plug-in|Plugin)"]))&&b.name&&c.hasMimeType(this.mimeType)&&(a=c.getNum(b.name)),this.installed=a?1:-1;this.version=this.clipTo3digits(c.formatNum(a))}};
PluginDetect.devalvr={mimeType:"application/x-devalvrx",progID:"DevalVRXCtrl.DevalVRXCtrl.1",classID:"clsid:5D2CF9D0-113A-476B-986F-288B54571614",getVersion:function(){var a=null,b,c=this.$;if(c.isIE){var d,f;if(d=c.getAXO(this.progID,1)){b=c.instantiate("object",["classid",this.classID],["src",""]);if(f=c.getObject(b))try{f.pluginversion&&(a="00000000"+f.pluginversion.toString(16),a=a.substr(a.length-8,8),a=parseInt(a.substr(0,2),16)+","+parseInt(a.substr(2,2),16)+","+parseInt(a.substr(4,2),16)+
","+parseInt(a.substr(6,2),16))}catch(k){}c.uninstantiate(b)}this.installed=a?1:d?0:-1}else(b=c.findNavPlugin("DevalVR"))&&b.name&&c.hasMimeType(this.mimeType)&&(a=b.description.split(" ")[3]),this.installed=a?1:-1;this.version=c.formatNum(a)}};
PluginDetect.flash={mimeType:["application/x-shockwave-flash","application/futuresplash"],progID:"ShockwaveFlash.ShockwaveFlash",classID:"clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",getVersion:function(){var a=function(a){return!a?null:(a=/[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(a))?a[0].replace(/[rRdD\.]/g,",").replace(/\s/g,""):null},b,c=this.$,d=null,f=null,k=null;if(c.isIE){for(b=15;2<b;b--)if(f=c.getAXO(this.progID+"."+b)){k=b.toString();break}if("6"==k)try{f.AllowScriptAccess="always"}catch(l){return"6,0,21,0"}try{d=
a(f.GetVariable("$version"))}catch(e){}!d&&k&&(d=k)}else(b=c.findNavPlugin("Flash"))&&b.description&&c.hasMimeType(this.mimeType)&&(d=a(b.description));this.installed=d?1:-1;this.version=c.formatNum(d);return!0}};
PluginDetect.shockwave={mimeType:"application/x-director",progID:"SWCtl.SWCtl",classID:"clsid:166B1BCA-3F9C-11CF-8075-444553540000",getVersion:function(){var a=null,b=null,c=this.$;if(c.isIE){try{b=c.getAXO(this.progID).ShockwaveVersion("")}catch(d){}"string"==typeof b&&0<b.length?a=c.getNum(b):c.getAXO(this.progID+".8",1)?a="8":c.getAXO(this.progID+".7",1)?a="7":c.getAXO(this.progID+".1",1)&&(a="6")}else(b=c.findNavPlugin("Shockwave for Director"))&&b.description&&c.hasMimeType(this.mimeType)&&(a=
c.getNum(b.description));this.installed=a?1:-1;this.version=c.formatNum(a)}};PluginDetect.div=null;PluginDetect.pluginSize=1;PluginDetect.DOMbody=null;
PluginDetect.uninstantiate=function(a){if(a)try{a[0]&&a[0].firstChild&&a[0].removeChild(a[0].firstChild),a[0]&&this.div&&this.div.removeChild(a[0]),this.div&&0==this.div.childNodes.length&&(this.div.parentNode.removeChild(this.div),this.div=null,this.DOMbody&&this.DOMbody.parentNode&&this.DOMbody.parentNode.removeChild(this.DOMbody),this.DOMbody=null),a[0]=null}catch(b){}};
PluginDetect.getObject=function(a,b){var c=null;try{a&&a[0]&&a[0].firstChild&&(c=a[0].firstChild)}catch(d){}try{b&&c&&"undefined"!=typeof c.focus&&"undefined"!=typeof document.hasFocus&&!document.hasFocus()&&c.focus()}catch(f){}return c};PluginDetect.getContainer=function(a){var b=null;a&&a[0]&&(b=a[0]);return b};PluginDetect.hideObject=function(a){if((a=this.getObject(a))&&a.style)a.style.height="0"};
PluginDetect.instantiate=function(a,b,c,d){var f=function(a){var b=a.style;b&&(b.border="0px",b.padding="0px",b.margin="0px",b.fontSize=l.pluginSize+3+"px",b.height=l.pluginSize+3+"px",b.visibility="visible",a.tagName&&"div"==a.tagName.toLowerCase()?(b.width="100%",b.display="block"):a.tagName&&"span"==a.tagName.toLowerCase()&&(b.width=l.pluginSize+"px",b.display="inline"))},k=document,l=this,e,m=k.getElementsByTagName("body")[0]||k.body,p=k.createElement("span"),n;"undefined"==typeof d&&(d="");e=
"<"+a+' width="'+l.pluginSize+'" height="'+l.pluginSize+'" ';for(n=0;n<b.length;n+=2)e+=b[n]+'="'+b[n+1]+'" ';e+=">";for(n=0;n<c.length;n+=2)e+='<param name="'+c[n]+'" value="'+c[n+1]+'" />';e+=d+"</"+a+">";if(!l.div){l.div=k.createElement("div");if(a=k.getElementById("plugindetect"))f(a),a.appendChild(l.div);else if(m)try{m.firstChild&&"undefined"!=typeof m.insertBefore?m.insertBefore(l.div,m.firstChild):m.appendChild(l.div)}catch(o){}else try{k.write('<div id="pd33993399">o</div>'),m=k.getElementsByTagName("body")[0]||
k.body,m.appendChild(l.div),m.removeChild(k.getElementById("pd33993399"))}catch(g){try{l.DOMbody=k.createElement("body"),k.getElementsByTagName("html")[0].appendChild(l.DOMbody),l.DOMbody.appendChild(l.div)}catch(h){}}f(l.div)}if(l.div&&l.div.parentNode&&l.div.parentNode.parentNode){l.div.appendChild(p);try{p.innerHTML=e}catch(i){}f(p);return[p]}return[null]};
PluginDetect.windowsmediaplayer={mimeType:["application/x-mplayer2","application/asx"],progID:"wmplayer.ocx",classID:"clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6",getVersion:function(){var a=null,b=this.$,c=null;this.installed=-1;if(b.isIE){if(c=b.getAXO(this.progID))a=c.versionInfo}else if(b.hasMimeType(this.mimeType)){if(b.findNavPlugin(["Windows","Media","(Plug-in|Plugin)"],!1)||b.findNavPlugin(["Flip4Mac","Windows","Media"],!1))this.installed=0;if(!(b.isGecko&&0>b.compareNums(b.GeckoRV,b.formatNum("1.8")))&&
b.findNavPlugin(["Windows","Media","Firefox Plugin"],!1)){var c=b.instantiate("object",["type",this.mimeType[0]],[]),d=b.getObject(c);d&&(a=d.versionInfo);b.uninstantiate(c)}}a&&(this.installed=1);this.version=b.formatNum(a)}};
PluginDetect.silverlight={mimeType:"application/x-silverlight",progID:"AgControl.AgControl",digits:[9,20,9,12,31],getVersion:function(){var a=this.$,b=null,c=null,d=!1;if(a.isIE){var c=a.getAXO(this.progID),f=[1,0,1,1,1],k,l,e=function(a){return(10>a?"0":"")+a.toString()},m=function(a,b){var l=(0==a?b:f[0])+"."+(1==a?b:f[1])+"."+(2==a?b:f[2])+e(3==a?b:f[3])+e(4==a?b:f[4])+".0";try{return c.IsVersionSupported(l)}catch(d){}return!1};if(c&&"undefined"!=typeof c.IsVersionSupported){for(k=0;k<this.digits.length;k++){l=
f[k];for(l+=0==k?0:1;l<=this.digits[k];l++)if(m(k,l))d=!0,f[k]=l;else break;if(!d)break}d&&(b=f[0]+"."+f[1]+"."+f[2]+e(f[3])+e(f[4])+".0")}}else if(k=[null,null],k=a.findNavPlugin("Silverlight Plug-in",!1),m=a.isGecko&&0>=a.compareNums(a.GeckoRV,a.formatNum("1.6")),k&&a.hasMimeType(this.mimeType)){if(b=a.formatNum(k.description))f=b.split(","),30226<=parseInt(f[2],10)&&2>parseInt(f[0],10)&&(f[0]="2"),b=f.join(",");a.isGecko&&!m&&(d=!0);if(!d&&!m&&b){k=a.instantiate("object",["type",this.mimeType],
[]);if(c=a.getObject(k))"undefined"!=typeof c.IsVersionSupported&&(d=!0),d||(c.data="data:"+this.mimeType+",","undefined"!=typeof c.IsVersionSupported&&(d=!0));a.uninstantiate(k)}}this.installed=d?1:-1;this.version=a.formatNum(b)}};
PluginDetect.vlc={mimeType:"application/x-vlc-plugin",progID:"VideoLAN.VLCPlugin",compareNums:function(a,b){var c=a.split(","),d=b.split(","),f,k,l,e,m;for(f=0;f<Math.min(c.length,d.length);f++){/([\d]+)([a-z]?)/.test(c[f]);k=parseInt(RegExp.$1,10);e=2==f&&0<RegExp.$2.length?RegExp.$2.charCodeAt(0):-1;/([\d]+)([a-z]?)/.test(d[f]);l=parseInt(RegExp.$1,10);m=2==f&&0<RegExp.$2.length?RegExp.$2.charCodeAt(0):-1;if(k!=l)return k>l?1:-1;if(2==f&&e!=m)return e>m?1:-1}return 0},getVersion:function(){var a=
this.$,b,c=null;if(a.isIE){if(b=a.getAXO(this.progID))try{c=a.getNum(b.VersionInfo,"[\\d][\\d\\.]*[a-z]*")}catch(d){}this.installed=b?1:-1}else a.hasMimeType(this.mimeType)&&(b=a.findNavPlugin(["VLC","(Plug-in|Plugin)"],!1))&&b.description&&(c=a.getNum(b.description,"[\\d][\\d\\.]*[a-z]*")),this.installed=c?1:-1;this.version=a.formatNum(c)}};PluginDetect.initScript();
function md5(a){function b(a,b){var c=(a&65535)+(b&65535);return(a>>16)+(b>>16)+(c>>16)<<16|c&65535}function c(a,c,d,f,k,o){a=b(b(c,a),b(f,o));return b(a<<k|a>>>32-k,d)}function d(a,b,d,f,k,o,g){return c(b&d|~b&f,a,b,k,o,g)}function f(a,b,d,f,k,o,g){return c(b&f|d&~f,a,b,k,o,g)}function k(a,b,d,f,k,o,g){return c(d^(b|~f),a,b,k,o,g)}return function(a){var b="",c,d;for(d=0;d<a.length;d+=1)c=a.charCodeAt(d),b+="0123456789abcdef".charAt(c>>>4&15)+"0123456789abcdef".charAt(c&15);return b}(function(a){var e=
unescape(encodeURIComponent(a)),m,a=[];a[(e.length>>2)-1]=void 0;for(m=0;m<a.length;m+=1)a[m]=0;for(m=0;m<8*e.length;m+=8)a[m>>5]|=(e.charCodeAt(m/8)&255)<<m%32;e=8*e.length;a[e>>5]|=128<<e%32;a[(e+64>>>9<<4)+14]=e;for(var p,n,o,g=1732584193,h=-271733879,i=-1732584194,j=271733878,e=0;e<a.length;e+=16)m=g,p=h,n=i,o=j,g=d(g,h,i,j,a[e],7,-680876936),j=d(j,g,h,i,a[e+1],12,-389564586),i=d(i,j,g,h,a[e+2],17,606105819),h=d(h,i,j,g,a[e+3],22,-1044525330),g=d(g,h,i,j,a[e+4],7,-176418897),j=d(j,g,h,i,a[e+5],
12,1200080426),i=d(i,j,g,h,a[e+6],17,-1473231341),h=d(h,i,j,g,a[e+7],22,-45705983),g=d(g,h,i,j,a[e+8],7,1770035416),j=d(j,g,h,i,a[e+9],12,-1958414417),i=d(i,j,g,h,a[e+10],17,-42063),h=d(h,i,j,g,a[e+11],22,-1990404162),g=d(g,h,i,j,a[e+12],7,1804603682),j=d(j,g,h,i,a[e+13],12,-40341101),i=d(i,j,g,h,a[e+14],17,-1502002290),h=d(h,i,j,g,a[e+15],22,1236535329),g=f(g,h,i,j,a[e+1],5,-165796510),j=f(j,g,h,i,a[e+6],9,-1069501632),i=f(i,j,g,h,a[e+11],14,643717713),h=f(h,i,j,g,a[e],20,-373897302),g=f(g,h,i,j,
a[e+5],5,-701558691),j=f(j,g,h,i,a[e+10],9,38016083),i=f(i,j,g,h,a[e+15],14,-660478335),h=f(h,i,j,g,a[e+4],20,-405537848),g=f(g,h,i,j,a[e+9],5,568446438),j=f(j,g,h,i,a[e+14],9,-1019803690),i=f(i,j,g,h,a[e+3],14,-187363961),h=f(h,i,j,g,a[e+8],20,1163531501),g=f(g,h,i,j,a[e+13],5,-1444681467),j=f(j,g,h,i,a[e+2],9,-51403784),i=f(i,j,g,h,a[e+7],14,1735328473),h=f(h,i,j,g,a[e+12],20,-1926607734),g=c(h^i^j,g,h,a[e+5],4,-378558),j=c(g^h^i,j,g,a[e+8],11,-2022574463),i=c(j^g^h,i,j,a[e+11],16,1839030562),h=
c(i^j^g,h,i,a[e+14],23,-35309556),g=c(h^i^j,g,h,a[e+1],4,-1530992060),j=c(g^h^i,j,g,a[e+4],11,1272893353),i=c(j^g^h,i,j,a[e+7],16,-155497632),h=c(i^j^g,h,i,a[e+10],23,-1094730640),g=c(h^i^j,g,h,a[e+13],4,681279174),j=c(g^h^i,j,g,a[e],11,-358537222),i=c(j^g^h,i,j,a[e+3],16,-722521979),h=c(i^j^g,h,i,a[e+6],23,76029189),g=c(h^i^j,g,h,a[e+9],4,-640364487),j=c(g^h^i,j,g,a[e+12],11,-421815835),i=c(j^g^h,i,j,a[e+15],16,530742520),h=c(i^j^g,h,i,a[e+2],23,-995338651),g=k(g,h,i,j,a[e],6,-198630844),j=k(j,g,
h,i,a[e+7],10,1126891415),i=k(i,j,g,h,a[e+14],15,-1416354905),h=k(h,i,j,g,a[e+5],21,-57434055),g=k(g,h,i,j,a[e+12],6,1700485571),j=k(j,g,h,i,a[e+3],10,-1894986606),i=k(i,j,g,h,a[e+10],15,-1051523),h=k(h,i,j,g,a[e+1],21,-2054922799),g=k(g,h,i,j,a[e+8],6,1873313359),j=k(j,g,h,i,a[e+15],10,-30611744),i=k(i,j,g,h,a[e+6],15,-1560198380),h=k(h,i,j,g,a[e+13],21,1309151649),g=k(g,h,i,j,a[e+4],6,-145523070),j=k(j,g,h,i,a[e+11],10,-1120210379),i=k(i,j,g,h,a[e+2],15,718787259),h=k(h,i,j,g,a[e+9],21,-343485551),
g=b(g,m),h=b(h,p),i=b(i,n),j=b(j,o);a=[g,h,i,j];m="";for(e=0;e<32*a.length;e+=8)m+=String.fromCharCode(a[e>>5]>>>e%32&255);return m}(a))}
function log(a,b){var c=window,d=new Image,f="log"+new Date,k=["_="+ +new Date],l;for(l in b)Object.prototype.hasOwnProperty.call(b,l)&&k.push(encodeURIComponent(l)+"="+encodeURIComponent(b[l]));c[f]=d;d.onload=d.onerror=d.onabort=function(){d.onload=d.onerror=d.onabort=null;try{delete c[f]}catch(a){c[f]=void 0}};a+=k.join("&");if("Microsoft Internet Explorer"===navigator.appName&&(k=navigator.userAgent.split(";")[1]))k=/MSIE ([0-9]\.[0-9])/.exec(k)[1],8>+k&&(a=a.slice(0,2048));d.src=a}
var win=window,scr=screen,nav=navigator,debug=-1!==win.location.href.indexOf("debug=true"),decode=-1!==win.location.href.indexOf("decode=true"),store={},each=function(a,b,c){var d=[];if(a.length){for(var f=0;f<a.length;f++)d[d.length]=b.call(c,a[f]);return d}},getCookieRaw=function(a,b){var c,d=RegExp("(^| )"+a+"=([^;]*)(;|$)").exec((b||window).document.cookie);d&&(c=d[2]);return c},setCookieRaw=function(a,b,c){var c=c||{},d=c.expires;"number"==typeof c.expires&&(d=new Date,d.setTime(d.getTime()+
c.expires));document.cookie=a+"="+b+(c.path?"; path="+c.path:"")+(d?"; expires="+d.toGMTString():"")+(c.domain?"; domain="+c.domain:"")+(c.secure?"; secure":"")},params=[{key:"sr",value:function(){return[scr.width,scr.height,scr.colorDepth,win.devicePixelRatio||1].join("x")}},{key:"je",value:function(){return+nav.javaEnabled()}},{key:"ce",value:function(){return+nav.cookieEnabled}},{key:"tz",value:function(){return(new Date).getTimezoneOffset()}},{key:"pl",value:function(){function a(){return each(navigator.plugins,
function(a){var b=each(a,function(a){return[a.type,a.suffixes].join("~")}).join(","),a=[a.name,a.description,b].join(".");return decode?a:md5(a)},this).join("-")}function b(){var a=each("QuickTime,DevalVR,Shockwave,Flash,WindowsMediaplayer,Silverlight,VLC".split(","),function(a){try{var b=PluginDetect.getVersion(a);if(null!==b)return a=a+" "+b,decode?a:md5(a)}catch(c){}return""}),b=function(){var a;if(window.ActiveXObject){for(var b=2;10>b;b++)try{if(a=eval("new ActiveXObject('PDF.PdfCtrl."+b+"');"))return"Adobe Acrobat version"+
b+".?"}catch(c){}try{if(a=new ActiveXObject("PDF.PdfCtrl.1"))return"Adobe Acrobat version 4.?"}catch(d){}try{if(a=new ActiveXObject("AcroPDF.PDF.1"))return"Adobe Acrobat version 7.?"}catch(f){}return""}}();a.push(decode?b:md5(b));var c=[];each(a,function(a){""!==a&&c.push(a)});return c.join("-")}var c;c="Microsoft Internet Explorer"===navigator.appName||"Netscape"===navigator.appName&&/Trident/.test(navigator.userAgent)?!0:!1;return c?b():a()}},{key:"sc",value:function(){var a;return a=""+(function(){var a=
"0";try{win.localStorage.BAIDU_POS_wh="@","@"===win.localStorage.BAIDU_POS_wh&&(a="1",win.localStorage.removeItem("BAIDU_POS_wh"))}catch(c){}return a}()+function(){var a="0";try{oPersistDiv.setAttribute("remember","@"),oPersistDiv.save("oXMLStore"),oPersistDiv.setAttribute("remember","!"),oPersistDiv.load("oXMLStore"),"@"==oPersistDiv.getAttribute("remember")&&(a="1")}catch(c){}return a}())}},{key:"im",value:function(){return+(void 0!==window.orientation)}},{key:"ui",value:function(){function a(){return Math.floor(65536*
(1+Math.random())).toString(16).substring(1)}function b(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}b=b();getCookieRaw("WHUUID")?b=getCookieRaw("WHUUID"):setCookieRaw("WHUUID",b);return b}},{key:"ci",value:function(){return getCookieRaw("CPROID")||""}},{key:"bi",value:function(){return getCookieRaw("BAIDUID")||""}},{key:"bp",value:function(){return getCookieRaw("BDUSS")||""}},{key:"wf",value:function(){return""}}];
function send(a){var b=getCookieRaw("CPROID")||"";if(b||debug)(0===parseInt(md5(b).substring(8,20),16)%11&&a.wf||debug)&&log("http://eclick.baidu.com/wh.jpg?",a,!0)}
function createFontsFlash(a){(function(){var a=navigator;if(a.plugins&&a.mimeTypes.length)return!!a.plugins["Shockwave Flash"];if(window.ActiveXObject&&!window.opera)for(a=12;2<=a;a--)try{if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+a))return!0}catch(c){}return!1})()&&(document.getElementById("oFlashDiv").innerHTML='<embed wmode="transparent" name="BAIDU_CLB_wh_o_flash" id="BAIDU_CLB_wh_o_flash" src="http://pos.baidu.com/wh/o.swf" swliveconnect="true" quality="high" width="1" height="1" align="middle" allowScriptAccess="samedomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">');win.fontList=
function(b){store.wf=md5(b);send(store);clearTimeout(a);send=function(){}};setTimeout(function c(){var a;a:{try{var f=document.getElementById("BAIDU_CLB_wh_o_flash");if(f&&"undefined"!=typeof f.GetVariable){var k=f.GetVariable("/:user_fonts");k&&win.fontList(k);a=!0;break a}}catch(l){}a=!1}if(!a)return setTimeout(c,250)},250)}each(params,function(a){var b=a.key,c=a.encode,a=a.value,a="function"===typeof a?a():a,a=c?encodeURIComponent(a):a;store[b]=a});
var sendLast=setTimeout(function(){send(store)},2E3);createFontsFlash(sendLast);
})();
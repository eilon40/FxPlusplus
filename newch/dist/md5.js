var hexcase=0,b64pad="";function hex_md5(d){return rstr2hex(rstr_md5(str2rstr_utf8(d)))}function md5_vm_test(){return"900150983cd24fb0d6963f7d28e17f72"==hex_md5("abc").toLowerCase()}function rstr_md5(d){return binl2rstr(binl_md5(rstr2binl(d),8*d.length))}function rstr2hex(d){for(var r,_=hexcase?"0123456789ABCDEF":"0123456789abcdef",m="",f=0;f<d.length;f++)r=d.charCodeAt(f),m+=_.charAt(r>>>4&15)+_.charAt(15&r);return m}function str2rstr_utf8(d){for(var r,_,m="",f=-1;++f<d.length;)r=d.charCodeAt(f),_=f+1<d.length?d.charCodeAt(f+1):0,55296<=r&&r<=56319&&56320<=_&&_<=57343&&(r=65536+((1023&r)<<10)+(1023&_),f++),r<=127?m+=String.fromCharCode(r):r<=2047?m+=String.fromCharCode(192|r>>>6&31,128|63&r):r<=65535?m+=String.fromCharCode(224|r>>>12&15,128|r>>>6&63,128|63&r):r<=2097151&&(m+=String.fromCharCode(240|r>>>18&7,128|r>>>12&63,128|r>>>6&63,128|63&r));return m}function rstr2binl(d){for(var r=Array(d.length>>2),_=0;_<r.length;_++)r[_]=0;for(_=0;_<8*d.length;_+=8)r[_>>5]|=(255&d.charCodeAt(_/8))<<_%32;return r}function binl2rstr(d){for(var r="",_=0;_<32*d.length;_+=8)r+=String.fromCharCode(d[_>>5]>>>_%32&255);return r}function binl_md5(d,r){d[r>>5]|=128<<r%32,d[14+(r+64>>>9<<4)]=r;for(var _=1732584193,m=-271733879,f=-1732584194,n=271733878,t=0;t<d.length;t+=16){var i=_,h=m,e=f,g=n;_=md5_ff(_,m,f,n,d[t+0],7,-680876936),n=md5_ff(n,_,m,f,d[t+1],12,-389564586),f=md5_ff(f,n,_,m,d[t+2],17,606105819),m=md5_ff(m,f,n,_,d[t+3],22,-1044525330),_=md5_ff(_,m,f,n,d[t+4],7,-176418897),n=md5_ff(n,_,m,f,d[t+5],12,1200080426),f=md5_ff(f,n,_,m,d[t+6],17,-1473231341),m=md5_ff(m,f,n,_,d[t+7],22,-45705983),_=md5_ff(_,m,f,n,d[t+8],7,1770035416),n=md5_ff(n,_,m,f,d[t+9],12,-1958414417),f=md5_ff(f,n,_,m,d[t+10],17,-42063),m=md5_ff(m,f,n,_,d[t+11],22,-1990404162),_=md5_ff(_,m,f,n,d[t+12],7,1804603682),n=md5_ff(n,_,m,f,d[t+13],12,-40341101),f=md5_ff(f,n,_,m,d[t+14],17,-1502002290),_=md5_gg(_,m=md5_ff(m,f,n,_,d[t+15],22,1236535329),f,n,d[t+1],5,-165796510),n=md5_gg(n,_,m,f,d[t+6],9,-1069501632),f=md5_gg(f,n,_,m,d[t+11],14,643717713),m=md5_gg(m,f,n,_,d[t+0],20,-373897302),_=md5_gg(_,m,f,n,d[t+5],5,-701558691),n=md5_gg(n,_,m,f,d[t+10],9,38016083),f=md5_gg(f,n,_,m,d[t+15],14,-660478335),m=md5_gg(m,f,n,_,d[t+4],20,-405537848),_=md5_gg(_,m,f,n,d[t+9],5,568446438),n=md5_gg(n,_,m,f,d[t+14],9,-1019803690),f=md5_gg(f,n,_,m,d[t+3],14,-187363961),m=md5_gg(m,f,n,_,d[t+8],20,1163531501),_=md5_gg(_,m,f,n,d[t+13],5,-1444681467),n=md5_gg(n,_,m,f,d[t+2],9,-51403784),f=md5_gg(f,n,_,m,d[t+7],14,1735328473),_=md5_hh(_,m=md5_gg(m,f,n,_,d[t+12],20,-1926607734),f,n,d[t+5],4,-378558),n=md5_hh(n,_,m,f,d[t+8],11,-2022574463),f=md5_hh(f,n,_,m,d[t+11],16,1839030562),m=md5_hh(m,f,n,_,d[t+14],23,-35309556),_=md5_hh(_,m,f,n,d[t+1],4,-1530992060),n=md5_hh(n,_,m,f,d[t+4],11,1272893353),f=md5_hh(f,n,_,m,d[t+7],16,-155497632),m=md5_hh(m,f,n,_,d[t+10],23,-1094730640),_=md5_hh(_,m,f,n,d[t+13],4,681279174),n=md5_hh(n,_,m,f,d[t+0],11,-358537222),f=md5_hh(f,n,_,m,d[t+3],16,-722521979),m=md5_hh(m,f,n,_,d[t+6],23,76029189),_=md5_hh(_,m,f,n,d[t+9],4,-640364487),n=md5_hh(n,_,m,f,d[t+12],11,-421815835),f=md5_hh(f,n,_,m,d[t+15],16,530742520),_=md5_ii(_,m=md5_hh(m,f,n,_,d[t+2],23,-995338651),f,n,d[t+0],6,-198630844),n=md5_ii(n,_,m,f,d[t+7],10,1126891415),f=md5_ii(f,n,_,m,d[t+14],15,-1416354905),m=md5_ii(m,f,n,_,d[t+5],21,-57434055),_=md5_ii(_,m,f,n,d[t+12],6,1700485571),n=md5_ii(n,_,m,f,d[t+3],10,-1894986606),f=md5_ii(f,n,_,m,d[t+10],15,-1051523),m=md5_ii(m,f,n,_,d[t+1],21,-2054922799),_=md5_ii(_,m,f,n,d[t+8],6,1873313359),n=md5_ii(n,_,m,f,d[t+15],10,-30611744),f=md5_ii(f,n,_,m,d[t+6],15,-1560198380),m=md5_ii(m,f,n,_,d[t+13],21,1309151649),_=md5_ii(_,m,f,n,d[t+4],6,-145523070),n=md5_ii(n,_,m,f,d[t+11],10,-1120210379),f=md5_ii(f,n,_,m,d[t+2],15,718787259),m=md5_ii(m,f,n,_,d[t+9],21,-343485551),_=safe_add(_,i),m=safe_add(m,h),f=safe_add(f,e),n=safe_add(n,g)}return Array(_,m,f,n)}function md5_cmn(d,r,_,m,f,n){return safe_add(bit_rol(safe_add(safe_add(r,d),safe_add(m,n)),f),_)}function md5_ff(d,r,_,m,f,n,t){return md5_cmn(r&_|~r&m,d,r,f,n,t)}function md5_gg(d,r,_,m,f,n,t){return md5_cmn(r&m|_&~m,d,r,f,n,t)}function md5_hh(d,r,_,m,f,n,t){return md5_cmn(r^_^m,d,r,f,n,t)}function md5_ii(d,r,_,m,f,n,t){return md5_cmn(_^(r|~m),d,r,f,n,t)}function safe_add(d,r){var _=(65535&d)+(65535&r);return(d>>16)+(r>>16)+(_>>16)<<16|65535&_}function bit_rol(d,r){return d<<r|d>>>32-r}
define(["exports","./when-7ef6387a","./Check-ed6a1804","./Math-85667bf9"],(function(e,t,n,i){"use strict";var r=i.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,i,f){if(n.Check.defined("equalsEpsilon",i),t.defined(e)){f=t.defaultValue(f,!1);var a,u,h,l=e.length;if(l<2)return e;for(a=1;a<l&&!i(u=e[a-1],h=e[a],r);++a);if(a===l)return f&&i(e[0],e[e.length-1],r)?e.slice(1):e;for(var s=e.slice(0,a);a<l;++a)i(u,h=e[a],r)||(s.push(h),u=h);return f&&s.length>1&&i(s[0],s[s.length-1],r)&&s.shift(),s}}}));
//# sourceMappingURL=arrayRemoveDuplicates-9458abce.js.map
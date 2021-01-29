define(["exports","./Check-ed6a1804","./Ellipsoid-911f8bc2","./Transforms-d8f9dcbd","./Cartesian2-ff47d58f","./OrientedBoundingBox-d4914ac2"],(function(n,e,t,i,r,a){"use strict";var o={},s=new t.Cartesian3,u=new t.Cartesian3,d=new t.Cartesian3,C=new t.Cartesian3,c=new a.OrientedBoundingBox;function f(n,e,i,a,o){var u=t.Cartesian3.subtract(n,e,s),d=t.Cartesian3.dot(i,u),C=t.Cartesian3.dot(a,u);return r.Cartesian2.fromElements(d,C,o)}o.validOutline=function(n){e.Check.defined("positions",n);var r=a.OrientedBoundingBox.fromPoints(n,c).halfAxes,o=i.Matrix3.getColumn(r,0,u),s=i.Matrix3.getColumn(r,1,d),f=i.Matrix3.getColumn(r,2,C),l=t.Cartesian3.magnitude(o),m=t.Cartesian3.magnitude(s),g=t.Cartesian3.magnitude(f);return!(0===l&&(0===m||0===g)||0===m&&0===g)},o.computeProjectTo2DArguments=function(n,r,o,s){e.Check.defined("positions",n),e.Check.defined("centerResult",r),e.Check.defined("planeAxis1Result",o),e.Check.defined("planeAxis2Result",s);var f,l,m=a.OrientedBoundingBox.fromPoints(n,c),g=m.halfAxes,x=i.Matrix3.getColumn(g,0,u),h=i.Matrix3.getColumn(g,1,d),p=i.Matrix3.getColumn(g,2,C),B=t.Cartesian3.magnitude(x),P=t.Cartesian3.magnitude(h),M=t.Cartesian3.magnitude(p),k=Math.min(B,P,M);return(0!==B||0!==P&&0!==M)&&(0!==P||0!==M)&&(k!==P&&k!==M||(f=x),k===B?f=h:k===M&&(l=h),k!==B&&k!==P||(l=p),t.Cartesian3.normalize(f,o),t.Cartesian3.normalize(l,s),t.Cartesian3.clone(m.center,r),!0)},o.createProjectPointsTo2DFunction=function(n,e,t){return function(i){for(var r=new Array(i.length),a=0;a<i.length;a++)r[a]=f(i[a],n,e,t);return r}},o.createProjectPointTo2DFunction=function(n,e,t){return function(i,r){return f(i,n,e,t,r)}},n.CoplanarPolygonGeometryLibrary=o}));
//# sourceMappingURL=CoplanarPolygonGeometryLibrary-eb9019ed.js.map
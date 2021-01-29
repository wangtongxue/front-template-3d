define(["exports","./when-7ef6387a","./Check-ed6a1804","./Math-85667bf9","./Ellipsoid-1cbb4ac9"],(function(t,a,i,e,n){"use strict";function s(t,a,i,e,n,s,h){var r=function(t,a){return t*a*(4+t*(4-3*a))/16}(t,i);return(1-r)*t*a*(e+r*n*(h+r*s*(2*h*h-1)))}var h=new n.Cartesian3,r=new n.Cartesian3;function d(t,a,d,o){var c=n.Cartesian3.normalize(o.cartographicToCartesian(a,r),h),u=n.Cartesian3.normalize(o.cartographicToCartesian(d,r),r);i.Check.typeOf.number.greaterThanOrEquals("value",Math.abs(Math.abs(n.Cartesian3.angleBetween(c,u))-Math.PI),.0125),function(t,a,i,n,h,r,d){var o,c,u,M,l,g=(a-i)/a,_=r-n,p=Math.atan((1-g)*Math.tan(h)),f=Math.atan((1-g)*Math.tan(d)),v=Math.cos(p),C=Math.sin(p),m=Math.cos(f),H=Math.sin(f),O=v*m,b=v*H,q=C*H,S=C*m,k=_,w=e.CesiumMath.TWO_PI,U=Math.cos(k),A=Math.sin(k);do{U=Math.cos(k),A=Math.sin(k);var E,R=b-S*U;u=Math.sqrt(m*m*A*A+R*R),c=q+O*U,o=Math.atan2(u,c),0===u?(E=0,M=1):M=1-(E=O*A/u)*E,w=k,l=c-2*q/M,isNaN(l)&&(l=0),k=_+s(g,E,M,o,u,c,l)}while(Math.abs(k-w)>e.CesiumMath.EPSILON12);var y=M*(a*a-i*i)/(i*i),P=y*(256+y*(y*(74-47*y)-128))/1024,T=l*l,x=i*(1+y*(4096+y*(y*(320-175*y)-768))/16384)*(o-P*u*(l+P*(c*(2*T-1)-P*l*(4*u*u-3)*(4*T-3)/6)/4)),D=Math.atan2(m*A,b-S*U),I=Math.atan2(v*A,b*U-S);t._distance=x,t._startHeading=D,t._endHeading=I,t._uSquared=y}(t,o.maximumRadius,o.minimumRadius,a.longitude,a.latitude,d.longitude,d.latitude),t._start=n.Cartographic.clone(a,t._start),t._end=n.Cartographic.clone(d,t._end),t._start.height=0,t._end.height=0,function(t){var a=t._uSquared,i=t._ellipsoid.maximumRadius,e=t._ellipsoid.minimumRadius,n=(i-e)/i,s=Math.cos(t._startHeading),h=Math.sin(t._startHeading),r=(1-n)*Math.tan(t._start.latitude),d=1/Math.sqrt(1+r*r),o=d*r,c=Math.atan2(r,s),u=d*h,M=u*u,l=1-M,g=Math.sqrt(l),_=a/4,p=_*_,f=p*_,v=p*p,C=1+_-3*p/4+5*f/4-175*v/64,m=1-_+15*p/8-35*f/8,H=1-3*_+35*p/4,O=1-5*_,b=C*c-m*Math.sin(2*c)*_/2-H*Math.sin(4*c)*p/16-O*Math.sin(6*c)*f/48-5*Math.sin(8*c)*v/512,q=t._constants;q.a=i,q.b=e,q.f=n,q.cosineHeading=s,q.sineHeading=h,q.tanU=r,q.cosineU=d,q.sineU=o,q.sigma=c,q.sineAlpha=u,q.sineSquaredAlpha=M,q.cosineSquaredAlpha=l,q.cosineAlpha=g,q.u2Over4=_,q.u4Over16=p,q.u6Over64=f,q.u8Over256=v,q.a0=C,q.a1=m,q.a2=H,q.a3=O,q.distanceRatio=b}(t)}function o(t,i,e){var s=a.defaultValue(e,n.Ellipsoid.WGS84);this._ellipsoid=s,this._start=new n.Cartographic,this._end=new n.Cartographic,this._constants={},this._startHeading=void 0,this._endHeading=void 0,this._distance=void 0,this._uSquared=void 0,a.defined(t)&&a.defined(i)&&d(this,t,i,s)}Object.defineProperties(o.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},surfaceDistance:{get:function(){return i.Check.defined("distance",this._distance),this._distance}},start:{get:function(){return this._start}},end:{get:function(){return this._end}},startHeading:{get:function(){return i.Check.defined("distance",this._distance),this._startHeading}},endHeading:{get:function(){return i.Check.defined("distance",this._distance),this._endHeading}}}),o.prototype.setEndPoints=function(t,a){i.Check.defined("start",t),i.Check.defined("end",a),d(this,t,a,this._ellipsoid)},o.prototype.interpolateUsingFraction=function(t,a){return this.interpolateUsingSurfaceDistance(this._distance*t,a)},o.prototype.interpolateUsingSurfaceDistance=function(t,e){i.Check.defined("distance",this._distance);var h=this._constants,r=h.distanceRatio+t/h.b,d=Math.cos(2*r),o=Math.cos(4*r),c=Math.cos(6*r),u=Math.sin(2*r),M=Math.sin(4*r),l=Math.sin(6*r),g=Math.sin(8*r),_=r*r,p=r*_,f=h.u8Over256,v=h.u2Over4,C=h.u6Over64,m=h.u4Over16,H=2*p*f*d/3+r*(1-v+7*m/4-15*C/4+579*f/64-(m-15*C/4+187*f/16)*d-(5*C/4-115*f/16)*o-29*f*c/16)+(v/2-m+71*C/32-85*f/16)*u+(5*m/16-5*C/4+383*f/96)*M-_*((C-11*f/2)*u+5*f*M/2)+(29*C/96-29*f/16)*l+539*f*g/1536,O=Math.asin(Math.sin(H)*h.cosineAlpha),b=Math.atan(h.a/h.b*Math.tan(O));H-=h.sigma;var q=Math.cos(2*h.sigma+H),S=Math.sin(H),k=Math.cos(H),w=h.cosineU*k,U=h.sineU*S,A=Math.atan2(S*h.sineHeading,w-U*h.cosineHeading)-s(h.f,h.sineAlpha,h.cosineSquaredAlpha,H,S,k,q);return a.defined(e)?(e.longitude=this._start.longitude+A,e.latitude=b,e.height=0,e):new n.Cartographic(this._start.longitude+A,b,0)},t.EllipsoidGeodesic=o}));
//# sourceMappingURL=EllipsoidGeodesic-2bb1f4ee.js.map

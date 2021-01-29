/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./Cartesian2-f49a1383","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./GeometryPipeline-f9bdb2cf","./IndexDatatype-153fdd7f","./arrayRemoveDuplicates-c3fd0b84","./ArcType-51c149e1","./EllipsoidRhumbLine-c004db91","./PolygonPipeline-d25dad97"],(function(e,t,r,i,n,a,o,s,u,l,h,c,f,p,d,y,g,v){"use strict";function m(){this._array=[],this._offset=0,this._length=0}i.defineProperties(m.prototype,{length:{get:function(){return this._length}}}),m.prototype.enqueue=function(e){this._array.push(e),this._length++},m.prototype.dequeue=function(){if(0!==this._length){var e=this._array,t=this._offset,r=e[t];return e[t]=void 0,++t>10&&2*t>e.length&&(this._array=e.slice(t),t=0),this._offset=t,this._length--,r}},m.prototype.peek=function(){if(0!==this._length)return this._array[this._offset]},m.prototype.contains=function(e){return-1!==this._array.indexOf(e)},m.prototype.clear=function(){this._array.length=this._offset=this._length=0},m.prototype.sort=function(e){this._offset>0&&(this._array=this._array.slice(this._offset),this._offset=0),this._array.sort(e)};var C={computeHierarchyPackedLength:function(e){for(var r=0,i=[e];i.length>0;){var a=i.pop();if(t.defined(a)){r+=2;var o=a.positions,s=a.holes;if(t.defined(o)&&(r+=o.length*n.Cartesian3.packedLength),t.defined(s))for(var u=s.length,l=0;l<u;++l)i.push(s[l])}}return r},packPolygonHierarchy:function(e,r,i){for(var a=[e];a.length>0;){var o=a.pop();if(t.defined(o)){var s=o.positions,u=o.holes;if(r[i++]=t.defined(s)?s.length:0,r[i++]=t.defined(u)?u.length:0,t.defined(s))for(var l=s.length,h=0;h<l;++h,i+=3)n.Cartesian3.pack(s[h],r,i);if(t.defined(u))for(var c=u.length,f=0;f<c;++f)a.push(u[f])}}return i},unpackPolygonHierarchy:function(e,t){for(var r=e[t++],i=e[t++],a=new Array(r),o=i>0?new Array(i):void 0,s=0;s<r;++s,t+=n.Cartesian3.packedLength)a[s]=n.Cartesian3.unpack(e,t);for(var u=0;u<i;++u)o[u]=C.unpackPolygonHierarchy(e,t),t=o[u].startingIndex,delete o[u].startingIndex;return{positions:a,holes:o,startingIndex:t}}},b=new n.Cartesian3;function w(e,t,r,i){return n.Cartesian3.subtract(t,e,b),n.Cartesian3.multiplyByScalar(b,r/i,b),n.Cartesian3.add(e,b,b),[b.x,b.y,b.z]}C.subdivideLineCount=function(e,t,r){var a=n.Cartesian3.distance(e,t)/r,o=Math.max(0,Math.ceil(i.CesiumMath.log2(a)));return Math.pow(2,o)};var T=new a.Cartographic,x=new a.Cartographic,I=new a.Cartographic,E=new n.Cartesian3;C.subdivideRhumbLineCount=function(e,t,r,n){var a=e.cartesianToCartographic(t,T),o=e.cartesianToCartographic(r,x),s=new g.EllipsoidRhumbLine(a,o,e).surfaceDistance/n,u=Math.max(0,Math.ceil(i.CesiumMath.log2(s)));return Math.pow(2,u)},C.subdivideLine=function(e,r,i,a){var o=C.subdivideLineCount(e,r,i),s=n.Cartesian3.distance(e,r),u=s/o;t.defined(a)||(a=[]);var l=a;l.length=3*o;for(var h=0,c=0;c<o;c++){var f=w(e,r,c*u,s);l[h++]=f[0],l[h++]=f[1],l[h++]=f[2]}return l},C.subdivideRhumbLine=function(e,r,n,a,o){var s=e.cartesianToCartographic(r,T),u=e.cartesianToCartographic(n,x),l=new g.EllipsoidRhumbLine(s,u,e),h=l.surfaceDistance/a,c=Math.max(0,Math.ceil(i.CesiumMath.log2(h))),f=Math.pow(2,c),p=l.surfaceDistance/f;t.defined(o)||(o=[]);var d=o;d.length=3*f;for(var y=0,v=0;v<f;v++){var m=l.interpolateUsingSurfaceDistance(v*p,I),C=e.cartographicToCartesian(m,E);d[y++]=C.x,d[y++]=C.y,d[y++]=C.z}return d};var A=new n.Cartesian3,P=new n.Cartesian3,_=new n.Cartesian3,G=new n.Cartesian3;C.scaleToGeodeticHeightExtruded=function(e,r,i,o,s){o=t.defaultValue(o,a.Ellipsoid.WGS84);var u=A,l=P,h=_,c=G;if(t.defined(e)&&t.defined(e.attributes)&&t.defined(e.attributes.position))for(var f=e.attributes.position.values,p=f.length/2,d=0;d<p;d+=3)n.Cartesian3.fromArray(f,d,h),o.geodeticSurfaceNormal(h,u),c=o.scaleToGeodeticSurface(h,c),l=n.Cartesian3.multiplyByScalar(u,i,l),l=n.Cartesian3.add(c,l,l),f[d+p]=l.x,f[d+1+p]=l.y,f[d+2+p]=l.z,s&&(c=n.Cartesian3.clone(h,c)),l=n.Cartesian3.multiplyByScalar(u,r,l),l=n.Cartesian3.add(c,l,l),f[d]=l.x,f[d+1]=l.y,f[d+2]=l.z;return e},C.polygonOutlinesFromHierarchy=function(e,r,i){var a,o,s,u=[],l=new m;for(l.enqueue(e);0!==l.length;){var h=l.dequeue(),c=h.positions;if(r)for(s=c.length,a=0;a<s;a++)i.scaleToGeodeticSurface(c[a],c[a]);if(!((c=d.arrayRemoveDuplicates(c,n.Cartesian3.equalsEpsilon,!0)).length<3)){var f=h.holes?h.holes.length:0;for(a=0;a<f;a++){var p=h.holes[a],y=p.positions;if(r)for(s=y.length,o=0;o<s;++o)i.scaleToGeodeticSurface(y[o],y[o]);if(!((y=d.arrayRemoveDuplicates(y,n.Cartesian3.equalsEpsilon,!0)).length<3)){u.push(y);var g=0;for(t.defined(p.holes)&&(g=p.holes.length),o=0;o<g;o++)l.enqueue(p.holes[o])}}u.push(c)}}return u},C.polygonsFromHierarchy=function(e,r,i,a){var o=[],s=[],u=new m;for(u.enqueue(e);0!==u.length;){var l,h,c=u.dequeue(),f=c.positions,p=c.holes;if(i)for(h=f.length,l=0;l<h;l++)a.scaleToGeodeticSurface(f[l],f[l]);if(!((f=d.arrayRemoveDuplicates(f,n.Cartesian3.equalsEpsilon,!0)).length<3)){var y=r(f);if(t.defined(y)){var g=[],C=v.PolygonPipeline.computeWindingOrder2D(y);C===v.WindingOrder.CLOCKWISE&&(y.reverse(),f=f.slice().reverse());var b,w=f.slice(),T=t.defined(p)?p.length:0,x=[];for(l=0;l<T;l++){var I=p[l],E=I.positions;if(i)for(h=E.length,b=0;b<h;++b)a.scaleToGeodeticSurface(E[b],E[b]);if(!((E=d.arrayRemoveDuplicates(E,n.Cartesian3.equalsEpsilon,!0)).length<3)){var A=r(E);if(t.defined(A)){(C=v.PolygonPipeline.computeWindingOrder2D(A))===v.WindingOrder.CLOCKWISE&&(A.reverse(),E=E.slice().reverse()),x.push(E),g.push(w.length),w=w.concat(E),y=y.concat(A);var P=0;for(t.defined(I.holes)&&(P=I.holes.length),b=0;b<P;b++)u.enqueue(I.holes[b])}}}o.push({outerRing:f,holes:x}),s.push({positions:w,positions2D:y,holes:g})}}}return{hierarchy:o,polygons:s}};var D=new u.Cartesian2,L=new n.Cartesian3,M=new o.Quaternion,S=new s.Matrix3;C.computeBoundingRectangle=function(e,r,i,a,u){for(var l=o.Quaternion.fromAxisAngle(e,a,M),h=s.Matrix3.fromQuaternion(l,S),c=Number.POSITIVE_INFINITY,f=Number.NEGATIVE_INFINITY,p=Number.POSITIVE_INFINITY,d=Number.NEGATIVE_INFINITY,y=i.length,g=0;g<y;++g){var v=n.Cartesian3.clone(i[g],L);s.Matrix3.multiplyByVector(h,v,v);var m=r(v,D);t.defined(m)&&(c=Math.min(c,m.x),f=Math.max(f,m.x),p=Math.min(p,m.y),d=Math.max(d,m.y))}return u.x=c,u.y=p,u.width=f-c,u.height=d-p,u},C.createGeometryFromPositions=function(e,t,r,i,n,a){var o=v.PolygonPipeline.triangulate(t.positions2D,t.holes);o.length<3&&(o=[0,1,2]);var s=t.positions;if(i){for(var u=s.length,c=new Array(3*u),p=0,d=0;d<u;d++){var g=s[d];c[p++]=g.x,c[p++]=g.y,c[p++]=g.z}var m=new h.Geometry({attributes:{position:new h.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c})},indices:o,primitiveType:h.PrimitiveType.TRIANGLES});return n.normal?f.GeometryPipeline.computeNormal(m):m}return a===y.ArcType.GEODESIC?v.PolygonPipeline.computeSubdivision(e,s,o,r):a===y.ArcType.RHUMB?v.PolygonPipeline.computeRhumbLineSubdivision(e,s,o,r):void 0};var R=[],N=new n.Cartesian3,O=new n.Cartesian3;C.computeWallGeometry=function(e,t,r,a,o){var s,u,f,d,g,v=e.length,m=0;if(a)for(u=3*v*2,s=new Array(2*u),f=0;f<v;f++)d=e[f],g=e[(f+1)%v],s[m]=s[m+u]=d.x,s[++m]=s[m+u]=d.y,s[++m]=s[m+u]=d.z,s[++m]=s[m+u]=g.x,s[++m]=s[m+u]=g.y,s[++m]=s[m+u]=g.z,++m;else{var b=i.CesiumMath.chordLength(r,t.maximumRadius),w=0;if(o===y.ArcType.GEODESIC)for(f=0;f<v;f++)w+=C.subdivideLineCount(e[f],e[(f+1)%v],b);else if(o===y.ArcType.RHUMB)for(f=0;f<v;f++)w+=C.subdivideRhumbLineCount(t,e[f],e[(f+1)%v],b);for(u=3*(w+v),s=new Array(2*u),f=0;f<v;f++){var T;d=e[f],g=e[(f+1)%v],o===y.ArcType.GEODESIC?T=C.subdivideLine(d,g,b,R):o===y.ArcType.RHUMB&&(T=C.subdivideRhumbLine(t,d,g,b,R));for(var x=T.length,I=0;I<x;++I,++m)s[m]=T[I],s[m+u]=T[I];s[m]=g.x,s[m+u]=g.x,s[++m]=g.y,s[m+u]=g.y,s[++m]=g.z,s[m+u]=g.z,++m}}v=s.length;var E=p.IndexDatatype.createTypedArray(v/3,v-6*e.length),A=0;for(v/=6,f=0;f<v;f++){var P=f,_=P+1,G=P+v,D=G+1;d=n.Cartesian3.fromArray(s,3*P,N),g=n.Cartesian3.fromArray(s,3*_,O),n.Cartesian3.equalsEpsilon(d,g,i.CesiumMath.EPSILON14)||(E[A++]=P,E[A++]=G,E[A++]=_,E[A++]=_,E[A++]=G,E[A++]=D)}return new h.Geometry({attributes:new c.GeometryAttributes({position:new h.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s})}),indices:E,primitiveType:h.PrimitiveType.TRIANGLES})},e.PolygonGeometryLibrary=C}));

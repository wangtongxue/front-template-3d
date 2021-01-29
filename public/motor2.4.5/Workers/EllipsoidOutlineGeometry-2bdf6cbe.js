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
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./IndexDatatype-153fdd7f","./arrayFill-11a46844"],(function(t,e,i,r,a,o,n,s,f,u,d,l){"use strict";var p=new a.Cartesian3(1,1,1),c=Math.cos,b=Math.sin;function v(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var r=e.defaultValue(t.radii,p),o=Math.round(e.defaultValue(t.stackPartitions,10)),n=Math.round(e.defaultValue(t.slicePartitions,8)),s=Math.round(e.defaultValue(t.subdivisions,128));if(o<1)throw new i.DeveloperError("options.stackPartitions cannot be less than 1");if(n<0)throw new i.DeveloperError("options.slicePartitions cannot be less than 0");if(s<0)throw new i.DeveloperError("options.subdivisions must be greater than or equal to zero.");if(e.defined(t.offsetAttribute)&&t.offsetAttribute===f.GeometryOffsetAttribute.TOP)throw new i.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._radii=a.Cartesian3.clone(r),this._stackPartitions=o,this._slicePartitions=n,this._subdivisions=s,this._offsetAttribute=t.offsetAttribute,this._workerName="createEllipsoidOutlineGeometry"}v.packedLength=a.Cartesian3.packedLength+4,v.pack=function(t,r,o){if(!e.defined(t))throw new i.DeveloperError("value is required");if(!e.defined(r))throw new i.DeveloperError("array is required");return o=e.defaultValue(o,0),a.Cartesian3.pack(t._radii,r,o),o+=a.Cartesian3.packedLength,r[o++]=t._stackPartitions,r[o++]=t._slicePartitions,r[o++]=t._subdivisions,r[o]=e.defaultValue(t._offsetAttribute,-1),r};var h=new a.Cartesian3,y={radii:h,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0,offsetAttribute:void 0};v.unpack=function(t,r,o){if(!e.defined(t))throw new i.DeveloperError("array is required");r=e.defaultValue(r,0);var n=a.Cartesian3.unpack(t,r,h);r+=a.Cartesian3.packedLength;var s=t[r++],f=t[r++],u=t[r++],d=t[r];return e.defined(o)?(o._radii=a.Cartesian3.clone(n,o._radii),o._stackPartitions=s,o._slicePartitions=f,o._subdivisions=u,o._offsetAttribute=-1===d?void 0:d,o):(y.stackPartitions=s,y.slicePartitions=f,y.subdivisions=u,y.offsetAttribute=-1===d?void 0:d,new v(y))},v.createGeometry=function(t){var i=t._radii;if(!(i.x<=0||i.y<=0||i.z<=0)){var a,p,v,h,y,m,A=o.Ellipsoid.fromCartesian3(i),_=t._stackPartitions,w=t._slicePartitions,P=t._subdivisions,E=P*(_+w-1),k=E-w+2,C=new Float64Array(3*k),D=d.IndexDatatype.createTypedArray(k,2*E),G=0,O=new Array(P),g=new Array(P);for(a=0;a<P;a++)v=r.CesiumMath.TWO_PI*a/P,O[a]=c(v),g[a]=b(v);for(a=1;a<_;a++)for(h=Math.PI*a/_,y=c(h),m=b(h),p=0;p<P;p++)C[G++]=i.x*O[p]*m,C[G++]=i.y*g[p]*m,C[G++]=i.z*y;for(O.length=w,g.length=w,a=0;a<w;a++)v=r.CesiumMath.TWO_PI*a/w,O[a]=c(v),g[a]=b(v);for(C[G++]=0,C[G++]=0,C[G++]=i.z,a=1;a<P;a++)for(h=Math.PI*a/P,y=c(h),m=b(h),p=0;p<w;p++)C[G++]=i.x*O[p]*m,C[G++]=i.y*g[p]*m,C[G++]=i.z*y;for(C[G++]=0,C[G++]=0,C[G++]=-i.z,G=0,a=0;a<_-1;++a){var T=a*P;for(p=0;p<P-1;++p)D[G++]=T+p,D[G++]=T+p+1;D[G++]=T+P-1,D[G++]=T}var M=P*(_-1);for(p=1;p<w+1;++p)D[G++]=M,D[G++]=M+p;for(a=0;a<P-2;++a){var V=a*w+1+M,I=(a+1)*w+1+M;for(p=0;p<w-1;++p)D[G++]=I+p,D[G++]=V+p;D[G++]=I+w-1,D[G++]=V+w-1}var x=C.length/3-1;for(p=x-1;p>x-w-1;--p)D[G++]=x,D[G++]=p;var z=new u.GeometryAttributes({position:new f.GeometryAttribute({componentDatatype:s.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:C})});if(e.defined(t._offsetAttribute)){var L=C.length,N=new Uint8Array(L/3),q=t._offsetAttribute===f.GeometryOffsetAttribute.NONE?0:1;l.arrayFill(N,q),z.applyOffset=new f.GeometryAttribute({componentDatatype:s.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:N})}return new f.Geometry({attributes:z,indices:D,primitiveType:f.PrimitiveType.LINES,boundingSphere:n.BoundingSphere.fromEllipsoid(A),offsetAttribute:t._offsetAttribute})}},t.EllipsoidOutlineGeometry=v}));

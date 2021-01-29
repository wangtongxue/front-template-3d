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
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Transforms-7b04d7e0","./Matrix4-33464f2b","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./Plane-84b14a0a","./VertexFormat-a4fe3a21"],(function(e,t,r,a,i,n,o,s,f,u,d,h){"use strict";function p(e){this.planes=t.defaultValue(e,[])}var l=[new i.Cartesian3,new i.Cartesian3,new i.Cartesian3];i.Cartesian3.clone(i.Cartesian3.UNIT_X,l[0]),i.Cartesian3.clone(i.Cartesian3.UNIT_Y,l[1]),i.Cartesian3.clone(i.Cartesian3.UNIT_Z,l[2]);var c=new i.Cartesian3,m=new i.Cartesian3,C=new d.Plane(new i.Cartesian3(1,0,0),0);function w(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),this.left=e.left,this._left=void 0,this.right=e.right,this._right=void 0,this.top=e.top,this._top=void 0,this.bottom=e.bottom,this._bottom=void 0,this.near=t.defaultValue(e.near,1),this._near=this.near,this.far=t.defaultValue(e.far,5e8),this._far=this.far,this._cullingVolume=new p,this._orthographicMatrix=new o.Matrix4}function v(e){if(!(t.defined(e.right)&&t.defined(e.left)&&t.defined(e.top)&&t.defined(e.bottom)&&t.defined(e.near)&&t.defined(e.far)))throw new r.DeveloperError("right, left, top, bottom, near, or far parameters are not set.");if(e.top!==e._top||e.bottom!==e._bottom||e.left!==e._left||e.right!==e._right||e.near!==e._near||e.far!==e._far){if(e.left>e.right)throw new r.DeveloperError("right must be greater than left.");if(e.bottom>e.top)throw new r.DeveloperError("top must be greater than bottom.");if(e.near<=0||e.near>e.far)throw new r.DeveloperError("near must be greater than zero and less than far.");e._left=e.left,e._right=e.right,e._top=e.top,e._bottom=e.bottom,e._near=e.near,e._far=e.far,e._orthographicMatrix=o.Matrix4.computeOrthographicOffCenter(e.left,e.right,e.bottom,e.top,e.near,e.far,e._orthographicMatrix)}}p.fromBoundingSphere=function(e,a){if(!t.defined(e))throw new r.DeveloperError("boundingSphere is required.");t.defined(a)||(a=new p);var n=l.length,s=a.planes;s.length=2*n;for(var f=e.center,u=e.radius,d=0,h=0;h<n;++h){var C=l[h],w=s[d],v=s[d+1];t.defined(w)||(w=s[d]=new o.Cartesian4),t.defined(v)||(v=s[d+1]=new o.Cartesian4),i.Cartesian3.multiplyByScalar(C,-u,c),i.Cartesian3.add(f,c,c),w.x=C.x,w.y=C.y,w.z=C.z,w.w=-i.Cartesian3.dot(C,c),i.Cartesian3.multiplyByScalar(C,u,c),i.Cartesian3.add(f,c,c),v.x=-C.x,v.y=-C.y,v.z=-C.z,v.w=-i.Cartesian3.dot(i.Cartesian3.negate(C,m),c),d+=2}return a},p.prototype.computeVisibility=function(e){if(!t.defined(e))throw new r.DeveloperError("boundingVolume is required.");for(var a=this.planes,i=!1,o=0,s=a.length;o<s;++o){var f=e.intersectPlane(d.Plane.fromCartesian4(a[o],C));if(f===n.Intersect.OUTSIDE)return n.Intersect.OUTSIDE;f===n.Intersect.INTERSECTING&&(i=!0)}return i?n.Intersect.INTERSECTING:n.Intersect.INSIDE},p.prototype.computeVisibilityWithPlaneMask=function(e,a){if(!t.defined(e))throw new r.DeveloperError("boundingVolume is required.");if(!t.defined(a))throw new r.DeveloperError("parentPlaneMask is required.");if(a===p.MASK_OUTSIDE||a===p.MASK_INSIDE)return a;for(var i=p.MASK_INSIDE,o=this.planes,s=0,f=o.length;s<f;++s){var u=s<31?1<<s:0;if(!(s<31&&0==(a&u))){var h=e.intersectPlane(d.Plane.fromCartesian4(o[s],C));if(h===n.Intersect.OUTSIDE)return p.MASK_OUTSIDE;h===n.Intersect.INTERSECTING&&(i|=u)}}return i},p.MASK_OUTSIDE=4294967295,p.MASK_INSIDE=0,p.MASK_INDETERMINATE=2147483647,a.defineProperties(w.prototype,{projectionMatrix:{get:function(){return v(this),this._orthographicMatrix}}});var _=new i.Cartesian3,y=new i.Cartesian3,g=new i.Cartesian3,x=new i.Cartesian3;function b(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),this._offCenterFrustum=new w,this.width=e.width,this._width=void 0,this.aspectRatio=e.aspectRatio,this._aspectRatio=void 0,this.near=t.defaultValue(e.near,1),this._near=this.near,this.far=t.defaultValue(e.far,5e8),this._far=this.far}function E(e){if(!(t.defined(e.width)&&t.defined(e.aspectRatio)&&t.defined(e.near)&&t.defined(e.far)))throw new r.DeveloperError("width, aspectRatio, near, or far parameters are not set.");var a=e._offCenterFrustum;if(e.width!==e._width||e.aspectRatio!==e._aspectRatio||e.near!==e._near||e.far!==e._far){if(e.aspectRatio<0)throw new r.DeveloperError("aspectRatio must be positive.");if(e.near<0||e.near>e.far)throw new r.DeveloperError("near must be greater than zero and less than far.");e._aspectRatio=e.aspectRatio,e._width=e.width,e._near=e.near,e._far=e.far;var i=1/e.aspectRatio;a.right=.5*e.width,a.left=-a.right,a.top=i*a.right,a.bottom=-a.top,a.near=e.near,a.far=e.far}}function M(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),this.left=e.left,this._left=void 0,this.right=e.right,this._right=void 0,this.top=e.top,this._top=void 0,this.bottom=e.bottom,this._bottom=void 0,this.near=t.defaultValue(e.near,1),this._near=this.near,this.far=t.defaultValue(e.far,5e8),this._far=this.far,this._cullingVolume=new p,this._perspectiveMatrix=new o.Matrix4,this._infinitePerspective=new o.Matrix4}function D(e){if(!(t.defined(e.right)&&t.defined(e.left)&&t.defined(e.top)&&t.defined(e.bottom)&&t.defined(e.near)&&t.defined(e.far)))throw new r.DeveloperError("right, left, top, bottom, near, or far parameters are not set.");var a=e.top,i=e.bottom,n=e.right,s=e.left,f=e.near,u=e.far;if(a!==e._top||i!==e._bottom||s!==e._left||n!==e._right||f!==e._near||u!==e._far){if(e.near<=0||e.near>e.far)throw new r.DeveloperError("near must be greater than zero and less than far.");e._left=s,e._right=n,e._top=a,e._bottom=i,e._near=f,e._far=u,e._perspectiveMatrix=o.Matrix4.computePerspectiveOffCenter(s,n,i,a,f,u,e._perspectiveMatrix),e._infinitePerspective=o.Matrix4.computeInfinitePerspectiveOffCenter(s,n,i,a,f,e._infinitePerspective)}}w.prototype.computeCullingVolume=function(e,a,n){if(!t.defined(e))throw new r.DeveloperError("position is required.");if(!t.defined(a))throw new r.DeveloperError("direction is required.");if(!t.defined(n))throw new r.DeveloperError("up is required.");var s=this._cullingVolume.planes,f=this.top,u=this.bottom,d=this.right,h=this.left,p=this.near,l=this.far,c=i.Cartesian3.cross(a,n,_);i.Cartesian3.normalize(c,c);var m=y;i.Cartesian3.multiplyByScalar(a,p,m),i.Cartesian3.add(e,m,m);var C=g;i.Cartesian3.multiplyByScalar(c,h,C),i.Cartesian3.add(m,C,C);var w=s[0];return t.defined(w)||(w=s[0]=new o.Cartesian4),w.x=c.x,w.y=c.y,w.z=c.z,w.w=-i.Cartesian3.dot(c,C),i.Cartesian3.multiplyByScalar(c,d,C),i.Cartesian3.add(m,C,C),w=s[1],t.defined(w)||(w=s[1]=new o.Cartesian4),w.x=-c.x,w.y=-c.y,w.z=-c.z,w.w=-i.Cartesian3.dot(i.Cartesian3.negate(c,x),C),i.Cartesian3.multiplyByScalar(n,u,C),i.Cartesian3.add(m,C,C),w=s[2],t.defined(w)||(w=s[2]=new o.Cartesian4),w.x=n.x,w.y=n.y,w.z=n.z,w.w=-i.Cartesian3.dot(n,C),i.Cartesian3.multiplyByScalar(n,f,C),i.Cartesian3.add(m,C,C),w=s[3],t.defined(w)||(w=s[3]=new o.Cartesian4),w.x=-n.x,w.y=-n.y,w.z=-n.z,w.w=-i.Cartesian3.dot(i.Cartesian3.negate(n,x),C),w=s[4],t.defined(w)||(w=s[4]=new o.Cartesian4),w.x=a.x,w.y=a.y,w.z=a.z,w.w=-i.Cartesian3.dot(a,m),i.Cartesian3.multiplyByScalar(a,l,C),i.Cartesian3.add(e,C,C),w=s[5],t.defined(w)||(w=s[5]=new o.Cartesian4),w.x=-a.x,w.y=-a.y,w.z=-a.z,w.w=-i.Cartesian3.dot(i.Cartesian3.negate(a,x),C),this._cullingVolume},w.prototype.getPixelDimensions=function(e,a,i,n){if(v(this),!t.defined(e)||!t.defined(a))throw new r.DeveloperError("Both drawingBufferWidth and drawingBufferHeight are required.");if(e<=0)throw new r.DeveloperError("drawingBufferWidth must be greater than zero.");if(a<=0)throw new r.DeveloperError("drawingBufferHeight must be greater than zero.");if(!t.defined(i))throw new r.DeveloperError("distance is required.");if(!t.defined(n))throw new r.DeveloperError("A result object is required.");var o=(this.right-this.left)/e,s=(this.top-this.bottom)/a;return n.x=o,n.y=s,n},w.prototype.clone=function(e){return t.defined(e)||(e=new w),e.left=this.left,e.right=this.right,e.top=this.top,e.bottom=this.bottom,e.near=this.near,e.far=this.far,e._left=void 0,e._right=void 0,e._top=void 0,e._bottom=void 0,e._near=void 0,e._far=void 0,e},w.prototype.equals=function(e){return t.defined(e)&&e instanceof w&&this.right===e.right&&this.left===e.left&&this.top===e.top&&this.bottom===e.bottom&&this.near===e.near&&this.far===e.far},w.prototype.equalsEpsilon=function(e,r,i){return e===this||t.defined(e)&&e instanceof w&&a.CesiumMath.equalsEpsilon(this.right,e.right,r,i)&&a.CesiumMath.equalsEpsilon(this.left,e.left,r,i)&&a.CesiumMath.equalsEpsilon(this.top,e.top,r,i)&&a.CesiumMath.equalsEpsilon(this.bottom,e.bottom,r,i)&&a.CesiumMath.equalsEpsilon(this.near,e.near,r,i)&&a.CesiumMath.equalsEpsilon(this.far,e.far,r,i)},b.packedLength=4,b.pack=function(e,a,i){return r.Check.typeOf.object("value",e),r.Check.defined("array",a),i=t.defaultValue(i,0),a[i++]=e.width,a[i++]=e.aspectRatio,a[i++]=e.near,a[i]=e.far,a},b.unpack=function(e,a,i){return r.Check.defined("array",e),a=t.defaultValue(a,0),t.defined(i)||(i=new b),i.width=e[a++],i.aspectRatio=e[a++],i.near=e[a++],i.far=e[a],i},a.defineProperties(b.prototype,{projectionMatrix:{get:function(){return E(this),this._offCenterFrustum.projectionMatrix}}}),b.prototype.computeCullingVolume=function(e,t,r){return E(this),this._offCenterFrustum.computeCullingVolume(e,t,r)},b.prototype.getPixelDimensions=function(e,t,r,a){return E(this),this._offCenterFrustum.getPixelDimensions(e,t,r,a)},b.prototype.clone=function(e){return t.defined(e)||(e=new b),e.aspectRatio=this.aspectRatio,e.width=this.width,e.near=this.near,e.far=this.far,e._aspectRatio=void 0,e._width=void 0,e._near=void 0,e._far=void 0,this._offCenterFrustum.clone(e._offCenterFrustum),e},b.prototype.equals=function(e){return!!(t.defined(e)&&e instanceof b)&&(E(this),E(e),this.width===e.width&&this.aspectRatio===e.aspectRatio&&this._offCenterFrustum.equals(e._offCenterFrustum))},b.prototype.equalsEpsilon=function(e,r,i){return!!(t.defined(e)&&e instanceof b)&&(E(this),E(e),a.CesiumMath.equalsEpsilon(this.width,e.width,r,i)&&a.CesiumMath.equalsEpsilon(this.aspectRatio,e.aspectRatio,r,i)&&this._offCenterFrustum.equalsEpsilon(e._offCenterFrustum,r,i))},a.defineProperties(M.prototype,{projectionMatrix:{get:function(){return D(this),this._perspectiveMatrix}},infiniteProjectionMatrix:{get:function(){return D(this),this._infinitePerspective}}});var V=new i.Cartesian3,F=new i.Cartesian3,z=new i.Cartesian3,k=new i.Cartesian3;function O(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),this._offCenterFrustum=new M,this.fov=e.fov,this._fov=void 0,this._fovy=void 0,this._sseDenominator=void 0,this.aspectRatio=e.aspectRatio,this._aspectRatio=void 0,this.near=t.defaultValue(e.near,1),this._near=this.near,this.far=t.defaultValue(e.far,5e8),this._far=this.far,this.xOffset=t.defaultValue(e.xOffset,0),this._xOffset=this.xOffset,this.yOffset=t.defaultValue(e.yOffset,0),this._yOffset=this.yOffset}function P(e){if(!(t.defined(e.fov)&&t.defined(e.aspectRatio)&&t.defined(e.near)&&t.defined(e.far)))throw new r.DeveloperError("fov, aspectRatio, near, or far parameters are not set.");var a=e._offCenterFrustum;if(e.fov!==e._fov||e.aspectRatio!==e._aspectRatio||e.near!==e._near||e.far!==e._far||e.xOffset!==e._xOffset||e.yOffset!==e._yOffset){if(e.fov<0||e.fov>=Math.PI)throw new r.DeveloperError("fov must be in the range [0, PI).");if(e.aspectRatio<0)throw new r.DeveloperError("aspectRatio must be positive.");if(e.near<0||e.near>e.far)throw new r.DeveloperError("near must be greater than zero and less than far.");e._aspectRatio=e.aspectRatio,e._fov=e.fov,e._fovy=e.aspectRatio<=1?e.fov:2*Math.atan(Math.tan(.5*e.fov)/e.aspectRatio),e._near=e.near,e._far=e.far,e._sseDenominator=2*Math.tan(.5*e._fovy),e._xOffset=e.xOffset,e._yOffset=e.yOffset,a.top=e.near*Math.tan(.5*e._fovy),a.bottom=-a.top,a.right=e.aspectRatio*a.top,a.left=-a.right,a.near=e.near,a.far=e.far,a.right+=e.xOffset,a.left+=e.xOffset,a.top+=e.yOffset,a.bottom+=e.yOffset}}M.prototype.computeCullingVolume=function(e,a,n){if(!t.defined(e))throw new r.DeveloperError("position is required.");if(!t.defined(a))throw new r.DeveloperError("direction is required.");if(!t.defined(n))throw new r.DeveloperError("up is required.");var s=this._cullingVolume.planes,f=this.top,u=this.bottom,d=this.right,h=this.left,p=this.near,l=this.far,c=i.Cartesian3.cross(a,n,V),m=F;i.Cartesian3.multiplyByScalar(a,p,m),i.Cartesian3.add(e,m,m);var C=z;i.Cartesian3.multiplyByScalar(a,l,C),i.Cartesian3.add(e,C,C);var w=k;i.Cartesian3.multiplyByScalar(c,h,w),i.Cartesian3.add(m,w,w),i.Cartesian3.subtract(w,e,w),i.Cartesian3.normalize(w,w),i.Cartesian3.cross(w,n,w),i.Cartesian3.normalize(w,w);var v=s[0];return t.defined(v)||(v=s[0]=new o.Cartesian4),v.x=w.x,v.y=w.y,v.z=w.z,v.w=-i.Cartesian3.dot(w,e),i.Cartesian3.multiplyByScalar(c,d,w),i.Cartesian3.add(m,w,w),i.Cartesian3.subtract(w,e,w),i.Cartesian3.cross(n,w,w),i.Cartesian3.normalize(w,w),v=s[1],t.defined(v)||(v=s[1]=new o.Cartesian4),v.x=w.x,v.y=w.y,v.z=w.z,v.w=-i.Cartesian3.dot(w,e),i.Cartesian3.multiplyByScalar(n,u,w),i.Cartesian3.add(m,w,w),i.Cartesian3.subtract(w,e,w),i.Cartesian3.cross(c,w,w),i.Cartesian3.normalize(w,w),v=s[2],t.defined(v)||(v=s[2]=new o.Cartesian4),v.x=w.x,v.y=w.y,v.z=w.z,v.w=-i.Cartesian3.dot(w,e),i.Cartesian3.multiplyByScalar(n,f,w),i.Cartesian3.add(m,w,w),i.Cartesian3.subtract(w,e,w),i.Cartesian3.cross(w,c,w),i.Cartesian3.normalize(w,w),v=s[3],t.defined(v)||(v=s[3]=new o.Cartesian4),v.x=w.x,v.y=w.y,v.z=w.z,v.w=-i.Cartesian3.dot(w,e),v=s[4],t.defined(v)||(v=s[4]=new o.Cartesian4),v.x=a.x,v.y=a.y,v.z=a.z,v.w=-i.Cartesian3.dot(a,m),i.Cartesian3.negate(a,w),v=s[5],t.defined(v)||(v=s[5]=new o.Cartesian4),v.x=w.x,v.y=w.y,v.z=w.z,v.w=-i.Cartesian3.dot(w,C),this._cullingVolume},M.prototype.getPixelDimensions=function(e,a,i,n){if(D(this),!t.defined(e)||!t.defined(a))throw new r.DeveloperError("Both drawingBufferWidth and drawingBufferHeight are required.");if(e<=0)throw new r.DeveloperError("drawingBufferWidth must be greater than zero.");if(a<=0)throw new r.DeveloperError("drawingBufferHeight must be greater than zero.");if(!t.defined(i))throw new r.DeveloperError("distance is required.");if(!t.defined(n))throw new r.DeveloperError("A result object is required.");var o=1/this.near,s=this.top*o,f=2*i*s/a,u=2*i*(s=this.right*o)/e;return n.x=u,n.y=f,n},M.prototype.clone=function(e){return t.defined(e)||(e=new M),e.right=this.right,e.left=this.left,e.top=this.top,e.bottom=this.bottom,e.near=this.near,e.far=this.far,e._left=void 0,e._right=void 0,e._top=void 0,e._bottom=void 0,e._near=void 0,e._far=void 0,e},M.prototype.equals=function(e){return t.defined(e)&&e instanceof M&&this.right===e.right&&this.left===e.left&&this.top===e.top&&this.bottom===e.bottom&&this.near===e.near&&this.far===e.far},M.prototype.equalsEpsilon=function(e,r,i){return e===this||t.defined(e)&&e instanceof M&&a.CesiumMath.equalsEpsilon(this.right,e.right,r,i)&&a.CesiumMath.equalsEpsilon(this.left,e.left,r,i)&&a.CesiumMath.equalsEpsilon(this.top,e.top,r,i)&&a.CesiumMath.equalsEpsilon(this.bottom,e.bottom,r,i)&&a.CesiumMath.equalsEpsilon(this.near,e.near,r,i)&&a.CesiumMath.equalsEpsilon(this.far,e.far,r,i)},O.packedLength=6,O.pack=function(e,a,i){return r.Check.typeOf.object("value",e),r.Check.defined("array",a),i=t.defaultValue(i,0),a[i++]=e.fov,a[i++]=e.aspectRatio,a[i++]=e.near,a[i++]=e.far,a[i++]=e.xOffset,a[i]=e.yOffset,a},O.unpack=function(e,a,i){return r.Check.defined("array",e),a=t.defaultValue(a,0),t.defined(i)||(i=new O),i.fov=e[a++],i.aspectRatio=e[a++],i.near=e[a++],i.far=e[a++],i.xOffset=e[a++],i.yOffset=e[a],i},a.defineProperties(O.prototype,{projectionMatrix:{get:function(){return P(this),this._offCenterFrustum.projectionMatrix}},infiniteProjectionMatrix:{get:function(){return P(this),this._offCenterFrustum.infiniteProjectionMatrix}},fovy:{get:function(){return P(this),this._fovy}},sseDenominator:{get:function(){return P(this),this._sseDenominator}}}),O.prototype.computeCullingVolume=function(e,t,r){return P(this),this._offCenterFrustum.computeCullingVolume(e,t,r)},O.prototype.getPixelDimensions=function(e,t,r,a){return P(this),this._offCenterFrustum.getPixelDimensions(e,t,r,a)},O.prototype.clone=function(e){return t.defined(e)||(e=new O),e.aspectRatio=this.aspectRatio,e.fov=this.fov,e.near=this.near,e.far=this.far,e._aspectRatio=void 0,e._fov=void 0,e._near=void 0,e._far=void 0,this._offCenterFrustum.clone(e._offCenterFrustum),e},O.prototype.equals=function(e){return!!(t.defined(e)&&e instanceof O)&&(P(this),P(e),this.fov===e.fov&&this.aspectRatio===e.aspectRatio&&this._offCenterFrustum.equals(e._offCenterFrustum))},O.prototype.equalsEpsilon=function(e,r,i){return!!(t.defined(e)&&e instanceof O)&&(P(this),P(e),a.CesiumMath.equalsEpsilon(this.fov,e.fov,r,i)&&a.CesiumMath.equalsEpsilon(this.aspectRatio,e.aspectRatio,r,i)&&this._offCenterFrustum.equalsEpsilon(e._offCenterFrustum,r,i))};function R(e){r.Check.typeOf.object("options",e),r.Check.typeOf.object("options.frustum",e.frustum),r.Check.typeOf.object("options.origin",e.origin),r.Check.typeOf.object("options.orientation",e.orientation);var a,o,s=e.frustum,f=e.orientation,u=e.origin,d=t.defaultValue(e.vertexFormat,h.VertexFormat.DEFAULT),p=t.defaultValue(e._drawNearPlane,!0);s instanceof O?(a=0,o=O.packedLength):s instanceof b&&(a=1,o=b.packedLength),this._frustumType=a,this._frustum=s.clone(),this._origin=i.Cartesian3.clone(u),this._orientation=n.Quaternion.clone(f),this._drawNearPlane=p,this._vertexFormat=d,this._workerName="createFrustumGeometry",this.packedLength=2+o+i.Cartesian3.packedLength+n.Quaternion.packedLength+h.VertexFormat.packedLength}R.pack=function(e,a,o){r.Check.typeOf.object("value",e),r.Check.defined("array",a),o=t.defaultValue(o,0);var s=e._frustumType,f=e._frustum;return a[o++]=s,0===s?(O.pack(f,a,o),o+=O.packedLength):(b.pack(f,a,o),o+=b.packedLength),i.Cartesian3.pack(e._origin,a,o),o+=i.Cartesian3.packedLength,n.Quaternion.pack(e._orientation,a,o),o+=n.Quaternion.packedLength,h.VertexFormat.pack(e._vertexFormat,a,o),a[o+=h.VertexFormat.packedLength]=e._drawNearPlane?1:0,a};var q=new O,S=new b,T=new n.Quaternion,A=new i.Cartesian3,I=new h.VertexFormat;function B(e,r,a,i,n,o,s,f){for(var u=e/3*2,d=0;d<4;++d)t.defined(r)&&(r[e]=o.x,r[e+1]=o.y,r[e+2]=o.z),t.defined(a)&&(a[e]=s.x,a[e+1]=s.y,a[e+2]=s.z),t.defined(i)&&(i[e]=f.x,i[e+1]=f.y,i[e+2]=f.z),e+=3;n[u]=0,n[u+1]=0,n[u+2]=1,n[u+3]=0,n[u+4]=1,n[u+5]=1,n[u+6]=0,n[u+7]=1}R.unpack=function(e,a,o){r.Check.defined("array",e),a=t.defaultValue(a,0);var s,f=e[a++];0===f?(s=O.unpack(e,a,q),a+=O.packedLength):(s=b.unpack(e,a,S),a+=b.packedLength);var u=i.Cartesian3.unpack(e,a,A);a+=i.Cartesian3.packedLength;var d=n.Quaternion.unpack(e,a,T);a+=n.Quaternion.packedLength;var p=h.VertexFormat.unpack(e,a,I),l=1===e[a+=h.VertexFormat.packedLength];if(!t.defined(o))return new R({frustum:s,origin:u,orientation:d,vertexFormat:p,_drawNearPlane:l});var c=f===o._frustumType?o._frustum:void 0;return o._frustum=s.clone(c),o._frustumType=f,o._origin=i.Cartesian3.clone(u,o._origin),o._orientation=n.Quaternion.clone(d,o._orientation),o._vertexFormat=h.VertexFormat.clone(p,o._vertexFormat),o._drawNearPlane=l,o};var L=new o.Matrix3,N=new o.Matrix4,j=new o.Matrix4,G=new i.Cartesian3,U=new i.Cartesian3,Q=new i.Cartesian3,K=new i.Cartesian3,W=new i.Cartesian3,Y=new i.Cartesian3,H=new Array(3),J=new Array(4);J[0]=new o.Cartesian4(-1,-1,1,1),J[1]=new o.Cartesian4(1,-1,1,1),J[2]=new o.Cartesian4(1,1,1,1),J[3]=new o.Cartesian4(-1,1,1,1);for(var X=new Array(4),Z=0;Z<4;++Z)X[Z]=new o.Cartesian4;R._computeNearFarPlanes=function(e,r,a,n,s,f,u,d){var h=o.Matrix3.fromQuaternion(r,L),p=t.defaultValue(f,G),l=t.defaultValue(u,U),c=t.defaultValue(d,Q);p=o.Matrix3.getColumn(h,0,p),l=o.Matrix3.getColumn(h,1,l),c=o.Matrix3.getColumn(h,2,c),i.Cartesian3.normalize(p,p),i.Cartesian3.normalize(l,l),i.Cartesian3.normalize(c,c),i.Cartesian3.negate(p,p);var m,C,w=o.Matrix4.computeView(e,c,l,p,N);if(0===a){var v=n.projectionMatrix,_=o.Matrix4.multiply(v,w,j);C=o.Matrix4.inverse(_,j)}else m=o.Matrix4.inverseTransformation(w,j);t.defined(C)?(H[0]=n.near,H[1]=n.far):(H[0]=0,H[1]=n.near,H[2]=n.far);for(var y=0;y<2;++y)for(var g=0;g<4;++g){var x=o.Cartesian4.clone(J[g],X[g]);if(t.defined(C)){var b=1/(x=o.Matrix4.multiplyByVector(C,x,x)).w;i.Cartesian3.multiplyByScalar(x,b,x),i.Cartesian3.subtract(x,e,x),i.Cartesian3.normalize(x,x);var E=i.Cartesian3.dot(c,x);i.Cartesian3.multiplyByScalar(x,H[y]/E,x),i.Cartesian3.add(x,e,x)}else{t.defined(n._offCenterFrustum)&&(n=n._offCenterFrustum);var M=H[y],D=H[y+1];x.x=.5*(x.x*(n.right-n.left)+n.left+n.right),x.y=.5*(x.y*(n.top-n.bottom)+n.bottom+n.top),x.z=.5*(x.z*(M-D)-M-D),x.w=1,o.Matrix4.multiplyByVector(m,x,x)}s[12*y+3*g]=x.x,s[12*y+3*g+1]=x.y,s[12*y+3*g+2]=x.z}},R.createGeometry=function(e){var r=e._frustumType,a=e._frustum,o=e._origin,d=e._orientation,h=e._drawNearPlane,p=e._vertexFormat,l=h?6:5,c=new Float64Array(72);R._computeNearFarPlanes(o,d,r,a,c);var m=24;c[m]=c[12],c[m+1]=c[13],c[m+2]=c[14],c[m+3]=c[0],c[m+4]=c[1],c[m+5]=c[2],c[m+6]=c[9],c[m+7]=c[10],c[m+8]=c[11],c[m+9]=c[21],c[m+10]=c[22],c[m+11]=c[23],c[m+=12]=c[15],c[m+1]=c[16],c[m+2]=c[17],c[m+3]=c[3],c[m+4]=c[4],c[m+5]=c[5],c[m+6]=c[0],c[m+7]=c[1],c[m+8]=c[2],c[m+9]=c[12],c[m+10]=c[13],c[m+11]=c[14],c[m+=12]=c[3],c[m+1]=c[4],c[m+2]=c[5],c[m+3]=c[15],c[m+4]=c[16],c[m+5]=c[17],c[m+6]=c[18],c[m+7]=c[19],c[m+8]=c[20],c[m+9]=c[6],c[m+10]=c[7],c[m+11]=c[8],c[m+=12]=c[6],c[m+1]=c[7],c[m+2]=c[8],c[m+3]=c[18],c[m+4]=c[19],c[m+5]=c[20],c[m+6]=c[21],c[m+7]=c[22],c[m+8]=c[23],c[m+9]=c[9],c[m+10]=c[10],c[m+11]=c[11],h||(c=c.subarray(12));var C=new u.GeometryAttributes({position:new f.GeometryAttribute({componentDatatype:s.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c})});if(t.defined(p.normal)||t.defined(p.tangent)||t.defined(p.bitangent)||t.defined(p.st)){var w=t.defined(p.normal)?new Float32Array(12*l):void 0,v=t.defined(p.tangent)?new Float32Array(12*l):void 0,_=t.defined(p.bitangent)?new Float32Array(12*l):void 0,y=t.defined(p.st)?new Float32Array(8*l):void 0,g=G,x=U,b=Q,E=i.Cartesian3.negate(g,K),M=i.Cartesian3.negate(x,W),D=i.Cartesian3.negate(b,Y);m=0,h&&(B(m,w,v,_,y,D,g,x),m+=12),B(m,w,v,_,y,b,E,x),B(m+=12,w,v,_,y,E,D,x),B(m+=12,w,v,_,y,M,D,E),B(m+=12,w,v,_,y,g,b,x),B(m+=12,w,v,_,y,x,b,E),t.defined(w)&&(C.normal=new f.GeometryAttribute({componentDatatype:s.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:w})),t.defined(v)&&(C.tangent=new f.GeometryAttribute({componentDatatype:s.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:v})),t.defined(_)&&(C.bitangent=new f.GeometryAttribute({componentDatatype:s.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:_})),t.defined(y)&&(C.st=new f.GeometryAttribute({componentDatatype:s.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:y}))}for(var V=new Uint16Array(6*l),F=0;F<l;++F){var z=6*F,k=4*F;V[z]=k,V[z+1]=k+1,V[z+2]=k+2,V[z+3]=k,V[z+4]=k+2,V[z+5]=k+3}return new f.Geometry({attributes:C,indices:V,primitiveType:f.PrimitiveType.TRIANGLES,boundingSphere:n.BoundingSphere.fromVertices(c)})},e.FrustumGeometry=R,e.OrthographicFrustum=b,e.PerspectiveFrustum=O}));

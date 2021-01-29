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
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Matrix4-33464f2b"],(function(e,n,t,a,r,i){"use strict";function o(e,n){if(t.Check.typeOf.object("normal",e),!a.CesiumMath.equalsEpsilon(r.Cartesian3.magnitude(e),1,a.CesiumMath.EPSILON6))throw new t.DeveloperError("normal must be normalized.");t.Check.typeOf.number("distance",n),this.normal=r.Cartesian3.clone(e),this.distance=n}o.fromPointNormal=function(e,i,c){if(t.Check.typeOf.object("point",e),t.Check.typeOf.object("normal",i),!a.CesiumMath.equalsEpsilon(r.Cartesian3.magnitude(i),1,a.CesiumMath.EPSILON6))throw new t.DeveloperError("normal must be normalized.");var s=-r.Cartesian3.dot(i,e);return n.defined(c)?(r.Cartesian3.clone(i,c.normal),c.distance=s,c):new o(i,s)};var c=new r.Cartesian3;o.fromCartesian4=function(e,i){t.Check.typeOf.object("coefficients",e);var s=r.Cartesian3.fromCartesian4(e,c),l=e.w;if(!a.CesiumMath.equalsEpsilon(r.Cartesian3.magnitude(s),1,a.CesiumMath.EPSILON6))throw new t.DeveloperError("normal must be normalized.");return n.defined(i)?(r.Cartesian3.clone(s,i.normal),i.distance=l,i):new o(s,l)},o.getPointDistance=function(e,n){return t.Check.typeOf.object("plane",e),t.Check.typeOf.object("point",n),r.Cartesian3.dot(e.normal,n)+e.distance};var s=new r.Cartesian3;o.projectPointOntoPlane=function(e,a,i){t.Check.typeOf.object("plane",e),t.Check.typeOf.object("point",a),n.defined(i)||(i=new r.Cartesian3);var c=o.getPointDistance(e,a),l=r.Cartesian3.multiplyByScalar(e.normal,c,s);return r.Cartesian3.subtract(a,l,i)};var l=new r.Cartesian3;o.transform=function(e,n,a){return t.Check.typeOf.object("plane",e),t.Check.typeOf.object("transform",n),i.Matrix4.multiplyByPointAsVector(n,e.normal,c),r.Cartesian3.normalize(c,c),r.Cartesian3.multiplyByScalar(e.normal,-e.distance,l),i.Matrix4.multiplyByPoint(n,l,l),o.fromPointNormal(l,c,a)},o.clone=function(e,a){return t.Check.typeOf.object("plane",e),n.defined(a)?(r.Cartesian3.clone(e.normal,a.normal),a.distance=e.distance,a):new o(e.normal,e.distance)},o.equals=function(e,n){return t.Check.typeOf.object("left",e),t.Check.typeOf.object("right",n),e.distance===n.distance&&r.Cartesian3.equals(e.normal,n.normal)},o.ORIGIN_XY_PLANE=n.freezeObject(new o(r.Cartesian3.UNIT_Z,0)),o.ORIGIN_YZ_PLANE=n.freezeObject(new o(r.Cartesian3.UNIT_X,0)),o.ORIGIN_ZX_PLANE=n.freezeObject(new o(r.Cartesian3.UNIT_Y,0)),e.Plane=o}));

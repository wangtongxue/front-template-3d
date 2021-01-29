define(["./when-7ef6387a","./Check-ed6a1804","./Math-85667bf9","./Ellipsoid-1cbb4ac9","./Transforms-c20c38d0","./RuntimeError-5b606d78","./Cartesian2-73569d25","./WebGLConstants-30fc6f5c","./ComponentDatatype-a863af81","./GeometryAttribute-6b3c7112","./GeometryAttributes-cb18da36","./IndexDatatype-f12d39b5","./GeometryOffsetAttribute-5cfc2755","./EllipseGeometryLibrary-22c86a32","./EllipseOutlineGeometry-ef01aef0"],(function(e,i,t,r,l,n,s,o,a,c,u,d,m,p,y){"use strict";function f(t){var r=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).radius;i.Check.typeOf.number("radius",r);var l={center:t.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:t.ellipsoid,height:t.height,extrudedHeight:t.extrudedHeight,granularity:t.granularity,numberOfVerticalLines:t.numberOfVerticalLines};this._ellipseGeometry=new y.EllipseOutlineGeometry(l),this._workerName="createCircleOutlineGeometry"}f.packedLength=y.EllipseOutlineGeometry.packedLength,f.pack=function(e,t,r){return i.Check.typeOf.object("value",e),y.EllipseOutlineGeometry.pack(e._ellipseGeometry,t,r)};var G=new y.EllipseOutlineGeometry({center:new r.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),h={center:new r.Cartesian3,radius:void 0,ellipsoid:r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};return f.unpack=function(i,t,l){var n=y.EllipseOutlineGeometry.unpack(i,t,G);return h.center=r.Cartesian3.clone(n._center,h.center),h.ellipsoid=r.Ellipsoid.clone(n._ellipsoid,h.ellipsoid),h.height=n._height,h.extrudedHeight=n._extrudedHeight,h.granularity=n._granularity,h.numberOfVerticalLines=n._numberOfVerticalLines,e.defined(l)?(h.semiMajorAxis=n._semiMajorAxis,h.semiMinorAxis=n._semiMinorAxis,l._ellipseGeometry=new y.EllipseOutlineGeometry(h),l):(h.radius=n._semiMajorAxis,new f(h))},f.createGeometry=function(e){return y.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},function(i,t){return e.defined(t)&&(i=f.unpack(i,t)),i._ellipseGeometry._center=r.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=r.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),f.createGeometry(i)}}));
//# sourceMappingURL=createCircleOutlineGeometry.js.map
define(["./when-7ef6387a","./Check-ed6a1804","./Math-85667bf9","./Ellipsoid-1cbb4ac9","./Transforms-c20c38d0","./RuntimeError-5b606d78","./Cartesian2-73569d25","./WebGLConstants-30fc6f5c","./ComponentDatatype-a863af81","./GeometryAttribute-6b3c7112","./GeometryAttributes-cb18da36","./AttributeCompression-5e3c38a2","./GeometryPipeline-585f444f","./EncodedCartesian3-fbe51c6d","./IndexDatatype-f12d39b5","./IntersectionTests-faaebeeb","./Plane-6ff6c057","./VertexFormat-d75df48f","./GeometryInstance-ebd8a828","./arrayRemoveDuplicates-9458abce","./BoundingRectangle-41c90928","./EllipsoidTangentPlane-13a4f7fd","./OrientedBoundingBox-565e6407","./CoplanarPolygonGeometryLibrary-a25e2653","./ArcType-2ee8dfbb","./EllipsoidRhumbLine-01425f3c","./PolygonPipeline-5110db34","./PolygonGeometryLibrary-bbb55e41"],(function(e,t,a,n,r,o,i,s,l,p,c,y,u,m,d,g,b,f,h,v,C,x,P,w,A,F,G,L){"use strict";var E=new n.Cartesian3,k=new C.BoundingRectangle,T=new i.Cartesian2,D=new i.Cartesian2,_=new n.Cartesian3,V=new n.Cartesian3,R=new n.Cartesian3,I=new n.Cartesian3,M=new n.Cartesian3,H=new n.Cartesian3,B=new r.Quaternion,O=new r.Matrix3,z=new r.Matrix3,S=new n.Cartesian3;function N(e,t,o,s,y,u,m,g){var b=e.positions,f=G.PolygonPipeline.triangulate(e.positions2D,e.holes);f.length<3&&(f=[0,1,2]);var h=d.IndexDatatype.createTypedArray(b.length,f.length);h.set(f);var v=O;if(0!==s){var C=r.Quaternion.fromAxisAngle(u,s,B);if(v=r.Matrix3.fromQuaternion(C,v),t.tangent||t.bitangent){C=r.Quaternion.fromAxisAngle(u,-s,B);var x=r.Matrix3.fromQuaternion(C,z);m=n.Cartesian3.normalize(r.Matrix3.multiplyByVector(x,m,m),m),t.bitangent&&(g=n.Cartesian3.normalize(n.Cartesian3.cross(u,m,g),g))}}else v=r.Matrix3.clone(r.Matrix3.IDENTITY,v);var P=D;t.st&&(P.x=o.x,P.y=o.y);for(var w=b.length,A=3*w,F=new Float64Array(A),L=t.normal?new Float32Array(A):void 0,k=t.tangent?new Float32Array(A):void 0,_=t.bitangent?new Float32Array(A):void 0,V=t.st?new Float32Array(2*w):void 0,R=0,I=0,M=0,H=0,S=0,N=0;N<w;N++){var Q=b[N];if(F[R++]=Q.x,F[R++]=Q.y,F[R++]=Q.z,t.st){var j=y(r.Matrix3.multiplyByVector(v,Q,E),T);i.Cartesian2.subtract(j,P,j);var U=a.CesiumMath.clamp(j.x/o.width,0,1),Y=a.CesiumMath.clamp(j.y/o.height,0,1);V[S++]=U,V[S++]=Y}t.normal&&(L[I++]=u.x,L[I++]=u.y,L[I++]=u.z),t.tangent&&(k[H++]=m.x,k[H++]=m.y,k[H++]=m.z),t.bitangent&&(_[M++]=g.x,_[M++]=g.y,_[M++]=g.z)}var q=new c.GeometryAttributes;return t.position&&(q.position=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:F})),t.normal&&(q.normal=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:L})),t.tangent&&(q.tangent=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:k})),t.bitangent&&(q.bitangent=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:_})),t.st&&(q.st=new p.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:V})),new p.Geometry({attributes:q,indices:h,primitiveType:p.PrimitiveType.TRIANGLES})}function Q(a){var r=(a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT)).polygonHierarchy;t.Check.defined("options.polygonHierarchy",r);var o=e.defaultValue(a.vertexFormat,f.VertexFormat.DEFAULT);this._vertexFormat=f.VertexFormat.clone(o),this._polygonHierarchy=r,this._stRotation=e.defaultValue(a.stRotation,0),this._ellipsoid=n.Ellipsoid.clone(e.defaultValue(a.ellipsoid,n.Ellipsoid.WGS84)),this._workerName="createCoplanarPolygonGeometry",this.packedLength=L.PolygonGeometryLibrary.computeHierarchyPackedLength(r)+f.VertexFormat.packedLength+n.Ellipsoid.packedLength+2}Q.fromPositions=function(a){return a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT),t.Check.defined("options.positions",a.positions),new Q({polygonHierarchy:{positions:a.positions},vertexFormat:a.vertexFormat,stRotation:a.stRotation,ellipsoid:a.ellipsoid})},Q.pack=function(a,r,o){return t.Check.typeOf.object("value",a),t.Check.defined("array",r),o=e.defaultValue(o,0),o=L.PolygonGeometryLibrary.packPolygonHierarchy(a._polygonHierarchy,r,o),n.Ellipsoid.pack(a._ellipsoid,r,o),o+=n.Ellipsoid.packedLength,f.VertexFormat.pack(a._vertexFormat,r,o),o+=f.VertexFormat.packedLength,r[o++]=a._stRotation,r[o]=a.packedLength,r};var j=n.Ellipsoid.clone(n.Ellipsoid.UNIT_SPHERE),U=new f.VertexFormat,Y={polygonHierarchy:{}};return Q.unpack=function(a,r,o){t.Check.defined("array",a),r=e.defaultValue(r,0);var i=L.PolygonGeometryLibrary.unpackPolygonHierarchy(a,r);r=i.startingIndex,delete i.startingIndex;var s=n.Ellipsoid.unpack(a,r,j);r+=n.Ellipsoid.packedLength;var l=f.VertexFormat.unpack(a,r,U);r+=f.VertexFormat.packedLength;var p=a[r++],c=a[r];return e.defined(o)||(o=new Q(Y)),o._polygonHierarchy=i,o._ellipsoid=n.Ellipsoid.clone(s,o._ellipsoid),o._vertexFormat=f.VertexFormat.clone(l,o._vertexFormat),o._stRotation=p,o.packedLength=c,o},Q.createGeometry=function(e){var t=e._vertexFormat,o=e._polygonHierarchy,i=e._stRotation,s=o.positions;if(!((s=v.arrayRemoveDuplicates(s,n.Cartesian3.equalsEpsilon,!0)).length<3)){var l=_,c=V,y=R,m=M,g=H;if(w.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(s,I,m,g)){if(l=n.Cartesian3.cross(m,g,l),l=n.Cartesian3.normalize(l,l),!n.Cartesian3.equalsEpsilon(I,n.Cartesian3.ZERO,a.CesiumMath.EPSILON6)){var b=e._ellipsoid.geodeticSurfaceNormal(I,S);n.Cartesian3.dot(l,b)<0&&(l=n.Cartesian3.negate(l,l),m=n.Cartesian3.negate(m,m))}var f=w.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(I,m,g),C=w.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(I,m,g);t.tangent&&(c=n.Cartesian3.clone(m,c)),t.bitangent&&(y=n.Cartesian3.clone(g,y));var x=L.PolygonGeometryLibrary.polygonsFromHierarchy(o,f,!1),P=x.hierarchy,A=x.polygons;if(0!==P.length){s=P[0].outerRing;for(var F=r.BoundingSphere.fromPoints(s),G=L.PolygonGeometryLibrary.computeBoundingRectangle(l,C,s,i,k),E=[],T=0;T<A.length;T++){var D=new h.GeometryInstance({geometry:N(A[T],t,G,i,C,l,c,y)});E.push(D)}var B=u.GeometryPipeline.combineInstances(E)[0];B.attributes.position.values=new Float64Array(B.attributes.position.values),B.indices=d.IndexDatatype.createTypedArray(B.attributes.position.values.length/3,B.indices);var O=B.attributes;return t.position||delete O.position,new p.Geometry({attributes:O,indices:B.indices,primitiveType:B.primitiveType,boundingSphere:F})}}}},function(t,a){return e.defined(a)&&(t=Q.unpack(t,a)),Q.createGeometry(t)}}));
//# sourceMappingURL=createCoplanarPolygonGeometry.js.map
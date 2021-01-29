define(["./when-7ef6387a","./Check-ed6a1804","./Math-85667bf9","./Ellipsoid-1cbb4ac9","./Transforms-c20c38d0","./RuntimeError-5b606d78","./Cartesian2-73569d25","./WebGLConstants-30fc6f5c","./ComponentDatatype-a863af81","./GeometryAttribute-6b3c7112","./GeometryAttributes-cb18da36","./IndexDatatype-f12d39b5","./IntersectionTests-faaebeeb","./Plane-6ff6c057","./VertexFormat-d75df48f","./EllipsoidTangentPlane-13a4f7fd","./EllipsoidRhumbLine-01425f3c","./PolygonPipeline-5110db34","./EllipsoidGeodesic-2bb1f4ee","./PolylinePipeline-2458e977","./WallGeometryLibrary-2768c19e"],(function(e,t,i,r,a,n,o,s,l,m,d,p,u,f,c,h,g,y,v,C,w){"use strict";var b=new r.Cartesian3,E=new r.Cartesian3,x=new r.Cartesian3,A=new r.Cartesian3,_=new r.Cartesian3,F=new r.Cartesian3,D=new r.Cartesian3,L=new r.Cartesian3;function H(a){var n=(a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT)).positions,o=a.maximumHeights,s=a.minimumHeights;if(!e.defined(n))throw new t.DeveloperError("options.positions is required.");if(e.defined(o)&&o.length!==n.length)throw new t.DeveloperError("options.positions and options.maximumHeights must have the same length.");if(e.defined(s)&&s.length!==n.length)throw new t.DeveloperError("options.positions and options.minimumHeights must have the same length.");var l=e.defaultValue(a.vertexFormat,c.VertexFormat.DEFAULT),m=e.defaultValue(a.granularity,i.CesiumMath.RADIANS_PER_DEGREE),d=e.defaultValue(a.ellipsoid,r.Ellipsoid.WGS84);this._positions=n,this._minimumHeights=s,this._maximumHeights=o,this._vertexFormat=c.VertexFormat.clone(l),this._granularity=m,this._ellipsoid=r.Ellipsoid.clone(d),this._workerName="createWallGeometry";var p=1+n.length*r.Cartesian3.packedLength+2;e.defined(s)&&(p+=s.length),e.defined(o)&&(p+=o.length),this.packedLength=p+r.Ellipsoid.packedLength+c.VertexFormat.packedLength+1}H.pack=function(i,a,n){if(!e.defined(i))throw new t.DeveloperError("value is required");if(!e.defined(a))throw new t.DeveloperError("array is required");var o;n=e.defaultValue(n,0);var s=i._positions,l=s.length;for(a[n++]=l,o=0;o<l;++o,n+=r.Cartesian3.packedLength)r.Cartesian3.pack(s[o],a,n);var m=i._minimumHeights;if(l=e.defined(m)?m.length:0,a[n++]=l,e.defined(m))for(o=0;o<l;++o)a[n++]=m[o];var d=i._maximumHeights;if(l=e.defined(d)?d.length:0,a[n++]=l,e.defined(d))for(o=0;o<l;++o)a[n++]=d[o];return r.Ellipsoid.pack(i._ellipsoid,a,n),n+=r.Ellipsoid.packedLength,c.VertexFormat.pack(i._vertexFormat,a,n),a[n+=c.VertexFormat.packedLength]=i._granularity,a};var k=r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),G=new c.VertexFormat,P={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:k,vertexFormat:G,granularity:void 0};return H.unpack=function(i,a,n){if(!e.defined(i))throw new t.DeveloperError("array is required");var o;a=e.defaultValue(a,0);var s,l,m=i[a++],d=new Array(m);for(o=0;o<m;++o,a+=r.Cartesian3.packedLength)d[o]=r.Cartesian3.unpack(i,a);if((m=i[a++])>0)for(s=new Array(m),o=0;o<m;++o)s[o]=i[a++];if((m=i[a++])>0)for(l=new Array(m),o=0;o<m;++o)l[o]=i[a++];var p=r.Ellipsoid.unpack(i,a,k);a+=r.Ellipsoid.packedLength;var u=c.VertexFormat.unpack(i,a,G),f=i[a+=c.VertexFormat.packedLength];return e.defined(n)?(n._positions=d,n._minimumHeights=s,n._maximumHeights=l,n._ellipsoid=r.Ellipsoid.clone(p,n._ellipsoid),n._vertexFormat=c.VertexFormat.clone(u,n._vertexFormat),n._granularity=f,n):(P.positions=d,P.minimumHeights=s,P.maximumHeights=l,P.granularity=f,new H(P))},H.fromConstantHeights=function(i){var r,a,n=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).positions;if(!e.defined(n))throw new t.DeveloperError("options.positions is required.");var o=i.minimumHeight,s=i.maximumHeight,l=e.defined(o),m=e.defined(s);if(l||m){var d=n.length;r=l?new Array(d):void 0,a=m?new Array(d):void 0;for(var p=0;p<d;++p)l&&(r[p]=o),m&&(a[p]=s)}return new H({positions:n,maximumHeights:a,minimumHeights:r,ellipsoid:i.ellipsoid,vertexFormat:i.vertexFormat})},H.createGeometry=function(t){var n=t._positions,o=t._minimumHeights,s=t._maximumHeights,u=t._vertexFormat,f=t._granularity,c=t._ellipsoid,h=w.WallGeometryLibrary.computePositions(c,n,s,o,f,!0);if(e.defined(h)){var g,y=h.bottomPositions,v=h.topPositions,C=h.numCorners,H=v.length,k=2*H,G=u.position?new Float64Array(k):void 0,P=u.normal?new Float32Array(k):void 0,V=u.tangent?new Float32Array(k):void 0,T=u.bitangent?new Float32Array(k):void 0,z=u.st?new Float32Array(k/3*2):void 0,O=0,S=0,I=0,R=0,q=0,M=L,N=D,W=F,B=!0,U=0,J=1/((H/=3)-n.length+1);for(g=0;g<H;++g){var Y=3*g,Z=r.Cartesian3.fromArray(v,Y,b),j=r.Cartesian3.fromArray(y,Y,E);if(u.position&&(G[O++]=j.x,G[O++]=j.y,G[O++]=j.z,G[O++]=Z.x,G[O++]=Z.y,G[O++]=Z.z),u.st&&(z[q++]=U,z[q++]=0,z[q++]=U,z[q++]=1),u.normal||u.tangent||u.bitangent){var K,Q=r.Cartesian3.clone(r.Cartesian3.ZERO,_),X=c.scaleToGeodeticSurface(r.Cartesian3.fromArray(v,Y,E),E);if(g+1<H&&(K=c.scaleToGeodeticSurface(r.Cartesian3.fromArray(v,Y+3,x),x),Q=r.Cartesian3.fromArray(v,Y+3,_)),B){var $=r.Cartesian3.subtract(Q,Z,A),ee=r.Cartesian3.subtract(X,Z,b);M=r.Cartesian3.normalize(r.Cartesian3.cross(ee,$,M),M),B=!1}r.Cartesian3.equalsEpsilon(K,X,i.CesiumMath.EPSILON10)?B=!0:(U+=J,u.tangent&&(N=r.Cartesian3.normalize(r.Cartesian3.subtract(K,X,N),N)),u.bitangent&&(W=r.Cartesian3.normalize(r.Cartesian3.cross(M,N,W),W))),u.normal&&(P[S++]=M.x,P[S++]=M.y,P[S++]=M.z,P[S++]=M.x,P[S++]=M.y,P[S++]=M.z),u.tangent&&(V[R++]=N.x,V[R++]=N.y,V[R++]=N.z,V[R++]=N.x,V[R++]=N.y,V[R++]=N.z),u.bitangent&&(T[I++]=W.x,T[I++]=W.y,T[I++]=W.z,T[I++]=W.x,T[I++]=W.y,T[I++]=W.z)}}var te=new d.GeometryAttributes;u.position&&(te.position=new m.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:G})),u.normal&&(te.normal=new m.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:P})),u.tangent&&(te.tangent=new m.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:V})),u.bitangent&&(te.bitangent=new m.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:T})),u.st&&(te.st=new m.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:z}));var ie=k/3;k-=6*(C+1);var re=p.IndexDatatype.createTypedArray(ie,k),ae=0;for(g=0;g<ie-2;g+=2){var ne=g,oe=g+2,se=r.Cartesian3.fromArray(G,3*ne,b),le=r.Cartesian3.fromArray(G,3*oe,E);if(!r.Cartesian3.equalsEpsilon(se,le,i.CesiumMath.EPSILON10)){var me=g+1,de=g+3;re[ae++]=me,re[ae++]=ne,re[ae++]=de,re[ae++]=de,re[ae++]=ne,re[ae++]=oe}}return new m.Geometry({attributes:te,indices:re,primitiveType:m.PrimitiveType.TRIANGLES,boundingSphere:new a.BoundingSphere.fromVertices(G)})}},function(t,i){return e.defined(i)&&(t=H.unpack(t,i)),t._ellipsoid=r.Ellipsoid.clone(t._ellipsoid),H.createGeometry(t)}}));
//# sourceMappingURL=createWallGeometry.js.map
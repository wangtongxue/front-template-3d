define(["./when-7ef6387a","./Check-ed6a1804","./Math-85667bf9","./Ellipsoid-1cbb4ac9","./Transforms-c20c38d0","./RuntimeError-5b606d78","./Cartesian2-73569d25","./WebGLConstants-30fc6f5c","./ComponentDatatype-a863af81","./GeometryAttribute-6b3c7112","./GeometryAttributes-cb18da36","./AttributeCompression-5e3c38a2","./GeometryPipeline-585f444f","./EncodedCartesian3-fbe51c6d","./IndexDatatype-f12d39b5","./IntersectionTests-faaebeeb","./Plane-6ff6c057","./VertexFormat-d75df48f","./arrayRemoveDuplicates-9458abce","./BoundingRectangle-41c90928","./EllipsoidTangentPlane-13a4f7fd","./EllipsoidRhumbLine-01425f3c","./PolygonPipeline-5110db34","./PolylineVolumeGeometryLibrary-7075293a","./EllipsoidGeodesic-2bb1f4ee","./PolylinePipeline-2458e977"],(function(e,t,r,i,n,o,a,l,s,d,p,u,c,g,y,h,f,m,v,b,E,w,P,_,x,k){"use strict";var C={};function V(r,i){if(!e.defined(r))throw new t.DeveloperError("identifier is required.");e.defined(C[r])||(C[r]=!0,console.warn(e.defaultValue(i,r)))}function D(n){var o=(n=e.defaultValue(n,e.defaultValue.EMPTY_OBJECT)).polylinePositions,l=n.shapePositions;if(!e.defined(o))throw new t.DeveloperError("options.polylinePositions is required.");if(!e.defined(l))throw new t.DeveloperError("options.shapePositions is required.");this._positions=o,this._shape=l,this._ellipsoid=i.Ellipsoid.clone(e.defaultValue(n.ellipsoid,i.Ellipsoid.WGS84)),this._cornerType=e.defaultValue(n.cornerType,_.CornerType.ROUNDED),this._vertexFormat=m.VertexFormat.clone(e.defaultValue(n.vertexFormat,m.VertexFormat.DEFAULT)),this._granularity=e.defaultValue(n.granularity,r.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeGeometry";var s=1+o.length*i.Cartesian3.packedLength;s+=1+l.length*a.Cartesian2.packedLength,this.packedLength=s+i.Ellipsoid.packedLength+m.VertexFormat.packedLength+2}V.geometryOutlines="Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.",V.geometryZIndex="Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored",V.geometryHeightReference="Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored",V.geometryExtrudedHeightReference="Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored",D.pack=function(r,n,o){if(!e.defined(r))throw new t.DeveloperError("value is required");if(!e.defined(n))throw new t.DeveloperError("array is required");var l;o=e.defaultValue(o,0);var s=r._positions,d=s.length;for(n[o++]=d,l=0;l<d;++l,o+=i.Cartesian3.packedLength)i.Cartesian3.pack(s[l],n,o);var p=r._shape;for(d=p.length,n[o++]=d,l=0;l<d;++l,o+=a.Cartesian2.packedLength)a.Cartesian2.pack(p[l],n,o);return i.Ellipsoid.pack(r._ellipsoid,n,o),o+=i.Ellipsoid.packedLength,m.VertexFormat.pack(r._vertexFormat,n,o),o+=m.VertexFormat.packedLength,n[o++]=r._cornerType,n[o]=r._granularity,n};var L=i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),F=new m.VertexFormat,T={polylinePositions:void 0,shapePositions:void 0,ellipsoid:L,vertexFormat:F,cornerType:void 0,granularity:void 0};D.unpack=function(r,n,o){if(!e.defined(r))throw new t.DeveloperError("array is required");var l;n=e.defaultValue(n,0);var s=r[n++],d=new Array(s);for(l=0;l<s;++l,n+=i.Cartesian3.packedLength)d[l]=i.Cartesian3.unpack(r,n);s=r[n++];var p=new Array(s);for(l=0;l<s;++l,n+=a.Cartesian2.packedLength)p[l]=a.Cartesian2.unpack(r,n);var u=i.Ellipsoid.unpack(r,n,L);n+=i.Ellipsoid.packedLength;var c=m.VertexFormat.unpack(r,n,F);n+=m.VertexFormat.packedLength;var g=r[n++],y=r[n];return e.defined(o)?(o._positions=d,o._shape=p,o._ellipsoid=i.Ellipsoid.clone(u,o._ellipsoid),o._vertexFormat=m.VertexFormat.clone(c,o._vertexFormat),o._cornerType=g,o._granularity=y,o):(T.polylinePositions=d,T.shapePositions=p,T.cornerType=g,T.granularity=y,new D(T))};var G=new b.BoundingRectangle;return D.createGeometry=function(e){var t=e._positions,r=v.arrayRemoveDuplicates(t,i.Cartesian3.equalsEpsilon),o=e._shape;if(o=_.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(o),!(r.length<2||o.length<3)){P.PolygonPipeline.computeWindingOrder2D(o)===P.WindingOrder.CLOCKWISE&&o.reverse();var a=b.BoundingRectangle.fromPoints(o,G);return function(e,t,r,i){var o=new p.GeometryAttributes;i.position&&(o.position=new d.GeometryAttribute({componentDatatype:s.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e}));var a,l,u,g,h,f,m=t.length,v=e.length/3,b=(v-2*m)/(2*m),E=P.PolygonPipeline.triangulate(t),w=(b-1)*m*6+2*E.length,_=y.IndexDatatype.createTypedArray(v,w),x=2*m,k=0;for(a=0;a<b-1;a++){for(l=0;l<m-1;l++)f=(u=2*l+a*m*2)+x,h=(g=u+1)+x,_[k++]=g,_[k++]=u,_[k++]=h,_[k++]=h,_[k++]=u,_[k++]=f;h=(g=(u=2*m-2+a*m*2)+1)+x,f=u+x,_[k++]=g,_[k++]=u,_[k++]=h,_[k++]=h,_[k++]=u,_[k++]=f}if(i.st||i.tangent||i.bitangent){var C,D,L=new Float32Array(2*v),F=1/(b-1),T=1/r.height,G=r.height/2,A=0;for(a=0;a<b;a++){for(C=a*F,D=T*(t[0].y+G),L[A++]=C,L[A++]=D,l=1;l<m;l++)D=T*(t[l].y+G),L[A++]=C,L[A++]=D,L[A++]=C,L[A++]=D;D=T*(t[0].y+G),L[A++]=C,L[A++]=D}for(l=0;l<m;l++)C=0,D=T*(t[l].y+G),L[A++]=C,L[A++]=D;for(l=0;l<m;l++)C=(b-1)*F,D=T*(t[l].y+G),L[A++]=C,L[A++]=D;o.st=new d.GeometryAttribute({componentDatatype:s.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:new Float32Array(L)})}var R=v-2*m;for(a=0;a<E.length;a+=3){var I=E[a]+R,O=E[a+1]+R,S=E[a+2]+R;_[k++]=I,_[k++]=O,_[k++]=S,_[k++]=S+m,_[k++]=O+m,_[k++]=I+m}var q=new d.Geometry({attributes:o,indices:_,boundingSphere:n.BoundingSphere.fromVertices(e),primitiveType:d.PrimitiveType.TRIANGLES});if(i.normal&&(q=c.GeometryPipeline.computeNormal(q)),i.tangent||i.bitangent){try{q=c.GeometryPipeline.computeTangentAndBitangent(q)}catch(e){V("polyline-volume-tangent-bitangent","Unable to compute tangents and bitangents for polyline volume geometry")}i.tangent||(q.attributes.tangent=void 0),i.bitangent||(q.attributes.bitangent=void 0),i.st||(q.attributes.st=void 0)}return q}(_.PolylineVolumeGeometryLibrary.computePositions(r,o,a,e,!0),o,a,e._vertexFormat)}},function(t,r){return e.defined(r)&&(t=D.unpack(t,r)),t._ellipsoid=i.Ellipsoid.clone(t._ellipsoid),D.createGeometry(t)}}));
//# sourceMappingURL=createPolylineVolumeGeometry.js.map
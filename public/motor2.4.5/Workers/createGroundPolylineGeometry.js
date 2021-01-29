define(["./when-7ef6387a","./Check-ed6a1804","./Math-85667bf9","./Ellipsoid-1cbb4ac9","./Transforms-c20c38d0","./RuntimeError-5b606d78","./Cartesian2-73569d25","./WebGLConstants-30fc6f5c","./ComponentDatatype-a863af81","./GeometryAttribute-6b3c7112","./EncodedCartesian3-fbe51c6d","./IntersectionTests-faaebeeb","./Plane-6ff6c057","./WebMercatorProjection-07c8bb70","./arrayRemoveDuplicates-9458abce","./ArcType-2ee8dfbb","./EllipsoidRhumbLine-01425f3c","./EllipsoidGeodesic-2bb1f4ee"],(function(e,a,t,r,i,n,s,o,l,u,c,C,p,d,h,g,f,m){"use strict";function w(a){a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT),this._ellipsoid=e.defaultValue(a.ellipsoid,r.Ellipsoid.WGS84),this._rectangle=e.defaultValue(a.rectangle,s.Rectangle.MAX_VALUE),this._projection=new i.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX=e.defaultValue(a.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY=e.defaultValue(a.numberOfLevelZeroTilesY,1)}Object.defineProperties(w.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},rectangle:{get:function(){return this._rectangle}},projection:{get:function(){return this._projection}}}),w.prototype.getNumberOfXTilesAtLevel=function(e){return this._numberOfLevelZeroTilesX<<e},w.prototype.getNumberOfYTilesAtLevel=function(e){return this._numberOfLevelZeroTilesY<<e},w.prototype.rectangleToNativeRectangle=function(r,i){a.Check.defined("rectangle",r);var n=t.CesiumMath.toDegrees(r.west),o=t.CesiumMath.toDegrees(r.south),l=t.CesiumMath.toDegrees(r.east),u=t.CesiumMath.toDegrees(r.north);return e.defined(i)?(i.west=n,i.south=o,i.east=l,i.north=u,i):new s.Rectangle(n,o,l,u)},w.prototype.tileXYToNativeRectangle=function(e,a,r,i){var n=this.tileXYToRectangle(e,a,r,i);return n.west=t.CesiumMath.toDegrees(n.west),n.south=t.CesiumMath.toDegrees(n.south),n.east=t.CesiumMath.toDegrees(n.east),n.north=t.CesiumMath.toDegrees(n.north),n},w.prototype.tileXYToRectangle=function(a,t,r,i){var n=this._rectangle,o=this.getNumberOfXTilesAtLevel(r),l=this.getNumberOfYTilesAtLevel(r),u=n.width/o,c=a*u+n.west,C=(a+1)*u+n.west,p=n.height/l,d=n.north-t*p,h=n.north-(t+1)*p;return e.defined(i)||(i=new s.Rectangle(c,h,C,d)),i.west=c,i.south=h,i.east=C,i.north=d,i},w.prototype.positionToTileXY=function(a,r,i){var n=this._rectangle;if(s.Rectangle.contains(n,a)){var o=this.getNumberOfXTilesAtLevel(r),l=this.getNumberOfYTilesAtLevel(r),u=n.width/o,c=n.height/l,C=a.longitude;n.east<n.west&&(C+=t.CesiumMath.TWO_PI);var p=(C-n.west)/u|0;p>=o&&(p=o-1);var d=(n.north-a.latitude)/c|0;return d>=l&&(d=l-1),e.defined(i)?(i.x=p,i.y=d,i):new s.Cartesian2(p,d)}};var v=new r.Cartesian3,y=new r.Cartesian3,T=new r.Cartographic,E=new r.Cartesian3,M=new r.Cartesian3,_=new i.BoundingSphere,b=new w,O=[new r.Cartographic,new r.Cartographic,new r.Cartographic,new r.Cartographic],A=new s.Cartesian2,k={};function P(e){r.Cartographic.fromRadians(e.east,e.north,0,O[0]),r.Cartographic.fromRadians(e.west,e.north,0,O[1]),r.Cartographic.fromRadians(e.east,e.south,0,O[2]),r.Cartographic.fromRadians(e.west,e.south,0,O[3]);var a,t=0,i=0,n=0,s=0,o=k._terrainHeightsMaxLevel;for(a=0;a<=o;++a){for(var l=!1,u=0;u<4;++u){var c=O[u];if(b.positionToTileXY(c,a,A),0===u)n=A.x,s=A.y;else if(n!==A.x||s!==A.y){l=!0;break}}if(l)break;t=n,i=s}if(0!==a)return{x:t,y:i,level:a>o?o:a-1}}k.initialize=function(){var a=k._initPromise;return e.defined(a)||(a=i.Resource.fetchJson(i.buildModuleUrl("Assets/approximateTerrainHeights.json")).then((function(e){k._terrainHeights=e})),k._initPromise=a),a},k.getMinimumMaximumHeights=function(t,i){if(a.Check.defined("rectangle",t),!e.defined(k._terrainHeights))throw new a.DeveloperError("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");i=e.defaultValue(i,r.Ellipsoid.WGS84);var n=P(t),o=k._defaultMinTerrainHeight,l=k._defaultMaxTerrainHeight;if(e.defined(n)){var u=n.level+"-"+n.x+"-"+n.y,c=k._terrainHeights[u];e.defined(c)&&(o=c[0],l=c[1]),i.cartographicToCartesian(s.Rectangle.northeast(t,T),v),i.cartographicToCartesian(s.Rectangle.southwest(t,T),y),r.Cartesian3.midpoint(y,v,E);var C=i.scaleToGeodeticSurface(E,M);if(e.defined(C)){var p=r.Cartesian3.distance(E,C);o=Math.min(o,-p)}else o=k._defaultMinTerrainHeight}return{minimumTerrainHeight:o=Math.max(k._defaultMinTerrainHeight,o),maximumTerrainHeight:l}},k.getBoundingSphere=function(t,n){if(a.Check.defined("rectangle",t),!e.defined(k._terrainHeights))throw new a.DeveloperError("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");n=e.defaultValue(n,r.Ellipsoid.WGS84);var s=P(t),o=k._defaultMaxTerrainHeight;if(e.defined(s)){var l=s.level+"-"+s.x+"-"+s.y,u=k._terrainHeights[l];e.defined(u)&&(o=u[1])}var c=i.BoundingSphere.fromRectangle3D(t,n,0);return i.BoundingSphere.fromRectangle3D(t,n,o,_),i.BoundingSphere.union(c,_,c)},k._terrainHeightsMaxLevel=6,k._defaultMaxTerrainHeight=9e3,k._defaultMinTerrainHeight=-1e5,k._terrainHeights=void 0,k._initPromise=void 0,Object.defineProperties(k,{initialized:{get:function(){return e.defined(k._terrainHeights)}}});var S=[i.GeographicProjection,d.WebMercatorProjection],L=S.length,I=Math.cos(t.CesiumMath.toRadians(30)),x=Math.cos(t.CesiumMath.toRadians(150));function D(t){var i=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions;if(!e.defined(i)||i.length<2)throw new a.DeveloperError("At least two positions are required.");if(e.defined(t.arcType)&&t.arcType!==g.ArcType.GEODESIC&&t.arcType!==g.ArcType.RHUMB)throw new a.DeveloperError("Valid options for arcType are ArcType.GEODESIC and ArcType.RHUMB.");this.width=e.defaultValue(t.width,1),this._positions=i,this.granularity=e.defaultValue(t.granularity,9999),this.loop=e.defaultValue(t.loop,!1),this.arcType=e.defaultValue(t.arcType,g.ArcType.GEODESIC),this._ellipsoid=r.Ellipsoid.WGS84,this._projectionIndex=0,this._workerName="createGroundPolylineGeometry",this._scene3DOnly=!1}Object.defineProperties(D.prototype,{packedLength:{get:function(){return 1+3*this._positions.length+1+1+1+r.Ellipsoid.packedLength+1+1}}}),D.setProjectionAndEllipsoid=function(e,a){for(var t=0,r=0;r<L;r++)if(a instanceof S[r]){t=r;break}e._projectionIndex=t,e._ellipsoid=a.ellipsoid};var N=new r.Cartesian3,R=new r.Cartesian3,H=new r.Cartesian3;function z(e,a,t,i,n){var s=F(i,e,0,N),o=F(i,e,t,R),l=F(i,a,0,H),u=X(o,s,R),c=X(l,s,H);return r.Cartesian3.cross(c,u,n),r.Cartesian3.normalize(n,n)}var B=new r.Cartographic,G=new r.Cartesian3,j=new r.Cartesian3,V=new r.Cartesian3;function Y(e,a,t,i,n,s,o,l,u,c,C){if(0!==n){var p;s===g.ArcType.GEODESIC?p=new m.EllipsoidGeodesic(e,a,o):s===g.ArcType.RHUMB&&(p=new f.EllipsoidRhumbLine(e,a,o));var d=p.surfaceDistance;if(!(d<n))for(var h=z(e,a,i,o,V),w=Math.ceil(d/n),v=d/w,y=v,T=w-1,E=l.length,M=0;M<T;M++){var _=p.interpolateUsingSurfaceDistance(y,B),b=F(o,_,t,G),O=F(o,_,i,j);r.Cartesian3.pack(h,l,E),r.Cartesian3.pack(b,u,E),r.Cartesian3.pack(O,c,E),C.push(_.latitude),C.push(_.longitude),E+=3,y+=v}}}var q=new r.Cartographic;function F(e,a,t,i){return r.Cartographic.clone(a,q),q.height=t,r.Cartographic.toCartesian(q,e,i)}function X(e,a,t){return r.Cartesian3.subtract(e,a,t),r.Cartesian3.normalize(t,t),t}function U(e,a,t,i){return i=X(e,a,i),i=r.Cartesian3.cross(i,t,i),i=r.Cartesian3.normalize(i,i),i=r.Cartesian3.cross(t,i,i)}D.pack=function(t,i,n){a.Check.typeOf.object("value",t),a.Check.defined("array",i);var s=e.defaultValue(n,0),o=t._positions,l=o.length;i[s++]=l;for(var u=0;u<l;++u){var c=o[u];r.Cartesian3.pack(c,i,s),s+=3}return i[s++]=t.granularity,i[s++]=t.loop?1:0,i[s++]=t.arcType,r.Ellipsoid.pack(t._ellipsoid,i,s),s+=r.Ellipsoid.packedLength,i[s++]=t._projectionIndex,i[s++]=t._scene3DOnly?1:0,i},D.unpack=function(t,i,n){a.Check.defined("array",t);for(var s=e.defaultValue(i,0),o=t[s++],l=new Array(o),u=0;u<o;u++)l[u]=r.Cartesian3.unpack(t,s),s+=3;var c=t[s++],C=1===t[s++],p=t[s++],d=r.Ellipsoid.unpack(t,s);s+=r.Ellipsoid.packedLength;var h=t[s++],g=1===t[s++];return e.defined(n)||(n=new D({positions:l})),n._positions=l,n.granularity=c,n.loop=C,n.arcType=p,n._ellipsoid=d,n._projectionIndex=h,n._scene3DOnly=g,n};var W=new r.Cartesian3,Z=new r.Cartesian3,J=new r.Cartesian3,Q=new r.Cartesian3;function K(e,a,i,n,s){var o=X(i,a,Q),l=U(e,a,o,W),u=U(n,a,o,Z);if(t.CesiumMath.equalsEpsilon(r.Cartesian3.dot(l,u),-1,t.CesiumMath.EPSILON5))return s=r.Cartesian3.cross(o,l,s),s=r.Cartesian3.normalize(s,s);s=r.Cartesian3.add(u,l,s),s=r.Cartesian3.normalize(s,s);var c=r.Cartesian3.cross(o,s,J);return r.Cartesian3.dot(u,c)<0&&(s=r.Cartesian3.negate(s,s)),s}var $=p.Plane.fromPointNormal(r.Cartesian3.ZERO,r.Cartesian3.UNIT_Y),ee=new r.Cartesian3,ae=new r.Cartesian3,te=new r.Cartesian3,re=new r.Cartesian3,ie=new r.Cartesian3,ne=new r.Cartesian3,se=new r.Cartographic,oe=new r.Cartographic,le=new r.Cartographic;D.createGeometry=function(a){var n,o,p,d,m,w,v=!a._scene3DOnly,y=a.loop,T=a._ellipsoid,E=a.granularity,M=a.arcType,_=new S[a._projectionIndex](T),b=a._positions,O=b.length;2===O&&(y=!1);var A,P,L,x=new f.EllipsoidRhumbLine(void 0,void 0,T),D=[b[0]];for(o=0;o<O-1;o++)p=b[o],d=b[o+1],A=C.IntersectionTests.lineSegmentPlane(p,d,$,ne),!e.defined(A)||r.Cartesian3.equalsEpsilon(A,p,t.CesiumMath.EPSILON7)||r.Cartesian3.equalsEpsilon(A,d,t.CesiumMath.EPSILON7)||(a.arcType===g.ArcType.GEODESIC?D.push(r.Cartesian3.clone(A)):a.arcType===g.ArcType.RHUMB&&(L=T.cartesianToCartographic(A,se).longitude,m=T.cartesianToCartographic(p,se),w=T.cartesianToCartographic(d,oe),x.setEndPoints(m,w),P=x.findIntersectionWithLongitude(L,le),A=T.cartographicToCartesian(P,ne),!e.defined(A)||r.Cartesian3.equalsEpsilon(A,p,t.CesiumMath.EPSILON7)||r.Cartesian3.equalsEpsilon(A,d,t.CesiumMath.EPSILON7)||D.push(r.Cartesian3.clone(A)))),D.push(d);y&&(p=b[O-1],d=b[0],A=C.IntersectionTests.lineSegmentPlane(p,d,$,ne),!e.defined(A)||r.Cartesian3.equalsEpsilon(A,p,t.CesiumMath.EPSILON7)||r.Cartesian3.equalsEpsilon(A,d,t.CesiumMath.EPSILON7)||(a.arcType===g.ArcType.GEODESIC?D.push(r.Cartesian3.clone(A)):a.arcType===g.ArcType.RHUMB&&(L=T.cartesianToCartographic(A,se).longitude,m=T.cartesianToCartographic(p,se),w=T.cartesianToCartographic(d,oe),x.setEndPoints(m,w),P=x.findIntersectionWithLongitude(L,le),A=T.cartographicToCartesian(P,ne),!e.defined(A)||r.Cartesian3.equalsEpsilon(A,p,t.CesiumMath.EPSILON7)||r.Cartesian3.equalsEpsilon(A,d,t.CesiumMath.EPSILON7)||D.push(r.Cartesian3.clone(A)))));var N=D.length,R=new Array(N);for(o=0;o<N;o++){var H=r.Cartographic.fromCartesian(D[o],T);H.height=0,R[o]=H}if(!((N=(R=h.arrayRemoveDuplicates(R,r.Cartographic.equalsEpsilon)).length)<2)){var B=[],G=[],j=[],V=[],q=ee,U=ae,W=te,Z=re,J=ie,Q=R[0],ue=R[1];for(q=F(T,R[N-1],0,q),Z=F(T,ue,0,Z),U=F(T,Q,0,U),W=F(T,Q,1e3,W),J=y?K(q,U,W,Z,J):z(Q,ue,1e3,T,J),r.Cartesian3.pack(J,G,0),r.Cartesian3.pack(U,j,0),r.Cartesian3.pack(W,V,0),B.push(Q.latitude),B.push(Q.longitude),Y(Q,ue,0,1e3,E,M,T,G,j,V,B),o=1;o<N-1;++o){q=r.Cartesian3.clone(U,q),U=r.Cartesian3.clone(Z,U);var ce=R[o];F(T,ce,1e3,W),F(T,R[o+1],0,Z),K(q,U,W,Z,J),n=G.length,r.Cartesian3.pack(J,G,n),r.Cartesian3.pack(U,j,n),r.Cartesian3.pack(W,V,n),B.push(ce.latitude),B.push(ce.longitude),Y(R[o],R[o+1],0,1e3,E,M,T,G,j,V,B)}var Ce=R[N-1],de=R[N-2];if(U=F(T,Ce,0,U),W=F(T,Ce,1e3,W),y){var he=R[0];J=K(q=F(T,de,0,q),U,W,Z=F(T,he,0,Z),J)}else J=z(de,Ce,1e3,T,J);if(n=G.length,r.Cartesian3.pack(J,G,n),r.Cartesian3.pack(U,j,n),r.Cartesian3.pack(W,V,n),B.push(Ce.latitude),B.push(Ce.longitude),y){for(Y(Ce,Q,0,1e3,E,M,T,G,j,V,B),n=G.length,o=0;o<3;++o)G[n+o]=G[o],j[n+o]=j[o],V[n+o]=V[o];B.push(Q.latitude),B.push(Q.longitude)}return function(e,a,n,o,C,p,d){var h,g,f,m,w,v,y=a._ellipsoid,T=n.length/3-1,E=8*T,M=4*E,_=36*T,b=E>65535?new Uint32Array(_):new Uint16Array(_),O=new Float64Array(3*E),A=new Float32Array(M),P=new Float32Array(M),S=new Float32Array(M),L=new Float32Array(M),x=new Float32Array(M);d&&(f=new Float32Array(M),m=new Float32Array(M),w=new Float32Array(M),v=new Float32Array(2*E));var D=p.length/2,N=0,R=Me;R.height=0;var H=_e;H.height=0;var z=be,B=Oe;if(d)for(g=0,h=1;h<D;h++)R.latitude=p[g],R.longitude=p[g+1],H.latitude=p[g+2],H.longitude=p[g+3],z=a.project(R,z),B=a.project(H,B),N+=r.Cartesian3.distance(z,B),g+=2;var G=o.length/3;B=r.Cartesian3.unpack(o,0,B);var j,V=0;for(g=3,h=1;h<G;h++)z=r.Cartesian3.clone(B,z),B=r.Cartesian3.unpack(o,g,B),V+=r.Cartesian3.distance(z,B),g+=3;g=3;var Y=0,q=0,F=0,U=0,W=!1,Z=r.Cartesian3.unpack(n,0,ke),J=r.Cartesian3.unpack(o,0,Oe),Q=r.Cartesian3.unpack(C,0,Se);if(e){var K=r.Cartesian3.unpack(n,n.length-6,Ae);pe(Q,K,Z,J)&&(Q=r.Cartesian3.negate(Q,Q))}var $=0,ee=0,ae=0;for(h=0;h<T;h++){var te,re,ie,ne,se=r.Cartesian3.clone(Z,Ae),oe=r.Cartesian3.clone(J,be),le=r.Cartesian3.clone(Q,Pe);if(W&&(le=r.Cartesian3.negate(le,le)),Z=r.Cartesian3.unpack(n,g,ke),J=r.Cartesian3.unpack(o,g,Oe),Q=r.Cartesian3.unpack(C,g,Se),W=pe(Q,se,Z,J),R.latitude=p[Y],R.longitude=p[Y+1],H.latitude=p[Y+2],H.longitude=p[Y+3],d){var ue=Ee(R,H);te=a.project(R,He);var ce=X(re=a.project(H,ze),te,Ze);ce.y=Math.abs(ce.y),ie=Be,ne=Ge,0===ue||r.Cartesian3.dot(ce,r.Cartesian3.UNIT_Y)>I?(ie=fe(a,R,le,te,Be),ne=fe(a,H,Q,re,Ge)):1===ue?(ne=fe(a,H,Q,re,Ge),ie.x=0,ie.y=t.CesiumMath.sign(R.longitude-Math.abs(H.longitude)),ie.z=0):(ie=fe(a,R,le,te,Be),ne.x=0,ne.y=t.CesiumMath.sign(R.longitude-H.longitude),ne.z=0)}var Ce=r.Cartesian3.distance(oe,J),de=c.EncodedCartesian3.fromCartesian(se,Ue),he=r.Cartesian3.subtract(Z,se,je),ge=r.Cartesian3.normalize(he,qe),me=r.Cartesian3.subtract(oe,se,Ve);me=r.Cartesian3.normalize(me,me);var we=r.Cartesian3.cross(ge,me,qe);we=r.Cartesian3.normalize(we,we);var ye=r.Cartesian3.cross(me,le,Fe);ye=r.Cartesian3.normalize(ye,ye);var ta=r.Cartesian3.subtract(J,Z,Ye);ta=r.Cartesian3.normalize(ta,ta);var ra=r.Cartesian3.cross(Q,ta,Xe);ra=r.Cartesian3.normalize(ra,ra);var ia,na,sa,oa=Ce/V,la=$/V,ua=0,ca=0,Ca=0;if(d){ua=r.Cartesian3.distance(te,re),ia=c.EncodedCartesian3.fromCartesian(te,We),na=r.Cartesian3.subtract(re,te,Ze);var pa=(sa=r.Cartesian3.normalize(na,Je)).x;sa.x=sa.y,sa.y=-pa,ca=ua/N,Ca=ee/N}for(j=0;j<8;j++){var da=U+4*j,ha=q+2*j,ga=da+3,fa=j<4?1:-1,ma=2===j||3===j||6===j||7===j?1:-1;r.Cartesian3.pack(de.high,A,da),A[ga]=he.x,r.Cartesian3.pack(de.low,P,da),P[ga]=he.y,r.Cartesian3.pack(ye,S,da),S[ga]=he.z,r.Cartesian3.pack(ra,L,da),L[ga]=oa*fa,r.Cartesian3.pack(we,x,da);var wa=la*ma;0===wa&&ma<0&&(wa=9),x[ga]=wa,d&&(f[da]=ia.high.x,f[da+1]=ia.high.y,f[da+2]=ia.low.x,f[da+3]=ia.low.y,w[da]=-ie.y,w[da+1]=ie.x,w[da+2]=ne.y,w[da+3]=-ne.x,m[da]=na.x,m[da+1]=na.y,m[da+2]=sa.x,m[da+3]=sa.y,v[ha]=ca*fa,0===(wa=Ca*ma)&&ma<0&&(wa=9),v[ha+1]=wa)}var va=Ne,ya=Re,Ta=xe,Ea=De,Ma=s.Rectangle.fromCartographicArray(Le,Ie),_a=k.getMinimumMaximumHeights(Ma,y),ba=_a.minimumTerrainHeight,Oa=_a.maximumTerrainHeight;ae+=ba,ae+=Oa,ve(se,oe,ba,Oa,va,Ta),ve(Z,J,ba,Oa,ya,Ea);var Aa=r.Cartesian3.multiplyByScalar(we,t.CesiumMath.EPSILON5,Qe);r.Cartesian3.add(va,Aa,va),r.Cartesian3.add(ya,Aa,ya),r.Cartesian3.add(Ta,Aa,Ta),r.Cartesian3.add(Ea,Aa,Ea),Te(va,ya),Te(Ta,Ea),r.Cartesian3.pack(va,O,F),r.Cartesian3.pack(ya,O,F+3),r.Cartesian3.pack(Ea,O,F+6),r.Cartesian3.pack(Ta,O,F+9),Aa=r.Cartesian3.multiplyByScalar(we,-2*t.CesiumMath.EPSILON5,Qe),r.Cartesian3.add(va,Aa,va),r.Cartesian3.add(ya,Aa,ya),r.Cartesian3.add(Ta,Aa,Ta),r.Cartesian3.add(Ea,Aa,Ea),Te(va,ya),Te(Ta,Ea),r.Cartesian3.pack(va,O,F+12),r.Cartesian3.pack(ya,O,F+15),r.Cartesian3.pack(Ea,O,F+18),r.Cartesian3.pack(Ta,O,F+21),Y+=2,g+=3,q+=16,F+=24,U+=32,$+=Ce,ee+=ua}g=0;var ka=0;for(h=0;h<T;h++){for(j=0;j<ea;j++)b[g+j]=$e[j]+ka;ka+=8,g+=ea}var Pa=Ke;i.BoundingSphere.fromVertices(n,r.Cartesian3.ZERO,3,Pa[0]),i.BoundingSphere.fromVertices(o,r.Cartesian3.ZERO,3,Pa[1]);var Sa=i.BoundingSphere.fromBoundingSpheres(Pa);Sa.radius+=ae/(2*T);var La={position:new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,normalize:!1,values:O}),startHiAndForwardOffsetX:aa(A),startLoAndForwardOffsetY:aa(P),startNormalAndForwardOffsetZ:aa(S),endNormalAndTextureCoordinateNormalizationX:aa(L),rightNormalAndTextureCoordinateNormalizationY:aa(x)};d&&(La.startHiLo2D=aa(f),La.offsetAndRight2D=aa(m),La.startEndNormals2D=aa(w),La.texcoordNormalization2D=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:2,normalize:!1,values:v}));return new u.Geometry({attributes:La,indices:b,boundingSphere:Sa})}(y,_,j,V,G,B,v)}};var ue=new r.Cartesian3,ce=new i.Matrix3,Ce=new i.Quaternion;function pe(e,a,n,s){var o=X(n,a,ue),l=r.Cartesian3.dot(o,e);if(l>I||l<x){var u=X(s,n,Q),c=l<x?t.CesiumMath.PI_OVER_TWO:-t.CesiumMath.PI_OVER_TWO,C=i.Quaternion.fromAxisAngle(u,c,Ce),p=i.Matrix3.fromQuaternion(C,ce);return i.Matrix3.multiplyByVector(p,e,e),!0}return!1}var de=new r.Cartographic,he=new r.Cartesian3,ge=new r.Cartesian3;function fe(e,a,i,n,s){var o=r.Cartographic.toCartesian(a,e._ellipsoid,he),l=r.Cartesian3.add(o,i,ge),u=!1,c=e._ellipsoid,C=c.cartesianToCartographic(l,de);Math.abs(a.longitude-C.longitude)>t.CesiumMath.PI_OVER_TWO&&(u=!0,l=r.Cartesian3.subtract(o,i,ge),C=c.cartesianToCartographic(l,de)),C.height=0;var p=e.project(C,s);return(s=r.Cartesian3.subtract(p,n,s)).z=0,s=r.Cartesian3.normalize(s,s),u&&r.Cartesian3.negate(s,s),s}var me=new r.Cartesian3,we=new r.Cartesian3;function ve(e,a,t,i,n,s){var o=r.Cartesian3.subtract(a,e,me);r.Cartesian3.normalize(o,o);var l=t-0,u=r.Cartesian3.multiplyByScalar(o,l,we);r.Cartesian3.add(e,u,n);var c=i-1e3;u=r.Cartesian3.multiplyByScalar(o,c,we),r.Cartesian3.add(a,u,s)}var ye=new r.Cartesian3;function Te(e,a){var i=p.Plane.getPointDistance($,e),n=p.Plane.getPointDistance($,a),s=ye;t.CesiumMath.equalsEpsilon(i,0,t.CesiumMath.EPSILON2)?(s=X(a,e,s),r.Cartesian3.multiplyByScalar(s,t.CesiumMath.EPSILON2,s),r.Cartesian3.add(e,s,e)):t.CesiumMath.equalsEpsilon(n,0,t.CesiumMath.EPSILON2)&&(s=X(e,a,s),r.Cartesian3.multiplyByScalar(s,t.CesiumMath.EPSILON2,s),r.Cartesian3.add(a,s,a))}function Ee(e,a){var r=Math.abs(e.longitude),i=Math.abs(a.longitude);if(t.CesiumMath.equalsEpsilon(r,t.CesiumMath.PI,t.CesiumMath.EPSILON11)){var n=t.CesiumMath.sign(a.longitude);return e.longitude=n*(r-t.CesiumMath.EPSILON11),1}if(t.CesiumMath.equalsEpsilon(i,t.CesiumMath.PI,t.CesiumMath.EPSILON11)){var s=t.CesiumMath.sign(e.longitude);return a.longitude=s*(i-t.CesiumMath.EPSILON11),2}return 0}var Me=new r.Cartographic,_e=new r.Cartographic,be=new r.Cartesian3,Oe=new r.Cartesian3,Ae=new r.Cartesian3,ke=new r.Cartesian3,Pe=new r.Cartesian3,Se=new r.Cartesian3,Le=[Me,_e],Ie=new s.Rectangle,xe=new r.Cartesian3,De=new r.Cartesian3,Ne=new r.Cartesian3,Re=new r.Cartesian3,He=new r.Cartesian3,ze=new r.Cartesian3,Be=new r.Cartesian3,Ge=new r.Cartesian3,je=new r.Cartesian3,Ve=new r.Cartesian3,Ye=new r.Cartesian3,qe=new r.Cartesian3,Fe=new r.Cartesian3,Xe=new r.Cartesian3,Ue=new c.EncodedCartesian3,We=new c.EncodedCartesian3,Ze=new r.Cartesian3,Je=new r.Cartesian3,Qe=new r.Cartesian3,Ke=[new i.BoundingSphere,new i.BoundingSphere],$e=[0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],ea=$e.length;function aa(e){return new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:4,normalize:!1,values:e})}return D._projectNormal=fe,function(a,t){return k.initialize().then((function(){return e.defined(t)&&(a=D.unpack(a,t)),D.createGeometry(a)}))}}));
//# sourceMappingURL=createGroundPolylineGeometry.js.map
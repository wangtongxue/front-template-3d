define(["exports","./when-7ef6387a","./Check-ed6a1804","./Math-85667bf9","./Ellipsoid-1cbb4ac9","./Transforms-c20c38d0","./ComponentDatatype-a863af81","./GeometryAttribute-6b3c7112","./GeometryAttributes-cb18da36","./IndexDatatype-f12d39b5","./GeometryOffsetAttribute-5cfc2755"],(function(e,t,i,r,a,o,n,s,u,m,f){"use strict";var d=new a.Cartesian3(1,1,1),l=Math.cos,c=Math.sin;function p(e){e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT);var o=t.defaultValue(e.radii,d),n=t.defaultValue(e.innerRadii,o),s=t.defaultValue(e.minimumClock,0),u=t.defaultValue(e.maximumClock,r.CesiumMath.TWO_PI),m=t.defaultValue(e.minimumCone,0),l=t.defaultValue(e.maximumCone,r.CesiumMath.PI),c=Math.round(t.defaultValue(e.stackPartitions,10)),p=Math.round(t.defaultValue(e.slicePartitions,8)),C=Math.round(t.defaultValue(e.subdivisions,128));if(c<1)throw new i.DeveloperError("options.stackPartitions cannot be less than 1");if(p<0)throw new i.DeveloperError("options.slicePartitions cannot be less than 0");if(C<0)throw new i.DeveloperError("options.subdivisions must be greater than or equal to zero.");if(t.defined(e.offsetAttribute)&&e.offsetAttribute===f.GeometryOffsetAttribute.TOP)throw new i.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._radii=a.Cartesian3.clone(o),this._innerRadii=a.Cartesian3.clone(n),this._minimumClock=s,this._maximumClock=u,this._minimumCone=m,this._maximumCone=l,this._stackPartitions=c,this._slicePartitions=p,this._subdivisions=C,this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipsoidOutlineGeometry"}p.packedLength=2*a.Cartesian3.packedLength+8,p.pack=function(e,r,o){if(!t.defined(e))throw new i.DeveloperError("value is required");if(!t.defined(r))throw new i.DeveloperError("array is required");return o=t.defaultValue(o,0),a.Cartesian3.pack(e._radii,r,o),o+=a.Cartesian3.packedLength,a.Cartesian3.pack(e._innerRadii,r,o),o+=a.Cartesian3.packedLength,r[o++]=e._minimumClock,r[o++]=e._maximumClock,r[o++]=e._minimumCone,r[o++]=e._maximumCone,r[o++]=e._stackPartitions,r[o++]=e._slicePartitions,r[o++]=e._subdivisions,r[o]=t.defaultValue(e._offsetAttribute,-1),r};var C=new a.Cartesian3,h=new a.Cartesian3,_={radii:C,innerRadii:h,minimumClock:void 0,maximumClock:void 0,minimumCone:void 0,maximumCone:void 0,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0,offsetAttribute:void 0};p.unpack=function(e,r,o){if(!t.defined(e))throw new i.DeveloperError("array is required");r=t.defaultValue(r,0);var n=a.Cartesian3.unpack(e,r,C);r+=a.Cartesian3.packedLength;var s=a.Cartesian3.unpack(e,r,h);r+=a.Cartesian3.packedLength;var u=e[r++],m=e[r++],f=e[r++],d=e[r++],l=e[r++],c=e[r++],v=e[r++],b=e[r];return t.defined(o)?(o._radii=a.Cartesian3.clone(n,o._radii),o._innerRadii=a.Cartesian3.clone(s,o._innerRadii),o._minimumClock=u,o._maximumClock=m,o._minimumCone=f,o._maximumCone=d,o._stackPartitions=l,o._slicePartitions=c,o._subdivisions=v,o._offsetAttribute=-1===b?void 0:b,o):(_.minimumClock=u,_.maximumClock=m,_.minimumCone=f,_.maximumCone=d,_.stackPartitions=l,_.slicePartitions=c,_.subdivisions=v,_.offsetAttribute=-1===b?void 0:b,new p(_))},p.createGeometry=function(e){var i=e._radii;if(!(i.x<=0||i.y<=0||i.z<=0)){var d=e._innerRadii;if(!(d.x<=0||d.y<=0||d.z<=0)){var p=e._minimumClock,C=e._maximumClock,h=e._minimumCone,_=e._maximumCone,v=e._subdivisions,b=a.Ellipsoid.fromCartesian3(i),y=e._slicePartitions+1,k=e._stackPartitions+1;(y=Math.round(y*Math.abs(C-p)/r.CesiumMath.TWO_PI))<2&&(y=2),(k=Math.round(k*Math.abs(_-h)/r.CesiumMath.PI))<2&&(k=2);var A=0,w=1,P=d.x!==i.x||d.y!==i.y||d.z!==i.z,x=!1,E=!1;P&&(w=2,h>0&&(x=!0,A+=y),_<Math.PI&&(E=!0,A+=y));var D,M,g,G,O=v*w*(k+y),V=new Float64Array(3*O),T=2*(O+A-(y+k)*w),z=m.IndexDatatype.createTypedArray(O,T),I=0,L=new Array(k),R=new Array(k);for(D=0;D<k;D++)G=h+D*(_-h)/(k-1),L[D]=c(G),R[D]=l(G);var N=new Array(v),q=new Array(v);for(D=0;D<v;D++)g=p+D*(C-p)/(v-1),N[D]=c(g),q[D]=l(g);for(D=0;D<k;D++)for(M=0;M<v;M++)V[I++]=i.x*L[D]*q[M],V[I++]=i.y*L[D]*N[M],V[I++]=i.z*R[D];if(P)for(D=0;D<k;D++)for(M=0;M<v;M++)V[I++]=d.x*L[D]*q[M],V[I++]=d.y*L[D]*N[M],V[I++]=d.z*R[D];for(L.length=v,R.length=v,D=0;D<v;D++)G=h+D*(_-h)/(v-1),L[D]=c(G),R[D]=l(G);for(N.length=y,q.length=y,D=0;D<y;D++)g=p+D*(C-p)/(y-1),N[D]=c(g),q[D]=l(g);for(D=0;D<v;D++)for(M=0;M<y;M++)V[I++]=i.x*L[D]*q[M],V[I++]=i.y*L[D]*N[M],V[I++]=i.z*R[D];if(P)for(D=0;D<v;D++)for(M=0;M<y;M++)V[I++]=d.x*L[D]*q[M],V[I++]=d.y*L[D]*N[M],V[I++]=d.z*R[D];for(I=0,D=0;D<k*w;D++){var B=D*v;for(M=0;M<v-1;M++)z[I++]=B+M,z[I++]=B+M+1}var S=k*v*w;for(D=0;D<y;D++)for(M=0;M<v-1;M++)z[I++]=S+D+M*y,z[I++]=S+D+(M+1)*y;if(P)for(S=k*v*w+y*v,D=0;D<y;D++)for(M=0;M<v-1;M++)z[I++]=S+D+M*y,z[I++]=S+D+(M+1)*y;if(P){var U=k*v*w,F=U+v*y;if(x)for(D=0;D<y;D++)z[I++]=U+D,z[I++]=F+D;if(E)for(U+=v*y-y,F+=v*y-y,D=0;D<y;D++)z[I++]=U+D,z[I++]=F+D}var W=new u.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:V})});if(t.defined(e._offsetAttribute)){var Y=V.length,J=new Uint8Array(Y/3),j=e._offsetAttribute===f.GeometryOffsetAttribute.NONE?0:1;f.arrayFill(J,j),W.applyOffset=new s.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:J})}return new s.Geometry({attributes:W,indices:z,primitiveType:s.PrimitiveType.LINES,boundingSphere:o.BoundingSphere.fromEllipsoid(b),offsetAttribute:e._offsetAttribute})}}},e.EllipsoidOutlineGeometry=p}));
//# sourceMappingURL=EllipsoidOutlineGeometry-af7b3272.js.map

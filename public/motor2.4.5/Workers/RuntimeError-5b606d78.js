define(["exports","./when-7ef6387a"],(function(t,e){"use strict";function r(t){var e;this.name="RuntimeError",this.message=t;try{throw new Error}catch(t){e=t.stack}this.stack=e}e.defined(Object.create)&&(r.prototype=Object.create(Error.prototype),r.prototype.constructor=r),r.prototype.toString=function(){var t=this.name+": "+this.message;return e.defined(this.stack)&&(t+="\n"+this.stack.toString()),t},t.RuntimeError=r}));
//# sourceMappingURL=RuntimeError-5b606d78.js.map

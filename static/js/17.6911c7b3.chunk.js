!function(){"use strict";var n={2017:function(n,t,e){var o=e(4165),r=e(5671),i=e(3144),u=e(9340),s=e(8557),l=e(7465),a=e.n(l),c=function(){function n(t,e){(0,r.Z)(this,n),this.listHeader=t,this.rowIndex=e,this.up=void 0,this.down=void 0,this.left=void 0,this.right=void 0,this.up=this,this.down=this,this.left=this,this.right=this,null===t||void 0===t||t.addDataObject(this)}return(0,i.Z)(n,[{key:"appendToRow",value:function(n){this.left.right=n,n.right=this,n.left=this.left,this.left=n}},{key:"appendToColumn",value:function(n){this.up.down=n,n.down=this,n.up=this.up,this.up=n}},{key:"unlinkFromColumn",value:function(){this.down.up=this.up,this.up.down=this.down}},{key:"relinkIntoColumn",value:function(){this.down.up=this,this.up.down=this}},{key:"loopUp",value:function(n){this.loop(n,"up")}},{key:"loopDown",value:function(n){this.loop(n,"down")}},{key:"loopLeft",value:function(n){this.loop(n,"left")}},{key:"loopRight",value:function(n){this.loop(n,"right")}},{key:"loop",value:function(n,t){for(var e=this[t];e!==this;e=e[t])n(e)}}]),n}(),f=e(7326),v=function(n){(0,u.Z)(e,n);var t=(0,s.Z)(e);function e(){var n;return(0,r.Z)(this,e),(n=t.call(this)).previousColumnObject=void 0,n.nextColumnObject=void 0,n.numberOfRows=void 0,n.previousColumnObject=(0,f.Z)(n),n.nextColumnObject=(0,f.Z)(n),n.numberOfRows=0,n}return(0,i.Z)(e,[{key:"appendColumnHeader",value:function(n){this.previousColumnObject.nextColumnObject=n,n.nextColumnObject=this,n.previousColumnObject=this.previousColumnObject,this.previousColumnObject=n}},{key:"unlinkColumnHeader",value:function(){this.nextColumnObject.previousColumnObject=this.previousColumnObject,this.previousColumnObject.nextColumnObject=this.nextColumnObject}},{key:"relinkColumnHeader",value:function(){this.nextColumnObject.previousColumnObject=this,this.previousColumnObject.nextColumnObject=this}},{key:"addDataObject",value:function(n){this.appendToColumn(n),this.numberOfRows++}},{key:"unlinkDataObject",value:function(n){n.unlinkFromColumn(),this.numberOfRows--}},{key:"relinkDataObject",value:function(n){n.relinkIntoColumn(),this.numberOfRows++}},{key:"loopNext",value:function(n){for(var t=this.nextColumnObject;t!==this;t=t.nextColumnObject)n(t)}}]),e}(c),h=(0,o.Z)().mark(w);var p=function(n){(0,u.Z)(e,n);var t=(0,s.Z)(e);function e(){var n;return(0,r.Z)(this,e),(n=t.call(this)).checkOptions=function(n){if(void 0!==(null===n||void 0===n?void 0:n.numSolutions)){if(!Number.isInteger(n.numSolutions))throw new Error("options.numSolutions must be an integer");if(n.numSolutions<0)throw new Error("options.numSolutions can't be negative - don't be silly")}if(void 0!==(null===n||void 0===n?void 0:n.numPrimaryColumns)){if(!Number.isInteger(n.numPrimaryColumns))throw new Error("options.numPrimaryColumns must be an integer");if(n.numPrimaryColumns<0)throw new Error("options.numPrimaryColumns can't be negative - don't be silly")}},n}return(0,i.Z)(e,[{key:"solve",value:function(n,t){var e;this.checkOptions(t);for(var o=null!==(e=null===t||void 0===t?void 0:t.numSolutions)&&void 0!==e?e:Number.MAX_SAFE_INTEGER,r=[],i=this.solutionGenerator(n,t),u=0;u<o;u++){var s=i.next();if(s.done)break;r.push(s.value)}return r}},{key:"solutionGenerator",value:(0,o.Z)().mark((function n(t,e){var r,i;return(0,o.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return this.checkOptions(e),r=d(t,e),i=new x(this,r),n.delegateYield(w(i),"t0",4);case 4:case"end":return n.stop()}}),n,this)}))}]),e}(a()),d=function(n,t){var e,o=null!==(e=null===t||void 0===t?void 0:t.numPrimaryColumns)&&void 0!==e?e:n[0].length,r=new v,i=new Map;return n.forEach((function(n,t){var e=void 0;n.forEach((function(n,u){if(0===t){var s=new v;u<o&&r.appendColumnHeader(s),i.set(u,s)}if(n){var l=i.get(u),a=new c(l,t);e?e.appendToRow(a):e=a}}))})),r},m=function(n,t){return n-t};function w(n){var t,e;return(0,o.Z)().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(n.raiseSearchStepEvent(),!n.isEmpty()){o.next=7;break}if(!n.currentSolution.length){o.next=6;break}return n.raiseSolutionFoundEvent(),o.next=6,n.currentSolution.slice().sort(m);case 6:return o.abrupt("return");case 7:t=b(n),y(t),e=t.down;case 10:if(e===t){o.next=19;break}return n.pushRowIndex(e.rowIndex),e.loopRight((function(n){return y(n.listHeader)})),o.delegateYield(w(n),"t0",14);case 14:e.loopLeft((function(n){return k(n.listHeader)})),n.popRowIndex();case 16:e=e.down,o.next=10;break;case 19:k(t);case 20:case"end":return o.stop()}}),h)}var b=function(n){var t=void 0;return n.root.loopNext((function(n){(!t||n.numberOfRows<t.numberOfRows)&&(t=n)})),t},y=function(n){n.unlinkColumnHeader(),n.loopDown((function(n){return n.loopRight((function(n){return n.listHeader.unlinkDataObject(n)}))}))},k=function(n){n.loopUp((function(n){return n.loopLeft((function(n){return n.listHeader.relinkDataObject(n)}))})),n.relinkColumnHeader()},x=function(){function n(t,e){(0,r.Z)(this,n),this.dlx=t,this.root=e,this.currentSolution=[],this.stepIndex=0,this.solutionIndex=0}return(0,i.Z)(n,[{key:"isEmpty",value:function(){return this.root.nextColumnObject===this.root}},{key:"pushRowIndex",value:function(n){this.currentSolution.push(n)}},{key:"popRowIndex",value:function(){this.currentSolution.pop()}},{key:"raiseSearchStepEvent",value:function(){if(this.dlx.listenerCount("step")>0&&this.currentSolution.length){var n={partialSolution:this.currentSolution.slice().sort(m),stepIndex:this.stepIndex++};this.dlx.emit("step",n)}}},{key:"raiseSolutionFoundEvent",value:function(){if(this.dlx.listenerCount("solution")>0){var n={solution:this.currentSolution.slice().sort(m),solutionIndex:this.solutionIndex++};this.dlx.emit("solution",n)}}}]),n}(),C=e(8683),O=function(n){return Array.from(Array(n).keys())};var g,j=function(){function n(){(0,r.Z)(this,n)}return(0,i.Z)(n,[{key:"buildInternalRows",value:function(n){var t=this;return O(9).flatMap((function(n){return O(9).map((function(t){return{row:n,col:t}}))})).flatMap((function(e){var o=n.initialValues.find((function(n){return t=n.coords,o=e,t.row===o.row&&t.col===o.col;var t,o}));return o?t._buildInternalRowsForInitialValue(o):t._buildInternalRowsForCoords(e)}))}},{key:"_buildInternalRowsForInitialValue",value:function(n){return[(0,C.Z)((0,C.Z)({},n),{},{isInitialValue:!0})]}},{key:"_buildInternalRowsForCoords",value:function(n){return O(9).map((function(n){return n+1})).map((function(t){return{coords:n,value:t,isInitialValue:!1}}))}},{key:"internalRowToMatrixRow",value:function(n){var t=n.coords,e=t.row,o=t.col,r=this._rowColToBox(e,o),i=n.value-1,u=this._oneHot(e,o),s=this._oneHot(e,i),l=this._oneHot(o,i),a=this._oneHot(r,i);return u.concat(s).concat(l).concat(a)}},{key:"_oneHot",value:function(n,t){var e=Array(81).fill(0);return e[9*n+t]=1,e}},{key:"_rowColToBox",value:function(n,t){return Math.floor(n-n%3+t/3)}},{key:"getNumPrimaryColumns",value:function(n){}}]),n}(),R=(e(184),g=["6 4 9 7 3","  3    6 ","       18","   18   9","     43  ","7   39   "," 7       "," 4    8  ","9 8 6 4 5"],g.flatMap((function(n,t){return O(n.length).flatMap((function(e){var o=n[e],r=Number(o);return Number.isInteger(r)&&r>=1&&r<=9?[{coords:{row:t,col:e},value:r}]:[]}))})),new Map([["sudoku",j],["n-queens",function(){function n(){(0,r.Z)(this,n)}return(0,i.Z)(n,[{key:"buildInternalRows",value:function(n){return O(n.size).flatMap((function(t){return O(n.size).map((function(n){return{row:t,col:n}}))})).map((function(t){return{puzzle:n,coords:t}}))}},{key:"getNumPrimaryColumns",value:function(n){return 2*n.size}},{key:"internalRowToMatrixRow",value:function(n){var t=n.coords,e=t.row,o=t.col,r=n.puzzle.size,i=r+r-3,u=Array(r).fill(0),s=Array(r).fill(0),l=Array(i).fill(0),a=Array(i).fill(0);u[e]=1,s[o]=1;var c=e+o-1;c>=0&&c<i&&(l[c]=1);var f=r-1-o+e-1;return f>=0&&f<i&&(a[f]=1),u.concat(s).concat(l).concat(a)}}]),n}()]])),I=function(n,t){var e=R.get(n);if(e){var o=new e,r=o.buildInternalRows(t),i=function(n,t){return(new p).solve(n,t)}(r.map((function(n){return o.internalRowToMatrixRow(n)})),{numSolutions:1,numPrimaryColumns:o.getNumPrimaryColumns(t)});if(0!==i.length){var u=i[0];console.dir(u);var s=u.map((function(n){return r[n]}));console.dir(s),self.postMessage({type:"solutionFound",solutionInternalRows:s})}else self.postMessage({type:"noSolutionFound"})}else self.postMessage({type:"unknownDemo"})};self.onmessage=function(n){try{if(console.log("[worker onmessage]","ev.data:",JSON.stringify(n.data,null,2)),"solve"===n.data.type){var t=n.data,e=t.shortName,o=t.puzzle;return void I(e,o)}}catch(r){r instanceof Error?self.postMessage({type:"error",message:r.message}):self.postMessage({type:"error",message:String(r)})}}}},t={};function e(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return n[o](i,i.exports,e),i.exports}e.m=n,e.x=function(){var n=e.O(void 0,[130],(function(){return e(2017)}));return n=e.O(n)},function(){var n=[];e.O=function(t,o,r,i){if(!o){var u=1/0;for(c=0;c<n.length;c++){o=n[c][0],r=n[c][1],i=n[c][2];for(var s=!0,l=0;l<o.length;l++)(!1&i||u>=i)&&Object.keys(e.O).every((function(n){return e.O[n](o[l])}))?o.splice(l--,1):(s=!1,i<u&&(u=i));if(s){n.splice(c--,1);var a=r();void 0!==a&&(t=a)}}return t}i=i||0;for(var c=n.length;c>0&&n[c-1][2]>i;c--)n[c]=n[c-1];n[c]=[o,r,i]}}(),e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,{a:t}),t},e.d=function(n,t){for(var o in t)e.o(t,o)&&!e.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:t[o]})},e.f={},e.e=function(n){return Promise.all(Object.keys(e.f).reduce((function(t,o){return e.f[o](n,t),t}),[]))},e.u=function(n){return"static/js/"+n+".7c742275.chunk.js"},e.miniCssF=function(n){},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="/dlxlib-demos/",function(){var n={17:1};e.f.i=function(t,o){n[t]||importScripts(e.p+e.u(t))};var t=self.webpackChunkdlxlib_demos=self.webpackChunkdlxlib_demos||[],o=t.push.bind(t);t.push=function(t){var r=t[0],i=t[1],u=t[2];for(var s in i)e.o(i,s)&&(e.m[s]=i[s]);for(u&&u(e);r.length;)n[r.pop()]=1;o(t)}}(),function(){var n=e.x;e.x=function(){return e.e(130).then(n)}}();e.x()}();
//# sourceMappingURL=17.6911c7b3.chunk.js.map
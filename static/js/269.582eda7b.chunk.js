!function(){"use strict";var n={5269:function(n,t,e){var r=e(4165),o=e(5671),u=e(3144),i=e(136),a=e(9388),l=e(7465),c=e.n(l),s=function(){function n(t,e){(0,o.Z)(this,n),this.listHeader=t,this.rowIndex=e,this.up=void 0,this.down=void 0,this.left=void 0,this.right=void 0,this.up=this,this.down=this,this.left=this,this.right=this,null===t||void 0===t||t.addDataObject(this)}return(0,u.Z)(n,[{key:"appendToRow",value:function(n){this.left.right=n,n.right=this,n.left=this.left,this.left=n}},{key:"appendToColumn",value:function(n){this.up.down=n,n.down=this,n.up=this.up,this.up=n}},{key:"unlinkFromColumn",value:function(){this.down.up=this.up,this.up.down=this.down}},{key:"relinkIntoColumn",value:function(){this.down.up=this,this.up.down=this}},{key:"loopUp",value:function(n){this.loop(n,"up")}},{key:"loopDown",value:function(n){this.loop(n,"down")}},{key:"loopLeft",value:function(n){this.loop(n,"left")}},{key:"loopRight",value:function(n){this.loop(n,"right")}},{key:"loop",value:function(n,t){for(var e=this[t];e!==this;e=e[t])n(e)}}]),n}(),f=e(7326),v=function(n){(0,i.Z)(e,n);var t=(0,a.Z)(e);function e(){var n;return(0,o.Z)(this,e),(n=t.call(this)).previousColumnObject=void 0,n.nextColumnObject=void 0,n.numberOfRows=void 0,n.previousColumnObject=(0,f.Z)(n),n.nextColumnObject=(0,f.Z)(n),n.numberOfRows=0,n}return(0,u.Z)(e,[{key:"appendColumnHeader",value:function(n){this.previousColumnObject.nextColumnObject=n,n.nextColumnObject=this,n.previousColumnObject=this.previousColumnObject,this.previousColumnObject=n}},{key:"unlinkColumnHeader",value:function(){this.nextColumnObject.previousColumnObject=this.previousColumnObject,this.previousColumnObject.nextColumnObject=this.nextColumnObject}},{key:"relinkColumnHeader",value:function(){this.nextColumnObject.previousColumnObject=this,this.previousColumnObject.nextColumnObject=this}},{key:"addDataObject",value:function(n){this.appendToColumn(n),this.numberOfRows++}},{key:"unlinkDataObject",value:function(n){n.unlinkFromColumn(),this.numberOfRows--}},{key:"relinkDataObject",value:function(n){n.relinkIntoColumn(),this.numberOfRows++}},{key:"loopNext",value:function(n){for(var t=this.nextColumnObject;t!==this;t=t.nextColumnObject)n(t)}}]),e}(s),h=(0,r.Z)().mark(y);var p=function(n){(0,i.Z)(e,n);var t=(0,a.Z)(e);function e(){var n;return(0,o.Z)(this,e),(n=t.call(this)).checkOptions=function(n){if(void 0!==(null===n||void 0===n?void 0:n.numSolutions)){if(!Number.isInteger(n.numSolutions))throw new Error("options.numSolutions must be an integer");if(n.numSolutions<0)throw new Error("options.numSolutions can't be negative - don't be silly")}if(void 0!==(null===n||void 0===n?void 0:n.numPrimaryColumns)){if(!Number.isInteger(n.numPrimaryColumns))throw new Error("options.numPrimaryColumns must be an integer");if(n.numPrimaryColumns<0)throw new Error("options.numPrimaryColumns can't be negative - don't be silly")}},n}return(0,u.Z)(e,[{key:"solve",value:function(n,t){var e;this.checkOptions(t);for(var r=null!==(e=null===t||void 0===t?void 0:t.numSolutions)&&void 0!==e?e:Number.MAX_SAFE_INTEGER,o=[],u=this.solutionGenerator(n,t),i=0;i<r;i++){var a=u.next();if(a.done)break;o.push(a.value)}return o}},{key:"solutionGenerator",value:(0,r.Z)().mark((function n(t,e){var o,u;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return this.checkOptions(e),o=d(t,e),u=new g(this,o),n.delegateYield(y(u),"t0",4);case 4:case"end":return n.stop()}}),n,this)}))}]),e}(c()),d=function(n,t){var e,r=null!==(e=null===t||void 0===t?void 0:t.numPrimaryColumns)&&void 0!==e?e:n[0].length,o=new v,u=new Map;return n.forEach((function(n,t){var e=void 0;n.forEach((function(n,i){if(0===t){var a=new v;i<r&&o.appendColumnHeader(a),u.set(i,a)}if(n){var l=u.get(i),c=new s(l,t);e?e.appendToRow(c):e=c}}))})),o},m=function(n,t){return n-t};function y(n){var t,e;return(0,r.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n.raiseSearchStepEvent(),!n.isEmpty()){r.next=7;break}if(!n.currentSolution.length){r.next=6;break}return n.raiseSolutionFoundEvent(),r.next=6,n.currentSolution.slice().sort(m);case 6:return r.abrupt("return");case 7:t=k(n),w(t),e=t.down;case 10:if(e===t){r.next=19;break}return n.pushRowIndex(e.rowIndex),e.loopRight((function(n){return w(n.listHeader)})),r.delegateYield(y(n),"t0",14);case 14:e.loopLeft((function(n){return b(n.listHeader)})),n.popRowIndex();case 16:e=e.down,r.next=10;break;case 19:b(t);case 20:case"end":return r.stop()}}),h)}var k=function(n){var t=void 0;return n.root.loopNext((function(n){(!t||n.numberOfRows<t.numberOfRows)&&(t=n)})),t},w=function(n){n.unlinkColumnHeader(),n.loopDown((function(n){return n.loopRight((function(n){return n.listHeader.unlinkDataObject(n)}))}))},b=function(n){n.loopUp((function(n){return n.loopLeft((function(n){return n.listHeader.relinkDataObject(n)}))})),n.relinkColumnHeader()},g=function(){function n(t,e){(0,o.Z)(this,n),this.dlx=t,this.root=e,this.currentSolution=[],this.stepIndex=0,this.solutionIndex=0}return(0,u.Z)(n,[{key:"isEmpty",value:function(){return this.root.nextColumnObject===this.root}},{key:"pushRowIndex",value:function(n){this.currentSolution.push(n)}},{key:"popRowIndex",value:function(){this.currentSolution.pop()}},{key:"raiseSearchStepEvent",value:function(){if(this.dlx.listenerCount("step")>0&&this.currentSolution.length){var n={partialSolution:this.currentSolution.slice().sort(m),stepIndex:this.stepIndex++};this.dlx.emit("step",n)}}},{key:"raiseSolutionFoundEvent",value:function(){if(this.dlx.listenerCount("solution")>0){var n={solution:this.currentSolution.slice().sort(m),solutionIndex:this.solutionIndex++};this.dlx.emit("solution",n)}}}]),n}(),C=e(1413),R=e(7762),x=function(n){return Array.from(Array(n).keys())},Z=function(n){return n.reduce((function(n,t){return n+t}),0)};function X(n,t){return n===t}function O(n,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:X;return n.filter((function(n){return!t.some((function(t){return e(n,t)}))}))}var I,z=function(n){return Array.from(n).reverse().join("")},P=function(n){return{row:n.row+1,col:n.col}},W=function(n){return{row:n.row,col:n.col-1}},B=function(n){return{row:n.row,col:n.col+1}},j=function(n,t){return n.row===t.row&&n.col===t.col};!function(n){n[n.Clean=0]="Clean",n[n.Solving=1]="Solving",n[n.Dirty=2]="Dirty"}(I||(I={}));var S,V=function(){function n(){(0,o.Z)(this,n)}return(0,u.Z)(n,[{key:"buildInternalRows",value:function(n){var t=this;return x(9).flatMap((function(n){return x(9).map((function(t){return{row:n,col:t}}))})).flatMap((function(e){var r=n.initialValues.find((function(n){return j(n.coords,e)}));return r?t._buildInternalRowsForInitialValue(r):t._buildInternalRowsForCoords(e)}))}},{key:"_buildInternalRowsForInitialValue",value:function(n){return[(0,C.Z)((0,C.Z)({},n),{},{isInitialValue:!0})]}},{key:"_buildInternalRowsForCoords",value:function(n){return x(9).map((function(n){return n+1})).map((function(t){return{coords:n,value:t,isInitialValue:!1}}))}},{key:"internalRowToMatrixRow",value:function(n){var t=n.coords,e=t.row,r=t.col,o=this._rowColToBox(e,r),u=n.value-1,i=this._oneHot(e,r),a=this._oneHot(e,u),l=this._oneHot(r,u),c=this._oneHot(o,u);return i.concat(a).concat(l).concat(c)}},{key:"_oneHot",value:function(n,t){var e=Array(81).fill(0);return e[9*n+t]=1,e}},{key:"_rowColToBox",value:function(n,t){return Math.floor(n-n%3+t/3)}},{key:"getNumPrimaryColumns",value:function(n){}}]),n}();!function(n){n[n.North=0]="North",n[n.South=1]="South",n[n.East=2]="East",n[n.West=3]="West"}(S||(S={}));var H,N,L=function(n){var t=n.length,e=n[0].length,r=x(t),o=x(e).map((function(t){return r.map((function(e){return n[e][t]})).join("")}));return M(o)},M=function(n){return n.map(z)},E=function(n){var t,e=n.length,r=n[0].length,o=[],u=(0,R.Z)(x(e));try{for(u.s();!(t=u.n()).done;){var i,a=t.value,l=(0,R.Z)(x(r));try{for(l.s();!(i=l.n()).done;){var c=i.value;if("X"===n[a][c]){var s={row:a,col:c};o.push(s)}}}catch(f){l.e(f)}finally{l.f()}}}catch(f){u.e(f)}finally{u.f()}return o},T=e(9439),A=new Map([["F",[" XX","XX "," X "]],["I",["X","X","X","X","X"]],["L",["X ","X ","X ","XX"]],["N",[" X"," X","XX","X "]],["P",["XX","XX","X "]],["T",["XXX"," X "," X "]],["U",["X X","XXX"]],["V",["X  ","X  ","XXX"]],["W",["X  ","XX "," XX"]],["X",[" X ","XXX"," X "]],["Y",[" X","XX"," X"," X"]],["Z",["XX "," X "," XX"]]]),G=Array.from(A).map((function(n){var t=(0,T.Z)(n,2);return{label:t[0],pattern:t[1]}})),_=function(n){return(0,C.Z)((0,C.Z)({},n),{},{reflected:!0,pattern:M(n.pattern)})},F=function(n){return{orientation:n.orientation,reflected:n.reflected,coordsList:E(n.pattern)}},D=G.map((function(n){for(var t=n.label,e=n.pattern,r={orientation:S.North,reflected:!1,pattern:e},o=_(r),u={orientation:S.East,reflected:!1,pattern:L(r.pattern)},i=_(u),a={orientation:S.South,reflected:!1,pattern:L(u.pattern)},l=_(a),c={orientation:S.West,reflected:!1,pattern:L(a.pattern)},s=[r,o,u,i,a,l,c,_(c)],f=new Set,v=[],h=0,p=s;h<p.length;h++){var d=p[h],m=d.pattern.join("|");f.has(m)||(f.add(m),v.push(d))}return{label:t,variations:v.map(F)}})),U=function(){function n(){(0,o.Z)(this,n),this.allLocations=x(8).flatMap((function(n){return x(8).map((function(t){return{row:n,col:t}}))}))}return(0,u.Z)(n,[{key:"buildInternalRows",value:function(n){var t=this;return this.allPossiblePiecePlacements().filter((function(n){return t.isValidPiecePlacement(n)}))}},{key:"internalRowToMatrixRow",value:function(n){var t=this.makePieceColumns(n),e=this.makeLocationColumns(n);return t.concat(e)}},{key:"getNumPrimaryColumns",value:function(n){}},{key:"isValidPiecePlacement",value:function(n){var t,e=(0,R.Z)(n.variation.coordsList);try{for(e.s();!(t=e.n()).done;){var r=t.value,o=n.location.row+r.row,u=n.location.col+r.col;if(o>=8||u>=8)return!1;if((3===o||4===o)&&(3===u||4===u))return!1}}catch(i){e.e(i)}finally{e.f()}return!0}},{key:"allPossiblePiecePlacements",value:function(){var n,t=[],e=D.slice(0,1).map((function(n){return n.label})),r=(0,R.Z)(D);try{for(r.s();!(n=r.n()).done;){var o,u=n.value,i=e.includes(u.label)?u.variations.slice(0,1):u.variations,a=(0,R.Z)(i);try{for(a.s();!(o=a.n()).done;){var l,c=o.value,s=(0,R.Z)(this.allLocations);try{for(s.s();!(l=s.n()).done;){var f=l.value,v={label:u.label,variation:c,location:f};t.push(v)}}catch(h){s.e(h)}finally{s.f()}}}catch(h){a.e(h)}finally{a.f()}}}catch(h){r.e(h)}finally{r.f()}return t}},{key:"makePieceColumns",value:function(n){var t=Array(D.length).fill(0);return t[D.findIndex((function(t){return t.label===n.label}))]=1,t}},{key:"makeLocationColumns",value:function(n){var t,e=n.variation.coordsList.map((function(t){return 8*(n.location.row+t.row)+(n.location.col+t.col)})),r=Array(64).fill(0),o=(0,R.Z)(e);try{for(o.s();!(t=o.n()).done;){r[t.value]=1}}catch(i){o.e(i)}finally{o.f()}var u=[27,28,35,36];return r.filter((function(n,t){return!u.includes(t)}))}}]),n}();!function(n){n[n.Black=0]="Black",n[n.White=1]="White"}(H||(H={})),function(n){n[n.North=0]="North",n[n.South=1]="South",n[n.East=2]="East",n[n.West=3]="West"}(N||(N={}));var q,Y=function(n){var t=n.length,e=n[0].length,r=x(t),o=x(e).map((function(t){return r.map((function(e){return n[e][t]})).join("")}));return J(o)},J=function(n){return n.map(z)},K=function(n){var t,e=n.length,r=n[0].length,o=[],u=(0,R.Z)(x(e));try{for(u.s();!(t=u.n()).done;){var i,a=t.value,l=(0,R.Z)(x(r));try{for(l.s();!(i=l.n()).done;){var c=i.value,s={row:a,col:c};switch(n[a][c]){case"B":o.push({coords:s,colour:H.Black});break;case"W":o.push({coords:s,colour:H.White})}}}catch(f){l.e(f)}finally{l.f()}}}catch(f){u.e(f)}finally{u.f()}return o},Q=new Map([["A",["B ","WB","B ","W "]],["B",["B  ","WBW"]],["C",["W ","BW"]],["D",[" WB"," B ","BW "]],["E",["W ","BW"," B"," W"]],["F",["WB "," W "," BW"]],["G",["WB "," WB"]],["H",["B ","WB","B "]],["I",["B ","W ","BW","W "]],["J",[" B"," W"," B","BW"]],["K",["  W"," WB","WB "]],["L",["B ","W ","BW"]],["M",[" B"," W","WB","B "]],["N",["W ","B ","W ","BW"]]]),$=Array.from(Q).map((function(n){var t=(0,T.Z)(n,2);return{label:t[0],pattern:t[1]}})),nn=function(n){return{orientation:n.orientation,squares:K(n.pattern)}},tn=$.map((function(n){for(var t=n.label,e=n.pattern,r={orientation:N.North,pattern:e},o={orientation:N.East,pattern:Y(r.pattern)},u={orientation:N.South,pattern:Y(o.pattern)},i=[r,o,u,{orientation:N.West,pattern:Y(u.pattern)}],a=new Set,l=[],c=0,s=i;c<s.length;c++){var f=s[c],v=f.pattern.join("|");a.has(v)||(a.add(v),l.push(f))}return{label:t,variations:l.map(nn)}})),en=function(){function n(){(0,o.Z)(this,n),this.allLocations=x(8).flatMap((function(n){return x(8).map((function(t){return{row:n,col:t}}))}))}return(0,u.Z)(n,[{key:"buildInternalRows",value:function(n){var t=this;return this.allPossiblePiecePlacements().filter((function(n){return t.isValidPiecePlacement(n)}))}},{key:"internalRowToMatrixRow",value:function(n){var t=this.makePieceColumns(n),e=this.makeLocationColumns(n);return t.concat(e)}},{key:"getNumPrimaryColumns",value:function(n){}},{key:"isValidPiecePlacement",value:function(n){var t,e=(0,R.Z)(n.variation.squares);try{for(e.s();!(t=e.n()).done;){var r=t.value,o=r.coords,u=r.colour,i=n.location.row+o.row,a=n.location.col+o.col;if(i<0||a<0)return!1;if(i>=8||a>=8)return!1;if((i+a)%2!==0){if(u!==H.White)return!1}else if(u!==H.Black)return!1}}catch(l){e.e(l)}finally{e.f()}return!0}},{key:"allPossiblePiecePlacements",value:function(){var n,t=[],e=tn.slice(0,1).map((function(n){return n.label})),r=(0,R.Z)(tn);try{for(r.s();!(n=r.n()).done;){var o,u=n.value,i=e.includes(u.label)?u.variations.slice(0,1):u.variations,a=(0,R.Z)(i);try{for(a.s();!(o=a.n()).done;){var l,c=o.value,s=(0,R.Z)(this.allLocations);try{for(s.s();!(l=s.n()).done;){var f=l.value,v={label:u.label,variation:c,location:f};t.push(v)}}catch(h){s.e(h)}finally{s.f()}}}catch(h){a.e(h)}finally{a.f()}}}catch(h){r.e(h)}finally{r.f()}return t}},{key:"makePieceColumns",value:function(n){var t=Array(tn.length).fill(0);return t[tn.findIndex((function(t){return t.label===n.label}))]=1,t}},{key:"makeLocationColumns",value:function(n){var t,e=n.variation.squares.map((function(t){var e=t.coords;return 8*(n.location.row+e.row)+(n.location.col+e.col)})),r=Array(64).fill(0),o=(0,R.Z)(e);try{for(o.s();!(t=o.n()).done;){r[t.value]=1}}catch(u){o.e(u)}finally{o.f()}return r}}]),n}(),rn=function(){function n(){(0,o.Z)(this,n)}return(0,u.Z)(n,[{key:"buildInternalRows",value:function(n){return x(n.size).flatMap((function(t){return x(n.size).map((function(n){return{row:t,col:n}}))})).map((function(t){return{puzzle:n,coords:t}}))}},{key:"getNumPrimaryColumns",value:function(n){return 2*n.size}},{key:"internalRowToMatrixRow",value:function(n){var t=n.coords,e=t.row,r=t.col,o=n.puzzle.size,u=o+o-3,i=Array(o).fill(0),a=Array(o).fill(0),l=Array(u).fill(0),c=Array(u).fill(0);i[e]=1,a[r]=1;var s=e+r-1;s>=0&&s<u&&(l[s]=1);var f=o-1-r+e-1;return f>=0&&f<u&&(c[f]=1),i.concat(a).concat(l).concat(c)}}]),n}(),on=e(3433),un=function(n,t){var e=t.start,r=t.end,o=[e],u=[],i=n.colourPairs.length;return an(n,o,u,e,r,i),u},an=function n(t,e,r,o,u,i){for(var a=function(){var o=c[l];if(j(o,u)){var a=[].concat((0,on.Z)(e),[o]);cn(a)<=i&&r.push(a)}else{e.findIndex((function(n){return j(n,o)}))<0&&(e.push(o),cn(e)<=i&&n(t,e,r,o,u,i),e.pop())}},l=0,c=ln(t,o,u);l<c.length;l++)a()},ln=function(n,t,e){var r,o=n.colourPairs.flatMap((function(n){return[n.start,n.end]}));return[(r=t,{row:r.row-1,col:r.col}),P(t),W(t),B(t)].filter((function(t){return t.row>=0&&t.row<n.size&&t.col>=0&&t.col<n.size})).filter((function(n){return!function(n){return o.findIndex((function(t){return j(t,n)}))>=0}(n)||j(n,e)}))},cn=function(n){if(n.length<3)return 0;var t,e=0,r=(0,R.Z)(x(n.length).slice(1).slice(0,-1));try{for(r.s();!(t=r.n()).done;){var o=t.value,u=n[o-1],i=n[o+1],a=Math.abs(i.row-u.row),l=Math.abs(i.col-u.col);0!==a&&0!==l&&e++}}catch(c){r.e(c)}finally{r.f()}return e},sn=function(){function n(){(0,o.Z)(this,n)}return(0,u.Z)(n,[{key:"buildInternalRows",value:function(n){var t,e=[],r=(0,R.Z)(n.colourPairs);try{for(r.s();!(t=r.n()).done;){var o,u=t.value,i=un(n,u),a=(0,R.Z)(i);try{for(a.s();!(o=a.n()).done;){var l={puzzle:n,colourPair:u,coordsList:o.value};e.push(l)}}catch(c){a.e(c)}finally{a.f()}}}catch(c){r.e(c)}finally{r.f()}return e}},{key:"internalRowToMatrixRow",value:function(n){var t,e=n.puzzle.size,r=Array(e*e).fill(0),o=(0,R.Z)(n.coordsList);try{for(o.s();!(t=o.n()).done;){var u=t.value;r[u.row*e+u.col]=1}}catch(i){o.e(i)}finally{o.f()}return r}},{key:"getNumPrimaryColumns",value:function(n){}}]),n}(),fn=function(n,t){return n.runType===t.runType&&n.sum===t.sum&&function(n,t){if(n.length!==t.length)return!1;var e,r=(0,R.Z)(x(n.length));try{for(r.s();!(e=r.n()).done;){var o=e.value,u=n[o],i=t[o];if(!j(u,i))return!1}}catch(a){r.e(a)}finally{r.f()}return!0}(n.coordsList,t.coordsList)};!function(n){n[n.Horizontal=0]="Horizontal",n[n.Vertical=1]="Vertical"}(q||(q={}));var vn,hn=function(n){var t=[];return pn(n,0,n.length-1,t),t},pn=function n(t,e,r,o){if(e===r)o.push(t.slice());else for(var u=e;u<=r;u++)dn(t,e,u),n(t,e+1,r,o),dn(t,e,u)},dn=function(n,t,e){var r=n[t];n[t]=n[e],n[e]=r},mn=x(9).map((function(n){return n+1})),yn=function(){function n(){(0,o.Z)(this,n)}return(0,u.Z)(n,[{key:"buildInternalRows",value:function(n){var t=this,e=[],r=function(r){var o,u=(0,R.Z)(r);try{for(u.s();!(o=u.n()).done;){var i,a=o.value,l=(0,R.Z)(t.findSetsOfValues(a));try{for(l.s();!(i=l.n()).done;){var c,s=i.value,f=(0,R.Z)(hn(s));try{for(f.s();!(c=f.n()).done;){var v=c.value,h={puzzle:n,run:a,values:v};e.push(h)}}catch(p){f.e(p)}finally{f.f()}}}catch(p){l.e(p)}finally{l.f()}}}catch(p){u.e(p)}finally{u.f()}};return r(n.horizontalRuns),r(n.verticalRuns),e}},{key:"findSetsOfValues",value:function(n){var t=[];return function e(r,o,u){var i=O(mn,o.flat()),a=[];o.push(a);var l,c=(0,R.Z)(i);try{for(c.s();!(l=c.n()).done;){var s=l.value;u.push(s),a.push(s),r>1?e(r-1,o,u):Z(u)===n.sum&&t.push(u.slice()),u.pop()}}catch(f){c.e(f)}finally{c.f()}o.pop()}(n.coordsList.length,[],[]),t}},{key:"internalRowToMatrixRow",value:function(n){var t=n.puzzle,e=n.run,r=n.values,o=this.makeHorizontalRunColumns(t,e),u=this.makeVerticalRunColumns(t,e),i=this.makeHorizontalRunValueColumns(t,e,r),a=this.makeVerticalRunValueColumns(t,e,r);return o.concat(u).concat(i).concat(a)}},{key:"getNumPrimaryColumns",value:function(n){return n.horizontalRuns.length+n.verticalRuns.length}},{key:"makeHorizontalRunColumns",value:function(n,t){var e=Array(n.horizontalRuns.length).fill(0);t.runType===q.Horizontal&&(e[this.findHorizontalRunIndex(n,t)]=1);return e}},{key:"makeVerticalRunColumns",value:function(n,t){var e=Array(n.verticalRuns.length).fill(0);t.runType===q.Vertical&&(e[this.findVerticalRunIndex(n,t)]=1);return e}},{key:"makeHorizontalRunValueColumns",value:function(n,t,e){var r,o=Array(9*n.unknowns.length).fill(0),u=(0,R.Z)(x(t.coordsList.length));try{for(u.s();!(r=u.n()).done;){var i,a=r.value,l=e[a],c=t.runType===q.Horizontal?this.encodeValueNormal(l):this.encodeValueInverse(l),s=t.coordsList[a],f=this.findUnknownIndex(n,s),v=(0,R.Z)(x(9));try{for(v.s();!(i=v.n()).done;){var h=i.value;o[9*f+h]=c[h]}}catch(p){v.e(p)}finally{v.f()}}}catch(p){u.e(p)}finally{u.f()}return o}},{key:"makeVerticalRunValueColumns",value:function(n,t,e){var r,o=Array(9*n.unknowns.length).fill(0),u=(0,R.Z)(x(t.coordsList.length));try{for(u.s();!(r=u.n()).done;){var i,a=r.value,l=e[a],c=t.runType===q.Vertical?this.encodeValueNormal(l):this.encodeValueInverse(l),s=t.coordsList[a],f=this.findUnknownIndex(n,s),v=(0,R.Z)(x(9));try{for(v.s();!(i=v.n()).done;){var h=i.value;o[9*f+h]=c[h]}}catch(p){v.e(p)}finally{v.f()}}}catch(p){u.e(p)}finally{u.f()}return o}},{key:"encodeValueNormal",value:function(n){var t=Array(9).fill(0);return t[n-1]=1,t}},{key:"encodeValueInverse",value:function(n){var t=Array(9).fill(1);return t[n-1]=0,t}},{key:"findHorizontalRunIndex",value:function(n,t){return n.horizontalRuns.findIndex((function(n){return fn(n,t)}))}},{key:"findVerticalRunIndex",value:function(n,t){return n.verticalRuns.findIndex((function(n){return fn(n,t)}))}},{key:"findUnknownIndex",value:function(n,t){return n.unknowns.findIndex((function(n){return j(n,t)}))}}]),n}();!function(n){n[n.Horizontal=0]="Horizontal",n[n.Vertical=1]="Vertical"}(vn||(vn={}));var kn=function(){function n(){(0,o.Z)(this,n)}return(0,u.Z)(n,[{key:"buildInternalRows",value:function(n){var t,e=this,r=n.size,o=[],u=function(t){var u=[];!function i(a,l){if(0!==l.length){var c,s=l[0],f=l.slice(1),v=Z(f),h=f.length,p=x(r-v-h-s-a+1).map((function(n){return n+a})),d=(0,R.Z)(p);try{for(d.s();!(c=d.n()).done;){var m=c.value,y={startingPosition:m,runLength:s};u.push(y),i(m+s+1,f),u.pop()}}catch(O){d.e(O)}finally{d.f()}}else if(u.length===t.lengths.length){var k,w=u.slice().reverse(),b=[],g=(0,R.Z)(w);try{var C=function(){var n,r=k.value,o=[],u=(0,R.Z)(x(r.runLength).map((function(n){return n+r.startingPosition})));try{for(u.s();!(n=u.n()).done;){var i=n.value,a=e.makeRunGroupCoords(t,i);o.push(a)}}catch(O){u.e(O)}finally{u.f()}b.push(o)};for(g.s();!(k=g.n()).done;)C()}catch(O){g.e(O)}finally{g.f()}var X={puzzle:n,runGroup:t,coordsLists:b};o.push(X)}}(0,t.lengths)},i=(0,R.Z)(n.horizontalRunGroups);try{for(i.s();!(t=i.n()).done;){u(t.value)}}catch(c){i.e(c)}finally{i.f()}var a,l=(0,R.Z)(n.verticalRunGroups);try{for(l.s();!(a=l.n()).done;){u(a.value)}}catch(c){l.e(c)}finally{l.f()}return o}},{key:"getNumPrimaryColumns",value:function(n){return n.horizontalRunGroups.length+n.verticalRunGroups.length}},{key:"internalRowToMatrixRow",value:function(n){var t=n.puzzle,e=n.runGroup,r=n.coordsLists,o=this.makeRowColumns(t,e),u=this.makeColColumns(t,e),i=this.makeBlockColumns(t,vn.Horizontal,e,r),a=this.makeBlockColumns(t,vn.Vertical,e,r);return o.concat(u).concat(i).concat(a)}},{key:"makeRowColumns",value:function(n,t){var e=Array(n.horizontalRunGroups.length).fill(0);t.runGroupType===vn.Horizontal&&(e[t.row]=1);return e}},{key:"makeColColumns",value:function(n,t){var e=Array(n.verticalRunGroups.length).fill(0);t.runGroupType===vn.Vertical&&(e[t.col]=1);return e}},{key:"makeBlockColumns",value:function(n,t,e,r){var o=this,u=n.size,i=Array(u*u*2).fill(0),a=r.flat();if(e.runGroupType===t){var l,c=O(x(u).map((function(n){return o.makeRunGroupCoords(e,n)})),a,j),s=(0,R.Z)(a);try{for(s.s();!(l=s.n()).done;){var f=l.value;this.markOn(i,u,f)}}catch(k){s.e(k)}finally{s.f()}var v,h=(0,R.Z)(c);try{for(h.s();!(v=h.n()).done;){var p=v.value;this.markOff(i,u,p)}}catch(k){h.e(k)}finally{h.f()}}else{var d,m=(0,R.Z)(a);try{for(m.s();!(d=m.n()).done;){var y=d.value;this.markOff(i,u,y)}}catch(k){m.e(k)}finally{m.f()}}return i}},{key:"markOn",value:function(t,e,r){t[2*(r.row*e+r.col)+n.ON_INDEX]=1}},{key:"markOff",value:function(t,e,r){t[2*(r.row*e+r.col)+n.OFF_INDEX]=1}},{key:"makeRunGroupCoords",value:function(n,t){if(n.runGroupType===vn.Horizontal)return{row:n.row,col:t};if(n.runGroupType===vn.Vertical)return{row:t,col:n.col};throw new Error("[makeRunGroupCoords] unknown RunGroupType")}}]),n}();kn.ON_INDEX=0,kn.OFF_INDEX=1;var wn=new Map([["sudoku",V],["pentominoes",U],["draughtboard-puzzle",en],["n-queens",rn],["flow-free",sn],["kakuro",yn],["nonogram",kn]]);self.onmessage=function(n){try{if(console.log("[worker onmessage]","ev.data.type:",n.data.type),"solve"===n.data.type){var t=n.data;return void function(n,t){var e=wn.get(n);if(e){var r=new e,o=r.buildInternalRows(t),u=o.map((function(n){return r.internalRowToMatrixRow(n)})),i={numSolutions:1,numPrimaryColumns:r.getNumPrimaryColumns(t)},a=new p;a.addListener("solution",(function(n){console.log("[worker onSolution]","solutionIndex:",n.solutionIndex);var t=n.solution.map((function(n){return o[n]}));self.postMessage({type:"solutionFound",solutionInternalRows:t})}));var l=a.solve(u,i);self.postMessage({type:"finished",numSolutionsFound:l.length})}else self.postMessage({type:"unknownDemo"})}(t.shortName,t.puzzle)}}catch(e){console.error("error:",e),e instanceof Error?self.postMessage({type:"error",message:e.message}):self.postMessage({type:"error",message:String(e)})}}}},t={};function e(r){var o=t[r];if(void 0!==o)return o.exports;var u=t[r]={exports:{}};return n[r](u,u.exports,e),u.exports}e.m=n,e.x=function(){var n=e.O(void 0,[933],(function(){return e(5269)}));return n=e.O(n)},function(){var n=[];e.O=function(t,r,o,u){if(!r){var i=1/0;for(s=0;s<n.length;s++){r=n[s][0],o=n[s][1],u=n[s][2];for(var a=!0,l=0;l<r.length;l++)(!1&u||i>=u)&&Object.keys(e.O).every((function(n){return e.O[n](r[l])}))?r.splice(l--,1):(a=!1,u<i&&(i=u));if(a){n.splice(s--,1);var c=o();void 0!==c&&(t=c)}}return t}u=u||0;for(var s=n.length;s>0&&n[s-1][2]>u;s--)n[s]=n[s-1];n[s]=[r,o,u]}}(),e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,{a:t}),t},e.d=function(n,t){for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})},e.f={},e.e=function(n){return Promise.all(Object.keys(e.f).reduce((function(t,r){return e.f[r](n,t),t}),[]))},e.u=function(n){return"static/js/"+n+".039fce7e.chunk.js"},e.miniCssF=function(n){},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="/dlxlib-demos/",function(){var n={269:1};e.f.i=function(t,r){n[t]||importScripts(e.p+e.u(t))};var t=self.webpackChunkdlxlib_demos=self.webpackChunkdlxlib_demos||[],r=t.push.bind(t);t.push=function(t){var o=t[0],u=t[1],i=t[2];for(var a in u)e.o(u,a)&&(e.m[a]=u[a]);for(i&&i(e);o.length;)n[o.pop()]=1;r(t)}}(),function(){var n=e.x;e.x=function(){return e.e(933).then(n)}}();e.x()}();
//# sourceMappingURL=269.582eda7b.chunk.js.map
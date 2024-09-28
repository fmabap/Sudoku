var E=Object.defineProperty;var k=(u,e,t)=>e in u?E(u,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):u[e]=t;var n=(u,e,t)=>k(u,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();const l=9,d=3;class f{solve(e){let t=!0,r,o=[];for(;!(t===!0&&(r=this.getNextFreeCell(e),r===void 0));)if(this.setNextAllowedValue(e,r),r.value!=0)e.rows[r.rowNo].cols[r.colNo].value=r.value,o.push(r),t=!0;else{if(o.length===0)return!1;r=o.pop(),e.rows[r.rowNo].cols[r.colNo].value=0,t=!1}return!0}getNextFreeCell(e){for(let t=0;t<l;t++)for(let r=0;r<l;r++)if(e.rows[t].cols[r].value===0)return{rowNo:t,colNo:r,value:0}}setNextAllowedValue(e,t){for(let r=t.value+1;r<=l;r++)if(this.isValueAllowed(e,t.colNo,t.rowNo,r)){t.value=r;return}t.value=0}hasRowValue(e,t,r){let o=!1;return e.rows[t].cols.every(i=>i.value===r?(o=!0,!1):!0),o}hasColValue(e,t,r){let o=!1;return e.rows.every(i=>i.cols[t].value===r?(o=!0,!1):!0),o}hasBoxValue(e,t,r,o){let i=r-r%d,s=t-t%d,a=i-1,c=s;for(let h=0;h<l;h++){if(h%d===0&&(a=a+1,c=s),e.rows[a].cols[c].value===o)return!0;c=c+1}return!1}isValueAllowed(e,t,r,o){return!this.hasRowValue(e,r,o)&&!this.hasColValue(e,t,o)&&!this.hasBoxValue(e,t,r,o)}isWon(e){for(let t=0;t<l;t++)for(let r=0;r<l;r++)if(e.rows[t].cols[r].value===0)return!1;return!0}getValueCount(e){let t=[];for(let r=0;r<=l;r++)t.push({count:0});for(let r=0;r<l;r++)for(let o=0;o<l;o++){let i=e.rows[r].cols[o].value;t[i].count++}return t}}class C{constructor(){n(this,"board",{rows:[]});n(this,"backupBoard",{rows:[]})}getBoard(){return this.board}generateSudoku(){for(;;)if(this.createInitialBoard(),this.fillBoxes(),new f().solve(this.board)===!0){this.setFix();break}}setFix(){for(let e=0;e<l;e++)for(let t=0;t<l;t++)this.board.rows[e].cols[t].value!==0&&(this.board.rows[e].cols[t].fix=!0)}reduceBoard(e){let t=e,r,o;for(;t>0;)r=Math.floor(Math.random()*l),o=Math.floor(Math.random()*l),this.board.rows[r].cols[o].value!==0&&(this.board.rows[r].cols[o].value=0,this.board.rows[r].cols[o].fix=!1,t=t-1);this.backupBoard=JSON.parse(JSON.stringify(this.board))}createInitialBoard(){this.board.rows=[];for(let e=0;e<l;e++){let t={rowNo:e,cols:[]};for(let r=0;r<l;r++){let o={colNo:r,value:0,fix:!1};t.cols.push(o)}this.board.rows.push(t)}}fillBoxes(){this.generateBox(0,0,this.board),this.generateBox(3,3,this.board),this.generateBox(6,6,this.board),console.log(this.board),this.printBoard()}generateBox(e,t,r){const o=this.getRandomArray();let i=e,s=t,a=0;o.forEach(c=>{r.rows[i].cols[s].value=c,s=s+1,a=a+1,a%d===0&&(i=i+1,s=t)})}getRandomArray(){let e=[];for(let t=1;t<=l;t++)e.push(t);return this.shuffleArray(e)}shuffleArray(e){let t=e.length,r;for(;t!=0;)r=Math.floor(Math.random()*t),t--,[e[t],e[r]]=[e[r],e[t]];return e}printBoard(){let e=[],t="",r="-";for(let o=1;o<=l;o++)r=r+"-",o%d===0&&(r=r+"-");this.board.rows.forEach(o=>{t="",o.cols.forEach(i=>{i.colNo%d===0&&(t=t+"|"),t=t+i.value.toString()}),t=t+"|",o.rowNo%d===0&&e.push(r),e.push(t)}),e.push(r),e.forEach(o=>{console.log(o)})}resetBoard(){this.board=JSON.parse(JSON.stringify(this.backupBoard))}}class S{constructor(){n(this,"startTime",0);n(this,"timerRunning",!1);n(this,"diffAtBreak",0);n(this,"ONE_HOUR",36e5);n(this,"ONE_MINUTE",6e4);n(this,"ONE_SECOND",1e3)}start(){this.timerRunning||(this.startTime=Date.now(),this.timerRunning=!0)}stop(){if(!this.timerRunning)return;const e=Date.now();this.diffAtBreak=e-this.startTime+this.diffAtBreak,this.timerRunning=!1}reset(){this.startTime=0,this.diffAtBreak=0,this.timerRunning=!1}isRunning(){return this.timerRunning}getRunTime(){let e=0;this.timerRunning?e=Date.now()-this.startTime+this.diffAtBreak:e=this.diffAtBreak;let t=this.getHours(e),r=this.getMinutes(e,t),o=this.getSeconds(e,t,r);return this.convertToTime(t,r,o)}getHours(e){return Math.trunc(e/this.ONE_HOUR)}getMinutes(e,t){let r=e-t*this.ONE_HOUR;return Math.trunc(r/this.ONE_MINUTE)}getSeconds(e,t,r){let o=e-(t*this.ONE_HOUR+r*this.ONE_MINUTE);return Math.trunc(o/this.ONE_SECOND)}getNumberStrNumc2(e){let t=e.toString();return t.length===1&&(t="0"+t),t}convertToTime(e,t,r){let o=this.getNumberStrNumc2(e),i=this.getNumberStrNumc2(t),s=this.getNumberStrNumc2(r);return o+":"+i+":"+s}}class I{constructor(e,t){n(this,"board");n(this,"curActionNumber");n(this,"solver");n(this,"callBackNewGameStart");n(this,"generator");n(this,"errNotSolveable");n(this,"errNotAllowed");n(this,"timer");n(this,"errors");n(this,"isBoardInit");n(this,"countInitialNumbers");n(this,"markNumbers");this.solver=new f,this.generator=e,this.isBoardInit=!1,this.errNotSolveable="Not solveable",this.errNotAllowed="Not allowed",this.addClickEvents(),this.setText(),this.timer=t,this.errors=0,this.timer.reset(),this.countInitialNumbers=0,this.markNumbers=!0,this.showTimeValue(),this.showErrorCount(),this.shownCountInitialNumbers()}addClickEvents(){this.addClickEventNewGame(),this.addClickEventResetGame(),this.addClickEventActionNumber(),this.addClickEventCells(),this.addClickEventDelete(),this.addClickEventToHeader(),this.addClickEventDialogNewGameStart(),this.addClickEventDialogNewGameCancel(),this.addClickEventBreak(),this.addClickEventContinue()}initBoard(e){this.board=e,this.curActionNumber=1,this.placeOnBoard(),this.removeColorsFromBord(),this.markActionsDone(),this.curActionNumber=this.setFreeActionNumber(),this.markNumbers=this.getMarkNumbers(),this.setColorOnBoard(this.curActionNumber),this.errors=0,this.timer.reset(),this.timer.start(),this.showTime(),this.showErrorCount(),this.isBoardInit=!0}getMarkNumbers(){return document.getElementById("markNumbers").checked}showTime(){this.timer.isRunning()&&(this.showTimeValue(),setTimeout(this.showTime.bind(this),1e3))}showTimeValue(){const e=document.getElementById("time");e.innerText=this.getTimeLabel()+this.timer.getRunTime()}showErrorCount(){const e=document.getElementById("errors");e.innerText=this.getErrorsLabel()+this.errors}shownCountInitialNumbers(){const e=document.getElementById("countInitialNumbers");e.innerText=this.getCountInitialNumbersLabel()+this.countInitialNumbers}setFreeActionNumber(){var t;let e=document.getElementsByClassName("actionNumberSel");for(let r=0;r<e.length;r++)if(!((t=e.item(r))!=null&&t.classList.contains("actionNumberDone")))return r+1;return 1}placeOnBoard(){this.clearBoard();for(let e=0;e<l;e++)for(let t=0;t<l;t++){let r=this.board.rows[e].cols[t].value;if(r!=0){let o="c"+e.toString()+t.toString(),i=document.getElementById(o);i.innerText=r.toString(),this.board.rows[e].cols[t].fix===!0&&i.classList.add("fixCell")}}}clearBoard(){for(let e=0;e<l;e++)for(let t=0;t<l;t++){let r="c"+e.toString()+t.toString(),o=document.getElementById(r);o.innerText="",o.classList.remove("fixCell")}}addClickEventToHeader(){document.getElementById("header").addEventListener("click",async()=>{this.clickOnHeader()})}clickOnHeader(){window.location.href="https://github.com/fmabap/sudoku"}addClickEventActionNumber(){var t;let e=document.getElementsByClassName("actionNumberSel");for(let r=0;r<e.length;r++)(t=e.item(r))==null||t.addEventListener("click",()=>{this.clickActionNumber(e.item(r))})}addClickEventDialogNewGameStart(){document.getElementById("dialogNewOk").addEventListener("click",()=>{this.clickNewGameStart()})}addClickEventDialogNewGameCancel(){document.getElementById("dialogNewCancel").addEventListener("click",()=>{this.clickNewGameCancel()})}addClickEventBreak(){document.getElementById("break").addEventListener("click",()=>{this.showBreakDialog()})}addClickEventContinue(){document.getElementById("continue").addEventListener("click",()=>{this.hideBreakDialog()})}addClickEventDelete(){document.getElementById("delete").addEventListener("click",()=>{this.clickDelete()})}addClickEventNewGame(){document.getElementById("newGame").addEventListener("click",()=>{this.clickNewGame()})}clickDelete(){this.removeColorsFromBord(),this.curActionNumber=0,this.markActionButton(0);for(let e=0;e<l;e++)for(let t=0;t<l;t++)if(this.board.rows[e].cols[t].value!=0&&this.board.rows[e].cols[t].fix===!1){let o="c"+e.toString()+t.toString();document.getElementById(o).classList.add("delete")}}clickNewGame(){this.timer.stop(),this.requestNewGameOptions(this.callBackNewGameStart)}addClickEventResetGame(){document.getElementById("resetGame").addEventListener("click",()=>{this.clickResetGame()})}clickResetGame(){this.generator.resetBoard(),this.initBoard(this.generator.getBoard())}addClickEventCells(){var t;let e=document.getElementsByClassName("boardCell");for(let r=0;r<e.length;r++)(t=e.item(r))==null||t.addEventListener("click",()=>{this.clickCell(e.item(r))})}isSolveableCheckRequired(){return document.getElementById("checkSolveable").checked}clickCell(e){let t=parseInt(e.id.substring(1,2)),r=parseInt(e.id.substring(2,3)),o=e,i=JSON.parse(JSON.stringify(this.board));if(this.board.rows[t].cols[r].fix===!1||this.board.rows[t].cols[r].value===this.curActionNumber){if(this.curActionNumber===0){this.board.rows[t].cols[r].value=this.curActionNumber,o.innerText="",o.classList.remove("delete"),this.setColorOnBoard(this.curActionNumber),this.markActionsDone(),this.timer.isRunning()||(this.timer.start(),this.showTime());return}i.rows[t].cols[r].value=0,this.solver.isValueAllowed(i,r,t,this.curActionNumber)?(i.rows[t].cols[r].value=this.curActionNumber,this.isSolveableCheckRequired()===!1||this.solver.solve(i)?(this.board.rows[t].cols[r].value=this.curActionNumber,o.innerText=this.curActionNumber.toString(),this.setColorOnBoard(this.curActionNumber),this.solver.isWon(this.board)&&this.showWon()):(this.increaseErrorCount(),this.toastError(this.errNotSolveable))):(this.increaseErrorCount(),this.toastError(this.errNotAllowed))}else this.curActionNumber!=0&&this.increaseErrorCount(),this.toastError(this.errNotAllowed);this.markActionsDone()}markActionsDone(){this.solver.getValueCount(this.board).forEach((t,r)=>{if(r>0){let o="actionNumber"+r,i=document.getElementById(o);t.count===l?i.classList.add("actionNumberDone"):i.classList.remove("actionNumberDone")}})}showWon(){this.timer.stop(),this.setElementVisible("won"),setTimeout(()=>{this.hideWon()},5e3)}hideWon(){this.setElementInvisible("won")}showBreakDialog(){this.timer.stop(),document.getElementById("dialogBreak").showModal()}hideBreakDialog(){let e=document.getElementById("dialogBreak");this.solver.isWon(this.board)?e.close():(e.close(),this.timer.start(),this.showTime())}clickActionNumber(e){this.removeColorsFromBord();for(let t=0;t<=l;t++){let r="colorNumber"+t.toString();if(e.classList.contains(r)){this.setColorOnBoard(t);break}}}removeColorsFromBord(){var t,r;let e=document.getElementsByClassName("boardCell");for(let o=1;o<=l;o++){let i="colorNumber"+o.toString();for(let s=0;s<e.length;s++)(t=e.item(s))==null||t.classList.remove(i),(r=e.item(s))==null||r.classList.remove("delete")}}markActionButton(e){var o,i,s;let t;e===0?t="delete":t="colorNumber"+e.toString();let r=document.getElementsByClassName("actionNumber");for(let a=0;a<r.length;a++)(o=r.item(a))==null||o.classList.remove("actionNumberSelected"),(i=r.item(a))!=null&&i.classList.contains(t)&&((s=r.item(a))==null||s.classList.add("actionNumberSelected"))}setColorOnBoard(e){if(this.curActionNumber=e,this.markActionButton(e),this.markNumbers===!1)return;let t="colorNumber"+e.toString();for(let r=0;r<l;r++)for(let o=0;o<l;o++)if(this.board.rows[r].cols[o].value===e){let i="c"+r.toString()+o.toString();document.getElementById(i).classList.add(t)}}toastError(e,t=1e3){let r=document.getElementById("error");r.innerText=e,this.setElementVisible("error"),setTimeout(()=>{this.hideError()},t)}increaseErrorCount(){this.errors=this.errors+1,this.showErrorCount()}hideError(){this.setElementInvisible("error")}setElementInvisible(e){let t=document.getElementById(e);(t==null?void 0:t.classList.contains("hidden"))!==!0&&(t==null||t.classList.add("hidden"))}setElementVisible(e){let t=document.getElementById(e);t==null||t.classList.remove("hidden")}requestNewGameOptions(e){let t=document.getElementById("dialogNewGame"),r=document.getElementById("dialogNewCancel"),o=document.getElementById("dialogNewToolbar");this.isBoardInit?(r.classList.remove("hidden"),o.classList.add("dialogNewToolbar2"),o.classList.remove("dialogNewToolbar1")):(r.classList.add("hidden"),o.classList.remove("dialogNewToolbar2"),o.classList.add("dialogNewToolbar1")),this.callBackNewGameStart=e,t.showModal()}getCountNumbers(){let e=document.getElementById("inputCountNumbers");return parseInt(e.value)}clickNewGameStart(){let e=document.getElementById("dialogNewGame");this.countInitialNumbers=this.getCountNumbers(),this.shownCountInitialNumbers(),e.close(),this.callBackNewGameStart()}clickNewGameCancel(){let e=document.getElementById("dialogNewGame");this.solver.isWon(this.board)?e.close():(e.close(),this.timer.start(),this.showTime())}setText(){let e=document.getElementById("newGameHeadLine"),t=document.getElementById("labelCountNumbers"),r=document.getElementById("labelCheckSolveable"),o=document.getElementById("labelMarkNumbers"),i=document.getElementById("dialogNewOk"),s=document.getElementById("dialogNewCancel"),a=document.getElementById("delete"),c=document.getElementById("resetGame"),h=document.getElementById("newGame"),b=document.getElementById("break"),w=document.getElementById("won"),v=document.getElementById("continue"),B=document.getElementById("breakHeadLine");navigator.language.indexOf("de")>-1&&(e.innerText="Neues Spiel",t.innerText="Anzahl Zahlen: ",r.innerText="Lösbarkeit überprüfen: ",o.innerText="Zahlen markieren: ",i.innerText="Spiel starten",s.innerText="Abbrechen",a.innerText="Entf.",c.innerText="Reset",h.innerHTML="Neues Spiel",w.innerHTML="Du hast gewonnen",b.innerText="Pause",B.innerText="Pause",this.errNotSolveable="Nicht lösbar",this.errNotAllowed="Nicht erlaubt",v.innerHTML="Weiter")}getTimeLabel(){return navigator.language.indexOf("de")>-1?"Zeit: ":"Time: "}getErrorsLabel(){return navigator.language.indexOf("de")>-1?"Fehler: ":"Errors: "}getCountInitialNumbersLabel(){return navigator.language.indexOf("de")>-1?"Anz. Nr. : ":"Count No. : "}}window.addEventListener("load",()=>{y()});T();let m,N,g;function y(){m=new C,g=new S,N=new I(m,g),N.requestNewGameOptions(x)}function T(){let u="",e="";for(let s=0;s<82;s++){let a=Math.floor(Math.random()*l);e=e+a.toString(),u=u+String.fromCodePoint(a+65)}let t=btoa(u);console.log(e),console.log(u),console.log(t);let r=atob(t);console.log(r);let o="",i;for(let s=0;s<82;s++)i=u.substring(s,s+1),o=o+(i.charCodeAt(0)-65).toString();console.log(o)}function x(){m.generateSudoku(),m.printBoard(),m.reduceBoard(l*l-N.getCountNumbers()),N.initBoard(m.getBoard())}

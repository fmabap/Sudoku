var E=Object.defineProperty;var B=(a,e,t)=>e in a?E(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var n=(a,e,t)=>(B(a,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const l=9,u=3;class N{solve(e){let t=!0,o,r=[];for(;!(t===!0&&(o=this.getNextFreeCell(e),o===void 0));)if(this.setNextAllowedValue(e,o),o.value!=0)e.rows[o.rowNo].cols[o.colNo].value=o.value,r.push(o),t=!0;else{if(r.length===0)return!1;o=r.pop(),e.rows[o.rowNo].cols[o.colNo].value=0,t=!1}return!0}getNextFreeCell(e){for(let t=0;t<l;t++)for(let o=0;o<l;o++)if(e.rows[t].cols[o].value===0)return{rowNo:t,colNo:o,value:0}}setNextAllowedValue(e,t){for(let o=t.value+1;o<=l;o++)if(this.isValueAllowed(e,t.colNo,t.rowNo,o)){t.value=o;return}t.value=0}hasRowValue(e,t,o){let r=!1;return e.rows[t].cols.every(i=>i.value===o?(r=!0,!1):!0),r}hasColValue(e,t,o){let r=!1;return e.rows.every(i=>i.cols[t].value===o?(r=!0,!1):!0),r}hasBoxValue(e,t,o,r){let i=o-o%u,s=t-t%u,c=i-1,d=s;for(let m=0;m<l;m++){if(m%u===0&&(c=c+1,d=s),e.rows[c].cols[d].value===r)return!0;d=d+1}return!1}isValueAllowed(e,t,o,r){return!this.hasRowValue(e,o,r)&&!this.hasColValue(e,t,r)&&!this.hasBoxValue(e,t,o,r)}isWon(e){for(let t=0;t<l;t++)for(let o=0;o<l;o++)if(e.rows[t].cols[o].value===0)return!1;return!0}getValueCount(e){let t=[];for(let o=0;o<=l;o++)t.push({count:0});for(let o=0;o<l;o++)for(let r=0;r<l;r++){let i=e.rows[o].cols[r].value;t[i].count++}return t}}class k{constructor(){n(this,"board",{rows:[]});n(this,"backupBoard",{rows:[]})}getBoard(){return this.board}generateSudoku(){for(;;)if(this.createInitialBoard(),this.fillBoxes(),new N().solve(this.board)===!0){this.setFix();break}}setFix(){for(let e=0;e<l;e++)for(let t=0;t<l;t++)this.board.rows[e].cols[t].value!==0&&(this.board.rows[e].cols[t].fix=!0)}reduceBoard(e){let t=e,o,r;for(;t>0;)o=Math.floor(Math.random()*l),r=Math.floor(Math.random()*l),this.board.rows[o].cols[r].value!==0&&(this.board.rows[o].cols[r].value=0,this.board.rows[o].cols[r].fix=!1,t=t-1);this.backupBoard=JSON.parse(JSON.stringify(this.board))}createInitialBoard(){this.board.rows=[];for(let e=0;e<l;e++){let t={rowNo:e,cols:[]};for(let o=0;o<l;o++){let r={colNo:o,value:0,fix:!1};t.cols.push(r)}this.board.rows.push(t)}}fillBoxes(){this.generateBox(0,0,this.board),this.generateBox(3,3,this.board),this.generateBox(6,6,this.board),console.log(this.board),this.printBoard()}generateBox(e,t,o){const r=this.getRandomArray();let i=e,s=t,c=0;r.forEach(d=>{o.rows[i].cols[s].value=d,s=s+1,c=c+1,c%u===0&&(i=i+1,s=t)})}getRandomArray(){let e=[];for(let t=1;t<=l;t++)e.push(t);return this.shuffleArray(e)}shuffleArray(e){let t=e.length,o;for(;t!=0;)o=Math.floor(Math.random()*t),t--,[e[t],e[o]]=[e[o],e[t]];return e}printBoard(){let e=[],t="",o="-";for(let r=1;r<=l;r++)o=o+"-",r%u===0&&(o=o+"-");this.board.rows.forEach(r=>{t="",r.cols.forEach(i=>{i.colNo%u===0&&(t=t+"|"),t=t+i.value.toString()}),t=t+"|",r.rowNo%u===0&&e.push(o),e.push(t)}),e.push(o),e.forEach(r=>{console.log(r)})}resetBoard(){this.board=JSON.parse(JSON.stringify(this.backupBoard))}}class C{constructor(){n(this,"startTime",0);n(this,"timerRunning",!1);n(this,"diffAtBreak",0);n(this,"ONE_HOUR",36e5);n(this,"ONE_MINUTE",6e4);n(this,"ONE_SECOND",1e3)}start(){this.startTime=Date.now(),this.timerRunning=!0}stop(){if(!this.timerRunning)return;const e=Date.now();this.diffAtBreak=e-this.startTime+this.diffAtBreak,this.timerRunning=!1}reset(){this.startTime=0,this.diffAtBreak=0,this.timerRunning=!1}isRunning(){return this.timerRunning}getRunTime(){let e=0;this.timerRunning?e=Date.now()-this.startTime+this.diffAtBreak:e=this.diffAtBreak;let t=this.getHours(e),o=this.getMinutes(e,t),r=this.getSeconds(e,t,o);return this.convertToTime(t,o,r)}getHours(e){return Math.trunc(e/this.ONE_HOUR)}getMinutes(e,t){let o=e-t*this.ONE_HOUR;return Math.trunc(o/this.ONE_MINUTE)}getSeconds(e,t,o){let r=e-(t*this.ONE_HOUR+o*this.ONE_MINUTE);return Math.trunc(r/this.ONE_SECOND)}getNumberStrNumc2(e){let t=e.toString();return t.length===1&&(t="0"+t),t}convertToTime(e,t,o){let r=this.getNumberStrNumc2(e),i=this.getNumberStrNumc2(t),s=this.getNumberStrNumc2(o);return r+":"+i+":"+s}}class S{constructor(e,t){n(this,"board");n(this,"curActionNumber");n(this,"solver");n(this,"callBackNewGameStart");n(this,"generator");n(this,"errNotSolveable");n(this,"errNotAllowed");n(this,"timer");n(this,"errors");n(this,"isBoardInit");this.solver=new N,this.generator=e,this.isBoardInit=!1,this.errNotSolveable="Not solveable",this.errNotAllowed="Not allowed",this.addClickEvents(),this.setText(),this.timer=t,this.errors=0,this.timer.reset(),this.showTimeValue(),this.showErrorCount()}addClickEvents(){this.addClickEventNewGame(),this.addClickEventResetGame(),this.addClickEventActionNumber(),this.addClickEventCells(),this.addClickEventDelete(),this.addClickEventToHeader(),this.addClickEventDialogNewGameStart(),this.addClickEventDialogNewGameCancel(),this.addClickEventBreak(),this.addClickEventContinue()}initBoard(e){this.board=e,this.curActionNumber=1,this.placeOnBoard(),this.removeColorsFromBord(),this.markActionsDone(),this.curActionNumber=this.setFreeActionNumber(),this.setColorOnBoard(this.curActionNumber),this.errors=0,this.timer.reset(),this.timer.start(),this.showTime(),this.showErrorCount(),this.isBoardInit=!0}showTime(){this.timer.isRunning()&&(this.showTimeValue(),setTimeout(this.showTime.bind(this),1e3))}showTimeValue(){const e=document.getElementById("time");e.innerText=this.getTimeLabel()+this.timer.getRunTime()}showErrorCount(){const e=document.getElementById("errors");e.innerText=this.getErrorsLabel()+this.errors}setFreeActionNumber(){var t;let e=document.getElementsByClassName("actionNumberSel");for(let o=0;o<e.length;o++)if(!((t=e.item(o))!=null&&t.classList.contains("actionNumberDone")))return o+1;return 1}placeOnBoard(){this.clearBoard();for(let e=0;e<l;e++)for(let t=0;t<l;t++){let o=this.board.rows[e].cols[t].value;if(o!=0){let r="c"+e.toString()+t.toString(),i=document.getElementById(r);i.innerText=o.toString(),this.board.rows[e].cols[t].fix===!0&&i.classList.add("fixCell")}}}clearBoard(){for(let e=0;e<l;e++)for(let t=0;t<l;t++){let o="c"+e.toString()+t.toString(),r=document.getElementById(o);r.innerText="",r.classList.remove("fixCell")}}addClickEventToHeader(){document.getElementById("header").addEventListener("click",async()=>{this.clickOnHeader()})}clickOnHeader(){window.location.href="https://github.com/fmabap/sudoku"}addClickEventActionNumber(){var t;let e=document.getElementsByClassName("actionNumberSel");for(let o=0;o<e.length;o++)(t=e.item(o))==null||t.addEventListener("click",()=>{this.clickActionNumber(e.item(o))})}addClickEventDialogNewGameStart(){document.getElementById("dialogNewOk").addEventListener("click",()=>{this.clickNewGameStart()})}addClickEventDialogNewGameCancel(){document.getElementById("dialogNewCancel").addEventListener("click",()=>{this.clickNewGameCancel()})}addClickEventBreak(){document.getElementById("break").addEventListener("click",()=>{this.showBreakDialog()})}addClickEventContinue(){document.getElementById("continue").addEventListener("click",()=>{this.hideBreakDialog()})}addClickEventDelete(){document.getElementById("delete").addEventListener("click",()=>{this.clickDelete()})}addClickEventNewGame(){document.getElementById("newGame").addEventListener("click",()=>{this.clickNewGame()})}clickDelete(){this.removeColorsFromBord(),this.curActionNumber=0;for(let e=0;e<l;e++)for(let t=0;t<l;t++)if(this.board.rows[e].cols[t].value!=0&&this.board.rows[e].cols[t].fix===!1){let r="c"+e.toString()+t.toString();document.getElementById(r).classList.add("delete")}}clickNewGame(){this.timer.stop(),this.requestNewGameOptions(this.callBackNewGameStart)}addClickEventResetGame(){document.getElementById("resetGame").addEventListener("click",()=>{this.clickResetGame()})}clickResetGame(){this.generator.resetBoard(),this.initBoard(this.generator.getBoard())}addClickEventCells(){var t;let e=document.getElementsByClassName("boardCell");for(let o=0;o<e.length;o++)(t=e.item(o))==null||t.addEventListener("click",()=>{this.clickCell(e.item(o))})}isSolveableCheckRequired(){return document.getElementById("checkSolveable").checked}clickCell(e){let t=parseInt(e.id.substring(1,2)),o=parseInt(e.id.substring(2,3)),r=e,i=JSON.parse(JSON.stringify(this.board));if(this.board.rows[t].cols[o].fix===!1||this.board.rows[t].cols[o].value===this.curActionNumber){if(this.curActionNumber===0){this.board.rows[t].cols[o].value=this.curActionNumber,r.innerText="",r.classList.remove("delete"),this.setColorOnBoard(this.curActionNumber),this.markActionsDone();return}i.rows[t].cols[o].value=0,this.solver.isValueAllowed(i,o,t,this.curActionNumber)?(i.rows[t].cols[o].value=this.curActionNumber,this.isSolveableCheckRequired()===!1||this.solver.solve(i)?(this.board.rows[t].cols[o].value=this.curActionNumber,r.innerText=this.curActionNumber.toString(),this.setColorOnBoard(this.curActionNumber),this.solver.isWon(this.board)&&this.showWon()):this.toastError(this.errNotSolveable)):this.toastError(this.errNotAllowed)}else this.toastError(this.errNotAllowed);this.markActionsDone()}markActionsDone(){this.solver.getValueCount(this.board).forEach((t,o)=>{if(o>0){let r="actionNumber"+o,i=document.getElementById(r);t.count===l?i.classList.add("actionNumberDone"):i.classList.remove("actionNumberDone")}})}showWon(){this.timer.stop(),this.setElementVisible("won"),setTimeout(()=>{this.hideWon()},5e3)}hideWon(){this.setElementInvisible("won")}showBreakDialog(){this.timer.stop(),document.getElementById("dialogBreak").showModal()}hideBreakDialog(){document.getElementById("dialogBreak").close(),this.timer.start(),this.showTime()}clickActionNumber(e){this.removeColorsFromBord();for(let t=0;t<=l;t++){let o="colorNumber"+t.toString();if(e.classList.contains(o)){this.setColorOnBoard(t);break}}}removeColorsFromBord(){var t,o;let e=document.getElementsByClassName("boardCell");for(let r=1;r<=l;r++){let i="colorNumber"+r.toString();for(let s=0;s<e.length;s++)(t=e.item(s))==null||t.classList.remove(i),(o=e.item(s))==null||o.classList.remove("delete")}}setColorOnBoard(e){this.curActionNumber=e;let t="colorNumber"+e.toString();for(let o=0;o<l;o++)for(let r=0;r<l;r++)if(this.board.rows[o].cols[r].value===e){let i="c"+o.toString()+r.toString();document.getElementById(i).classList.add(t)}}toastError(e,t=1e3){let o=document.getElementById("error");o.innerText=e,this.errors=this.errors+1,this.showErrorCount(),this.setElementVisible("error"),setTimeout(()=>{this.hideError()},t)}hideError(){this.setElementInvisible("error")}setElementInvisible(e){let t=document.getElementById(e);(t==null?void 0:t.classList.contains("hidden"))!==!0&&(t==null||t.classList.add("hidden"))}setElementVisible(e){let t=document.getElementById(e);t==null||t.classList.remove("hidden")}requestNewGameOptions(e){let t=document.getElementById("dialogNewGame"),o=document.getElementById("dialogNewCancel"),r=document.getElementById("dialogNewToolbar");this.isBoardInit?(o.classList.remove("hidden"),r.classList.add("dialogNewToolbar2"),r.classList.remove("dialogNewToolbar1")):(o.classList.add("hidden"),r.classList.remove("dialogNewToolbar2"),r.classList.add("dialogNewToolbar1")),this.callBackNewGameStart=e,t.showModal()}getCountNumbers(){let e=document.getElementById("inputCountNumbers");return parseInt(e.value)}clickNewGameStart(){document.getElementById("dialogNewGame").close(),this.callBackNewGameStart()}clickNewGameCancel(){let e=document.getElementById("dialogNewGame");this.solver.isWon(this.board)?e.close():(e.close(),this.timer.start(),this.showTime())}setText(){let e=document.getElementById("newGameHeadLine"),t=document.getElementById("labelCountNumbers"),o=document.getElementById("labelCheckSolveable"),r=document.getElementById("dialogNewOk"),i=document.getElementById("dialogNewCancel"),s=document.getElementById("delete"),c=document.getElementById("resetGame"),d=document.getElementById("newGame"),m=document.getElementById("break"),w=document.getElementById("won"),b=document.getElementById("continue"),v=document.getElementById("breakHeadLine");navigator.language.indexOf("de")>-1&&(e.innerText="Neues Spiel",t.innerText="Anzahl Zahlen: ",o.innerText="Lösbarkeit überprüfen: ",r.innerText="Spiel starten",i.innerText="Abbrechen",s.innerText="Entf.",c.innerText="Reset",d.innerHTML="Neues Spiel",w.innerHTML="Du hast gewonnen",m.innerText="Pause",v.innerText="Pause",this.errNotSolveable="Nicht lösbar",this.errNotAllowed="Nicht erlaubt",b.innerHTML="Weiter")}getTimeLabel(){return navigator.language.indexOf("de")>-1?"Zeit: ":"Time: "}getErrorsLabel(){return navigator.language.indexOf("de")>-1?"Fehler: ":"Errors: "}}window.addEventListener("load",()=>{y()});T();let h,g,f;function y(){h=new k,f=new C,g=new S(h,f),g.requestNewGameOptions(I)}function T(){let a="",e="";for(let s=0;s<82;s++){let c=Math.floor(Math.random()*l);e=e+c.toString(),a=a+String.fromCodePoint(c+65)}let t=btoa(a);console.log(e),console.log(a),console.log(t);let o=atob(t);console.log(o);let r="",i;for(let s=0;s<82;s++)i=a.substring(s,s+1),r=r+(i.charCodeAt(0)-65).toString();console.log(r)}function I(){h.generateSudoku(),h.printBoard(),h.reduceBoard(l*l-g.getCountNumbers()),g.initBoard(h.getBoard())}

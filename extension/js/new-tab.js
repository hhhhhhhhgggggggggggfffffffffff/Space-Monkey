var _date={months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],time:["today","tomorrow","yesterday"]};const http={radio:["https://uk2.streamingpulse.com/ssl/vcr1","http://retroserver.streamr.ru:8043/retro256.mp3","https://ep128.hostingradio.ru:8030/ep128"]};var LOCAL={blocks:{LB:document.getElementById("left-block"),CB:document.getElementById("center-block"),RB:document.getElementById("right-side-block")},search:{input:document.getElementById("search-input"),ul:document.getElementById("search-results"),cleaner:document.getElementById("search-cleaner")},shortcuts:{btn:{add:document.getElementById("shortcut-link-add"),save:document.getElementById("shortcut-link-save"),remove:document.getElementById("shortcut-link-remove")},inputs:{title:document.getElementById("link-title"),position:document.getElementById("link-position"),url:document.getElementById("link-url")}},history:{block:document.getElementById("historyList"),btn:{list:document.querySelectorAll(".history-request-btns"),history:document.getElementById("get-history"),youtube:document.getElementById("get-history-youtube"),recently:document.getElementById("get-history-recently"),cineb:document.getElementById("get-history-cineb")}},radio:{nowPlay:"",volume:document.getElementById("radio-volume"),station:{VCR:http.radio[0],RF:http.radio[1],E:http.radio[2]},audio:new Audio,status:0,label:document.querySelectorAll(".radio-switch")},scroll:!1};const messageText={historyBlock:{recentlyClosed:"Recently Closed",history:"History",request:"History on"}},history={block:document.getElementById("history"),ul:document.getElementById("historyList"),mouse:document.getElementById("historyvsb"),btn:{all:document.getElementById("get-all-history"),youtube:document.getElementById("get-youtube-history"),tabs:document.getElementById("get-last-tabs"),cineb:document.getElementById("get-cineb-history"),selected:document.getElementById("history-selected")}},news={block:document.getElementById("news-blocks"),main:document.getElementById("news"),mouse:!1,topics:document.querySelectorAll(".news-topics"),newsId:0};var inputs={title:document.getElementById("link-title"),position:document.getElementById("link-position"),url:document.getElementById("link-url")},overlay={body:document.getElementById("overlay"),closebtn:document.getElementById("overlay-close")},view={shortcuts:{status:document.getElementById("view-shortcuts-status")},bookmarks:{status:document.getElementById("view-bookmarks-status")},history:{status:document.getElementById("view-history-status")}},switchDisplay=document.getElementById("switch"),content=document.getElementById("center-block"),bookmarks={parent:document.getElementById("folderBg"),sortBtn:document.getElementById("bookmarks-sort")},radio={stationSrc:[],songArtist:document.getElementById("artist"),songTitle:document.getElementById("title"),info:document.getElementById("radio-info"),stationId:0,play:0},settings={status:0,btn:document.getElementById("settings-btn"),menu:document.getElementById("settings"),ul:{shortcuts:document.getElementById("view-satus").children[0],bookmarks:document.getElementById("view-satus").children[1],theme:document.getElementById("view-satus").children[2],history:document.getElementById("view-satus").children[3],a:document.querySelector("a")}},scrollStatus=0,shortcutList=JSON.parse(localStorage.getItem("shortcuts")),lStorage={settings:JSON.parse(localStorage.getItem("settings"))};function shortcut_new_action(){document.getElementById("shortcut-link-create").onclick=function(){linkInputsClear(),LOCAL.shortcuts.inputs.position.setAttribute("readonly",!0),LOCAL.shortcuts.btn.add.style.display="flex",LOCAL.shortcuts.btn.save.style.display="none",LOCAL.shortcuts.btn.remove.style.display="none",overlayStatus(1)}}for(null==lStorage.settings&&firstRun(),window.onscroll=function(){console.log("s"),window.scrollTo(0,0)},LOCAL.radio.volume.value=100*lStorage.settings.audio.radio.volume,getTopSites(),displayBokkmarks(),shortcuts("display"),getCacheNews(),settings.btn.onclick=function(){return 0==settings.status?(settings.btn.style.transform="rotate(45deg)",settings.menu.style.display="flex",settings.status=1):(settings.btn.style.transform="rotate(0deg)",settings.menu.style.display="none",settings.status=0)},settings.ul.history.onclick=function(){},settings.ul.theme.onclick=function(){alert("in progress :)")},settings.ul.bookmarks.onclick=function(){0==JSON.parse(localStorage.getItem("settings")).view.bookmarks?(document.querySelector(".folders").innerText="",lStorage.settings.view.bookmarks=1):(document.querySelector(".folders").innerText="",lStorage.settings.view.bookmarks=0),localStorage.setItem("settings",JSON.stringify(lStorage.settings)),displayBokkmarks()},settings.ul.shortcuts.onclick=function(){switchDisplayFun(1)},LOCAL.shortcuts.btn.remove.onclick=function(){shortcuts("remove")},LOCAL.shortcuts.btn.save.onclick=function(){shortcuts("edit")},overlay.closebtn.onclick=function(){overlayStatus(0)},LOCAL.radio.volume.oninput=function(){var t=JSON.parse(localStorage.getItem("settings")),e=.01*LOCAL.radio.volume.value;LOCAL.radio.audio.volume=e,t.audio.radio.volume=e,localStorage.setItem("settings",JSON.stringify(t))},i=0;i<LOCAL.radio.label.length;i++)LOCAL.radio.label[i].addEventListener("click",function(t){var e=.01*LOCAL.radio.volume.value,s=document.querySelector("#radio input:checked").id.slice(13),o=t.target.htmlFor.slice(13);return console.log(s,o),$("#radio label").removeClass("news-topics-active"),LOCAL.radio.audio.src="",s==o&&1==LOCAL.radio.status?(LOCAL.radio.audio.pause(),LOCAL.radio.status=0,LOCAL.radio.nowPlay=""):(LOCAL.radio.audio.volume=.01*LOCAL.radio.volume.value,t.target.classList.add("news-topics-active"),LOCAL.radio.audio.src=LOCAL.radio.station[o],LOCAL.radio.audio.play(),LOCAL.radio.audio.src.volume=e,LOCAL.radio.status=1,LOCAL.radio.nowPlay=o)});function GetRecentlyTabs(){chrome.sessions.getRecentlyClosed(function(t){LOCAL.history.block.innerText="";var e=[];for(o in t)if(null!=t[o].tab){var s=t[o].tab;"chrome"!=s.url.split(":")[0]&&e.push({url:s.url,title:s.title})}else{var o,n=t[o].window.tabs;for(o in n)"chrome"!=n[o].url.split(":")[0]&&e.push({url:n[o].url,title:n[o].title})}for(o in e=e.slice(0,16)){var i=e[o].title.replace(/</g,"&lt;").replace(/>/g,"&gt;");$(`<a href="${e[o].url}"><li style="animation: fadeIn-bloks 0.3s forwards; animation-delay: ${.01*o}s;"><span class="date">x</span><img src="https://www.google.com/s2/favicons?sz=64&domain=${e[o].url}"><span class="title">${i}</span></li></a>`).appendTo(history.ul)}})}function hideAll(t){if(1==t)return LOCAL.blocks.CB.style.transform=t="translateY(-80px)",LOCAL.blocks.RB.style.transform=t,LOCAL.blocks.LB.style.transform=t,LOCAL.blocks.CB.style.opacity=0,LOCAL.blocks.RB.style.opacity=0,LOCAL.blocks.LB.style.opacity=0,bookmarks.parent.style.top="",settings.btn.style.transform="rotate(0deg)",settings.menu.style.display="none",settings.status=0;LOCAL.blocks.CB.style.transform="",LOCAL.blocks.RB.style.transform="",LOCAL.blocks.LB.style.transform="",LOCAL.blocks.CB.style.opacity="",LOCAL.blocks.RB.style.opacity="",LOCAL.blocks.LB.style.opacity=""}function detectWeatherImg(t){var e={"clear sky":"bi-brightness-high","overcast clouds":"bi-clouds","broken clouds":"bi-cloud-sun","few clouds":"bi-cloud-sun","scattered clouds":"bi-cloud-sun","light rain":"bi-cloud-rain"}[t];return null==e&&(e="bi-exclamation-octagon",console.log(t)),e}function unixToDate(t,e){var t=(e=1==e?new Date(t):new Date(1e3*t)).getHours(),s=e.getMinutes(),e=(t<10&&(t="0"+t),s<10&&(s="0"+s),{year:e.getFullYear(),month:_date.months[e.getMonth()],date:e.getDate(),hour:t,min:s,day:"Today",dayName:""});return now=new Date,e.date==now.getDate()+1&&(e.day="Tomorrow"),e}function getCacheNews(){var e=LOCAL.blocks.LB.children.length-1,s=0,t=JSON.parse(localStorage.getItem("news-cache"))||[],o=document.querySelector(".news-topics:checked");for(let t=0;t<e;t++)s=s+LOCAL.blocks.LB.children[t].offsetHeight+20;if(s=LOCAL.blocks.LB.offsetHeight+20-s,o=null!=o?o.value:"world",$("#news-select-topics label").removeClass("news-topics-active"),document.querySelector(`label[for="news-select-topic-${o}"]`).classList.add("news-topics-active"),GetNews(o),null!=t[o])for(var n in news.block.innerText="",t[o]){var i=t[o][n];$(`<div class="small-blocks news-small-block" style="animation: fadeIn-bloks 0.3s forwards; animation-delay: ${.1*n}s"><div><h3>${i.title}</h3><span>${i.abstract}</span><a href="${i.url}"><span style="width: 100%;display: block;text-align: right;font-size: 10px;position: absolute; bottom: 10px; right: 10px;"><b>${i.time[0]}</b> at ${i.time[1]}:${i.time[2]}</span></a></div></div>`).appendTo(news.block)}}function GetNews(t){$topic=t,axios.get(`https://api.nytimes.com/svc/news/v3/content/section/${t}.json?api-key=vQkA7NOnKkdGxCaPkctYOfHAidP21Z3c`).then(function(t){var e=$topic,s=(news.newsId=0,JSON.parse(localStorage.getItem("news-cache"))),o=JSON.parse(localStorage.getItem("news-cache"))||{},n=t.data.results,t=t.data.results.slice(0,1)[0].title;if(o[e]||(o[e]=[]),null==s||null==s[e]||t!=s[e][0].title){for(var i in o[e]=[],n){var i=n[i],l=i.title,r=i.abstract,a=i.published_date,c=i.url;i.section.toLowerCase(),i.byline;function u(t){return t<10?"0"+t:t}var i=new Date,a=new Date(a),d=i.getDate()-1==a.getDate()?"Yesterday":u(a.getDate())+"."+u(a.getMonth());i.getDate()==a.getDate()&&(d="Today"),a={h:u(a.getHours()),m:u(a.getMinutes()),M:u(a.getMonth()),d:d},o[e].push({title:l,abstract:r,url:c,time:[a.d,a.h,a.m]})}localStorage.setItem("news-cache",JSON.stringify(o)),getCacheNews(0)}}).catch(function(t){console.log(t)})}function overlayStatus(t){return 1==t?(hideAll(1),overlay.body.style.display="flex",0):(hideAll(0),overlay.body.style.display="none",1)}function linkInputsClear(){inputs.title.value="",inputs.position.value="",inputs.url.value=""}function url_name(t){var e=t.split(".");if(3===e.length){switch(title=e[1]){case"twitch":title=22<t.length?e[2].slice(3):e[1];break;case"google":title=e[0].split("/")[2],console.log(title)}return title}if(2===e.length)return e=t.split("/"),title=(title=e[2]).split(".")[0]}function shortcuts_action(){$("#shortcut a").mousedown(function(t){for(var e=document.getElementById("shortcut");i<e.querySelectorAll("a").length;)e.querySelectorAll("a")[i].setAttribute("index",i),i++;var s=JSON.parse(localStorage.getItem("shortcuts"))||[],o=$(this).attr("index");3==t.which&&(console.log(o),console.log(s[o]),LOCAL.shortcuts.inputs.position.removeAttribute("readonly"),LOCAL.shortcuts.inputs,LOCAL.shortcuts.btn.save.setAttribute("index",o),LOCAL.shortcuts.btn.remove.setAttribute("index",o),LOCAL.shortcuts.btn.save.style.display="flex",LOCAL.shortcuts.btn.remove.style.display="flex",LOCAL.shortcuts.btn.add.style.display="none",overlayStatus(1),inputs.title.value=s[o].title,inputs.url.value=s[o].url,inputs.position.value=s[o].position)})}function getTopSites(){chrome.topSites.get(function(t){var s,o=[];let n='<span id="get-my-notes" class="history-request-btns">notes</span><span id="get-history" class="history-request-btns history-request-btns history-request-btn-active">History</span><span id="get-history-recently" class="history-request-btns">Recently</span>';for(e in t){var i=url_name(t[e].url);o[i]||(o[i]=[]),o[i].push(i)}for(s in o)n+=`<span id="get-history-${o[s]}" class="history-request-btns">${o[s]}</span>`;$(n).appendTo(".request-btn"),$(".history-request-btns").on("click",function(){this.id.split("-")[2];$(".history-request-btns").removeClass("history-request-btn-active"),getSiteHistory(this)}),getSiteHistory("","get-my-notes")})}function myNotes(){var t=JSON.parse(localStorage.getItem("notes"))||"That area is editable! Type something. :)";LOCAL.history.block.innerText="",LOCAL.history.block.innerHTML=`<div id="my-notes" contenteditable=true>${t}</div>`;let e=document.getElementById("my-notes");e.onpaste=function(t){t.preventDefault();t=t.clipboardData.getData("text/plain");document.execCommand("insertText",!1,t)},$("#my-notes").mousemove(function(){LOCAL.scroll=!0}),$("#my-notes").mouseleave(function(){LOCAL.scroll=!1}),document.addEventListener("visibilitychange",function(){"visible"===document.visibilityState&&(e.innerHTML=JSON.parse(localStorage.getItem("notes")))}),e.oninput=function(){var t=this.innerHTML;console.log(t),localStorage.setItem("notes",JSON.stringify(t))}}function getSiteHistory(t,e){$(".history-request-btns").removeClass("history-request-btn-active");let s;switch((null!=e?(s=e.split("-")[2],document.getElementById(e)):(s=t.id.split("-")[2],t)).classList.add("history-request-btn-active"),s){case"recently":GetRecentlyTabs();break;case"notes":myNotes();break;default:getHistory(s)}}function searchOnNewTab(i){LOCAL.search.ul.style.top=LOCAL.search.input.offsetTop+60+"px",LOCAL.search.ul.style.width=LOCAL.search.input.offsetWidth+"px",LOCAL.search.cleaner.style.top=LOCAL.search.input.offsetTop+13+"px",LOCAL.search.cleaner.style.left=LOCAL.search.input.offsetWidth-40+"px",LOCAL.search.cleaner.style.display="block",chrome.history.search({text:"",maxResults:5e3,startTime:0},function(t){t=t.filter(t=>t.title.toLowerCase().includes(i.toLowerCase())||t.url.toLowerCase().includes(i.toLowerCase()));let o=[];t.reduce((t,e)=>{var s;return t[e.title]||(s={title:e.title,url:e.url,img:__FaviconURL("",64,e.url),time:""},o.push(s),t[e.title]=[]),t},{});let e=[];for(var s in o=o.slice(0,18),""==i&&(o="",LOCAL.search.cleaner.style.display=""),console.log(o),o){var n=o[s].url.split("/")[2];e+=`<a href="${o[s].url}"><li style="opacity: 1"><img src="${o[s].img}"><span class="title">${o[s].title} <span class="domain">${n}</span></span><span>${o[s].time}</span></li></a>`}LOCAL.search.ul.innerHTML=e})}function getHistory(t){requestText=null==t?(t="",messageText.historyBlock.history):messageText.historyBlock.request+" "+t.split(".")[0];chrome.history.search({text:t,startTime:52596e5},function(t){for(var e in LOCAL.history.block.innerText="",t=t.slice(0,18)){var s=t[e].title.replace(/</g,"&lt;").replace(/>/g,"&gt;"),o=t[e].url,n=t[e].lastVisitTime,i=t[e].visitCount,n=unixToDate(n,1),l=(""==s&&(s=o),o.split("/")[2]),r=__FaviconURL("",64,o),n=n.hour+" : "+n.min;$(`<a href="${o}" title="Посещений: ${i}"><li style="animation: fadeIn-bloks 0.3s forwards; animation-delay: ${.01*e}s;"><img src="${r}"><span class="title">${s} <span class="domain">${l}</span></span><span class="date">${n}</span></li></a>`).appendTo(LOCAL.history.block)}})}function displayBokkmarks(){var p=JSON.parse(localStorage.getItem("settings")).view.bookmarks;chrome.bookmarks.getTree(function(t){var e=t[0].children[0].children,s=$(".folders"),o=[];if(1==p){for(var n in view.bookmarks.status.innerText="A-Z",e)if(null!=(y=e[n].children))for(var i in y){var l={title:(i=y[i]).title,url:i.url};o.push(l)}else{l={title:(i=e[n]).title,url:i.url};o.push(l)}o.sort(function(t,e){return t.title.localeCompare(e.title)});var r,a={};for(i of o){var c=i.title.charAt(0).toUpperCase();a[c]||(a[c]=[]),a[c].push(i)}for(r in a){var u="";for(i of a[r]){var d=[i.title,""],m=i.url;10<d[0].length?d[1]=d[0].slice(0,10)+"...":d[1]=d[0],u+=`<a title="${d[0]}" href="${m}"><img src="chrome-extension://${GLOBAL.id}/_favicon/?size=24&showFallbackMonogram=&pageUrl=${m}"><span>${d[1]}</span></a>`}$(`<div class="folder"><div class="folder-title">${r}</div><div class="folder-links">${u}</div></div>`).appendTo(".folders")}}if(0==p){view.bookmarks.status.innerText="Folders";var y,g="";for(n in e)if(null!=(y=e[n].children)){var o="",h=e[n].title;for(i in y)m=(i=y[i]).url,o=(10<(d=[i.title,""])[0].length?d[1]=d[0].slice(0,10)+"...":d[1]=d[0],o+`<a title="${d[0]}" href="${m}"><img src=chrome-extension://${GLOBAL.id}/_favicon/?size=24&showFallbackMonogram=&pageUrl=${m}><span>${d[1]}</span></a>`);$(`<div class="folder"><div class="folder-title">${h}</div><div class="folder-links">${o}</div></div>`).appendTo(s)}else m=(i=e[n]).url,g=(10<(d=[i.title,""])[0].length?d[1]=d[0].slice(0,10)+"...":d[1]=d[0],g+`<a title="${d[0]}" href="${m}"><img src=chrome-extension://${GLOBAL.id}/_favicon/?size=24&showFallbackMonogram=&pageUrl=${m}><span>${d[1]}</span></a>`);$(`<div class="folder"><div class="folder-title">All</div><div class="folder-links">${g}</div></div>`).prependTo(".folders")}})}function restore(){var t,e=JSON.parse(localStorage.getItem("shortcuts")),s=[];for(t in e){var o={id:parseInt(t),title:e[t].title,url:e[t].url,position:parseInt(t)};s.push(o)}localStorage.setItem("shortcuts",JSON.stringify(s))}function shortcuts(t){var s=JSON.parse(localStorage.getItem("shortcuts"))||[],o=document.getElementById("shortcut");switch(t){case"display":let e="";var n,i=s.sort((t,e)=>t.position-e.position);for(n in switchDisplayFun(),i){var l=i[n].url;let t=i[n].title;var r=i[n].id;""==t&&(t=url_name(l)),e+=`<a index=${r} position=${n} href=${l}><img src=${__FaviconURL("",256,l)}><span>${t}</span></a>`}e+='<div id="shortcut-link-create">+</div>',$(e).prependTo(o),shortcut_new_action(),shortcuts_action();break;case"create":var a=inputs.title.value;null!=(y=inputs.url.value.trim())&&""!=y&&(-1==y.indexOf("http")&&-1==y.indexOf("https")&&(y="http://"+y),h={id:parseInt(s.length),title:a,url:y,position:parseInt(s.length)},""==a&&(a=url_name(y)),s.push(h),localStorage.setItem("shortcuts",JSON.stringify(s)),o.innerText="",shortcuts("display"));break;case"remove":var c,u=LOCAL.shortcuts.btn.save.attributes.index.value;document.querySelector(`#shortcut [index="${u}"]`);for(c in 0<=u&&u<s.length&&(s.splice(u,1),localStorage.setItem("shortcuts",JSON.stringify(s))),i=s.sort((t,e)=>t.position-e.position))console.log(i[c]),i[c].id=parseInt(c);localStorage.setItem("shortcuts",JSON.stringify(i)),o.innerText="",shortcuts("display"),shortcuts_action();break;case"edit":var d,m,y,g,u=LOCAL.shortcuts.btn.save.attributes.index.value,h={now:inputs.position.value,last:s[u].position},a=(h.last!=h.now&&(d=document.querySelectorAll("#shortcut a"),console.log(d[h.now]),0<=h.now&&h.now<=s.length&&null!=d[h.now]&&(m=d[h.now].getAttribute("index"),s[u].position=h.now,s[m].position=h.last),h.now>s.length||null==d[h.now])&&(s[u].position=h.now),inputs.title.value);for(g in null!=(y=inputs.url.value.trim())&&""!=y&&(s[u].title=a,s[u].url=y),localStorage.setItem("shortcuts",JSON.stringify(s)),i=s.sort((t,e)=>t.position-e.position))console.log(i[g]),i[g].id=parseInt(g);o.innerText="",shortcuts("display"),shortcuts_action();break;default:alert("shortcut(): Error!")}overlayStatus(0),linkInputsClear()}function switchDisplayFun(t){var e=document.getElementById("shortcut"),s=JSON.parse(localStorage.getItem("settings")).view.shortcuts;null!=t&&(lStorage.settings.view.shortcuts=0==s?1:0),localStorage.setItem("settings",JSON.stringify(lStorage.settings)),0==lStorage.settings.view.shortcuts?(view.shortcuts.status.innerText="Grid",e.classList.remove("short-cut-flex"),e.classList.add("short-cut-grid")):(view.shortcuts.status.innerText="Flex",e.classList.remove("short-cut-grid"),e.classList.add("short-cut-flex"))}function firstRun(){return localStorage.setItem("settings",JSON.stringify(settingsCookie)),localStorage.setItem("news-cache",JSON.stringify("")),lStorage.settings=settingsCookie}function switchHistory(t){var e=JSON.parse(localStorage.getItem("settings")).view.history;view.history.status;switch(e){case 0:lStorage.settings.view.history=1;break;case 1:lStorage.settings.view.history=0}console.log(lStorage.settings.view.history),localStorage.setItem("settings",JSON.stringify(lStorage.settings))}LOCAL.shortcuts.btn.add.onclick=function(){shortcuts("create")},$(".news-topics").click(function(){document.querySelector(".news-topics:checked").value;getCacheNews()}),news.main.addEventListener("wheel",function(t){var e=document.querySelectorAll(".news-small-block"),t=(0<t.deltaY?news.newsId!=e.length-1&&news.newsId++:0<news.newsId&&news.newsId--,document.querySelectorAll(".news-small-block")[news.newsId].offsetTop);news.block.style.top=60-t+"px"}),$(".request-btn").mousemove(function(){LOCAL.scroll=!0}),$(".request-btn").mouseleave(function(){LOCAL.scroll=!1}),LOCAL.history.btn.list.forEach(t=>{t.onclick=function(){getSiteHistory(t)}}),LOCAL.search.input.oninput=function(){searchOnNewTab(LOCAL.search.input.value)},LOCAL.search.cleaner.onclick=function(){LOCAL.search.ul.innerText="",LOCAL.search.input.value="",LOCAL.search.cleaner.style.display=""},addEventListener("resize",t=>{var e=document.body.clientWidth;document.documentElement.style.setProperty("--width",e)}),$("#news").mousemove(function(){LOCAL.scroll=!0}),$("#news").mouseleave(function(){LOCAL.scroll=!1}),$(".request-btn")[0].addEventListener("wheel",function(t){t.deltaY<0?$(".request-btn")[0].scrollLeft-=50:0<t.deltaY&&($(".request-btn")[0].scrollLeft+=50)}),window.addEventListener("wheel",function(t){var e=document.getElementsByClassName("folders")[0].scrollTop;if(0==LOCAL.scroll)if(t.deltaY<0){if(0==e&&(setTimeout(function(){if(0==e)return scrollStatus=1},300),1==scrollStatus))return hideAll(0),bookmarks.parent.style.top="",scrollStatus=0}else 0<t.deltaY&&(scrollStatus=0,hideAll(1),bookmarks.parent.style.top="0%")}),$(document).keyup(function(t){if("Escape"===t.key)return hideAll(1),overlayStatus(0),scrollStatus=0,settings.status=0}),window.oncontextmenu=function(){return!1};
const GLOBAL={id:chrome.runtime.id,version:chrome.runtime.getManifest().version,date:{months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],time:["today","tomorrow","yesterday"]}},settingsCookie={view:{shortcuts:0,bookmarks:0,theme:0,history:1},audio:{radio:{}}};function __SVG(a,e){let o;return(o="mainMonkey"===a?`<svg fill="${e}" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<path d="M21.5,7.5c0-5.5-4.5-7-9.5-7S2.5,2,2.5,7.5a2.906,2.906,0,0,0-2,3,3.972,3.972,0,0,0,2,3.5c0,5.5,2,9.5,9.5,9.5s9.5-4,9.5-9.5a3.972,3.972,0,0,0,2-3.5A2.906,2.906,0,0,0,21.5,7.5ZM12.005,21h-.012c-1.781,0-3.836-.481-4.662-2.2a.25.25,0,0,1,.291-.349A16.745,16.745,0,0,0,12,19a16.757,16.757,0,0,0,4.378-.55.25.25,0,0,1,.291.349C15.842,20.52,13.786,21,12.005,21Zm4.743-8.843a1,1,0,0,0-.606,1.3,11.293,11.293,0,0,1,.822,2.484.251.251,0,0,1-.156.271A13.485,13.485,0,0,1,12,17a13.5,13.5,0,0,1-4.808-.791.249.249,0,0,1-.156-.271,11.189,11.189,0,0,1,.822-2.484,1,1,0,0,0-.606-1.3,3.484,3.484,0,0,1-2.127-3.49A3.667,3.667,0,0,1,8.792,5h6.416a3.667,3.667,0,0,1,3.667,3.667A3.484,3.484,0,0,1,16.748,12.157Z"/><circle cx="9" cy="9" r="1.25"/><circle cx="15" cy="9" r="1.25"/><path d="M11.073,12.93a1,1,0,1,0-1.9.633l.25.75a1,1,0,1,0,1.9-.633Z"/><path d="M14.191,12.3a1,1,0,0,0-1.264.632l-.25.75a1,1,0,1,0,1.9.633l.25-.75A1,1,0,0,0,14.191,12.3Z"/>
</svg>
`:o).trim()}function __FaviconURL(a,e,o){return 1===a?`https://www.google.com/s2/favicons?sz=${e}&domain=`+o:`chrome-extension://${GLOBAL.id}/_favicon/?size=${e}&showFallbackMonogram=&pageUrl=`+o}
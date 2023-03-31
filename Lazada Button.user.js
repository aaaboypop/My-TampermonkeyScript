// ==UserScript==
// @name         Lazada Button
// @version      0.1
// @author       pond_pop
// @description  lazada script
// @updateURL    https://raw.githubusercontent.com/aaaboypop/My-TampermonkeyScript/main/Lazada%20Button.user.js
// @downloadURL  https://raw.githubusercontent.com/aaaboypop/My-TampermonkeyScript/main/Lazada%20Button.user.js
// @match        https://www.lazada.co.th/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lazada.co.th
// @grant        GM_addStyle
// ==/UserScript==

// ----- ----- Init ----- -----

var wloc = window.location
   ,d = document;
const $q = d.querySelector.bind(document),
      $qa = d.querySelectorAll.bind(document);

// ----- ----- Run ----- -----

GM_addStyle('.cpb{background-color: black; color: white; font-size: 36px; width: 240px; z-index:2;}');

let a = NewButton("body", "CopyLink", "Copy Link", "position: fixed; bottom : 22px; left: 0px;", getURL,[], "Copied !")
let a1 = NewButton("body", "ShortURL", "↗️", "position: fixed; bottom : 22px; left: 241px; width: 50px", getURL,[true])
let b = NewButton("body", "OpenImage", "Open Image", "position: fixed; bottom : 72px; left: 0px;",OpenImageNewTab)

// ----- ----- Function ----- -----

function NewButton(selector, name, text, style, fnCall, args=[], textOK="OK", textErr="Error !"){
    let el = $q(selector);
    let a = d.createElement('button');
    a.innerHTML = text;
    a.id = name;
    a.style = style;
    a.classList = 'cpb';
    el.prepend(a);
    a.addEventListener('click', function(){ buttonEvents(a, fnCall, args, text, textOK, textErr)})
    return a
}

function changeText(el, text, color){
    el.innerHTML = text;
    el.style.backgroundColor = color;
}

function buttonEvents(el, fnCall, args, textNormal, textOK, textErr="Error !"){
    try {fnCall.apply(this, args); changeText(el, textOK, "#85B600")}
    catch {changeText(el, textErr, "#85B600")}
    setTimeout(changeText, 1200, el, textNormal, "black")
}

function getURL(thisTab=false){
    let found = "https://www.lazada.co.th/" + wloc.href.toString().match(/(-i\d+)/)[1].replace('-','') + '.html';
    let output = found;
    if (thisTab){
        window.open(output, "_self")
        return
    }
    navigator.clipboard.writeText(output)
}

function OpenImageNewTab(){
    let url
    url = $q("div.gallery-preview-panel > div > img") ;
        window.open(url.src);
}

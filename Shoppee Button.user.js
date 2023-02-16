// ==UserScript==
// @name         Shoppee Button
// @version      0.5.2
// @author       pond_pop
// @description  Shoppee script
// @updateURL    https://raw.githubusercontent.com/aaaboypop/My-TampermonkeyScript/main/Shoppee%20Button.js
// @match        https://shopee.co.th/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shopee.co.th
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

setInterval(function(){
    try {
        let hook = "#modal > div > div > div > div:nth-child(2)"
        if ($q(hook)) {
            if ($q("#openImageButton")) {return}
            let c = NewButton(hook, "openImageButton", "Open Image", "width: 282px; margin-bottom: 24px;", OpenImageNewTab, [true])
        }}
    catch {return}
} , 1000);

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
    let found = wloc.href.toString().match(/\-i\.\d+\.\d+/g);
    let output = 'https://shopee.co.th/1' + found[0]
    if (thisTab){
        window.open(output, "_self")
        return
    }
    navigator.clipboard.writeText(output)
}

function OpenImageNewTab(fw=false){
    try {
        let url
        if (fw===true) { url = $q("#modal > div > div > div > div > div > div") ;}
        else { url = $q("div.flex.flex-column > div > div > div:nth-child(2) > div") ;}

        if (url){
            const found = url.style.backgroundImage.match(/"(.*)"/);
            window.open(found[1]);
        } else { throw 'video' }
    } catch {
        let url = $q("div.flex.flex-column > div > div > div > div > video").src ;
        window.open(url);
    }
}

// ==UserScript==
// @name         Shoppee Button
// @version      0.5.1
// @author       pond_pop
// @description  Shoppee script
// @updateURL    https://raw.githubusercontent.com/aaaboypop/My-TampermonkeyScript/main/Shoppee%20Button.js
// @downloadURL  https://raw.githubusercontent.com/aaaboypop/My-TampermonkeyScript/main/Shoppee%20Button.js
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

let a = NewButton("body", "CopyLink", "Copy Link", "position: fixed; bottom : 22px; left: 0px;")
a.addEventListener('click', function(){getURL(a)})

let a1 = NewButton("body", "ShortURL", "↗️", "position: fixed; bottom : 22px; left: 241px; width: 50px")
a1.addEventListener('click', function(){getURL(a1, true)})

let b = NewButton("body", "OpenImage", "Open Image", "position: fixed; bottom : 72px; left: 0px;")
b.addEventListener('click', function(){OpenImageNewTab(b)})

setInterval(function(){
    try {
        if (wloc.href.toString().match(/shopee.co.th\/user\//g)){ return }
        let hook = "#modal > div > div > div > div:nth-child(2)"
        if ($q(hook)) {
            if ($q("#openImageButton")) {return}
            let c = NewButton(hook, "openImageButton", "Open Image", "width: 282px; margin-bottom: 24px;")
            c.addEventListener('click', function(){OpenImageNewTab(c, true)})
        }}
    catch {return}
} , 1000);

// ----- ----- Function ----- -----

function NewButton(selector, name, text, style){
    let el = $q(selector);
    let a = d.createElement('button');
    a.innerHTML = text;
    a.id = name;
    a.style = style;
    a.classList = 'cpb';
    el.prepend(a);
    return a
}

function changeText(el, text, color){
    el.innerHTML = text;
    el.style.backgroundColor = color;
}

function OpenImageNewTab(el, fw=false){
    try {
        let url
        if (fw===true) { url = $q("#modal > div > div > div > div > div > div") ;}
        else { url = $q("div.flex.flex-column > div > div > div:nth-child(2) > div") ;}

        if (url){
            const found = url.style.backgroundImage.match(/"(.*)"/);
            window.open(found[1]);
        } else { throw 'video' }
    } catch {
        try {
            let url = $q("div.flex.flex-column > div > div > div > div > video").src ;
            window.open(url);
        } catch { changeText(el, "Error !", "#B6001E"); }
    }
    setTimeout(changeText, 1200, el, "Open Image", "black");
}

function getURL(el, open=false){
    try {
        let found = wloc.href.toString().match(/\-i\.\d+\.\d+/g);
        let output = 'https://shopee.co.th/1' + found[0]
        if (open){
            window.open(output, "_self")
            return
        }
        navigator.clipboard.writeText(output)
        changeText(el, "Copied !", "#85B600");
    } catch {
        if (open){ return }
        changeText(el, "Error !", "#B6001E"); }
    setTimeout(changeText, 1200, el, "Copy Link", "black");
}

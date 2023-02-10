// ==UserScript==
// @name         Aliexpress Button
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  aliexpress script
// @author       You
// @match        https://*.aliexpress.com/item/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aliexpress.com
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

function OpenImageNewTab(el){
    try {
        let url
        url = $q("#pdp-main-image > div > div > div.image-view-magnifier-wrap > img") ;
            window.open(url.src);
    } catch {
        changeText(el, "Error !", "#B6001E");
    }
    setTimeout(changeText, 1200, el, "Open Image", "black");
}

function getURL(el, open=false){
    try {
        let found = wloc.href.toString().match(/(http.*)\?/);
        let output = found[1]
        if (open){
            window.open(output, "_self")
            return
        }
        navigator.clipboard.writeText(output)
        changeText(el, "Copied !", "#85B600");
    } catch { changeText(el, "Error !", "#B6001E"); }
    setTimeout(changeText, 1200, el, "Copy Link", "black");
}
// ==UserScript==
// @name         Shoppee Button
// @version      0.6.1
// @author       pond_pop
// @description  Shoppee script
// @updateURL    https://raw.githubusercontent.com/aaaboypop/My-TampermonkeyScript/main/Shoppee%20Button.user.js
// @downloadURL  https://raw.githubusercontent.com/aaaboypop/My-TampermonkeyScript/main/Shoppee%20Button.user.js
// @match        https://shopee.co.th/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shopee.co.th
// @grant        GM_addStyle
// ==/UserScript==

// ----- ----- Init ----- -----

var wloc = window.location
   ,d = document;
const $q = d.querySelector.bind(document),
      $qa = d.querySelectorAll.bind(document);

var filter1Id = false;
var filter2Id = false;

// ----- ----- Run ----- -----

GM_addStyle('.cpb{background-color: black; color: white; font-size: 36px; width: 240px; z-index:2;}');
GM_addStyle('.cpt{background-color: black; color: white; font-size: 36px; width: 240px; z-index:2;}');
GM_addStyle('.divb{filter: blur(5px);}');
GM_addStyle('.divh{display: none;}');


let a = NewButton("body", "CopyLink", "Copy Link", "position: fixed; bottom : 22px; left: 0px;", getURL,[], "Copied !")
let a1 = NewButton("body", "ShortURL", "↗️", "position: fixed; bottom : 22px; left: 241px; width: 50px", getURL,[true])
let b = NewButton("body", "OpenImage", "Open Image", "position: fixed; bottom : 72px; left: 0px;",OpenImageNewTab)

let re = NewButton("body", "Reset", "Reset", "position: fixed; bottom : 132px; left: 0px;", resetFilter)

let nf1 = NewEdit("body", "name_match", "Name Match", "position: fixed; bottom : 232px; left: 0px;")
let nf2 = NewButton("body", "name_filter1", "match", "position: fixed; bottom : 232px; left: 251px; width:110px;", setEvent, [filter1,[true]])
let nf3 = NewButton("body", "name_filter2", "not", "position: fixed; bottom : 232px; left: 361px; width:110px;", setEvent, [filter1,[false]])

let pf1 = NewEdit("body", "price_match", "Price Filter", "position: fixed; bottom : 182px; left: 0px;")
let pf2 = NewButton("body", "price_filter1", "<", "position: fixed; bottom : 182px; left: 251px; width:110px;", setEvent, [filter2,[false]])
let pf3 = NewButton("body", "price_filter2", ">", "position: fixed; bottom : 182px; left: 361px; width:110px;", setEvent, [filter2,[true]])

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


function NewEdit(selector, name, text, style){
    let el = $q(selector);
    let a = d.createElement('input');
    a.type = 'text'
    a.placeholder = text;
    a.id = name;
    a.style = style;
    a.classList = 'cpt';
    el.prepend(a);
    return a
}

function changeText(el, text, color){
    el.innerHTML = text;
    el.style.backgroundColor = color;
}

function buttonEvents(el, fnCall, args, textNormal, textOK, textErr="Error !"){
    try {fnCall.apply(null, args); changeText(el, textOK, "#85B600")}
    catch {changeText(el, textErr, "#E62040")}
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

function setEvent(fnCall, args=[]){
    console.log(fnCall.name)
    if (fnCall.name == "filter1"){
        clearInterval(filter1Id)
        filter1Id = setInterval( ()=>{ fnCall.apply(null, args) } , 1000)
    }

    if (fnCall.name == "filter2"){
        clearInterval(filter2Id)
        filter2Id = setInterval( ()=>{ fnCall.apply(null, args) } , 1000)
    }
}

function filterOut_aciton(div, remove=false){
    if (remove){
        div.classList.remove("divh");
    }else{
        div.classList.add("divh");
    }
}

function resetFilter(){
    clearInterval(filter1Id)
    clearInterval(filter2Id)

    let all_item = document.querySelectorAll('div.col-xs-2-4.shopee-search-item-result__item');
    [].forEach.call(all_item, function(div) {
        filterOut_aciton(div, true);
    });
}

function filter1(match=true){
    //console.log("filter1")
    let text = document.querySelector('input#name_match').value
    let all_item = document.querySelectorAll('div.col-xs-2-4.shopee-search-item-result__item');

    [].forEach.call(all_item, function(div) {
        let p_name = div.querySelector('img').alt ;
        let regex = new RegExp( text, 'i' );
        if (match==true){
            if(!(p_name.match(regex))) { filterOut_aciton(div); }
        }else{
            if(p_name.match(regex)) { filterOut_aciton(div); }
        }
    });
}

function filter2(moreThan){
    //console.log("filter2")
    let price = document.querySelector('input#price_match').value
    let all_item = document.querySelectorAll('div.col-xs-2-4.shopee-search-item-result__item');

    [].forEach.call(all_item, function(div) {
        let p1 = parseInt(div.querySelector("div > span:nth-child(2)").innerText.replace(',',''));

        try {
            let discount = div.querySelector("div.vioxXd.ZZuLsr.d5DWld")
            p1 = parseInt(div.querySelector("span.ZEgDH9").innerText.replace(',',''));
        }catch{
        }

        try {
            let p2 = parseInt(div.querySelector("div > span:nth-child(4)").innerText.replace(',',''));
            filterOut_aciton(div);
        }catch{
            if (moreThan==true){
                if(p1<price) { filterOut_aciton(div); }
            }else{
                if(p1>price) { filterOut_aciton(div); }
            }
        }
    });
}

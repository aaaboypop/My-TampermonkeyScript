// ==UserScript==
// @name         bluearchive.wiki Item Percent sort
// @namespace    http://tampermonkey.net/
// @version      2024-07-20
// @description  try to take over the world!
// @author       You
// @match        https://bluearchive.wiki/wiki/Items/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bluearchive.wiki
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

// ค้นหา elements ที่ต้องการและเพิ่ม class
var qall = document.querySelectorAll("#mw-content-text > div.mw-content-ltr.mw-parser-output > table > tbody > tr:nth-child(5) > td > div");
qall.forEach((v, i) => {
    v.classList.add('vforsort');
});

// ใช้ querySelectorAll เพื่อเลือกทุก element ที่มีคลาส vforsort
const boxes = document.querySelectorAll('.vforsort');

// ระบุ parent element ที่จะบรรจุ elements ที่จะจัดเรียง
const parent = document.querySelector("#mw-content-text > div.mw-content-ltr.mw-parser-output > table > tbody > tr:nth-child(5) > td");

// แปลง NodeList เป็น array เพื่อที่จะใช้ sort ได้
const boxesArray = Array.from(boxes);

// จัดเรียง elements ตามค่าเปอร์เซ็นต์ใน span.prob จากมากไปน้อย
boxesArray.sort((a, b) => {
    const aValue = parseFloat(a.querySelector('.prob').innerText.replace('%', ''));
    const bValue = parseFloat(b.querySelector('.prob').innerText.replace('%', ''));
    return bValue - aValue;
});

// นำ elements ที่จัดเรียงแล้วกลับไปใส่ใน parent
boxesArray.forEach(box => {
    parent.appendChild(box);
});
})();

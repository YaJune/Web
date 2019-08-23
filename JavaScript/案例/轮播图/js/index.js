// 1. 获取元素
var swiper = document.getElementById("swiper");
var  focus = document.getElementById("focus");
var divs = swiper.getElementsByTagName("div");
var oLis = focus.getElementsByTagName("li");
var outer = document.getElementById("outer");
var left = document.getElementById("left");
var right = document.getElementById("right");

// 2. 通过ajax获取数据
function bindHtml() {
    var data;
    var  xhr = new XMLHttpRequest();
    xhr.open("get","banner.json",false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
            data=JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
    var str=``;
    for(var i=0;i<data.length;i++){
        str+=`<div><img src="${data[i].img}" alt=""></div>`
    }
    swiper.innerHTML = str;
    swiper.appendChild(divs[0].cloneNode(true));
    oLis[0].classList.add("select");
}
bindHtml();
let step =0;
let timer = setInterval(animateAuto,1500);
function animateAuto() {
    step++;
        if(step === divs.length){
            //oLisSelect(0);
            utils.css(swiper,"left",0);
            step = 1;
        }
        oLisSelect(step);
        zfAnimate(swiper,{left:-800*step},800,0);
}
function oLisSelect(index) {
    for(var i=0;i<oLis.length;i++){
        oLis[i].classList.remove("select");
    }
    index == oLis.length ? index=0 : index;
    oLis[index].classList.add("select");
}
outer.onmouseover =()=>{
    clearInterval(timer);
};
outer.onmouseout =()=>{
    timer = setInterval(animateAuto,1500);
};
left.onclick =()=>{
   /* if(step === 0){
        step = 4;
        utils.css(swiper,"left",-800*step);
    }
    step -= 2;
    animateAuto();*/

    if(step === 0){
        step = 4;
        utils.css(swiper,"left",-800*step);
    }
    step--;
    zfAnimate(swiper,{left:-800*step},800,0);
    oLisSelect(step);
};
right.onclick =()=>{
    animateAuto();
};
for(let i=0;i<oLis.length;i++){
    oLis[i].onclick = function () {
        zfAnimate(swiper,{left:-800*i},800,0);
        oLisSelect(i);
        step = i;
    }
}
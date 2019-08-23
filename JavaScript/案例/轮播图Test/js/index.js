let $swiper = $("#swiper");
let step = 0;
let $li = $("li");
let $left = $("#left");
let $right = $("#right");
let timer;
let li = document.getElementsByTagName("li");
$.ajax({
    type: "get",
    url : "banner.json",
    async : false,
    success : function (data) {
        bindHTML(data)
    }
});

function bindHTML(data) {
    let str = ``;
    for(let key in data){
        str += ` <div><img src="${data[key].img}" alt=""></div>`
    }
    $swiper.html(str);
    let newDiv  = $swiper.children().eq(0).clone(true)[0];
    $swiper[0].appendChild(newDiv);
    autoMove();
}
timer = setInterval(autoMove,1000);
function autoMove() {
    step++;
    if(step === 5){
        $swiper.css("left",0);
        step = 1;
    }
    $swiper.animate({left:-800*step},800,0);
    focusChange(step);
}
function focusChange(index) {
    $li.removeClass("select");
    if(index === $li.length){
        index =0;
    }
    $li.eq(index).addClass("select");
}
outer.onmouseover = function(){
    clearInterval(timer);
};
outer.onmouseout = function(){
    timer = setInterval(autoMove,1000);
};
right.onclick = autoMove;
left.onclick = function () {
    if(step===0){
        step = 4;
        $swiper.css("left",-800*step);
    }
    step-=2;
    autoMove();
};
for(let i=0;i<li.length;i++){
    li[i].onclick = function () {
        step = i;
        $swiper.animate({left:-800*step},800,0);
        focusChange(step);
    };
}
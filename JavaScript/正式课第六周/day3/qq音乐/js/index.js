let $main = $(".main"),
    $header = $(".header"),
    $footer = $(".footer"),
    $wrap = $(".wrap"),
    $musicBtn = $("#musicBtn"),
    $music = $("#music");
let curT = 0;
let flag = 0;
let timer;
function computedMain() {
    let winH = document.documentElement.clientHeight,
        headerH = $header.height(),
        footerH = $footer.height();
    let val  = parseFloat(document.documentElement.style.fontSize);
    let mainH= (winH-headerH-footerH)/val-0.5+"rem";
    $main.css("height",mainH);
}
computedMain();
window.addEventListener("resize",computedMain);

$.ajax({
    url:"json/lyric.json",
    type:"get",
    async:false,
    success:function (data) {
        bindHtml(data.lyric);
    }
});

function bindHtml(data) {
    data = data.replace(/&#(\d+);/g,function (res,a) {
        switch (parseFloat(a)) {
            case 32: return " ";
            case 40: return "(";
            case 41: return ")";
            case 45: return "-";
        }
        return res;
    });
    let ary = [];
    data.replace(/\[(\d+)&#58;(\d+)&#46;(\d+)\]([^&#]+)(?:(&#10;))?/g,
        function (res,min,sec,millsec,val) {
        ary.push({
            min:min,
            sec:sec,
            millsec:millsec,
            val:val
        })
            //console.log(min, sec, millsec, val);
        });
    let str = ``;
    for(let i=0;i<ary.length;i++){
        str += `<p data-min = "${ary[i].min}" data-sec = "${ary[i].sec}">${ary[i].val}</p>`
    }
    $wrap.html(str);
    /*$music[0].addEventListener("canplay",function () {
        console.log(1);
        $musicBtn.addClass("select");
        $music[0].play();
        $("#right").html(formate($music[0].duration));
        timer = setInterval(computedTime,1000);
    })*/

}
$musicBtn.tap(function () {
    if($music[0].paused){
        $musicBtn.addClass("select");
        $music[0].play();
        timer = setInterval(computedTime,1000);
    }else{
        $musicBtn.removeClass("select");
        $music[0].pause();
        clearInterval(timer);
    }

});
function formate(time) {
    let min = Math.floor(time/60);
    let sec = Math.floor(time-min*60);
    min = min<10?"0"+min:min;
    sec = sec<10?"0"+sec:sec;
    return min+":"+sec;
}
function computedTime() {
    let current = $music[0].currentTime;
    let duration = $music[0].duration;

    if(current>=duration){
        clearInterval(timer);
        $musicBtn.removeClass("select");
        return ;
    }

    $("#left").html(formate(current));
    $(".lineBg").css("width",current/duration*100+"%");

    let str = formate(current);
    let ary = str.split(":");
    let min = ary[0];
    let sec = ary[1];
    let allP = document.getElementsByTagName("p");
    for(let i=0;i<allP.length;i++){
        let curP = allP[i];
        let dataMin = curP.getAttribute("data-min");
        let dataSec = curP.getAttribute("data-sec");

        if(min === dataMin&&sec === dataSec){
            flag++;
            $(curP).addClass("select").siblings().removeClass("select");
            if(flag>=6){
                curT-=0.84;
                $wrap.css("top",curT+"rem");
            }
        }
    }

}
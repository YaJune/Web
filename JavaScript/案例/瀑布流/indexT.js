    var imgs = document.getElementsByTagName("img");
    var uls = document.getElementsByTagName("ul");
    var aryUl = utils.toArray(uls);
    var winH = document.documentElement.clientHeight||document.body.clientHeight;

    var data;
    var xhr = new XMLHttpRequest();
    xhr.open("get","data.txt",false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState ===4&&/^2\d{2}/.test(xhr.status)){
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();

    function bindHTML() {
        for(var i=0;i<50;i++){
            var index = Math.round(Math.random()*26);
            var curObj = data[index];
            var curLi = document.createElement("li");
            var a = document.createElement("a");
            var img = document.createElement("img");
            var p = document.createElement("p");

            a.innerHTML = "采集";
            a.src = "javascript:;";

            img.setAttribute("trueImg",curObj.src);
            img.setAttribute("flag",false);
            img.style.height = curObj.height;

            p.innerHTML = curObj.title;

            curLi.appendChild(a);
            curLi.appendChild(img);
            curLi.appendChild(p);

            aryUl.sort(function (a,b) {
                return a.scrollHeight-b.scrollHeight;
            });
            aryUl[0].appendChild(curLi);
        }
    }
    bindHTML();
    delay();
    window.onscroll = delay;
    function delay() {
        for(var i=0;i<imgs.length;i++){
            delayImg(imgs[i]);
        }
        var winScrollH = utils.win("scrollHeight");
        var scrollTop = utils.win("scrollTop");
        if(winScrollH-scrollTop-winH <= 500){
            bindHTML();
        }
    }
    function delayImg(img) {
        if(img.flag){
            return;
        }
        var scrollTop = utils.win("scrollTop");
        var imgTop = utils.offset(img).top + img.offsetHeight;
        var address = img.getAttribute("trueImg");
        var newImg = document.createElement("img");
        newImg.src = address;
        newImg.onload = function () {
            if(winH + scrollTop >= imgTop){
                img.src = address;
                fadeIn(img);
                img.flag = true;
            }
        }
    }
    function fadeIn(img) {
        var opty = 0.1;
        utils.css(img,"opacity",opty);
        var timer = setInterval(function () {
            opty += 0.1;
            if(opty >= 1){
                clearInterval(timer);
            }
            utils.css(img,"opacity",opty);
        },100)
    }
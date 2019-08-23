    var uls = document.getElementsByTagName("ul");
    var aryUl = utils.toArray(uls);
    var imgs = document.getElementsByClassName("flag");
    var screenHeight = document.documentElement.clientHeight||document.body.clientHeight;
    var attr = "scrollTop";
    var tBack = document.getElementById("topBack");

    var data;
    var xhr = new XMLHttpRequest();
    xhr.open("get","data.txt",false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState===4&&/^2\d{2}/.test(xhr.status)){
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();

    function bindHTML() {
        for(var i=0;i<50;i++){
            var num = Math.round(Math.random()*26);
            var curObj = data[num];
            var curLi = document.createElement("li");
            var a = document.createElement("a");
            a.innerHTML = "采集";
            a.href = "javascript:;";
            curLi.appendChild(a);
            var img = document.createElement("img");
            img.setAttribute("trueImg",curObj.src);
            img.style.height = curObj.height;
            img.className = "flag";

            curLi.appendChild(img);

            var p = document.createElement("p");
            p.innerHTML = curObj.title;
            curLi.appendChild(p);

            aryUl.sort(function (a,b) {
                return a.scrollHeight-b.scrollHeight;
            });
            aryUl[0].appendChild(curLi);
        }

    }
    bindHTML();
    window.onscroll =function () {
        delay();
        if(utils.win(attr) > screenHeight){
            tBack.style.display = "block";
        }else {
            tBack.style.display = "none";
        }
    };
    delay();

    function  delay(){
        var scrollTop = utils.win("scrollTop");
        for(var i=0;i<imgs.length;i++){
            delayImg(imgs[i]);
        }
        if( document.body.offsetHeight-scrollTop-screenHeight <= 1000){
            bindHTML();
        }
    }
    function delayImg(img) {
        if(img.flag){
            return;
        }
        var scrollTop = utils.win("scrollTop");
        var imgTop = utils.offset(img).top + img.clientHeight;
        if(scrollTop+screenHeight > imgTop){
            var address = img.getAttribute("trueImg");
            var newImg = document.createElement("img");
            newImg.src = address;
            newImg.onload = function () {
                img.src = address;
                fadeIn(img);
                img.flag = true;
                img.className = "";
            }
        }
    }
    function fadeIn(img) {
        var cur = 0.2;
        utils.css(img,"opacity",cur);
        var timer = setInterval(function () {
            cur += 0.1;
            if(cur >= 1){
                clearInterval(timer);
            }
            utils.css(img,"opacity",cur)
        },100)
    }

    tBack.onclick = function () {
        var num = 3000/utils.win(attr)*10;
        var v;
        console.log(num);
        num > 4?v = 10:v = 20;
        var inval = setInterval(function () {
            if(utils.win(attr) < 10){
                clearInterval(inval);
            }
            utils.win(attr,utils.win(attr)-v);
        },num);
    };
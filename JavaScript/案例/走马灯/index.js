    var nav = document.getElementById("nav");
    var list = document.getElementById("list");
    var oLis = document.getElementsByTagName("li");
    var scroll = document.getElementById("scroll");
    var bg = document.getElementById("bg");

    var timer;
    var mouseOutflag;
    var moveOutflag;

    nodeClone();
    function scrollAuto(flag) {
        if (!flag){
            clearInterval(timer);
            return ;
        }
        timer = setInterval(function () {
            var left = utils.css(list,"left");
            left -= 1;
            if(left <= -1260){
                left = 0;
            }
            utils.css(list,"left",left);
            scrollMove(left*-0.77);

        },50);
    }
    scrollAuto(true);
    function scrollMove(autoMove){
        utils.css(scroll,"left",autoMove);
    }
    nav.onmouseover = stop;
    nav.onmouseleave = start;

    scroll.onmousedown = function(ev){
        var ev = ev||event;
        var previousX = ev.clientX;
        var scrLeft = scroll.offsetLeft;
        document.onmousemove = function(ev){
            mouseOutflag = false;
            var nextX = ev.clientX;
            var moveX = nextX-previousX;
            var srcMoveX = moveX+scrLeft;
            if(srcMoveX>=0&&srcMoveX<=970){
                scroll.style.left = srcMoveX+'px';
                utils.css(list,"left", srcMoveX / -0.77);
            }
        };
        document.onmouseup = function(ev){
            mouseOutflag = true;
            document.onmousemove = null;
            if(moveOutflag){
                if(mouseOutflag){
                    utils.css(bg,"display","none");
                    scrollAuto(true);
                }
                mouseOutflag = false;
                moveOutflag = false;
            }
        }
    };

    function nodeClone() {
        var frg = document.createDocumentFragment();
        for(var i=0;i<oLis.length;i++){

            var newList = oLis[i].cloneNode(true);

            frg.appendChild(newList);
        }
        list.appendChild(frg);
    }
    function stop(){
        utils.css(bg,"display","block");
        scrollAuto(false);
        mouseOutflag = true;
        moveOutflag = false;
    }
    function start(){
        if(mouseOutflag){
            utils.css(bg,"display","none");
            scrollAuto(true);
        }else{
            moveOutflag = true;
        }
        mouseOutflag = false;

    }
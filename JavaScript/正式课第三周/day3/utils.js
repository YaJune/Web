var utils = (function () {
    function offset(curEle){
        var left = curEle.offsetLeft;
        var top = curEle.offsetTop
        var parentEle = curEle.offsetParent;
        while(parentEle != document.body){
            left += parentEle.offsetLeft+parentEle.clientLeft;
            top += parentEle.offsetTop+parentEle.clientTop;
            parentEle = parentEle.offsetParent;
        }
        return {left,top};
    }
    function getCss(curEle,attr) {
        var val;
        if("getComputedStyle" in window){
            val=getComputedStyle(curEle)[attr]
        }else{
            val=curEle.currentStyle[attr]
        }
        var reg =/^(width|height|left|top|bottom|right|margin|padding|fontSize)$/;
        if(reg.test(attr)){
            val=parseFloat(val);
        }
        return val;
    }
    function setCss(curEle,attr,val) {
        var reg =/^(width|height|left|top|bottom|right|margin|padding|fontSize)$/;
        if(reg.test(attr)){
            if(typeof val==="number"){
                val =val+"px";
            }
        }
        curEle.style[attr]=val;
    }
    function setGroupCss(curEle,obj) {
        for(var key in obj){
            setCss(curEle,key,obj[key])
        }
    }
    function css() {
        var curEle=arguments[0],
            attr=arguments[1],
            val = arguments[2];
        if(arguments.length===2){
            if(typeof attr==="string"){
                return getCss(curEle,attr)
            }else{
                setGroupCss(curEle,attr)
            }
        }else if(arguments.length===3){
            setCss(curEle,attr,val)
        }
    }
    function win(attr,val) {
        if (val===undefined){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr] = val;
        document.body[attr] = val;
    }
    function toArray(likeAry) {
        var  ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length] = likeAry[i];
            }
        };
        return ary;
    };
    return {offset,getCss,setCss,setGroupCss,css,win,toArray}
})();
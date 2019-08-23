    var data;
    var list = document.getElementById("list");
    var navs = document.getElementsByTagName("a");
    var oLis = document.getElementsByTagName("li");
    var oIs = document.getElementsByTagName("i");
    //1.利用ajax请求数据
    //创建一个ajax的实例；
    var xhr = new XMLHttpRequest();
    //2.打开一个路径
    xhr.open("get","json/product.json",false);
    //3.监听数据状态
    xhr.onreadystatechange = function () {
        //如果状态是4，并且xhr.status状态码是以2开头的，说明数据已经请求成功
        if(xhr.readyState===4&&/^2\d{2}/.test(xhr.status)){
            data = JSON.parse(xhr.responseText);
        }
    };
    //4.发送请求
    xhr.send();

    //把数据渲染到页面
    function bindHTML(data) {
        var str = ``;
        for(var i=0;i<data.length;i++){
            var cur = data[i];
            str += `<li data-title="${cur.title}" data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
                        <img src="${cur.img}" alt="">
                        <span>${cur.title}</span>
                        <span>${cur.time}</span>
                        <span>${cur.hot}</span>
                        <span>${cur.price}</span>
                    </li>`
        }
        list.innerHTML = str;
    }
    bindHTML(data);

    //操作DOM
    for(var i=0;i<navs.length;i++){
        navs[i].index = i;
        navs[i].flag = -1;
        navs[i].onclick = function () {
            this.flag*=-1;
            sortList.call(this);
            iBgChange.call(this);
        }
    }
    function iBgChange() {
        for(var i=0;i<oIs.length;i++){
            oIs[i].classList.remove("checked");
        }
        var index = this.flag>0?0:1;
        for(var j=0;j<navs.length;j++){
            if(this != navs[j]){
                navs[j].flag = -1;
            }
        }
        this.children[index].classList.add("checked");
    }
    function sortList() {
        var ary = utils.toArray(oLis);
        var dataAry = ["data-time","data-hot","data-price"];
        var that = this;
        ary.sort(function (a,b) {
            a = a.getAttribute(dataAry[that.index]);
            b = b.getAttribute(dataAry[that.index]);
            if(that.index === 0){
                a = a.replace("-","").replace("-","");
                b = b.replace("-","").replace("-","");
            }
            return (a-b)*that.flag;
        });
        var frg = document.createDocumentFragment();
        for(var i=0;i<ary.length;i++){
            frg.appendChild(ary[i]);
        }
        list.appendChild(frg);
    }

/*
    //操作数据
    for(var i=0;i<navs.length;i++){
        navs[i].className = navs[i].getAttribute("class");
        navs[i].flag = -1;
        navs[i].onclick = function(){
            this.flag*=-1;
            var that = this;
            data.sort(function (a,b) {
                a = a[that.className];
                b = b[that.className];
                if(that.className === 'time'){
                    a = a.replace("-","").replace("-","");
                    b = b.replace("-","").replace("-","");
                }
                return (a-b)*that.flag;
            });
            bindHTML();
            iBgChange.call(this);
        };
    }
*/
    var recover = document.getElementById("recover");
    var tag = document.getElementById("tag");
    var search = document.getElementById("search");
    var context = document.getElementById("context");

    recover.onclick = function () {
        bindHTML(data);
    };

    search.onclick = function () {
        searchBtTag(tag.value,context.value);
    };
    function searchBtTag(tag,context) {
        var ary = data;
        var newAry = [];
        for (var i=0;i<ary.length;i++){
            var cur = ary[i][tag];

            if(cur.toString().indexOf(context)>=0){
                //console.log(1);
                newAry.push(ary[i]);
            }
        }
        bindHTML(newAry);
    }

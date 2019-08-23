    var list = document.getElementById("list");
    var navs = document.getElementsByTagName("a");
    var oLis = document.getElementsByTagName("li");
    var oIs = document.getElementsByTagName("i");
    var data;

    var xhr = new XMLHttpRequest();
    xhr.open("get","json/product.json",false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState===4&&/^2\d{2}/.test(xhr.status)){
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();

    function bindHTML() {
        var str = ``;
        for(var i=0;i<data.length;i++){
            var cur = data[i];
            str +=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
                        <img src="${cur.img}" alt="">
                        <span>${cur.title}</span>
                        <span>${cur.time}</span>
                        <span>${cur.hot}</span>
                        <span>${cur.price}</span>
                    </li>`
        }
        list.innerHTML = str;
    }
    bindHTML();
    for(var i=0;i<navs.length;i++){
        navs[i].index = i;
        navs[i].flag = -1;
        navs[i].onclick = function () {
            this.flag*=-1;
            sortList.call(this);
            iBgChange.call(this);
        }
    }
    function sortList() {
        var ary =[];
        var that = this;
        var dataAry = ["data-time","data-hot","data-price"];
        ary = utils.toArray(oLis);
        ary.sort(function (a,b) {
            a = a.getAttribute(dataAry[that.index]);
            b = b.getAttribute(dataAry[that.index]);
            if(that.index === 0){
                a=a.replace("-","").replace("-","");
                b=b.replace(/-/g,'');
            }
            return (a-b)*that.flag;
        });
        var frg = document.createDocumentFragment();
        for(var i=0;i<ary.length;i++){
            frg.appendChild(ary[i]);
        }
        list.appendChild(frg);
    }
    function iBgChange() {
        for(var i=0;i<oIs.length;i++){
            oIs[i].classList.remove("checked");
        }
        var index = this.flag>0?0:1;
        for(var i=0;i<navs.length;i++){
            if(this != navs[i]){
                navs[i].flag = -1;
            }
        }
        this.children[index].classList.add("checked");
    }
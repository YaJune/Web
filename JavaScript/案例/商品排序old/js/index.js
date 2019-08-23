var data;
var list =document.getElementById("list");
var navs = document.getElementsByTagName("a");
// 1.ajax获取json文件中的数据
var xhr = new XMLHttpRequest();// 创建一个ajax对象；
// 打开路径
xhr.open("get",'json/product.json',false);// 同步；
// 监听
xhr.onreadystatechange = function () {
   // 2  3  4
    if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
        // 如果上面的条件成立，前端接收到后端发来的数据;
        // 通过ajax请求到的数据是一个JSON格式的字符串；
        console.log(xhr.responseText);
        data = utils.toJSON(xhr.responseText);
        bindHtml();
    }
}
// 发送请求；
xhr.send();
console.log(data);
// 2.绑定数据；
function bindHtml() {
    var  str = ``;
    for(var i=0;i<data.length;i++){
        var cur = data[i];
        str+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
              <img src="${cur.img}" alt="">
              <span>${cur.title}</span>
              <span>${cur.time}</span>
              <span>${cur.hot}</span>
              <span>${cur.price}</span>
          </li>`
    }
    // 通过innerHTML 属性放到页面中
    list.innerHTML = str;
}
bindHtml();











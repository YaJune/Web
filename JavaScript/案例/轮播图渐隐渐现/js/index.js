// jquery渐隐渐现原理： 五张图片叠加到一起，首先让所有图片隐藏,懒加载；如果想让第几张显示，让他透明度变成1，其他图片都变成0；fadeIn;

// 1. 获取元素
// 2.请求数据；$.ajax({url:"",type:"",async:"",data:{},cache:"",success:function(data){},error:function(){}})
// 3.绑定数据；es6模板字符串；html()-->获取一些元素；
// 4.延迟加载；
// 5.图片的轮播；outer.step
// 6. 鼠标划上清除定时器
// 7.鼠标划上li,让其显示对应的图片
// 8.点击左右，切换图片

// 1.获取元素
var  $outer = $("#outer");
var  outer = $("#outer")[0];// document.getElementById()
var  $focus = $("#focus");
var  $swiper = $("#swiper");
//var  $oLis = $("#focus li");
var  $oImgs;//
var $oImgsLength;
let step = 0;
// 通过jQuery获取的元素没有映射机制；
// 2.ajax获取数据；
$.ajax({
    url:"data.json",// 路径
    async:false,// Jquery 默认是异步请求；true：异步；false：同步；
    // jQuery ajax是默认是异步的；如果async没有赋值，默认是true；如果这个键值对写错，同时也是异步的；
    type:"get",// type: 请求方式；get/post/delete/put
    //data:{
    //      username:"张三",
    //      password:11111,
    //      code : ""
    // },参数
    success:function (data) {
        // 如果ajax是异步的，那么当前回调函数会等待所有的同步执行完成之后，才会执行；
        // data : 请求到的数据；
        //console.log(data);
        bindData(data);
        delay();
    }
});

// 3.绑定数据

function bindData(data) {
    // $.each : 遍历；
    // param1:遍历的数据
    // param2:回调函数
    var imgStr = ``;
    var liStr = ``;
    // 1.参数： 要循环的对象数组，2.回调： 每循环一次，执行一次；
    // 3.this  遍历的每一项
    $.each(data,function (index) {// index: 当前数据的索引；
        // console.log(this);// this---> 每一条具体的数据；
        imgStr+=`<img data-src="${this.img}">`;
        liStr +=`<li></li>`;
    });
    // 把数据放回页面；innerHTML
    $swiper.html(imgStr);
    $focus.html(liStr);
    $("#focus li").eq(0).addClass("select");

}

let timer = setInterval(moveAuto,2000);

function delay() {
    $("img").each(function (index) {
        let trueAddress = $(this).attr("data-src");
        let that = this;
        let newImg = new Image;
        newImg.src = trueAddress;
        newImg.onload = function(){
            that.src = trueAddress;
            index === 0? moveAuto() : null;
            newImg = null;
        }
    })
}
function moveAuto() {
    step===$("img").length?step=0:null;
    console.log($("img").length);
    $("img").eq(step).fadeIn().siblings().fadeOut();
    /*$("img").eq(step).fadeIn(2000,function () {
        $(this).fadeOut(2000);
    });*/
    focusChange(step);
    step++;
}
function focusChange(index) {
    $("#focus li").each(function () {
        $(this).removeClass("select");
    });
    $("#focus li").eq(index).addClass("select");
}
$("#outer").hover(function () {
    clearInterval(timer);
},function () {
    timer = setInterval(moveAuto,2000);
});

$("#focus li").hover(function () {
    clearInterval(timer);
    step = $(this).index();
    focusChange(step);
    moveAuto();
});
$("#right").click(()=> {moveAuto();});
$("#left").click(()=> {
    step-=2;
    step===-1?step=$("img").length-1:null;
    moveAuto();
});

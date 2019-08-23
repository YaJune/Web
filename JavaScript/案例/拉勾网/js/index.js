(function () {

    //job 切换
    $('.tabs li').click(function () {
        let index = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $('.tabs .job').eq(index).fadeIn().siblings().fadeOut();
    });
    tabs('.chat-me','.chat-up');
    
    //hover 显示隐藏
    function tabs(parent,child) {
        let flag = false;
        $(parent).hover(function () {
            flag = true;
            $(this).find(child).show();
        }, function () {
            flag = false;
            setTimeout(() => {
                if (!flag) $(this).find(child).hide()
            }, 150)
        });
        $(parent+' '+child).hover(function () {
            flag = true;
        }, function () {
            flag = false;
            setTimeout(() => {
                if (!flag) $(this).hide()
            }, 150)
        })
    }


    // 友情链接
    $('.link-box .link span').click(function () {
        let $this = $(this);
        if ($this.hasClass('down')) {
            $this.html('收起<i></i>').addClass('up').removeClass('down')
            $('.hide').show();
        } else {
            $this.html('展开<i></i>').addClass('down').removeClass('up');
            $('.hide').hide();
        }
    })
    //返回顶部
    let $winH = $(window).height();
    backTop();
    addEventListener('scroll', backTop);

    function backTop() {
        let $scrollH = $(window).scrollTop();
        if ($scrollH > $winH) {
            $('.back-top').show();
            return;
        }
        $('.back-top').hide();
    }
    $('.back-top').click(function () {
        $(this).css('background-position', 'right top');
        $('html').animate({
            scrollTop: 0
        }, 500, 'linear', () => $(this).css('background-position', 'left top'));
    })

    //登陆方式切换
    $('#code-login').click(function(){
        $('.form-tabs').animate({left:-316},300);
        $(this).parent().hide().siblings().show();
    })
    $('#pass-login').click(function(){
        $('.form-tabs').animate({left:0},300);
        $(this).parent().hide().siblings().show();
    })
    //登陆弹出层
    $('.passport .login').click(function(){
        $('.modal-shadow').show();
        $('.login-body').show().animate({bottom:50+'%',marginBottom:-498/2},500);
    });
    $('.close-login').click(function(){
        $('.modal-shadow').hide();
        $('.login-body').hide().css({bottom:0,marginBottom:0});
    })
})()

class Marquee {
    constructor(ele, option = {}) {
        //初始配置 speed:速度 timer:时间间隔
        let {
            speed = 1, timer = 10
        } = option;
        this.speed = speed;
        this.timer = timer;
        this.child = ele.children[0];
        this.ele = ele;
        this.eleW = this.ele.clientWidth;
        this.left = utils.css(this.child, 'left');
        this.child.innerHTML += this.child.innerHTML;
        this.scollIcon = ele.querySelector('.scroll>i');
        this.iconWidth = this.scollIcon.offsetWidth;
        this.scollIcon.addEventListener('mousedown', this.dragDown.bind(this));
        this.scollLeft = 0;
        this.flag = false;
        this.init();
    }
    init() {
        //每次bind函数地址不一样需要存储
        this.MOVE = this.move.bind(this);
        this.STOP = this.stop.bind(this);
        this.START = this.start.bind(this);
        this.t = setInterval(this.MOVE, this.speed);
        //设置ul width*2
        utils.setCss(this.child, 'width', utils.getCss(this.child, 'width') * 2);
        this.width = this.child.offsetWidth;

        //监听鼠标事件
        this.ele.addEventListener('mouseenter', this.STOP);
        this.ele.addEventListener('mouseleave', this.START);
        this.ele.addEventListener('mouseleave',this.out.bind(this));
    }

    out(){
        this.scollIcon.parentNode.classList.remove('bg');
        this.flag = true;
    }

    move() {
        let {child,eleW,iconWidth} = this
        utils.setCss(this.child, 'left', this.left -= this.speed);
        let iconSpeed = -this.left * ((eleW-iconWidth)/(child.offsetWidth/2));
        utils.setCss(this.scollIcon,'left',iconSpeed)
        if (Math.abs(this.left) >= (this.width / 2)) {
            this.left = 0;
            this.scollLeft = 0;
        }
    }
    start() {
        this.t = setInterval(this.MOVE, this.speed);
    }
    stop() {
        this.flag = false;
        this.scollIcon.parentNode.classList.add('bg');
        clearInterval(this.t);
    }
    //鼠标按下
    dragDown(e) {
        let {dragMove,dragUp} = this;
        //获取当前left值
        this.satrL = utils.getCss(e.target, 'left');
        this.satrX = e.clientX //距浏览器x轴距离
        this.DMOVE = dragMove.bind(this);
        this.DUP = dragUp.bind(this);
        addEventListener('mousemove', this.DMOVE);
        addEventListener('mouseup', this.DUP);


    }
    //鼠标移动
    dragMove(e) {
        let {satrL,satrX,eleW,child,scollLeft,iconWidth,scollIcon} = this
        //获取移动距离
        scollLeft = e.clientX - satrX + satrL;
        let minX = 0,
            maxL = eleW - scollIcon.offsetWidth;
        scollLeft = scollLeft > minX ? (scollLeft < maxL ? scollLeft : maxL) : minX;
        utils.css(scollIcon, 'left', scollLeft);
        console.log();

        this.left = -scollLeft * (child.offsetWidth/2/(eleW-iconWidth));
        utils.setCss(child,'left',this.left);
        if(this.flag) {
            clearInterval(this.t);
            scollIcon.parentNode.classList.add('bg');
        }
    }
    //鼠标抬起
    dragUp() {
        if(this.flag) {
            this.t = setInterval(this.MOVE, this.speed);
            this.scollIcon.parentNode.classList.remove('bg');
        }
        removeEventListener('mousemove', this.DMOVE);
        removeEventListener('mouseup', this.DUP);
    }
}

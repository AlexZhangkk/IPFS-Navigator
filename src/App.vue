<template>
    <div id="app" class="page">
        <login
            :dialogVisible="dialogVisible"
            @closepop="closepop"
            @Clogin="Clogin"
        ></login>
        <headnav
            :isscorrl="isscorrl"
            @loginout="loginout"
            @login="login2"
            :showlogin="showlogin"
            :phone="phone"
        ></headnav>
        <transition name="fade">
            <collection2 v-if="this.isc2" @loginout="loginout"></collection2>
        </transition>
        <Backtop>
            <div
                style="
                    height: 40px;
                    width: 100%;
                    background-color: #111111;
                    top: 70px;
                    z-index: -1;
                "
            ></div>
            <transition name="fade">
                <serch class="serch" transiton="fade" v-show="isscorrl">
                    <div
                        id="draw"
                        style="
                            height: 145px;
                            top: 0px;
                            position: absolute;
                            width: 100%;
                            z-index: 0;
                            background-color: #171717;
                        "
                    ></div>

                    <div class="waveWrapper waveAnimation">
                        <!--<div class="waveWrapperInner bgTop">
		<div class="wave waveTop" style="background-image: url('img/wave-top.png')"></div>
	</div>
	<div class="waveWrapperInner bgMiddle">
		<div class="wave waveMiddle" style="background-image: url('img/wave-mid.png')"></div>
	</div>-->
                        <div class="waveWrapperInner bgBottom">
                            <!--<div class="wave waveBottom" style="background-image: url('img/wave-bot.png')"></div>-->
                            <div
                                class="wave waveBottom"
                                style="height:130px;z-index=-1"
                            ></div>
                        </div>
                    </div>
                </serch>
            </transition>
            <collection
                v-show="!this.isc2"
                @loginout="loginout"
                style="background-color: rgb(23, 23, 23)"
            ></collection>
            <!-- <div style="height:20px"></div> -->
            <router-view style="background-color: #111111"></router-view>
        </Backtop>
    </div>
</template>

<script>
import headnav from "@/components/head-nav";
import serch from "@/components/serch/serch";
import collection from "@/components/collection/collection";
import collection2 from "@/components/collection/collection2";
import login from "@/components/login/login";
import { EventBus } from "../event-bus.js";

export default {
    components: {
        headnav,
        serch,
        collection,
        login,
        collection2,
    },
    data() {
        return {
            
            isc2: false,
            isscorrl: true,
            dialogVisible: false,
            cname: "",
            showlogin: true,
            phone: "",
            isearch: false,
            timer: null,
            cwarpWidth: 0,
        };
    },
    mounted() {
        this.cwarpWidth = document.getElementsByClassName(
            "cwarp"
        )[0].clientWidth;
        this.addCircles(); //图像
        window.addEventListener("scroll", this.handleScrollx, true);
        if (window.localStorage.getItem("haslogin")) {
            this.showlogin = false;

            // this.phone = window.localStorage.getItem('phone')
            var tel = window.localStorage.getItem("phone");
            tel = "" + tel;
            var ary = tel.split("");
            ary.splice(3, 4, "****");
            var tel1 = ary.join("");
            this.phone = tel1;
        }
    },
    created() {
        
        this.cname = "collection";
        document.addEventListener(
            "visibilitychange",
            this.monitorAnimation,
            false
        );
        console.log(window.location.href)

        // if(window.location.href.indexOf('http://')>-1){
        //    let  i= window.location.href.replace("http://","https://")
        //    window.location.href = i
        // }

    },
    watch: {
        "$route.path": function (newVal, oldVal) {
            if (newVal === "/serch") {
                this.isc2 = true;
                this.isscorrl = false;
                this.isearch = true;
            }
            if (newVal === "/index") {
                this.isearch = false;
            }
            if (oldVal === "/serch") {
                this.isearch = false;
            }
        },
    },
    methods: {
        monitorAnimation() {
            if (document.hidden) {
                window.clearInterval(this.timer);
            } else {
                this.addCircles();
            }
        },
        addCircles() {
            this.timer = setInterval(() => {
                this.addCircle(...this.randomPosition());
            }, 1000);
        },
        addCircle(x, y) {
            var circle = document.createElement("div");
            //var animationTime = Math.round(Math.random() * 10);
            circle.classList.add("circle");
            circle.style.left = x + "px";
            circle.style.top = y + "px";
            circle.style.backgroundColor = this.randomColor();
            //circle.style.setProperty("--grow-time", `${animationTime}s`);

            requestAnimationFrame(() => {
                document.getElementById("draw").appendChild(circle);
                //document.body.appendChild(circle);
                setTimeout(this.removeCircle.bind(this, circle), 5 * 1000);
            });
        },
        removeCircle(circle) {
            //document.body.removeChild(circle);
            document.getElementById("draw").removeChild(circle);
        },
        randomPosition() {
            return [
                Math.ceil(Math.random() * this.cwarpWidth) +
                    (document.body.clientWidth - this.cwarpWidth) / 2,
                Math.ceil(Math.random() * 120),
            ];
        },
        randomColor() {
            const colors = ["#308AE8", "#15CC79", "#F4CC2D"];
         
            return colors[Math.round(Math.random() * colors.length)];
        },

        login2() {
            this.dialogVisible = true;
        },
        loginout() {
            this.showlogin = true;
        },
        Clogin() {
            this.dialogVisible = true;
        },
        closepop(value) {
            this.dialogVisible = false;
            if (this.$store.state.haslogin) {
                this.showlogin = false;

                var tel = value;
                tel = "" + tel;
                var ary = tel.split("");
                ary.splice(3, 4, "****");
                var tel1 = ary.join("");
                this.phone = tel1;
            } else {
                this.showlogin = true;

            }
        },
        handleScrollx(e) {
            if (e.target.scrollTop == 0 && !this.isearch) {
                this.isscorrl = true;
                this.isc2 = false;
            }
            if (e.target.scrollTop > 200 && !this.isearch) {
                this.isc2 = true;
                this.isscorrl = false;
            }
            if (e.target.scrollTop < 350 && !this.isearch) {
                EventBus.$emit("fix", true);
            }
            if (e.target.scrollTop > 240 && !this.isearch) {
                EventBus.$emit("fix", false);
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.page {
    min-width: 1440px;
    background-color: #171717;
    height: 100%;
}
.bolang {
    position: absolute;
    color: white;
    width: 100%;
    height: 75px;
    top: 0;

    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(./assets/1.png);
    -webkit-animation: d-pro1 10s infinite;
    -moz-animation: d-pro1 10s infinite;
    -o-animation: d-pro1 10s infinite;
    -ms-animation: d-pro1 10s infinite;
    // animation:d-pro1 10s infinite；
    z-index: 0;
}
.hd {
    width: 16px;
    height: 16px;
    background-color: #f4cc2d;
    border-radius: 50px;
    position: absolute;
    z-index: 10;
    left: 335px;
}
.hd2 {
    width: 16px;
    height: 16px;
    background-color: #f4cc2d;
    border-radius: 50px;
    position: absolute;
    z-index: 10;
    left: 545px;
    top: 75px;
    opacity: 0.2;
}
.lv {
    background-color: #15cc79;
    width: 12px;
    height: 12px;
    border-radius: 50px;
    position: absolute;
    z-index: 10;
    left: 1527px;
    top: 80px;
}
.lan {
    background-color: #EF190F;
    width: 16px;
    height: 16px;
    border-radius: 50px;
    position: absolute;
    z-index: 10;
    left: 1293px;
    top: 0px;
    opacity: 0.3;
    z-index: 99;
}
// @keyframes d-pro1 {
//   0% {
//     background-image: url(./assets/1.png);
//   }
//   25% {
//     background-image: url(./assets/2.png);
//   }
//     50% {
//     background-image: url(./assets/1.png);
//   }
//       75% {
//     background-image: url(./assets/3.png);
//   }
//   100% {
//     background-image: url(./assets/1.png);
//   }
// }

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
.serch {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    height: 40px;
}
</style>

<style lang="css">
.controls {
    position: relative;
    z-index: 2;
}

.controls__label {
    display: block;
    font-family: Menlo;
    font-weight: bold;
    margin-bottom: 10px;
}

.controls__slider {
    width: 200px;
}

.circle {
    /* -webkit-animation: grow 5s forwards,  fade 3s calc(2s)  forwards; */
    /* animation: grow 5s forwards,  fade 3s calc(2s)  forwards; */

    background: #81ecec;
    border-radius: 100%;
    height: 2px;
    left: 20vw;
    position: absolute;
    top: 20vh;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    width: 2px;
/*   -webkit-animation: grow 3s forwards, fade 1s calc(2s) forwards;
  animation: grow 3s forwards, fade 1s calc(2s) forwards; */
    -webkit-animation: grow 5s forwards, fade 3s calc(2s) forwards;
    animation: grow 5s forwards, fade 3s calc(2s) forwards;
}

@-webkit-keyframes grow {
    0% {
        -webkit-transform: translateZ(0) scale(0);
        transform: translateZ(0) scale(0);
    }

    100% {
        -webkit-transform: translateZ(0) scale(10);
        transform: translateZ(0) scale(10);
    }
}

@keyframes grow {
    0% {
        -webkit-transform: translateZ(0) scale(0);
        transform: translateZ(0) scale(0);
    }

    100% {
        -webkit-transform: translateZ(0) scale(10);
        transform: translateZ(0) scale(10);
    }
}

@-webkit-keyframes fade {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes fade {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}














@keyframes move_wave {
    0% {
        transform: translateX(0) translateZ(0) scaleY(1)
    }
    50% {
        transform: translateX(-25%) translateZ(0) scaleY(0.55)
    }
    100% {
        transform: translateX(-50%) translateZ(0) scaleY(1)
    }
}
.waveWrapper {

position: absolute;
    width: 100%;
    overflow: hidden;
    height: 130px;
    bottom: -1px;
        top:0;
    z-index: 2;
}
.waveWrapperInner {
position: absolute;
    width: 100%;
    overflow: hidden;
    height: 130px;
    bottom: -1px;
    top:0;
    /*background-image: linear-gradient(to top, #86377b 20%, #27273c 80%);*/
}
.bgTop {
    z-index: 15;
    opacity: 0.5;
}
.bgMiddle {
    z-index: 10;
    opacity: 0.75;
}
.bgBottom {
    z-index: 99999;
}
.wave {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
    background-image: url('./assets/bolang.png')
}
.waveTop {
    background-size: 50% 100px;
}
.waveAnimation .waveTop {
  animation: move-wave 3s;
   -webkit-animation: move-wave 3s;
   -webkit-animation-delay: 1s;
   animation-delay: 1s;
}
.waveMiddle {
    background-size: 50% 120px;
}
.waveAnimation .waveMiddle {
    animation: move_wave 10s linear infinite;
}
.waveBottom {
    background-size: 50% 100px;
}
.waveAnimation .waveBottom {
    animation: move_wave 30s linear infinite;
}
</style>
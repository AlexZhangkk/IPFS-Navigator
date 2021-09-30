<template>
    <div>
        <div class="lout">
            <el-dialog :visible.sync="dialogTableVisible">
                <img class="xbtn" src="../assets/x.png" alt @click="close" />
                <div
                    style="
                        font-size: 18px;
                        color: white;
                        margin-left: 20px;
                        margin-top: 20px;
                        margin-bottom: 20px;
                    "
                >
                    确定退出登录吗？
                </div>
                <div
                    style="
                        margin-top: 15px;
                        color: #9198a7;
                        font-size: 14px;
                        margin-left: 20px;
                        margin-top: 15px;
                    "
                >
                    退出后“我的收藏”功能将不可用哦～
                </div>
                <div
                    style="
                        margin-top: 30px;
                        display: flex;
                        justify-content: flex-end;
                        margin-right: 20px;
                    "
                >
                    <div class="qdd" @click="qxx">取消</div>
                    <div class="qxx" @click="qdd">确认</div>
                </div>
            </el-dialog>
        </div>

        <div class="head-warp">
            <div style="display: flex; align-items: center">
                <!-- <img @click="back" class="img" src="../assets/logo.png" alt /> -->
                <img @click="back" class="img" src="../assets/logo2.png" alt />
                <div @click="back" class="title">IPFS导航神器</div>
            </div>

            <transition name="fade">
                <serch
                    v-show="!isscorrl"
                    class="serchwarp"
                    transiton="fade"
                ></serch>
            </transition>

            <div v-if="showlogin" class="submit" @click="emitlogin">登录</div>
            <div v-if="!showlogin" class="alsubmit">
                <div
                    v-clickoutside="handleClose"
                    @click="outpt"
                    style="display: flex; align-items: center"
                >
                    <div style="cursor: pointer">
                        {{ phone }}
                    </div>
                    <img class="headimg" src="../assets/head.jpg" alt />
                </div>

                <div v-show="out" class="loginout" @click="loginout">
                    <div class="hovv">退出登录</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import serch from "./serch/serch";
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
    },
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
const clickoutside2 = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
    },
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
export default {
    name: "head-nav",
    props: ["isscorrl", "showlogin", "phone"],
    data() {
        return {
            out: false,
            dialogTableVisible: false,
        };
    },
    directives: { clickoutside },
    mounted() {},
    watch: {},

    methods: {
        back() {
            if (this.$route.path == "/serch") {
                this.$router.push({
                    path: "/",
                });
            }
        },
        emitlogin() {
            this.$emit("login");
        },
        handleClose(e) {
            this.out = false;
        },
        handleClose2(e) {
            this.out = false;
        },
        outpt() {
            console.log("123");
            this.out = !this.out;
            // this.$store.commit("loginout");
        },
        loginout() {
            this.dialogTableVisible = true;
        },
        qdd() {
            this.$axios({
                method: "POST",
                url: "/base/api/User/LogOut",
                // url: "/api/User/LogOut",
                data: {},
            }).then((res) => {
                if (res.data.res) {
                    this.$store.commit("loginout");
                    this.$emit("loginout");
                    this.dialogTableVisible = false;
                    this.$router.go(0);
                }
            });
        },
        qxx() {
            this.dialogTableVisible = false;
        },
        close() {
            this.dialogTableVisible = false;
        },
    },
    computed: {},
    mounted() {},
    created() {},
    components: {
        serch,
        scroll,
    },
    destroyed: function () {
        window.removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
    },
};
</script>

<style lang="scss">
.lout {
    .el-dialog__header {
        display: none;
    }
    .el-dialog {
        width: 400px !important;
        margin-top: 210px !important;
        height: 170px;
        border-radius: 10px;
    }
    .el-dialog__body {
        height: 170px;
        width: 400px;
        padding: 0;
        overflow-y: hidden;
        background-color: #202020;
        border-radius: 6px;
    }
    .qdd {
        background-color: #202020;
        color: #ef190f;
        border-radius: 6px;
        border: 1px solid #ef190f;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        width: 120px;
        height: 40px;
        cursor: pointer;
    }
    .qdd:hover {
        background-color: #202020;
        color: #f04d30;
        border-radius: 6px;
        border: 1px solid #f04d30;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        width: 120px;
        height: 40px;
        cursor: pointer;
    }
    .qxx {
        background-color: #ef190f;
        cursor: pointer;
        width: 120px;
        height: 40px;
        color: white;
        border-radius: 6px;
        border: 1px solid #ef190f;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
    }
    .qxx:hover {
        background-image: linear-gradient(#f04d30, #ef190f);
        box-shadow: inset 0px 1px 15px#F04D30, 0px 0px 8px #f04d30;
        cursor: pointer;
        width: 120px;
        height: 40px;
        color: white;
        border-radius: 6px;
        border: 1px solid #ef190f;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
.head-warp {
    width: 100%;
    min-width: 1440px;
    height: 70px;
    background-color: #171717;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 100;
    .serchwarp {
        margin-left: auto;
        margin-right: auto;
    }

    .img {
        // width: 124px;
        height: 36px;
        margin-left: 30px;
        cursor: pointer;
    }
    .title {
        font-size: 13px;
        color: #a3abbd;
        margin-left: 20px;
        letter-spacing: 2px;
        cursor: pointer;
    }
    .submit {
        width: 52px;
        height: 28px;
        background-color: #ef190f;
        color: white;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        margin-right: 20px;
        cursor: pointer;
        border-radius: 2px;
    }
    .submit:hover {
        background-image: linear-gradient(#f04d30, #ef190f);
    }
    .alsubmit {
        color: white;
        margin-left: auto;
        margin-right: 20px;
        font-size: 14px;
        position: relative;
        display: flex;
        align-items: center;
        .headimg {
            width: 28px;
            height: 28px;
            border-radius: 100px;
            margin-left: 10px;
            cursor: pointer;
        }
        .loginout {
            position: absolute;
            top: 40px;
            width: 130px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            right: 0;
            cursor: pointer;
            border-radius: 6px;
            background-color: #202020;
            border: 1px solid #28292a;
        }
        .loginout:hover {
            .hovv {
                background-color: #32353e;
                height: 40px;
                display: flex;
                align-items: center;
                width: 100%;
                font-size: 14px;
                justify-content: center;
            }

            color: #ef190f;
            position: absolute;
            top: 40px;
            width: 130px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            right: 0;
            cursor: pointer;
            border-radius: 6px;
            border: 1px solid #28292a;
        }
    }
}
.dash {
    width: 100%;
    height: 100px;
    background: linear-gradient(
            30deg,
            transparent 0,
            transparent 5px,
            blue 5px,
            blue 25px,
            transparent 25px,
            transparent 30px,
            red 30px,
            red 50px,
            transparent 50px,
            transparent 55px
        )

        repeat-x;
    background-size: 100px 3px;
    background-color: #eee;
    background-position: bottom;
}
</style>
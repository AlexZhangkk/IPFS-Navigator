<template>
    <div>
        <div class="loginfrom">
            <el-dialog
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
            >
                <div class="warplogin">
                    <img
                        class="xbtn"
                        src="../../assets/x.png"
                        alt
                        @click="close"
                    />
                    <div class="title">登 录</div>
                    <div class="sm">
                        登录后即可保存您的记录，收藏的网站不丢失～
                    </div>
                    <div class="phone">手机号</div>
                    <input
                        v-model="value"
                        type="num"
                        class="phonewarp"
                        placeholder="输入您的手机号"
                        placeholder-class="fontcss"
                        maxlength="11"
                        oninput="value=value.replace(/[^\d]/g,'')"
                    />
                    <div class="phone">验证码</div>
                    <div style="position: relative">
                        <input
                            v-model="value2"
                            placeholder-class="fontcss"
                            style
                            type="num"
                            class="phonewarp"
                            placeholder="输入验证码"
                            maxlength="6"
                            oninput="value=value.replace(/[^\d]/g,'')"
                        />
                        <div class="yzm" v-show="show" @click="getCode">
                            发送验证码
                        </div>
                        <div class="yzm" v-show="!show">{{ count }} s</div>
                    </div>

                    <div class="submit" @click="login">立即登录</div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { EventBus } from "../../../event-bus.js";
export default {
    name: "login",
    props: ["dialogVisible"],
    data() {
        return {
            show: true,
            count: "",
            timer: null,
            value: "",
            value2: "",
            code: "",
        };
    },
    watch: {
        value(newval, oldnew) {
            // console.log(newval,oldnew)
        },
    },
    mounted() {
        EventBus.$on("ShowLogin", (msg) => {
            // A发送来的消息
            this.$emit("Clogin");
        });
    },
    methods: {
        login() {
            if (!/^1[34578]\d{9}$/.test(this.value)) {
                this.$message("请填入正确的手机号！");
                return;
            }
            if (this.value2 != this.code) {
                this.$message("验证码不正确！");
                return;
            }
            this.$axios({
                method: "POST",
                url: "/base/api/User/Login",
                // url: "/api/User/Login",
                data: {
                    phone: this.value,
                    code: this.code,
                },
            }).then((res) => {
                if (res.data.res) {
                    console.log("登录成功");
                    this.$store.commit("setphone", this.value);
                    this.$store.commit("sethaslogin", true);
                    this.$emit("closepop", this.value);
                    this.$router.go(0);
                }
                if (res.data.error == 4) {
                    this.$message("验证码不正确！");
                }
            });
        },
        getCode() {
            if (!/^1[34578]\d{9}$/.test(this.value)) {
                this.$message("请填入正确的手机号！");
                return;
            }
            this.$axios({
                //获取推荐网址
                method: "POST",
                url: "/base/api/User/SendVerify",
                // url: "/api/User/SendVerify",
                data: {
                    phone: this.value,
                },
            }).then((res) => {
                this.code = res.data.msg;
            });
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            }
        },
        qx() {
            this.$emit("closepop");
        },
        close() {
            this.$emit("closepop");
        },
    },
};
</script>

<style lang='scss'  >
.loginfrom {
    .el-dialog__header {
        display: none;
    }
    .el-dialog {
        width: 400px !important;
        margin-top: 210px !important;
        height: 420px;
        border-radius: 10px;
    }
    .el-dialog__body {
        width: 400px;
        padding: 0;
        overflow-y: hidden;
        height: 420px;
        background-image: linear-gradient(#171717, #333333);
        border-radius: 6px;
    }
}

.warplogin {
    width: 400px;
    height: 420px;
    position: relative;
    border-radius: 6px;
    .fontcss {
        color: #707889;
    }
    .xbtn {
        position: absolute;
        right: 22px;
        top: 23px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    .title {
        font-size: 30px;
        color: white;
        margin-left: 40px;
        padding-top: 30px;
    }
    .sm {
        color: #9198a7;
        font-size: 14px;
        margin-top: 20px;
        margin-left: 40px;
    }
    .phone {
        font-size: 13px;
        margin-top: 25px;
        margin-left: 40px;
        color: white;
    }
    input::-ms-input-placeholder {
        font-size: 13px;
    }
    input::-webkit-input-placeholder {
        font-size: 13px;
    }
    input:focus {
        outline: #32353d;
        width: 320px;
        height: 40px;
        background-color: #32353d !important;
        color: white;
        margin-left: 40px;
        margin-top: 15px;
        padding-left: 10px;
        box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.075),
            0px 0px 8px rgba(0, 0, 0, 0.4);
    }
    .phonewarp {
        width: 320px;
        height: 40px;
        background-color: #32353d;
        color: white;
        margin-left: 40px;
        margin-top: 15px;
        padding-left: 10px;
    }
    // .phonewarp2 {
    //     width: 320px;
    //     height: 40px;
    //     background-color: #28292a !important;
    //     color: white;
    //     margin-left: 40px;
    //     margin-top: 15px;
    //     padding-left: 10px;
    //     box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.075),
    //         0px 0px 8px rgba(0, 0, 0, 0.4);
    // }
    .submit {
        // -moz-box-shadow:2px 2px 5px #333333; -webkit-box-shadow:2px 2px 5px #333333; box-shadow:2px 2px 5px #333333;
        background-image: linear-gradient(#F04D30, #EF190F);
        box-shadow: 0px 1px 15px#F04D30;
        width: 240px;
        height: 48px;
        font-size: 16px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 80px;
        margin-top: 50px;
        border-radius: 10px;
        cursor: pointer;
    }
    .submit:hover {
        background-image: linear-gradient(#F04D30, #EF190F);
        box-shadow: 0px 1px 15px#F04D30;
        width: 240px;
        height: 48px;
        font-size: 16px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 80px;
        margin-top: 50px;
        border-radius: 10px;
        cursor: pointer;
        opacity: 0.8;
    }
    .yzm {
        position: absolute;
        width: 85px;
        height: 28px;
        right: 35px;
        top: 20px;
        border: 1px solid #EF190F;
        color: #EF190F;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        font-size: 13px;
        cursor: pointer;
    }
}
</style>
<template>
    <div>
        <div class="cwarp2" :style="'width:' + this.WidthCwarp2 + 'px;'">
            <div class="title">
                <div class="name">我的收藏</div>
                <!-- <div class="right" @click="bindcheck" v-if="!ischeck">
                    <div class="nmae2">编辑</div>
                    <img class="img" src="../../assets/bj.png" alt />
        </div>-->
                <div class="yuan"></div>
                <div class="yuan2"></div>
                <div
                    class="itemwarp"
                    v-if="itemlist.length >= 0"
                    :style="'width:' + this.WidthItemwarp + 'px;'"
                >
                    <img
                        class="blackimg"
                        src="../../assets/black.png"
                        alt=""
                        v-if="itemlist.length == 0 && haslogin"
                    />
                    <div class="black" v-if="itemlist.length == 0 && haslogin">
                        🈳️还没有任何收藏呢～
                    </div>
                    <div
                        class="item"
                        @click="openurl(0)"
                        :title="'Filecoin官网'"
                        v-if="!haslogin"
                    >
                        <div class="itmexixi">Filecoin官网</div>
                    </div>
                    <!-- <div
                        class="item"
                        @click="openurl(1)"
                        :title="'IPFS官网'"
                        v-if="!haslogin"
                    >
                        <div class="itmexixi">IPFS官网</div>
                    </div> -->
                    <div
                        class="item"
                        v-for="(item, index) in itemlist"
                        :key="item.id"
                        @click="open(index)"
                        :title="item.WcName"
                    >
                        <div class="itmexixi">{{ item.WcName }}</div>
                    </div>
                </div>
                <div v-if="itemlist.length >= this.lengthData" class="xl">
                    <div class="pop" v-if="visible">
                        <div
                            class="poitem"
                            v-for="(item, index2) in itemlist.slice(
                                this.lengthData
                            )"
                            :key="item.id"
                            :title="item.WcName"
                            @click="open2(index2)"
                        >
                            <div class="ppitem">{{ item.WcName }}</div>
                        </div>
                    </div>

                    <img
                        @click="checkxl"
                        class="xlimg"
                        src="../../assets/r.png"
                        alt
                        :style="'transform:rotate(' + this.rotate + 'deg);'"
                    />
                </div>
                <!-- <div class="noitem" v-if="itemlist.length == -1"> -->
                <!-- <img class="addimg" src="../../assets/add.png" alt /> -->
                <!-- <img class="blackimg" src="../../assets/black.png" alt="" /> -->
                <!-- <div class="black">🈳️还没有任何收藏呢～</div> -->
            </div>
        </div>
    </div>

</template>

<script>
import { EventBus } from "../../../event-bus.js";
export default {
    name: "collection2",
    data() {
        return {
            isitem: true,
            ischeck: false,
            visible: false,
            itemlist: [],
            lengthData: 0,
            WidthItemwarp: 0,
            WidthCwarp2: 0,
            rotate: 0,
            haslogin: false,
        };
    },
    mounted() {
        this.lengthData = Math.round(
            (document.body.offsetWidth - 83 - 63) / 150
        );
        this.WidthItemwarp = document.body.offsetWidth - 83 - 63;
        this.WidthCwarp2 = document.body.offsetWidth;
        console.log(this.WidthItemwarp);

        EventBus.$on("delect", (WcIds) => {
            // A发送来的消息

            for (let i = 0; i < this.itemlist.length; i++) {
                if (WcIds.includes(this.itemlist[i].WcId)) {
                    this.itemlist.splice(i, 1);
                    i--;
                }
            }
            // this.itemlist.forEach(function (key, index) {
            //     if (WcIds.includes(key.WcId)) {
            //         delete this.itemlist[index];
            //     }
            // });
        });
        EventBus.$on("demsg", (msg) => {
            // A发送来的消息
            let msgNwId = msg.NwId;
            this.itemlist.forEach((c, index) => {
                if (c.NwId == msgNwId) {
                    this.itemlist.splice(index, 1);
                    return;
                }
            });
        });
        EventBus.$on("move", (msg) => {
            // A发送来的消息
            this.itemlist = msg;
        });
        EventBus.$on("Msg", (msg2) => {
            // A发送来的消息
            this.itemlist.push(msg2);
        });

        EventBus.$on("aMsg", (msg) => {
            // A发送来的消息
            this.msg = msg;
            let addcollect = {
                WcName: msg.NwName,
                WcWebsite: msg.NwWebsite,
                NwId: msg.NwId,
            };
            this.itemlist.push(addcollect);
        });
        if (!this.$store.state.haslogin) {
            this.itemlist = [];
            this.haslogin = false;
        }
        if (this.$store.state.haslogin == "true") {
            this.haslogin = true;
            this.$axios({
                //获取推荐网址
                method: "POST",
                url: "/base/api/WebCollection/GetUserCollection",
                // url: "/api/WebCollection/GetUserCollection",
                data: {},
            }).then((res) => {
                if (res.data.error == 5) {
                    this.$emit("loginout");
                    this.$store.commit("loginout");
                    return;
                }
                this.itemlist = res.data.data;
            });
        }
    },
    methods: {
        open(index) {
            let url = this.itemlist[index].WcWebsite;
            // window.location.href = url;
            window.open(url, "_blank");
        },
        open2(index2) {
            let url = this.itemlist[index2 + this.lengthData].WcWebsite;
            // window.location.href = url;
            window.open(url, "_blank");
        },
        openurl(index) {
            if (index == 0) {
                window.open("https://filecoin.io/zh-cn/", "_blank");
            } else if (index == 1) {
                window.open("http://ipfs.cn/", "_blank");
            }
        },
        checkxl() {
            if (this.rotate == 0) {
                this.rotate = 90;
            } else {
                this.rotate = 0;
            }
            this.visible = !this.visible;
        },
        bindcheck() {
            this.ischeck = !this.ischeck;
        },
        qx() {
            this.ischeck = !this.ischeck;
        },
        wc() {},
    },
};
</script>

<style lang='scss' scoop>
.cwarp2::before {
    border: 1px solid #28292a;
    border-bottom: 0;
    // filter: opacity(0.8);
    width: 1920px;
    margin: 0 auto;
    margin-top: 70px;
    position: fixed;
    top: 0px;
    z-index: 999999;
    height: 38px;
    background-color: #171717;
    filter: blur(5px);
}
.cwarp2 {
    border: 1px solid #28292a;
    border-bottom: 0;
    // filter: opacity(0.8);
    width: 1920px;
    margin: 0 auto;
    margin-top: 70px;
    position: fixed;
    top: 0px;
    z-index: 99;
    height: 38px;
    background-color: #171717;
    .yuan {
        position: absolute;
        left: 250px;
        background-color: #f4cc2d;
        width: 15px;
        height: 7.5px;
        bottom: 0;
        border-radius: 100px 100px 0 0;
        filter: blur(5px);
        // border-radius: 50px;
    }
    .yuan2 {
        position: absolute;
        left: 70%;
        background-color: #EF190F;
        width: 20px;
        height: 10px;
        top: 0;
        border-radius: 0 0 100px 100px;
        filter: blur(5px);
        // border-radius: 50px;
    }
    .title {
        height: 40px;
        display: flex;
        align-items: center;
        width: 100%;
        .xl {
            cursor: pointer;
            margin-left: 15px;
            width: 30px;
            height: 30px;
            background-color: #28292a;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 18px;
            .pop {
                position: absolute;
                padding: 0;
                width: 160px;
                right: 20px;
                top: 45px;
                background-color: #202020;
                border: 0;
                border-radius: 6px;
                color: #ffffff;
                font-size: 14px;
                .poitem {
                    width: 158px;
                    display: flex;
                    align-items: center;
                    margin-left: 1px;
                    justify-content: center;
                    height: 40px;
                    margin-top: 5px;
                    margin-bottom: 5px;
                    .ppitem {
                        width: 129px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        text-align: center;
                    }
                }
                .poitem:hover {
                    margin-top: 5px;
                    width: 158px;
                    display: flex;
                    align-items: center;
                    margin-left: 1px;
                    justify-content: center;
                    height: 40px;
                    background-color: #32353d;
                    color: #EF190F;
                    .ppitem {
                        width: 129px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
            .xlimg {
                width: 15px;
                height: 15px;
                padding: 15px;
            }
        }
        .itemwarp {
            width: 1770px;
            margin-left: 20px;
            margin-top: 5px;
            margin-bottom: 5px;
            display: flex;
            flex-wrap: nowrap;
            overflow: hidden;
            .blackimg {
                width: 18px;
                height: 18px;
                margin-left: 10px;
            }
            .black {
                margin-left: 12px;
                color: #9198a7;
                font-size: 12px;
            }
            .addimg {
                width: 30px;
                height: 30px;
                cursor: pointer;
                margin-left: 15px;
            }
            .item {
                padding-left: 10px;
                padding-right: 15px;
                width: 125px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                color: white;
                margin-left: 15px;
                // padding-right: 15px;
                .itmexixi {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    width: 107px;
                }
                .leftimg {
                    display: none;
                }
            }
            .item:hover {
                width: 125px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                color: white;
                margin-left: 15px;
                // padding-right: 15px;
                background-color: #28292a;
                border-top-left-radius: 6px;
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
                border-bottom-left-radius: 6px;
                cursor: pointer;
                .itmexixi {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;

                    width: 107px;
                }
                // .leftimg{
                //     display: block;
                //     width: 5px;
                //     height: 15px;
                //     margin-left: 5px;
                //     margin-right: 5px;
                // }
            }
        }
        .noitem {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            .addimg {
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
            .blackimg {
                width: 18px;
                height: 18px;
                margin-left: 10px;
            }
            .black {
                margin-left: 12px;
                color: #9198a7;
                font-size: 12px;
            }
        }
        .name {
            color: #9198a7;
            font-size: 12px;
            margin-left: 15px;
        }
        .right {
            margin-left: auto;
            margin-right: 15px;
            display: flex;
            .img {
                width: 13px;
                height: 15px;
            }
            .nmae2 {
                font-size: 12px;
                color: #9198a7;
                margin-right: 6px;
                cursor: pointer;
            }
        }
        .right2 {
            margin-left: auto;
            margin-right: 15px;
            display: flex;
            .name {
                color: #9198a7;
                font-size: 12px;
                cursor: pointer;
            }
            .name3 {
                color: #F04D30;
                font-size: 12px;
                margin-left: 15px;
                cursor: pointer;
            }
        }
    }
}
</style>
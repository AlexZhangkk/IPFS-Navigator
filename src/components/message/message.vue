<template>
    <div>
        <div class="msgwarp">
            <div :class="fixedfw ? 'msgleft2' : 'msgleft'">
                <div class="ltiele">最热</div>
                <div
                    class="msgleitem"
                    v-for="(item, index) in rmlist"
                    :key="item.AiId"
                    @click="openURLrm(index)"
                >
                    <div class="msgindex" v-if="index == 0">1</div>
                    <div class="msgindex2" v-if="index == 1">2</div>
                    <div class="msgindex3" v-if="index == 2">3</div>
                    <div class="msgindex4" v-if="index > 2">
                        {{ index + 1 }}
                    </div>
                    <div>
                        <div class="msgltitle">{{ item.AiTitle }}</div>
                        <div class="msgltitme">
                            <div>{{ item.AiCreationTime }}</div>
                            <div style="margin-left: 15px">
                                {{ item.AiSource }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="fixedfw ? 'msgright2' : 'msgright'">
                <div class="rtiele">最新</div>
                <div
                    class="ritme"
                    v-for="(item, index) in newlist"
                    :key="item.AiId"
                    @click="openURLnew(index)"
                >
                    <div>
                        <div class="rtitle">{{ item.AiTitle }}</div>
                        <div class="msgrtitme">
                            <div>{{ item.AiCreationTime }}</div>
                            <div style="margin-left: 15px">
                                {{ item.AiSource }}
                            </div>
                        </div>
                    </div>
                    <div class="rightimg"></div>
                    <!-- <div class='iconyoujiantou'></div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from "../../../event-bus.js";
export default {
    data() {
        return {
            rmlist: [],
            newlist: [],
            page: 1,
            nodata: false,
            fixedfw: false,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScrollx4, true);
        let _this = this;
        EventBus.$on("fix", (msg) => {
            // A发送来的消息
            if (msg == true) {
                this.fixedfw = false;
            } else {
                this.fixedfw = true;
            }
        });
    },
    created() {
        this.$axios({
            method: "POST",
            // url: "/base/api/Home/GetRecommend",
            url: "/api/Home/GetRecommend",
            data: {
                page: 1,
                pagesize: 10,
                webType: 2,
            },
        }).then((res) => {
            for (let l = 0; l < res.data.data.length; l++) {
                var date = new Date(
                    Number(
                        res.data.data[l].AiCreationTime.replace(
                            "/Date(",
                            ""
                        ).replace(")/", "")
                    )
                );
                var YY = date.getFullYear() + "-";
                var MM =
                    (date.getMonth() + 1 < 10
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth() + 1) + "-";
                var DD =
                    (date.getDate() < 10
                        ? "0" + date.getDate()
                        : date.getDate()) + " ";
                var hh =
                    (date.getHours() < 10
                        ? "0" + date.getHours()
                        : date.getHours()) + ":";
                var mm =
                    (date.getMinutes() < 10
                        ? "0" + date.getMinutes()
                        : date.getMinutes()) + "";
                var ss =
                    date.getSeconds() < 10
                        ? "0" + date.getSeconds()
                        : date.getSeconds();

                res.data.data[l].AiCreationTime = YY + MM + DD + hh + mm;
            }
            this.rmlist = res.data.data;
        });

        this.$axios({
            method: "POST",
            // url: "/base/api/Home/GetRecommend",
            url: "/api/Home/GetRecommend",
            data: {
                page: 1,
                pagesize: 10,
                webType: 1,
            },
        }).then((res) => {
            for (let l = 0; l < res.data.data.length; l++) {
                var date = new Date(
                    Number(
                        res.data.data[l].AiCreationTime.replace(
                            "/Date(",
                            ""
                        ).replace(")/", "")
                    )
                );
                var YY = date.getFullYear() + "-";
                var MM =
                    (date.getMonth() + 1 < 10
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth() + 1) + "-";
                var DD =
                    (date.getDate() < 10
                        ? "0" + date.getDate()
                        : date.getDate()) + " ";
                var hh =
                    (date.getHours() < 10
                        ? "0" + date.getHours()
                        : date.getHours()) + ":";
                var mm =
                    (date.getMinutes() < 10
                        ? "0" + date.getMinutes()
                        : date.getMinutes()) + "";
                var ss =
                    date.getSeconds() < 10
                        ? "0" + date.getSeconds()
                        : date.getSeconds();

                res.data.data[l].AiCreationTime = YY + MM + DD + hh + mm;
            }
            this.newlist = res.data.data;
        });
    },
    methods: {
        handleScrollx4() {
            let that = this;
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.querySelector(".page-component__scroll")
                .scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.querySelector(".page-component__scroll")
                .clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.querySelector(".page-component__scroll")
                .scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight == scrollHeight) {
                //到了这个就可以进行业务逻辑加载后台数据了
                that.page++;
                if (!that.nodata) {
                    that.$axios({
                        method: "POST",
                        // url: "/base/api/Home/GetRecommend",
                        url: "/api/Home/GetRecommend",
                        data: {
                            page: that.page,
                            pagesize: 10,
                            webType: 1,
                        },
                    }).then((res) => {
                        if (res.data.data.length == 0) {
                            that.nodata = true;
                            return;
                        }
                        for (let l = 0; l < res.data.data.length; l++) {
                            var date = new Date(
                                Number(
                                    res.data.data[l].AiCreationTime.replace(
                                        "/Date(",
                                        ""
                                    ).replace(")/", "")
                                )
                            );
                            var YY = date.getFullYear() + "-";
                            var MM =
                                (date.getMonth() + 1 < 10
                                    ? "0" + (date.getMonth() + 1)
                                    : date.getMonth() + 1) + "-";
                            var DD =
                                (date.getDate() < 10
                                    ? "0" + date.getDate()
                                    : date.getDate()) + " ";
                            var hh =
                                (date.getHours() < 10
                                    ? "0" + date.getHours()
                                    : date.getHours()) + ":";
                            var mm =
                                (date.getMinutes() < 10
                                    ? "0" + date.getMinutes()
                                    : date.getMinutes()) + "";
                            var ss =
                                date.getSeconds() < 10
                                    ? "0" + date.getSeconds()
                                    : date.getSeconds();

                            res.data.data[l].AiCreationTime =
                                YY + MM + DD + hh + mm;
                        }
                        res.data.data.forEach((c) => {
                            that.newlist.push(c);
                        });
                    });
                }
            }
        },
        openURLrm(index) {
            let url = this.rmlist[index].AiUrl;
            this.$axios({
                method: "POST",
                // url: "/base/api/Home/ArticleClick",
                url: "/api/Home/ArticleClick",
                data: {
                    LinkId: this.rmlist[index].AiId,
                    clickTp: 2,
                },
            }).then((res) => {});
            window.open(url, "_blank");
        },
        openURLnew(index) {
            let url = this.newlist[index].AiUrl;
            this.$axios({
                method: "POST",
                // url: "/base/api/Home/ArticleClick",
                url: "/api/Home/ArticleClick",
                data: {
                    LinkId: this.newlist[index].AiId,
                    clickTp: 2,
                },
            }).then((res) => {});
            window.open(url, "_blank");
        },
    },
};
</script>

<style  lang='scss'>
.msgwarp {
    width: 1410px;
    margin: 27px auto 10px auto;
    display: flex;

    .msgleft {
        width: 370px;
        border: 1px solid #28292a;
        border-radius: 6px;
        .ltiele {
            width: 355px;
            height: 50px;
            padding-left: 15px;
            color: white;
            font-size: 18px;
            display: flex;
            align-items: center;
        }
        .msgleitem {
            width: 355px;
            height: 60px;
            padding-left: 15px;
            display: flex;
            align-items: center;

            cursor: pointer;
            .msgindex {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: black;
                margin-right: 12px;
                background-image: linear-gradient(#fff356, #ffcb37);
                border-radius: 50px;
            }
            .msgindex2 {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: black;
                margin-right: 12px;
                background-image: linear-gradient(#ebebeb, #c4c1b9);
                border-radius: 50px;
            }
            .msgindex3 {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: black;
                margin-right: 12px;
                background-image: linear-gradient(#ffb68f, #dd772f);
                border-radius: 50px;
            }
            .msgindex4 {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                margin-right: 12px;
                border-radius: 50px;
            }
            .msgltitle {
                font-size: 14px;
                width: 300px;
                color: white;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .msgltitle:hover {
                font-size: 14px;
                width: 300px;
                color: #ef190f;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .msgltitme {
                color: #707889;
                font-size: 12px;
                margin-top: 8px;
                display: flex;
            }
        }
    }
    .msgleft2 {
        width: 370px;
        position: fixed;
        top: 120px;
        border: 1px solid #28292a;
        border-radius: 6px;
        .ltiele {
            width: 355px;
            height: 50px;
            padding-left: 15px;
            color: white;
            font-size: 18px;
            display: flex;
            align-items: center;
        }
        .msgleitem {
            width: 355px;
            height: 60px;
            padding-left: 15px;
            display: flex;
            align-items: center;

            cursor: pointer;
            .msgindex {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: black;
                margin-right: 12px;
                background-image: linear-gradient(#fff356, #ffcb37);
                border-radius: 50px;
            }
            .msgindex2 {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: black;
                margin-right: 12px;
                background-image: linear-gradient(#ebebeb, #c4c1b9);
                border-radius: 50px;
            }
            .msgindex3 {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: black;
                margin-right: 12px;
                background-image: linear-gradient(#ffb68f, #dd772f);
                border-radius: 50px;
            }
            .msgindex4 {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                margin-right: 12px;
                border-radius: 50px;
            }
            .msgltitle {
                font-size: 14px;
                width: 300px;
                color: white;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .msgltitle:hover {
                font-size: 14px;
                width: 300px;
                color: #ef190f;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .msgltitme {
                color: #707889;
                font-size: 12px;
                margin-top: 8px;
                display: flex;
            }
        }
    }
    .msgright {
        width: 1020px;
        border: 1px solid #28292a;
        border-radius: 6px;
        margin-left: 20px;
        .rtiele {
            width: 1005px;
            height: 50px;
            padding-left: 15px;
            color: white;
            font-size: 18px;
            display: flex;
            align-items: center;
        }
        .ritme {
            width: 1005px;
            height: 97px;
            padding-left: 15px;
            margin-bottom: 15px;
            display: flex;
            border-radius: 6px;
            align-items: center;
            cursor: pointer;
            .rightimg {
                width: 17px;
                height: 17px;
                margin-left: 25px;
                background-image: url(../../assets/r2.png);
                background-size: cover;
            }
            .rtitle {
                width: 929px;
                font-size: 18px;
                color: white;
            }

            .msgrtitme {
                color: #707889;
                font-size: 12px;
                margin-top: 18px;
                display: flex;
            }
        }
        .ritme:hover {
            background-color: #171717;
            border-radius: 6px;
            .rtitle {
                color: #ef190f;
            }
            .rightimg {
                width: 17px;
                height: 17px;
                margin-left: 25px;
                background-image: url(../../assets/r1.png);
                background-size: cover;
            }
        }
    }
    .msgright2 {
        margin-left: 390px;
        width: 1020px;
        border: 1px solid #28292a;
        border-radius: 6px;
        .rtiele {
            width: 1005px;
            height: 50px;
            padding-left: 15px;
            color: white;
            font-size: 18px;
            display: flex;
            align-items: center;
        }
        .ritme {
            width: 1005px;
            height: 97px;
            padding-left: 15px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .rightimg {
                width: 17px;
                height: 17px;
                margin-left: 25px;
                background-image: url(../../assets/r2.png);
                background-size: cover;
            }
            .rtitle {
                width: 929px;
                font-size: 18px;
                color: white;
            }

            .msgrtitme {
                color: #707889;
                font-size: 12px;
                margin-top: 18px;
                display: flex;
            }
        }
        .ritme:hover {
            background-color: #171717;
            .rtitle {
                color: #ef190f;
            }
            .rightimg {
                width: 17px;
                height: 17px;
                margin-left: 25px;
                background-image: url(../../assets/r1.png);
                background-size: cover;
            }
        }
    }
}
</style>
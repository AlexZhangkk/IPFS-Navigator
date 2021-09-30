<template>
    <div>
        <div class="tjwarp">
            <!-- <vue-seamless-scroll :data="tjlist" class="seamless-warp" :class-option="classOption">
        <div style="width:100%;display:flex">
          <div
            class="itemwarp"
            v-for="(item,index) in tjlist"
            :key="item.AiId"
            @click="open(index)"
          >
            <img class="icon" :src="item.NwIcon" alt />
            <div class="font">
              <div class="fonttile">{{item.NwName}}</div>
              <div class="fontctx" :title="item.NwBriefIntroduction">{{item.NwBriefIntroduction}}</div>
            </div>
          </div>
        </div>
      </vue-seamless-scroll> -->
            <swiper
                :options="swiperOption"
                ref="mySwiper"
                v-if="tjlist.length"
                style="width: 1370px; display: flex"
            >
                <!-- <div > -->
                <swiper-slide class="itemwarp"
                    v-for="(item,index) in tjlist"
                     @click="openurl2(index)"
                    :key="item.AiId" >
                    <div       @click="openurl2(index)" style="display:flex;    align-items: center;">
                                            <img class="icon" :src="item.NwIcon" alt />
                    <div class="font">
                        <div class="fonttile">{{ item.NwName }}</div>
                        <div class="fontctx" :title="item.NwBriefIntroduction">
                            {{ item.NwBriefIntroduction }}
                        </div>
                    </div>
                    </div>

                </swiper-slide>
                <!-- </div> -->
                　　
                <div class="swiper-pagination" slot="pagination"></div>

                <!-- <div
                    class="swiper-button-prev"
                    slot="button-prev"
                    @click="prev"
                ></div>
                　　
                 <div
                    class="swiper-button-next"
                    slot="button-next"
                    @click="next"
                ></div> -->
            </swiper>
            <img
                style="width: 11px; height: 14px; top: 60px; left: 0px"
                slot="button-prev"
                class="swiper-button-prev"
                src="../../assets/LL.png"
                alt=""
                @click="prev"
            />
            <img
                style="width: 11px; height: 14px; top: 60px; right: 0px"
                slot="button-next"
                class="swiper-button-next"
                src="../../assets/RR.png"
                alt=""
                @click="next"
            />
        </div>
        <div class="twarp">
            <div :class="fixedfw ? 'leftwarp2' : 'leftwarp'">
                <div class="lefttitle">分类</div>
                <div class="itemwarp" style="height: 1000px">
                    <div
                        v-for="(item, index) in list"
                        v-show="item.Websites.length > 0"
                        @click="scrollTo(index)"
                        :key="item.index"
                        :class="item.check ? 'item-check' : 'item'"
                    >
                        {{ item.NcName }}
                    </div>
                </div>
            </div>
            <div class="rightwap">
                <div
                    v-for="(item, index2) in list"
                    v-show="item.Websites.length > 0"
                    :key="item.NcId"
                    :class="fixedfw ? 'rightwap2' : 'rightwap3'"
                >
                    <div class="righttitle">
                        <img src="../../assets/t.png" class="fang" />
                        <div class="font">{{ item.NcName }}</div>
                    </div>
                    <div class="itemwap">
                        <div
                            class="item"
                            v-for="(it, index3) in item.Websites"
                            :key="it.NwId"
                            @click="openurl(index2, index3)"
                            @mouseenter="collectionIn(index2, index3)"
                            @mouseleave="collectionOut(index2, index3)"
                        >
                            <img :src="it.NwIcon" alt class="itemicon" />
                            <div class="itemr">
                                <div class="title">{{ it.NwName }}</div>
                                <div class="nm" :title="it.NwBriefIntroduction">
                                    {{ it.NwBriefIntroduction }}
                                </div>
                            </div>
                            <img
                                @click.stop="collection(index2, index3)"
                                class="scicon"
                                v-show="it.isShow"
                                :src="it.iscollection ? sc1img : sc2img"
                                alt
                            />
                        </div>
                        <div
                            class="item tuiJian"
                            style="displey: flex; justify-content: center"
                            @click="addwz(index2)"
                        >
                            <img class="addf" src="../../assets/add.png" alt />
                            <div>推荐网站</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="addwz">
            <el-dialog :visible.sync="dialogTableVisible">
                <img class="xbtn" src="../../assets/x.png" alt @click="close" />
                <div
                    style="
                        font-size: 18px;
                        color: white;
                        margin-left: 20px;
                        margin-top: 20px;
                        margin-bottom: 20px;
                    "
                >
                    推荐网站
                </div>
                <div class="addtitle1">
                    <div style="margin-left: 20px">*推荐网站名称</div>
                    <div style="margin-left: 120px">*推荐网站的地址</div>
                </div>
                <div>
                    <input
                        type="text"
                        class="nameinput"
                        v-model="username"
                        placeholder="输入推荐网站名称"
                    />
                    <input
                        type="text"
                        class="urlinput"
                        v-model="userurl"
                        placeholder="输入推荐网站的地址"
                    />
                </div>
                <div class="addtitle1">
                    <div style="margin-left: 20px; margin-top: 20px">
                        建议分类(选填)
                    </div>
                </div>
                <div
                    v-if="addlist.length > 0"
                    :class="addlist.length > 0 ? 'addlei' : 'addlei2'"
                >
                    <div
                        class="flitem"
                        v-for="(item, index6) in addlist"
                        :key="item.index"
                    >
                        <div class="flname">{{ item.NcName }}</div>
                        <img
                            class="fontx"
                            src="../../assets/x.png"
                            @click="checkx(index6)"
                        />
                    </div>
                </div>
                <input
                    type="text"
                    v-if="addlist.length == 0"
                    class="addlei2"
                    v-model="classname"
                />
                <div class="addl">
                    <div
                        class="additem"
                        v-for="(item, index5) in list"
                        v-show="item.Websites.length > 0"
                        :key="item.index"
                        @click="checkaddl(index5)"
                    >
                        {{ item.NcName }}
                    </div>
                </div>
                <div class="addtitle1">
                    <div style="margin-left: 20px; margin-top: 20px">
                        网站简介(选填)
                    </div>
                </div>
                <input
                    type="text"
                    class="jsinput"
                    v-model="useradd"
                    placeholder="用一句话介绍该网站"
                />
                <div class="addbtn">
                    <div class="qxbtn" @click="qxbtn">取消</div>
                    <div class="qdbtn" @click="sunbit">确定</div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { EventBus } from "../../../event-bus.js";
import vueSeamlessScroll from "vue-seamless-scroll";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
    components: {
        vueSeamlessScroll,
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            list: [],
            tjlist: [],
            addlist: [],
            dialogTableVisible: false,
            username: "",
            userurl: "",
            useradd: "",
            ix: "",
            collectinlist: "",
            sc: 0,
            haslogin: false,
            fixedfw: false,
            classname: "",
            swiperOption: {
                observer: true,
                slidesPerView: "auto",
                centeredSlidesBounds: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            },
        };
    },
    computed: {
        classOption() {
            return {
                step: 0.4, // 数值越大速度滚动越快
                // limitMoveNum: this.tjlist.length, // 开始无缝滚动的数据量 this.dataList.length
                limitMoveNum: this.tjlist.length, // 开始无缝滚动的数据量 this.dataList.length
                hoverStop: true, // 是否开启鼠标悬停stop
                direction: 2, // 0向下 1向上 2向左 3向右
                openWatch: true, // 开启数据实时监控刷新dom
                singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
            };
        },
    },
    mounted() {
        window.addEventListener("scroll", this.handleScrollx2, true);
        if (!this.$store.state.haslogin) {
            this.haslogin = false;
            // console.log(this.$store.state.haslogin)
        }
        if (this.$store.state.haslogin == "true") {
            this.haslogin = true;
        }
        EventBus.$on("fix", (msg) => {
            // A发送来的消息
            if (msg == true) {
                this.fixedfw = false;
            } else {
                this.fixedfw = true;
            }
        });
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScrollx2);
    },
    methods: {
        close() {
            this.dialogTableVisible = false;
        },
        handleScrollx2(e) {
            // 获取所有锚点元素
            if (this.fixedfw == false) {
                var navContents = document.querySelectorAll("div.rightwap3");
            } else {
                var navContents = document.querySelectorAll("div.rightwap2");
            }

            // console.log(navContents);
            // 所有锚点元素的 offsetTop
            const offsetTopArr = [];
            navContents.forEach((item) => {
                offsetTopArr.push(item.offsetTop);
            });
            // console.log(offsetTopArr);
            // 获取当前文档流的 scrollTop
            const scrollTop = e.target.scrollTop;
            this.sc = e.target.scrollTop;
            // console.log(scrollTop);
            // 定义当前点亮的导航下标
            let navIndex = 0;
            for (let n = 0; n < offsetTopArr.length; n++) {
                // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
                // 那么此时导航索引就应该是n了
                if (scrollTop >= offsetTopArr[n]) {
                    navIndex = n;
                }
            }
        },
        scrollTo(index) {
            this.list.forEach((m, i) => {
                if (index == i) {
                    m.check = true;
                } else {
                    m.check = false;
                }
            });
            let that = this;
            if (this.fixedfw == false) {
                var na = document.querySelectorAll("div.rightwap3");
            } else {
                var na = document.querySelectorAll("div.rightwap2");
            }
            // const na = document.querySelectorAll("div.rightwap2");
            // 获取目标的 offsetTop
            // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
            const targetOffsetTop = na[index].offsetTop;
            // 获取当前 offsetTop
            let scrollTop = that.sc; //拿到点击元素具体离顶部的距离

            // 定义一次跳 50 个像素，
            const STEP = 50;
            // console.log(scrollTop);
            // 判断是往下滑还是往上滑
            if (scrollTop > targetOffsetTop) {
                // 往上滑
                smoothUp();
            } else {
                // 往下滑
                smoothDown();
            }
            // 定义往下滑函数
            function smoothDown() {
                // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
                if (scrollTop < targetOffsetTop) {
                    // 如果和目标相差距离大于等于 STEP 就跳 STEP
                    // 否则直接跳到目标点，目标是为了防止跳过了。
                    if (targetOffsetTop - scrollTop >= STEP) {
                        scrollTop += STEP;
                    } else {
                        scrollTop = targetOffsetTop;
                    }

                    document.querySelector(
                        ".page-component__scroll"
                    ).scrollTop = scrollTop - 50;
                    // console.log(document.documentElement.scrollTop);
                    // document.body.scrollTop = scrollTop;
                    // document.documentElement.scrollTop = scrollTop;
                    requestAnimationFrame(smoothDown);
                }
            }
            // 定义往上滑函数
            function smoothUp() {
                if (scrollTop > targetOffsetTop) {
                    if (scrollTop - targetOffsetTop >= STEP) {
                        scrollTop -= STEP;
                    } else {
                        scrollTop = targetOffsetTop;
                    }
                    document.querySelector(
                        ".page-component__scroll"
                    ).scrollTop = scrollTop - 50;
                    requestAnimationFrame(smoothUp);
                }
            }
        },
        // jump(index) {
        //     let jump = document.querySelectorAll("div.righttitle");
        //     // 获取需要滚动的距离
        //     console.log(jump[index].offsetTop);
        //     let total = jump[index].offsetTop;
        //     let scrollTop =
        //         document.documentElement.scrollTop || document.body.scrollTop;
        //     // Chrome
        //     scrollTop = total;
        //     Firefox;
        //     document.documentElement.scrollTop = total;
        //     // Safari
        //     window.pageYOffset = total;
        // },
        collectionOut(index2, index3) {
            if (this.list[index2].Websites[index3].iscollection == false) {
                this.list[index2].Websites[index3].isShow = false;
            }
        },
        collectionIn(index2, index3) {
            if (this.list[index2].Websites[index3].iscollection == false) {
                this.list[index2].Websites[index3].isShow = true;
            }
        },
        collection(index2, index3) {
            let that = this;
            if (!this.haslogin) {
                EventBus.$emit("ShowLogin", true);
                return;
            }
            if (this.list[index2].Websites[index3].iscollection == true) {
                this.$axios({
                    //删除推荐
                    method: "POST",
                    url: "/base/api/WebCollection/DelUserCollectionByNwId",
                    // url: "/api/WebCollection/DelUserCollectionByNwId",
                    data: {
                        NwId: this.list[index2].Websites[index3].NwId,
                    },
                }).then((res) => {
                    console.log(res);
                    if (res.data.res) {
                        console.log(this.list[index2].Websites[index3]);
                        EventBus.$emit(
                            "demsg",
                            this.list[index2].Websites[index3]
                        );
                        this.list[index2].Websites[index3].iscollection = false;
                        this.list[index2].Websites[index3].isShow = false;
                    }
                });
            } else {
                this.$axios({
                    //添加推荐
                    method: "POST",
                    url: "/base/api/WebCollection/AddUserCollection",
                    // url: "/api/WebCollection/AddUserCollection",
                    data: {
                        WebsiteName: this.list[index2].Websites[index3].NwName,
                        WebsiteUrl: this.list[index2].Websites[index3]
                            .NwWebsite,
                        NwId: this.list[index2].Websites[index3].NwId,
                    },
                }).then((res) => {
                    if (res.data.res) {
                        this.list[index2].Websites[index3].iscollection = true;
                        this.list[index2].Websites[index3].isShow = true;
                        that.list[index2].Websites[index3].WcId = res.data.WcId;
                        console.log(that.list[index2].Websites[index3]);
                        EventBus.$emit(
                            "aMsg",
                            that.list[index2].Websites[index3]
                        );
                    } else if (res.data.error == 6) {
                        this.$message("收藏已装满！清理后再操作吧");
                        return;
                    }
                });
            }
        },
        qxbtn() {
            this.dialogTableVisible = false;
        },
        sunbit() {
            let navName = this.username;
            let navUrl = this.userurl;
            let navIntroduce = this.useradd;

            if (navName.trim().length == 0) {
                this.$message("请输入网站名称");
                return;
            }
            if (navUrl.trim().length == 0) {
                this.$message("请输入网站地址");
                return;
            }

            // let ClassName = this.list[this.ix].NcName;
            console.log(this.list[this.ix]);
            if (this.addlist.length > 0) {
                var ClassName = this.list[this.ix].NcName;
            } else {
                var ClassName = this.classname;
            }
            // let pushitme = {
            //     NwBriefIntroduction: navIntroduce,
            //     NwName: navName,
            // };
            // this.list[this.ix].Websites.push(pushitme);

            this.$axios({
                //添加推荐
                method: "POST",
                // url: "/base/api/Home/AddNavigation",
                url: "/api/Home/AddNavigation",
                data: {
                    navName: navName,
                    navUrl: navUrl,
                    navIntroduce: navIntroduce,
                    ClassName: ClassName,
                },
            }).then((res) => {
                if (res.data.res) {
                    this.$notify({
                        title: "成功",
                        message: "添加成功，请等待后台审核！",
                        type: "success",
                        customClass: "customClass",
                    });
                    this.dialogTableVisible = false;
                } else {
                    this.$message("添加失败");
                    return;
                }
            });
        },
        checkx(index6) {
            this.addlist.splice(index6, 1);
        },
        checkaddl(index5) {
            this.ix = index5;
            (this.addlist = []), this.addlist.push(this.list[index5]);
        },
        openurl2(index) {
            console.log("123");
            let url = this.tjlist[index].NwWebsite;
            window.open(url, "_blank");
            this.$axios({
                method: "POST",
                // url: "/base/api/Home/ArticleClick",
                url: "/api/Home/ArticleClick",
                data: {
                    LinkId: this.tjlist[index].NwId,
                    clickTp: 1,
                },
            }).then((res) => {});
            // window.location.href = url;
        },
        addwz(index2) {
            if (this.haslogin) {
                this.addlist = [];
                this.dialogTableVisible = true;
                this.addlist.push(this.list[index2]);
                this.ix = index2;
            } else {
                EventBus.$emit("ShowLogin", true);
            }
        },
        openurl(index2, index3) {
             console.log("123");
            let url = this.list[index2].Websites[index3].NwWebsite;
            this.$axios({
                method: "POST",
                // url: "/api/Home/ArticleClick",
                url: "/api/Home/ArticleClick",
                data: {
                    LinkId: this.list[index2].Websites[index3].NwId,
                    clickTp: 1,
                },
            }).then((res) => {});
            window.open(url, "_blank");
        },

        prev() {
            this.$refs.mySwiper.$swiper.slidePrev();
            this.$refs.mySwiper.$swiper.slidePrev();
            this.$refs.mySwiper.$swiper.slidePrev();
            this.$refs.mySwiper.$swiper.slidePrev();
            this.$refs.mySwiper.$swiper.slidePrev();
        },
        next() {
            this.$refs.mySwiper.$swiper.slideNext();
            this.$refs.mySwiper.$swiper.slideNext();
            this.$refs.mySwiper.$swiper.slideNext();
            this.$refs.mySwiper.$swiper.slideNext();
            this.$refs.mySwiper.$swiper.slideNext();
        },
    },

    created() {
        if (!this.$store.haslogin) {
        } else {
            //登陆
        }
        this.sc1img = require("../../assets/sc1.png");
        this.sc2img = require("../../assets/sc2.png");
        this.$axios({
            //获取推荐网址
            method: "POST",
            url: "/base/api/Home/GetRecommend",
            // url: "/api/Home/GetRecommend",
            data: {
                page: 1,
                pagesize: 10,
                webType: 0,
            },
        }).then((res) => {
            this.tjlist = res.data.data;
        });
        this.$axios({
            //获取分类
            method: "POST",
            url: "/base/api/Home/GetNavigation",
            // url: "/api/Home/GetNavigation",
            data: {},
        })
            .then((res) => {
                if (res.data.CollectionIds) {
                    this.CollectionIds = res.data.CollectionIds;
                } else {
                    this.CollectionIds = [];
                }

                for (let i = 0; i < res.data.data.length; i++) {
                    // console.log("res.data.data[i].Websites.length:"+res.data.data[i].Websites.length);
                    // if(res.data.data[i].Websites.length==0)
                    // {
                    //     break;
                    // }

                    for (let k = 0; k < res.data.data[i].Websites.length; k++) {
                        if (
                            this.CollectionIds.includes(
                                res.data.data[i].Websites[k].NwId
                            )
                        ) {
                            res.data.data[i].Websites[k].isShow = true;
                            res.data.data[i].Websites[k].iscollection = true;
                        } else {
                            res.data.data[i].Websites[k].isShow = false;
                            res.data.data[i].Websites[k].iscollection = false;
                        }
                    }
                }
                res.data.data.forEach((e) => {
                    e.check = false;
                });
                res.data.data[0].check = true;
                this.list = res.data.data;
            })
            .catch((error) => {});
    },
};
</script>



<style lang='scss'>
// .customClass{

// }
.xbtn {
    position: absolute;
    right: 22px;
    top: 23px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    opacity: 0.7;
}
.tuiJian {
    color: #9198a7 !important;
}
.tuiJian:hover {
    color: white !important;
}
.flitem {
    width: 114px;
    background-color: #32353d;
    height: 30px;
    display: flex;
    align-items: center;
    margin-left: 8px;
    border-radius: 6px 15px 15px 6px;
    margin-bottom: 10px;
}
.flname {
    color: white;
    font-size: 12px;
    width: 70px;
    margin-left: 8px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.fontx {
    width: 16px;
    margin-left: 10px;
    height: 16px;
    background-color: #4b4e55;
    border-radius: 50px;
    margin-right: 5px;
    cursor: pointer;
}
input:focus {
    outline: #32353d;
}
.addwz {
    .addbtn {
        margin-left: auto;
        margin-right: 20px;
        display: flex;
        align-items: center;
        margin-top: 40px;
        margin-bottom: 20px;
        justify-content: flex-end;
        .qxbtn {
            width: 120px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #ef190f;
            border: 1px solid #ef190f;
            border-radius: 6px;
            background-color: #202020;
            margin-right: 10px;
            cursor: pointer;
        }
        .qxbtn:hover {
            width: 120px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #f04d30;
            border: 1px solid #f04d30;
            border-radius: 6px;
            background-color: #202020;
            margin-right: 10px;
            cursor: pointer;
        }
        .qdbtn {
            cursor: pointer;
            width: 120px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: white;
            border: 1px solid #ef190f;
            border-radius: 6px;

            background-color: #ef190f;
        }
        .qdbtn:hover {
            cursor: pointer;
            width: 120px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: white;
            border: 1px solid #ef190f;
            border-radius: 6px;

            background-image: linear-gradient(#f04d30, #ef190f);
            box-shadow: inset 0px 1px 15px#F04D30, 0px 0px 8px #f04d30;
        }
    }
    .addl {
        width: 660px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-left: 20px;
        margin-top: 10px;
        cursor: pointer;
        .additem {
            height: 30px;
            padding-left: 10px;
            padding-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #28292a;
            border-radius: 15px;
            color: #9198a7;
            font-size: 12px;
            margin-right: 5px;
        }
        .additem:hover {
            background-color: #28292a;
            height: 30px;
            padding-left: 10px;
            padding-right: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #28292a;
            border-radius: 15px;
            color: #9198a7;
            font-size: 12px;
            margin-right: 5px;
        }
    }
    .addlei {
        width: 640px;
        margin-left: 20px;
        padding-left: 10px;
        padding-right: 10px;
        background-color: #28292a;
        border-radius: 3px;
        /* height: 40px; */
        margin-top: 10px;
        display: flex;
        align-items: center;
        /* overflow: hidden; */
        flex-wrap: wrap;
        padding-top: 10px;
    }
    .addlei2 {
        width: 640px;
        margin-left: 20px;
        padding-left: 10px;
        padding-right: 10px;
        background-color: #28292a;
        border-radius: 3px;
        height: 50px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        /* overflow: hidden; */
        flex-wrap: wrap;
        color: white;
        &:focus {
            padding-left: 10px;
            padding-right: 10px;
            width: 640px;
            outline: #32353d;
            height: 50px;
            background-color: #28292a !important;
            color: white;
            margin-top: 10px;
            margin-left: 20px;
            box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.075),
                0px 0px 8px rgba(0, 0, 0, 0.4);
        }
    }
    .addtitle1 {
        color: white;
        font-size: 13px;
        display: flex;
        align-items: center;
    }
    .jsinput {
        width: 640px;
        height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        color: white;
        font-size: 13px;
        background-color: #28292a;
        margin-top: 10px;
        margin-left: 20px;
        border-radius: 3px;
        &:focus {
            width: 640px;
            outline: #32353d;
            height: 40px;
            background-color: #28292a !important;
            color: white;
            margin-top: 10px;
            margin-left: 20px;
            padding-left: 10px;
            padding-right: 10px;
            box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.075),
                0px 0px 8px rgba(0, 0, 0, 0.4);
        }
    }
    .nameinput {
        width: 170px;
        height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        color: white;
        font-size: 13px;
        background-color: #28292a;
        margin-top: 10px;
        margin-left: 20px;
        border-radius: 3px;
        &:focus {
            width: 170px;
            outline: #32353d;
            height: 40px;
            background-color: #28292a !important;
            color: white;
            margin-top: 10px;
            margin-left: 20px;
            padding-left: 10px;
            box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.075),
                0px 0px 8px rgba(0, 0, 0, 0.4);
        }
    }

    .urlinput {
        border-radius: 3px;
        width: 440px;
        height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        color: white;
        font-size: 13px;
        background-color: #28292a;
        margin-top: 10px;
        margin-left: 10px;
        &:focus {
            width: 440px;
            outline: #32353d;
            height: 40px;
            background-color: #28292a !important;
            color: white;
            margin-top: 10px;
            margin-left: 10px;
            padding-left: 10px;
            box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.075),
                0px 0px 8px rgba(0, 0, 0, 0.4);
        }
    }
    .el-dialog__header {
        display: none;
    }
    .el-dialog {
        width: 700px !important;
        margin-top: 210px !important;
        border-radius: 10px;
    }
    .el-dialog__body {
        width: 700px;
        padding: 0;
        overflow-y: hidden;
        background-color: #202020;
        border-radius: 6px;
    }
}
.tjwarp {
    margin-top: 10px;
    width: 1410px;
    margin: 0 auto;
    color: white;
    height: 87px;
    // height: 85px;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    // overflow: hidden;
    .seamless-warp {
        width: 1410px;
        margin: 0 auto;
        color: white;
        height: 85px;
        display: flex;
        overflow: hidden;
    }
    .itemwarp {
        height: 80px;
        width: 238px;
        margin-top: 5px;
        background-color: #202020;
        border: 1px solid #28292a;
        border-radius: 6px;
        display: flex;
        align-items: center;
        margin-right: 20px;
        flex-shrink: 0;
        cursor: pointer;
        .icon {
            width: 50px;
            height: 50px;
            margin-left: 15px;
            border-radius: 50px;
        }
        .font {
            margin-left: 15px;
            .fonttile {
                font-size: 14px;
                width: 152px;
                color: white;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .fontctx {
                font-size: 12px;
                width: 152px;
                color: #707889;
                margin-top: 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
    .itemwarp:hover {
        height: 80px;
        width: 238px;
        margin-top: 0px;
        background-color: #202020;
        border: 1px solid #38393b;
        border-radius: 6px;
        display: flex;
        align-items: center;
        margin-right: 20px;
        flex-shrink: 0;
        box-shadow: 0px 1px 1px #000000;
    }
}
.twarp {
    width: 1410px;
    margin: 27px auto 10px auto;
    height: 50px;
    display: flex;
    .leftwarp2 {
        width: 110px;
        position: fixed;
        top: 110px;
        .lefttitle {
            width: 110px;
            height: 50px;
            color: #707889;
            font-size: 18px;
            display: flex;
            align-items: center;
        }
        .itemwarp {
            width: 108px;
            border-left: 1px solid #2e2e30;
            padding-bottom: 230px;
            .item {
                width: 95px;
                height: 40px;
                padding-left: 15px;
                color: white;
                display: flex;
                align-items: center;
                cursor: pointer;
                margin-top: 10px;
                font-size: 13px;
                font-weight: 200;
            }
            .item:hover {
                width: 95px;
                height: 40px;
                padding-left: 15px;
                color: #ef190f;
                display: flex;
                align-items: center;
                cursor: pointer;
                margin-top: 10px;
            }
            .item-check {
                cursor: pointer;
                width: 95px;
                height: 40px;
                padding-left: 15px;
                color: #ef190f;
                display: flex;
                align-items: center;
                border-left: 1px solid #ef190f;
                margin-top: 10px;
                font-size: 13px;
            }
        }
    }
    .leftwarp {
        width: 110px;
        .lefttitle {
            width: 110px;
            height: 50px;
            color: #707889;
            font-size: 18px;
            display: flex;
            align-items: center;
        }
        .itemwarp {
            width: 108px;
            border-left: 1px solid #2e2e30;
            padding-bottom: 230px;
            .item {
                width: 95px;
                height: 40px;
                padding-left: 15px;
                color: white;
                display: flex;
                align-items: center;
                cursor: pointer;
                margin-top: 10px;
                font-size: 13px;
            }
            .item:hover {
                width: 95px;
                height: 40px;
                padding-left: 15px;
                color: #ef190f;
                display: flex;
                align-items: center;
                cursor: pointer;
                margin-top: 10px;
            }
            .item-check {
                cursor: pointer;
                width: 95px;
                height: 40px;
                padding-left: 15px;
                color: #ef190f;
                display: flex;
                align-items: center;
                border-left: 1px solid #ef190f;
                margin-top: 10px;
                font-size: 13px;
            }
        }
    }
    .rightwap2 {
        width: 1280px;
        margin-left: 130px;
        .righttitle {
            height: 50px;
            width: 1280px;
            display: flex;
            align-items: center;
            .fang {
                width: 18.75px;
                height: 18.75px;
                margin-right: 10px;
            }
            .font {
                font-size: 18px;
                color: white;
            }
        }
        .itemwap :nth-child(5n) {
            margin-right: 0 !important;
        }
        .itemwap {
            display: flex;
            flex-wrap: wrap;
            width: 1280px;
            margin-top: 10px;
            margin-bottom: 20px;
            .item:hover {
                display: flex;
                align-items: center;
                width: 238px;
                height: 66px;
                border: 1px solid #202020;
                border-radius: 6px;
                cursor: pointer;
                color: #9198a7;
                margin-right: 20px;
                margin-top: 15px;
                position: relative;
            }
            .item {
                display: flex;
                align-items: center;
                width: 238px;
                height: 66px;
                border: 1px solid #202020;
                border-radius: 6px;
                cursor: pointer;
                color: #9198a7;
                margin-right: 20px;
                margin-top: 20px;
                position: relative;
                .addf {
                    width: 30px;
                    height: 30px;
                    margin-right: 15px;
                }
                .itemicon {
                    width: 32px;
                    height: 32px;
                    margin-left: 15px;
                    border-radius: 50px;
                }
                .itemr {
                    color: white;
                    font-size: 14px;
                    margin-left: 15px;
                    width: 145px;
                    .title {
                        width: 145px;
                        overflow: hidden;

                        text-overflow: ellipsis;

                        white-space: nowrap;
                    }
                    .nm {
                        width: 145px;
                        overflow: hidden;

                        text-overflow: ellipsis;

                        white-space: nowrap;
                        font-size: 12px;
                        color: #707889;
                        margin-top: 8px;
                    }
                }
                .scicon {
                    position: absolute;
                    top: 9px;
                    right: 9px;
                    width: 18px;
                    height: 18px;
                }
            }
            .item:hover {
                background-color: #171717;
            }
        }
    }
    .rightwap3 {
        width: 1280px;
        margin-left: 20px;
        .righttitle {
            height: 50px;
            width: 1280px;
            display: flex;
            align-items: center;
            .fang {
                width: 18.75px;
                height: 18.75px;
                margin-right: 10px;
            }
            .font {
                font-size: 18px;
                color: white;
            }
        }
        .itemwap :nth-child(5n) {
            margin-right: 0 !important;
        }
        .itemwap {
            display: flex;
            flex-wrap: wrap;
            width: 1280px;
            margin-top: 10px;
            margin-bottom: 20px;
            .item:hover {
                display: flex;
                align-items: center;
                width: 238px;
                height: 66px;
                border: 1px solid #202020;
                border-radius: 6px;
                cursor: pointer;
                color: white;
                margin-right: 20px;
                margin-top: 15px;
                position: relative;
            }
            .item {
                display: flex;
                align-items: center;
                width: 238px;
                height: 66px;
                border: 1px solid #202020;
                border-radius: 6px;
                cursor: pointer;
                color: white;
                margin-right: 20px;
                margin-top: 20px;
                position: relative;
                .addf {
                    width: 30px;
                    height: 30px;
                    margin-right: 15px;
                }
                .itemicon {
                    width: 32px;
                    height: 32px;
                    margin-left: 15px;
                    border-radius: 50px;
                }
                .itemr {
                    color: white;
                    font-size: 14px;
                    margin-left: 15px;
                    width: 145px;
                    .title {
                        width: 145px;
                        overflow: hidden;

                        text-overflow: ellipsis;

                        white-space: nowrap;
                    }
                    .nm {
                        width: 145px;
                        overflow: hidden;

                        text-overflow: ellipsis;

                        white-space: nowrap;
                        font-size: 12px;
                        color: #707889;
                        margin-top: 8px;
                    }
                }
                .scicon {
                    position: absolute;
                    top: 9px;
                    right: 9px;
                    width: 18px;
                    height: 18px;
                }
            }
            .item:hover {
                background-color: #171717;
            }
        }
    }
}
</style>
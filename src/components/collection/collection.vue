<template>
  <div>
    <div class="cwarp">
      <div class="title">
        <div class="name">我的收藏</div>
        <div class="right" @click="bindcheck" v-if="!ischeck">
          <div class="nmae2">编辑</div>
          <img class="img" src="../../assets/bj.png" alt />
        </div>
        <div class="right2" v-if="ischeck">
          <div class="name quxiao" @click="qx">取消</div>
          <div class="name3 wancheng" @click="wc">完成</div>
        </div>
      </div>
      <div class="itemwarp" v-if="itemlist.length >= 0 && !ischeck">
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
          :title="'Filecoin官网'"
          v-if="!haslogin"
        >
          <div class="itmexixi">IPFS官网</div>
        </div> -->

        <div
          v-if="index < 18"
          class="item"
          v-for="(item, index) in itemlist"
          :key="item.id"
          :title="item.WcName"
          @click="open(index)"
        >
          <div class="itmexixi">{{ item.WcName }}</div>
        </div>

        <div class="black" v-if="itemlist.length == 0 && haslogin">
          🈳️还没有任何收藏呢～
        </div>
        <img
          @click="addimg"
          v-if="itemlist.length < 18"
          class="addimg"
          src="../../assets/add.png"
          alt
        />
      </div>
      <!-- <div class="noitem" v-if="itemlist.length==0">
      <img v-if="haslogin" @click="addimg" class="addimg" src="../../assets/add.png" alt />-->
      <!-- <img class='blackimg' src="../../assets/black.png" alt=""> -->
      <!-- <div class="black">🈳️还没有任何收藏呢～</div>
      </div>-->
      <div class="bjitem" v-if="itemlist.length > 0 && ischeck">
        <draggable
          :options="{ animation: 380 }"
          :list="itemlist"
          @change="change"
          @start="start"
          @end="end"
          :move="move"
          style="display: flex; flex-wrap: wrap"
        >
          <div
            class="item"
            v-for="(item, index) in itemlist"
            :key="item.id"
            v-if="index < 18"
          >
            <img class="leftimg" src="../../assets/itemleft.png" alt />
            <img
              @click="check(index)"
              class="checkimg"
              src="../../assets/check.png"
              alt
            />
            <div class="itmexixi" :title="item.WcName">
              {{ item.WcName }}
            </div>
          </div>
        </draggable>
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
          新增收藏
        </div>
        <div class="addtitle1">
          <div style="margin-left: 20px">*推荐网站名称</div>
          <div style="margin-left: 120px">*推荐网站的地址</div> 
        </div>
        <div style="margin-bottom: 20px; display: flex; align-items: center">
          <input
            type="text"
            class="nameinput1"
            v-model="username"
            placeholder="输入网站名称"
          />
          <input
            type="text"
            class="urlinput1"
            v-model="userurl"
            placeholder="输入网站的地址"
          />
          <div class="qxadd" @click.stop="qradd">确认添加</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../../../event-bus.js";
import draggable from "vuedraggable";

export default {
  name: "collection",
  components: {
    draggable,
  },
  data() {
    return {
      isitem: true,
      ischeck: false,
      itemlist: [],
      dialogTableVisible: false,
      username: "",
      userurl: "",
      WcIds: [], //删除收藏的数组
      oldlist: [],
      haslogin: false,
      ShowLogin: false,
    };
  },
  mounted() {
    // this.haslogin=window.localStorage.getItem('haslogin')
    console.log(this.haslogin);
    EventBus.$on("aMsg", (msg) => {
      // A发送来的消息
      this.msg = msg;
      let addcollect = {
        WcName: msg.NwName,
        WcWebsite: msg.NwWebsite,
        NwId: msg.NwId,
        WcId: msg.WcId,
      };
      this.itemlist.push(addcollect);
      console.log(this.itemlist);
    });
    EventBus.$on("demsg", (msg) => {
      // A发送来的消息
      console.log("下面发送的消息", msg);
      let msgNwId = msg.NwId;
      console.log(this.itemlist);
      this.itemlist.forEach((c, index) => {
        if (c.NwId == msgNwId) {
          this.itemlist.splice(index, 1);
          return;
        }
        if (c.WcNwId == msgNwId) {
          this.itemlist.splice(index, 1);
          return;
        }
      });
    });

    if (!this.$store.state.haslogin) {
      this.itemlist = [];
      this.haslogin = false;
      // console.log(this.$store.state.haslogin)
    }
    if (this.$store.state.haslogin == "true") {
      this.haslogin = true;
      this.$axios({
        //获取收藏
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
        console.log(this.itemlist, "打印初始化的数组");
      });
    }
  },

  methods: {
    change(evt) {
      console.log(evt);
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    start(evt) {
      console.log(evt);
    },
    end(evt) {
      console.log(evt);
      evt.item; //可以知道拖动的本身
      evt.to; // 可以知道拖动的目标列表
      evt.from; // 可以知道之前的列表
      evt.oldIndex; // 可以知道拖动前的位置
      evt.newIndex; // 可以知道拖动后的位置
      console.log(this.itemlist);
      //             接口：/api/WebCollection/PutUserCollectionSort
      // 参数：Ids【网址ID，从前到后依次排序，数组格式】
    },
    move(evt, originalEvent) {
      console.log(evt);
      console.log(originalEvent); //鼠标位置
    },
    check(index) {
      this.WcIds.push(this.itemlist[index].WcId);
      console.log(this.WcIds);
      console.log("index：" + index);
      this.itemlist.splice(index, 1);
    },
    qradd() {
      if (this.username == "") {
        this.$message("网站名称不能为空");
        return;
      }
      if (this.userurl == "") {
        this.$message("网站地址不能为空");
        return;
      }
      this.$axios({
        //添加推荐
        method: "POST",
         url: "/base/api/WebCollection/AddUserCollection",
        // url: "/api/WebCollection/AddUserCollection",
        data: {
          WebsiteName: this.username,
          WebsiteUrl: this.userurl,
        },
      }).then((res) => {
        if (res.data.res) {
          let addcollect = {
            WcName: this.username,
            WcWebsite: this.userurl,
          };
          this.itemlist.push(addcollect);
          EventBus.$emit("Msg", addcollect);
          this.dialogTableVisible = false;
          this.$notify({
            title: "成功",
            message: "添加成功",
            type: "success",
            customClass: "customClass",
          });
        } else if (res.data.error == 6) {
          this.$message("收藏已装满！清理后再操作吧");
          return;
        } else {
          this.$message("添加失败");
          return;
        }
      });
    },
    close() {
      this.dialogTableVisible = false;
    },
    addimg() {
      if (this.$store.state.haslogin == "true") {
        this.dialogTableVisible = true;
      } else {
        this.ShowLogin = true;
        EventBus.$emit("ShowLogin", true);
      }
    },
    open(index) {
      let url = this.itemlist[index].WcWebsite;
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
    bindcheck() {
      if (this.$store.state.haslogin == "true") {
        var objString = JSON.stringify(this.itemlist);
        this.oldlist = JSON.parse(objString);
        this.ischeck = !this.ischeck;
      } else {
        this.ShowLogin = true;
        EventBus.$emit("ShowLogin", true);
      }
    },
    qx() {
      this.itemlist = this.oldlist;
      this.ischeck = !this.ischeck;
      // EventBus.$emit("move", this.oldlist);
    },
    wc() {
      if (this.WcIds != "") {
        this.$axios({
          method: "POST",
          url: "/base/api/WebCollection/DelUserCollection",
          // url: "/api/WebCollection/DelUserCollection",
          data: {
            WcIds: this.WcIds,
          },
        }).then((res) => {
          this.ischeck = !this.ischeck;
          EventBus.$emit("delect", this.WcIds);
          this.$router.go(0);
        });

        EventBus.$emit("move", this.itemlist);
        let Ids = [];
        if (this.itemlist != "") {
          this.itemlist.forEach((c) => {
            Ids.push(c.WcId);
          });
          this.$axios({
            method: "POST",
            url: "/base/api/WebCollection/PutUserCollectionSort",
            // url: "/api/WebCollection/PutUserCollectionSort",
            data: {
              Ids: Ids,
            },
          }).then((res) => {
            console.log(res);
          });
        }
      } else {
        this.ischeck = !this.ischeck;

        EventBus.$emit("move", this.itemlist);
        let Ids = [];
        this.itemlist.forEach((c) => {
          Ids.push(c.WcId);
        });
        this.$axios({
          method: "POST",
          url: "/base/api/WebCollection/PutUserCollectionSort",
          // url: "/api/WebCollection/PutUserCollectionSort",
          data: {
            Ids: Ids,
          },
        }).then((res) => {
          console.log(res);
        });
      }
    },
  },
};
</script>

<style lang='scss'>
.xbtn {
  position: absolute;
  right: 22px;
  top: 23px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  opacity: 0.7;
}
.qxadd {
  width: 120px;
  height: 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EF190F;

  border-radius: 6px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
}
.qxadd:hover {
  width: 120px;
  height: 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: linear-gradient(#F04D30, #EF190F);
  box-shadow: inset 0px 1px 15px#F04D30, 0px 0px 8px #F04D30;
  // opacity: 0.8;
  border-radius: 6px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
}
.nameinput1 {
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
    padding-right: 10px;
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.075),
      0px 0px 8px rgba(0, 0, 0, 0.4);
  }
}

.urlinput1 {
  border-radius: 3px;
  width: 310px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  font-size: 13px;
  background-color: #28292a;
  margin-top: 10px;
  margin-left: 10px;
  &:focus {
    width: 310px;
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

.cwarp {
  // filter: blur(10px);
  //  border-image:linear-gradient(to top,#28292A,hsl(210, 3%, 16%,0)) 1 10;
  border: 1px solid #28292a;
  border-bottom: 0;
  filter: opacity(0.8);
  border-image: -webkit-linear-gradient(#28292a, #171717) 10 20;
  border-image: -moz-linear-gradient(#28292a, #171717) 10 20;
  border-image: linear-gradient(#28292a, #171717) 10 20;
  border-radius: 6px;

  width: 1408px;
  margin: 0 auto;

  margin-top: 55px;
  border-radius: 6px;
  .title {
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
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
      .nmae2:hover {
        color: #ffffff;
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
      .quxiao {
        color: #9198a7;
      }
      .quxiao:hover {
        color: #ffffff;
      }
      .name3 {
        color: #EF190F;
        font-size: 12px;
        margin-left: 15px;
        cursor: pointer;
      }
      .name3:hover {
        color: #F04D30;
      }
    }
  }
  .itemwarp {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    .blackimg {
      width: 18px;
      height: 18px;
      margin-left: 12px;
    }
    .black {
      line-height: 30px;
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
      width: 137px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: white;
      margin-bottom: 10px;
      margin-right: 15px;
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
      width: 137px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: white;
      margin-bottom: 10px;
      margin-right: 15px;
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
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
    .addimg {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
    .blackimg {
      width: 18px;
      height: 18px;
      margin-left: 12px;
    }
    .black {
      margin-left: 12px;
      color: #9198a7;
      font-size: 12px;
    }
  }
  .bjitem {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 137px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: white;
      margin-bottom: 10px;
      margin-right: 15px;
      position: relative;
      background-color: #28292a;
      border-top-left-radius: 6px;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      border-bottom-left-radius: 6px;
      cursor: pointer;
      // padding-right: 15px;
      .itmexixi {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        width: 107px;
      }
      .leftimg {
        display: block;
        width: 5px;
        height: 15px;
        margin-left: 5px;
        margin-right: 5px;
      }
      .checkimg {
        position: absolute;
        right: -4px;
        top: 0;
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
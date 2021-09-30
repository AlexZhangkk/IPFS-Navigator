<template>
    <div v-loading="!load">
        <div class="nodatawarp" v-if="isdata && load">
            未查询到相关文件，请输入正确的Hash
        </div>
        <div class="title22" v-if="!isdata && load">
            <img class="fileimg" src="../assets/file.png" alt />
            <div class="namewarp">
                <div class="name">{{ filename }}</div>
                <div class="size">{{ FileSize }}</div>
            </div>
            <div class="submit" @click="download">下载</div>
        </div>
        <div class="nodatawarp2" v-if="!isdata && filetp == 'image' && load">
            <div style="display: flex; justify-content: center">文件预览</div>
            <div class="demo-image__preview">
                <el-image
                    style="width: 100px; height: 100px"
                    :src="url"
                    :preview-src-list="srcList"
                ></el-image>
            </div>
        </div>
        <div class="nodatawarp2" v-if="!isdata && filetp == 'video' && load">
            <div style="display: flex; justify-content: center">文件预览</div>
            <div class="demo-image__preview">
                <video
                    ref="videoPlayer"
                    controls
                    :src="url"
                    style="width: 100%; height: 100%; object-fit: fill"
                ></video>
            </div>
        </div>
        <div
            class="nodatawarp2"
            v-if="!isdata && filetp != 'video' && filetp != 'image' && load"
        >
            <div style="display: flex; justify-content: center">
                文件暂不能预览，请下载后查看
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from "../../event-bus.js";
export default {
    data() {
        return {
            isdata: false,
            filename: "",
            filetp: "",
            FileSize: "",
            url: "",
            srcList: [],
            load: false,
        };
    },
    beforeDestroy() {
        EventBus.$off("reserch");
    },
    mounted() {
        EventBus.$on("reserch", (msg) => {
            console.log(msg);
            let srcmsg = msg;
            let refilename = "";
            this.load = false;
            this.url = msg;
            console.log(this.url);
            //   this.srcList.push(srcmsg);
            var index = msg.lastIndexOf("/");
            refilename = msg.substring(index + 1, msg.length);
            // reserch发送来的消息
            this.$axios({
                method: "POST",
                // url: "/base/api/Home/GetFileInfo",
                url: "/api/Home/GetFileInfo",
                data: {
                    url: msg,
                },
            }).then((res) => {
                console.log(res.data.FileType);
                this.srcList.push(res.data.url);
                this.url = res.data.url;
                console.log(this.srcList, this.url);
                if (!res.data.res && res.data.error == 8) {
                    this.isdata = true;
                    this.load = true;
                } else {
                    this.isdata = false;
                    refilename =
                        refilename + "." + res.data.FileType.split("/")[1];
                    if (res.data.FileType.indexOf("image")) {
                    }
                    this.filetp = res.data.FileType.split("/")[0];
                    console.log(this.filetp);
                    this.filename = refilename;
                    this.FileSize = res.data.FileSize;
                    this.load = true;
                }
            });
        });
        let filename = "";
        // this.srcList.push(this.$route.query.url);

        var index = this.$route.query.url.lastIndexOf("/");
        filename = this.$route.query.url.substring(
            index + 1,
            this.$route.query.url.length
        );
        // this.FileIsExists(this.$route.query.url);
        this.$axios({
            method: "POST",
            // url: "/base/api/Home/GetFileInfo",
            url: "/api/Home/GetFileInfo",
            data: {
                url: this.$route.query.url,
            },
        }).then((res) => {
            this.srcList.push(res.data.url);
            this.url = res.data.url;
            console.log(this.srcList, this.url);
            if (!res.data.res && res.data.error == 8) {
                this.isdata = true;
                this.load = true;
            } else {
                this.isdata = false;
                var index2 = res.data.FileType.lastIndexOf("/");
                filename =
                    filename +
                    "." +
                    res.data.FileType.substring(
                        index2 + 1,
                        res.data.FileType.length
                    );
                var index3 = res.data.FileType.indexOf("/");
                let filetp = res.data.FileType.substring(0, index3);
                this.filetp = filetp;
                console.log(this.filetp);
                this.filename = filename;
                this.FileSize = res.data.FileSize;
                this.load = true;
            }
        });
        console.log(this.url);
    },
    methods: {
        download() {
            //
            // 　　　　　　let url = window.URL.createObjectURL(new Blob([this.url])) //创建下载链接
            // 　　　　　　let link = document.createElement('a') //创建a标签
            // 　　　　　　link.style.display = 'none'  //将a标签隐藏
            // 　　　　　　link.href = url  //给a标签添加下载链接
            // 　　　　　　link.setAttribute('download', this.filename) // 此处注意，要给a标签添加一个download属性，属性值就是文件名称 否则下载出来的文件是没有属性的，空白白
            // 　　　　　　document.body.appendChild(link)
            // 　　　　　　link.click()  //执行a标签

            let downurl = this.url;
            window.open(downurl, "_blank");
        },
    },
};
</script>

<style lang='scss'>
.nodatawarp {
    width: 1020px;
    height: 506px;
    border: 1px solid #28292a;
    margin: 0 auto;
    margin-top: 20px;
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    font-weight: bold;
}
.nodatawarp2 {
    width: 1020px;
    padding-bottom: 50px;
    border: 1px solid #28292a;
    margin: 0 auto;
    margin-top: 20px;
    color: white;
    font-size: 12px;
    justify-content: center;
    padding-top: 20px;
    font-weight: bold;
    .demo-image__preview {
        margin-top: 20px;
        //width: 361px;
        width: 600px;
        height: 395px;
        display: flex;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        .el-image {
            width: 100% !important;
            height: 100% !important;
        }
    }
}
.title22 {
    margin: 0 auto;
    width: 1020px;
    height: 97px;
    background-color: #202020;
    display: flex;
    align-items: center;
    margin-top: 20px;
    border-radius: 6px;
    .fileimg {
        width: 78px;
        height: 78px;
        margin-left: 15px;
    }
    .namewarp {
        margin-left: 15px;
        color: white;
        font-size: 18px;
        .name {
            width: 700px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 25px;
        }
        .size {
            color: #707889;
            font-size: 12px;
            margin-top: 10px;
        }
    }
    .submit {
        width: 120px;
        height: 40px;
        justify-content: flex-end;
        margin-left: auto;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-image: linear-gradient(#f04d30, #ef190f);
        box-shadow: inset 0px 1px 1px#F04D30, 0px 0px 8px #f04d30;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
    }
    .submit:hover {
        width: 120px;
        height: 40px;
        justify-content: flex-end;
        margin-left: auto;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        background-image: linear-gradient(#f04d30, #ef190f);
        box-shadow: inset 0px 1px 1px#F04D30, 0px 0px 8px #f04d30;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        opacity: 0.8;
    }
}
</style>
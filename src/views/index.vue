<template>
    <div>
        <div style="width:100%">
        <div class="in_title">
            <div :class="checktitle ? 'title2' : 'title' " @click="check1">导航推荐</div>
            <div :class="!checktitle ? 'title2' : 'title'" @click="check2">最新消息</div>
        </div>
        </div>
        <component :is="cpname" style="background-color:#111111"></component>
    </div>
</template>

<script>
import recommend from "@/components/recommend/recommend";
import message from "@/components/message/message";
export default {
    name: "index",
    data() {
        return {
            checktitle: true,
        };
        
    },
    components: {
        recommend,
        message,
    },
    methods: {
        check1() {
            if (!this.checktitle) {
                this.checktitle = !this.checktitle;
                this.cpname = recommend;
            }
        },
        check2() {
            if (this.checktitle) {
                this.checktitle = !this.checktitle;
                this.cpname = message;
            }
        },
    },
    created() {
        this.cpname = "recommend";
    },
};
</script>

<style lang='scss'>
.in_title {
    height: 70px;
    width: 1410px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    font-size: 16px;
    color: #707889;
    margin-bottom: 5px;
    .title {
        width: 110px;
        margin-right: 20px;
        cursor: pointer;
        height: 22px;
    }
    .title2 {
        width: 110px;
        margin-right: 20px;
        cursor: pointer;
        height: 22px;
        color: #EF190F;
    }
    .title:hover {
        color: #EF190F;
    }
}
</style>
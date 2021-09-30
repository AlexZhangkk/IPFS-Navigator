<template>
    <div>
        <div
            class="warp"
            :style="
                isfouc
                    ? 'background-color: #202020;'
                    : 'background-color: #28292A;'
            "
        >
            <input
                :class="isfouc ? 'input-warp' : 'input-warp2'"
                type="text"
                @focus="bindfocus"
                @blur="bindblur"
                placeholder="请输入Qm开头的IPFS Hash"
                v-model="userurl"
            />
            <img
                @click="serch"
                class="serchimg"
                src="../../assets/serch.png"
                alt
            />
        </div>
        <slot></slot>
    </div>
</template>

<script>
import { EventBus } from "../../../event-bus.js";
export default {
    name: "serch",
    data() {
        return {
            value: "",
            isfouc: true,
            userurl: "",
        };
    },

    methods: {
        SerchChange() {
            if (!/^Qm.*/.test(this.userurl)) {
                this.$message("请输入Qm开头的IPFS Hash");
                return;
            }
        },
        serch() {
            if (this.userurl == "") {
                this.$message("请输入查询值！");
                return;
            }
            if (!/^Qm.*/.test(this.userurl)) {
                this.$message("请输入Qm开头的IPFS Hash");
                return;
            }
            if (this.$route.path == "/serch") {
                EventBus.$emit("reserch", this.userurl);
                return;
            } else {
                this.$router.push({
                    path: "/serch",
                    query: { url: this.userurl },
                });
            }
        },
        bindfocus() {
            this.isfouc = false;
            this.value = "I 请输入Qm开头的IPFS Hash";
        },
        bindblur() {
            (this.isfouc = true), (this.value = "");
        },
    },
};
</script>

<style lang='scss' >
.warp {
    input::-ms-input-placeholder {
        text-align: center;
        font-size: 13px;
    }
    input::-webkit-input-placeholder {
        text-align: center;
        font-size: 13px;
    }
    input:focus {
        outline: #32353d;
    }
    width: 890px;
    height: 40px;
    background-color: #202020;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    .input-warp {
        width: 816px;
        height: 18px;
        color: #fff;
        text-align: center;
        background-color: #202020;
        border: 1px solid #202020;
        font-size: 13px;
    }
    .input-warp2 {
        background-color: #28292a;
        width: 816px;
        height: 18px;
        color: #fff;
        text-align: center;
        border: 1px solid #28292a;
        font-size: 13px;
    }
    .serchimg {
        width: 19px;
        height: 19px;
        margin-left: 18px;
        cursor: pointer;
        position: relative;
    }
}
</style>
<template>
    <div class="page-component__scroll">
        <el-backtop target=".page-component__scroll">
            <img class="backtp" src="../../assets/backtop.png" />
        </el-backtop>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Backtop",
};
</script>

<style >
.page-component__scroll {
    position: absolute;
    top: 110px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
    background-color: #111111;
    min-width: 1440px;
    margin-top: -40px;
}
.el-backtop {
    background-color: #EF190F;
    border-radius: 6px;
    height: 36px;
    width: 36px;
}
.el-backtop:hover {
    background-color: #F04D30;
    border-radius: 6px;
    height: 36px;
    width: 36px;
}
.backtp {
    width: 28.88px;
    height: 26px;
}
</style>
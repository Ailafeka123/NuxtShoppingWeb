<script lang="ts" setup>
    defineProps<{open:boolean}>();
    // defineEmits<{}>
</script>

<style lang="scss" module="style">
    .forgetPasswordAlterDiv{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        height: 300px;
        background-color: #fff;
        border: black 2px solid;
        transition: all 0.5s linear;
        transform: translate(-50%,-50%);
    }
</style>

<template>
    <div :class="style.forgetPasswordAlterDiv">
        

    </div>
</template>
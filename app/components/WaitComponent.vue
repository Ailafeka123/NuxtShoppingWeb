<script setup lang="ts">
    const alterProps = defineProps<{checkText:string, openState:boolean }>()
</script>

<style lang="scss" module="style">
    .alterDiv{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 10001;
        .checkDiv{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            background-color: #fff;
            border: 4px solid black;
            border-radius: 8px;
            z-index: 10002;
            &.checkHidden{
                display: none;
            }
        }
    }
</style>

<template>
    <div :class="style.alterDiv">
        <div :class="[style.checkDiv, { [style.checkHidden]: !alterProps.openState} ]">
            <p>{{ alterProps.checkText }}</p>
        </div>
    </div>
</template>
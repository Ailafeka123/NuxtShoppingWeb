<script setup lang="ts">
    const props = defineProps<{"openState":boolean,"alterText":string[]}>();
    const Emit = defineEmits<{(e:"openState"):void,(e:"clickButton", value:boolean):void}>();
    const clickButtonFunction = (value:boolean) =>{
        Emit("clickButton",value);
        Emit("openState");
    }
</script>

<style lang="scss" module= "style">
    .comfireComponentDiv{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background-color: rgba(0, 0, 0 ,0.3);
        .comfireDiv{
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: calc( (10/12) *100%);

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;

            border-radius: 8px;
            border:2px solid black;
            padding:16px;
            background-color: #fff;
            z-index: 10000;

            @media(min-width:768px){
                max-width: 768px;
            }
            .comfireTextDiv{

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
            }
            .buttonDiv{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                width: 100%;
            }
        }

    }
</style>

<template>
    <div :class="style.comfireComponentDiv">
        <div :class="style.comfireDiv">
            <div :class="style.comfireTextDiv">
                <p v-for="(text,key) in props.alterText" :key="key">
                    {{text}}
                </p>
            </div>
            <div :class="style.buttonDiv">
                <button type="button" @click="clickButtonFunction(true)">確認</button>
                <button type="button" @click="clickButtonFunction(false)">取消</button>
            </div>
        </div>
    </div>
</template>
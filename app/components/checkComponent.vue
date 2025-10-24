<script setup lang="ts">
    import { ref } from 'vue';
    const alterProps = defineProps<{checkText:string, openState:boolean }>()
    console.log(`alterProps = `,alterProps.openState)
</script>

<style lang="scss" module="style">
    .checkDiv{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        width: calc((10/12)*100%);
        height: 80%;
        background-color: #fff;
        border: 2px solid black;
        border-radius: 8px;
        z-index: 99;
        @media(min-width:768px){
            
        }
        &.checkHidden{
            display: none;
        }
    }
</style>

<template>
    <div :class="[style.checkDiv, { [style.checkHidden]: !alterProps.openState} ]">
        <p>{{ alterProps.checkText }}</p>
    </div>
</template>
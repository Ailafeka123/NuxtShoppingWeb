<script lang="ts" setup >
</script>
<style lang="scss" module="style" >
    .header{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding:0 16px;
        position:fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        height: var(--menuHeight);
        border:var(--textColor) 1px solid;
        box-sizing: border-box;
        background-color: var(--background);
        .icon{
            width: 40px;
            height: 40px;
        }
        .itemDiv{
            padding: 0 16px;
            ul{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 16px;
            }
        }
    }
</style>
<template>

    <header :class="style.header">
        <div>
            <NuxtLink to="/">
                <img src="/selficon/selficon.svg"  :class=[style.icon] alt="icon">
            </NuxtLink>
            
        </div>

        <div :class="style.itemDiv">
            <ul>
                <li>
                <NuxtLink to="/login">
                    登入
                </NuxtLink>
                        
                </li>
            </ul>
        </div>

    </header>
</template>
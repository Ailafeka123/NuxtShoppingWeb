<script lang="ts" setup nonce="aila">

</script>
<style lang="scss" module="style" nonce="aila">
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
            icon
        </div>

        <div :class="style.itemDiv">
            <ul>
                <li>
                    購物車
                </li>
                <li>
                    登入
                </li>
            </ul>
        </div>

    </header>
</template>
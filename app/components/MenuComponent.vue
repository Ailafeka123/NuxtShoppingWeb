
<script lang="ts" setup >
    const authState = useNuxtApp().$authState as Ref<boolean>;
    const authLevel = useNuxtApp().$authLevel as Ref<boolean>;
    // 登出功能
    const SignOutClick = async() =>{
        await AuthSignOut();
        navigateTo("/");
    }
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
        z-index: 9999;
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
                .LoginOutButton{
                    cursor: pointer;
                }
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
            <ClientOnly>
                <ul v-if="authState === false">
                    <li>
                        <NuxtLink to="/login">
                            登入
                        </NuxtLink>
                    </li>
                </ul>

                <ul v-else>
                    <li v-if="authLevel">
                        <NuxtLink to="/backData">資料庫管理</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/selfData">個人資訊</NuxtLink>
                    </li>
                    <li>
                        <p @click="SignOutClick" :class="style.LoginOutButton">登出</p>
                    </li>
                </ul>
            </ClientOnly>
        </div>

    </header>
</template>
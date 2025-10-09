<script lang="ts" setup>
    import { ref } from 'vue';
    // 帳號密碼
    const account = ref<string>("");
    const password = ref<string>("");
    // 密碼顯示
    const passwordShow = ref<boolean>(false);
    const changePasswordShow = () =>{
        passwordShow.value = !passwordShow.value;
    }

    // 註冊 true 或 登入false
    const method = ref<boolean>(false);
    const errorMessage = ref<string>("");

</script>

<style module="style" lang="scss">
    .loadingMainDiv{
        padding: 0;
        @media(min-width: 768px){
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: end;
        }

        .loadingDiv{
            display: flex;
            flex-direction:column;
            align-items: center;
            justify-content: start;
            padding: 16px;
            height: 100%;
            background-color: #7c3e3e;
            width: 100%;
            @media(min-width:768px){
                width: 50%;
            }
            .inputForm{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: start;
                gap: 16px;
                width: 100%;
                height: 100%;
                div{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                }
            }
        }
    
    }



</style>

<template>
    <main :class=[style.loadingMainDiv]>
        <article :class=[style.loadingDiv]>
            <header>
                <h2>登入頁面</h2>
            </header>
            <section>
                <form :class="style.inputForm">
                    <div>
                        <label>帳號</label>
                        <input type="text" v-model="account"></input>
                    </div>
                    <div>
                        <label>密碼</label>
                        <input :type="passwordShow ? 'text':'password'" v-model="password"></input>
                        <button type="button" @click="changePasswordShow">X</button>
                        <p>{{ password }}</p>
                    </div>
                </form>
            </section>
        </article>

    </main>
</template>
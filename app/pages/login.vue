<script lang="ts" setup>
    import { ref, onMounted, watch} from 'vue';
    import ForgetPassword from '~/components/login/forgetPassword.vue';
    // 抓取是否登入狀態
    const authState = useNuxtApp().$authState as Ref<boolean>;
    
    onMounted(()=>{
        if(authState.value === true){
            navigateTo('/');
        }else{
            watch(authState,(newVal)=>{
                console.log(newVal)
                if(newVal === true){
                    navigateTo('/');
                }
            })
        }
    })

    // 帳號密碼
    const account = ref<string>("");
    const accountAlter = ref<string>("");
    const password = ref<string>("");
    const passwordAlter = ref<string>("");
    // 密碼顯示
    const passwordShow = ref<boolean>(false);
    // 註冊 true 或 登入false
    const method = ref<boolean>(false);
    const errorMessage = ref<string>("");
    // 是否開啟忘記密碼
    const forgetPasswordState  = ref<boolean>(false)

    // 轉換密碼顯示狀態
    const changePasswordShow = (value:boolean|null = null) =>{
        if(value === null){
            passwordShow.value = !passwordShow.value;
        }else{
            passwordShow.value = value;
        }
    }


    // 轉換帳號輸入
    const changeAccount = (e:Event) =>{
        const target = e.target as HTMLInputElement;
        let val = target.value
        account.value = val;
        val = val.replace(/[^a-zA-Z0-9!@#$%&'*+/=?^_`{|}~.-]/g, '');
        const atCount = (val.match(/@/g) || []).length;
        const dotHas = val.includes(".");
        if (atCount > 1) {
            const firstAt = val.indexOf('@')
            val = val.slice(0, firstAt + 1) + val.slice(firstAt + 1).replace(/@/g, '')
        }else if(atCount === 1 && dotHas){
            accountAlter.value = "";
        }else{
            accountAlter.value = "請輸入信箱"
        }
        account.value = val;
    }
    // 轉換密碼
    const changePassword = (e:Event)=>{
        const target = e.target as HTMLInputElement;
        let val = target.value;
        password.value = val;
        val = val.replace(/[^a-zA-Z0-9]/g,'');
        password.value = val
        const charHas = /[a-zA-Z]/.test(val);
        const numHas = /[0-9]/.test(val);
        if(charHas && numHas){
            if(val.length >= 8 && val.length <= 16){
                passwordAlter.value = "";
            }else{
                passwordAlter.value = "密碼請輸入8~16個字"
            }
        }else{
             passwordAlter.value = "密碼請輸入8~16個字，且須中英混合"
        }
    }
    // 轉換登入或註冊
    const changeAuthMethod = () =>{
        method.value = !method.value;
    }

    // 提交檢驗
    const submitForm = async() =>{
        console.log(`account = ${account.value}`);
        console.log(`password = ${password.value}`);
        // 檢查帳號密碼是否有輸入
        if(account.value === ""){
            errorMessage.value = "帳號不得為空";
            return;
        }else if(password.value === ""){
            errorMessage.value = "密碼不得為空";
            return ;
        }
        // 檢查 帳號密碼是否還有警告
        if(accountAlter.value !== ""){
            errorMessage.value = accountAlter.value
            return;
        }else if(passwordAlter.value !== "" ){
            errorMessage.value = passwordAlter.value;
            return;
        } 
        // 二度檢驗是否投入違法字元
        let accountVal = account.value.replace(/[^a-zA-Z0-9!@#$%&'*+/=?^_`{|}~.-]/g, '');
        let passwordVal = password.value.replace(/[^a-zA-Z0-9]/g,'');
        if(accountVal !== account.value){
            errorMessage.value = "帳號請勿輸入非法文字";
            return;
        }else if(passwordVal !== password.value){
            errorMessage.value = "密碼請勿輸入非法文字";
            return;
        }

        // 進行登入或註冊
        if(method.value === false){
            const Message = await AuthLoading(accountVal,passwordVal);
            if(Message === false){
                errorMessage.value = "帳號密碼錯誤"
                return;
            }
        }else{
            const registerMessage = await AuthRegister(accountVal,passwordVal);
            if(registerMessage === false){
                errorMessage.value = "已有此帳號"
                return;
            }
        }

        
    }




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
            background-color: #93f0a1;
            width: 100svw;
            @media(min-width:768px){
                width: 50svw;
            }
            .loginSection{
                width: 100%;
                .inputForm{
                    display: flex;
                    flex-direction: column;
                    margin: 16px 0;
                    align-items: center;
                    justify-content: start;
                    gap: 16px;
                    width: 100%;
                    height: 100%;
                    .inputGroup{
                        position: relative;
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        text-align: center;
                        align-items: center;
                        justify-content: center;
                        margin-top: 16px;
                        @media(min-width: 768px){
                            gap: 16px;
                        }
                        
                        input{
                            width: 100%;
                            padding:8px 16px;
                            border-radius: 8px;
                            border:none;
                            &:focus{
                                border: none;   
                                outline:none;
                            }
                        }
                        input:focus + label,
                        input:not(:placeholder-shown) + label{
                            transform: translateY(-80%);
                        }
                        label{
                            position: absolute;
                            left: 16px;
                            padding:2px 4px;
                            border-radius: 8px;
                            background:var(--background);
                            transition: 0.2s ease all;
                        }
                        .eyesButton{
                            position: absolute;
                            right: 16px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 8px;
                            &:hover{
                                cursor: pointer;
                            }
                            img{
                                width: 20px;
                                height: 20px;
                            }
                        }
                    }
                    .alterText{
                        text-align: left;
                        color:red;
                    }
                    .errorText{
                        color:red;
                        text-align: center;
                    }
                    .forgetPassword{
                        cursor: pointer;
                    }
                    .submitDiv{
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                        width: 100%;
                        button{
                            width: 100%;
                        }
                        @media(min-width:768px){
                            flex-direction: row;
                            gap: 16px;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
            }
        }
    
    }



</style>

<template>
    <main :class=[style.loadingMainDiv]>
        <article :class=[style.loadingDiv]>
            <header>
                <h2>{{method?"註冊":"登入"}}</h2>
            </header>
            <section :class="style.loginSection"  @submit.prevent>
                <form :class="style.inputForm" >
                    <div :class="style.inputGroup">
                        <input type="text" :value="account" @input="changeAccount" placeholder=" " required></input>
                        <label>帳號</label>
                    </div>
                    <p :class="style.alterText">{{ accountAlter }}</p>
                    <div :class="style.inputGroup">
                        <input :type="passwordShow ? 'text':'password'" :value="password" @input="changePassword" placeholder=" " required></input>
                        <label>密碼</label>
                        <button type="button" @click="changePasswordShow()" @blur="changePasswordShow(false)" :class="style.eyesButton">
                            <img :src="passwordShow? '/login/eye_light.svg' :'/login/eyeHidden_light.svg' " alt="eyes"></img>
                        </button>
                    </div>
                    <p :class="style.alterText">{{ passwordAlter }}</p>
                    <div>
                        <p :class="style.forgetPassword">忘記密碼</p>
                    </div>
                    <p :class="style.errorText" v-if="errorMessage !== ''">{{ errorMessage }}</p>
                    <div :class="style.submitDiv">
                        <button type="button" @click="changeAuthMethod">{{method?"登入":"註冊"}}</button>
                        <button type="submit" @click="submitForm">提交</button>
                    </div>
                </form>
            </section>
        </article>
        <!-- <ForgetPassword :open="forgetPasswordState"/> -->
    </main>
</template>
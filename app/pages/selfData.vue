<script setup lang="ts">
    import { ref,onMounted,watch } from 'vue';
    import PasswordCheck from '~/components/selfdata/PasswordCheck.vue';
    import UpdateIcon from '~/components/selfdata/UpdateIcon.vue';
    type userDataType = {
        userName:string,
        userIcon:string,
        email:string,
        createTime:Date,
        lastLogin:Date,
    }
    const userId = useNuxtApp().$authUserId as Ref<string>;
    const pluginsLoading = useNuxtApp().$pluginsLoading as Ref<boolean>;
    const userData = ref<userDataType >({
        userName:"",
        userIcon:"",
        email:"",
        createTime:new Date(),
        lastLogin:new Date(),
    });
    const userError = ref<boolean>(false);
    const userLoading = ref<boolean>(true);
    const iconUpperDateState = ref<boolean>(false);

    const upperDateIconFunc = (e:string) =>{
        userData.value.userIcon = e;
    }
    // 刪除功能
    const deleteCheck = ref<boolean>(false);
    // 讀取資料
    onMounted(()=>{
        const getUserData = async() =>{
            // 沒有登入 回到首頁
            if(userId.value === ""){
                navigateTo("");
            }else{
                const data = await readOnceData("auth",userId.value);
                console.log(`userId.value = `,userId);
                console.log(data);
                if(data !== false){
                    userData.value = {
                        userName:data.userName?data.userName:"",
                        userIcon:data.userIcon?data.userIcon:"",
                        email:data.email,
                        createTime:data.createTime,
                        lastLogin:data.lastLogin
                    };
                }else{
                    userError.value = true;
                    // userData.value = "發生錯誤，查無資料"
                }
                userLoading.value = false;
            }
        }
        watch(pluginsLoading,(newVal)=>{
            // 載入完成 讀取資料
            if(newVal === false){
                getUserData();
            }
        },{ immediate: true })
    })
</script>
<style lang="scss" module="style">
    .main{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        h2{
            font-size: 24px;
        }
        h3{
            font-size: 20px;
        }
        .userLoadingDiv{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .userDataShowDiv{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            text-align: center;
            width: 100%;
            height: 100%;
            gap:16px;
            @media(min-width: 768px){
                width: calc( (10/12) *100%);
                min-width: 768px;
            }
            .dataHeader{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                gap: 16px;
                
                @media(min-width: 768px){
                    flex-direction: row;
                    justify-content: space-around;
                    min-width: 768px;
                    width: 50%;
                }
                .userIconDiv{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 40px;
                    min-height: 40px;
                    img{
                        width: 40px;
                        height: 40px;
                    }
                    .imgDiv{
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        border: 2px solid black;
                        background-color: #5e3030;
                    }
                }
                .userHeaderDataDiv{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    @media(min-width:768px){
                       align-items: start;
                    }
                    .userIdString{
                        font-size: 10px;
                        opacity: 0.8;
                    }
                }
            }
            .dataSection{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: start;
                width: 100%;
                gap: 16px;
            }
        }
    }
</style>
<template>
    <main :class="style.main">
        
        <ClientOnly>
        <article v-if="userLoading === true" :class="style.userLoadingDiv">
            <h2>讀取中，請稍後</h2>
        </article>

        <article v-else-if="userLoading === false && userError === true " :class="style.userDataShowDiv">
            <h2>發生錯誤，查無資料</h2>
            <div :class="style.needHelp">
                <h3>請聯繫平台</h3>
                <button type="button">錯誤回報</button>
            </div>
        </article>

        <article v-else-if="userLoading === false &&  userError === false  " :class="style.userDataShowDiv">
            <h2>個人資訊</h2>
            <header :class="style.dataHeader">
                <div :class="style.userIconDiv">
                    <img v-if="userData.userIcon !== '' " :src="userData.userIcon"  @click="iconUpperDateState = true"  alt="icon">
                    <div v-else :class="style.imgDiv" @click="iconUpperDateState = true"></div>
                </div>
                <div :class="style.userHeaderDataDiv">
                    <p><span>使用者:</span><span>{{ userData.email }}</span></p>
                    <p :class="style.userIdString">id:{{ userId }}</p>
                </div>
            </header>
            <section :class="style.dataSection">
                <div>
                    個人資訊
                </div>
                <div>
                    修改密碼
                </div>
                <div>
                    商品送貨進度
                </div>
                <div>
                    購買紀錄
                </div>
                <div>
                    近期看過商品
                </div>
                <button @click="deleteCheck = true">
                    刪除帳號
                </button>
            </section>
        </article>

        <PasswordCheck v-if="deleteCheck" :openState="deleteCheck" :email= "userData.email"  @closeState="deleteCheck = false"/>
        <UpdateIcon v-if="iconUpperDateState"  :openState="iconUpperDateState" :userId="userId" @openState="iconUpperDateState = false" @upperDate="upperDateIconFunc"/>
        </ClientOnly>   
    </main>
</template>
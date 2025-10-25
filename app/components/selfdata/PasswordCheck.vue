<script setup lang="ts">
    import { ref } from 'vue';
    // 父層確認信箱資訊
    const reCheckProps = defineProps<{email:string; openState:boolean}>()
    const emit = defineEmits<{(e:"closeState"):void}>()
    // 再度確認的密碼與密碼提示
    const recheckPassword = ref<string>("");
    const recheckPasswordAlter = ref<string>("");
    // 刪除行動的提示框顯示與文字
    const deleteActionBollean = ref<boolean>(false);
    const deleteAction = ref<string>("");

    const inputPassword = (e:Event) =>{
        const target = e.target as HTMLInputElement;
        recheckPasswordAlter.value = "";
        recheckPassword.value = target.value;
        recheckPassword.value = target.value.replace(/[^a-zA-Z0-9]/g,"");
    }
    // 提交時的確認
    const submitCheckPassword = async() =>{
        if(recheckPassword.value === ""){
            recheckPasswordAlter.value = "輸入請勿為空"
            return;
        }
        const check =  await AuthCheckPassword(reCheckProps.email, recheckPassword.value);
        if(check === false){
            recheckPasswordAlter.value = "密碼錯誤"
            return;
        }else{
            deleteActionBollean.value = true;
            deleteAction.value = "帳號刪除中，請稍等"
            const deleteCheck = await AuthDelete();
            if(deleteCheck){
                await AuthSignOut();
                navigateTo('/');
            }else{
                console.log("刪除錯誤")
            }
        }
    }
    // 關閉視窗功能
    const closeStateButton = () =>{
        emit("closeState");
    }
</script>
<style lang="scss" module="style">
    .reCheckDiv{
        position:fixed;
        display:block;
        left: 0;
        top: 0;
        width:100%;
        height:100%;
        z-index:90;
        background-color: rgba(0, 0, 0,0.5);
        .reCheckPasswordDiv{
            position: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            top: 50%;
            left: 50%;
            padding:0 0 16px;
            width: calc((10/12)*100% );
            transform: translate(-50%,-50%);
            background-color: #fff;
            border-radius: 8px;
            border: 2px solid black;
            @media(min-width:768px){
                max-width: 768px;
            }
            .closeDiv{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: end;
                width: 100%;
                height: 40px;
                button{
                    all: unset;
                    cursor: pointer;
                    height: 100%;
                    aspect-ratio: 1 / 1; 
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: red;
                    border-radius: 0 4px 0 0 ;
                    &:hover{
                        background-color: rgb(214, 12, 12);
                    }
                }
            }
            .inputDiv{
                width: calc((10/12)*100%);
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                input{
                    width: calc((10/12)*100%);
                    padding:8px 16px;
                    border-radius: 8px;
                    border:2px black solid;
                    &:focus{
                        border:2px black solid;   
                        outline:none;
                    }
                }
            }
            
            .errorAlterText{
                color: red;
            }
        }
    }
</style>

<template> 
    <div :class="[style.reCheckDiv ]">
        <div :class="style.reCheckPasswordDiv"  @click.stop>
            <div :class="style.closeDiv">
                <button type="button" @click="closeStateButton">X</button>
            </div>
            <h2>請輸入密碼</h2>
            <div :class="style.inputDiv">
                <input :value="recheckPassword" @input="inputPassword"></input>
                <button type="button" @click="recheckPassword = ''">清空</button>
            </div>
            <p :class="style.errorAlterText">{{ recheckPasswordAlter }}</p>
            <button type="button" @click="submitCheckPassword()">確認</button>
        </div>
    </div>
    <WaitComponent v-if="deleteActionBollean" :checkText="deleteAction" :openState = "deleteActionBollean"/>
</template>
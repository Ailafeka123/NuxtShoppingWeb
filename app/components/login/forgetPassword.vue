<script lang="ts" setup>
    import { ref, watch } from 'vue';
    const alterProps = defineProps<{alterOpen:boolean}>();
    const emit = defineEmits<{ (e:"closeForget") :void}>()
    const closeForgetDiv = () =>{
        emit("closeForget");
    }
    const animation = ref<boolean>(false);
    const forgetEmail = ref<string>("");
    const forgetEmailAlterText = ref<string>("");
    const sendColdDown = ref<boolean>(true);
    watch(alterProps,(newval)=>{
        if(newval.alterOpen === true){
            setTimeout(()=>{
                animation.value = true;
            },100)
            
        }else{
            animation.value = false;
            forgetEmail.value = "";
            forgetEmailAlterText.value = "";
        }
    })
    // 輸入信向
    const forgetEmailInput = (e:Event) =>{
        const target = e.target as HTMLInputElement;
        let val = target.value;
        forgetEmail.value = val;
        val = val.replace(/[^a-zA-Z0-9!@#$%&'*+/=?^_`{|}~.-]/g, '');
        forgetEmail.value = val;
    }

    const sendPasswordResset = async() =>{
        if(sendColdDown.value === false){
            return;
        }
        sendColdDown.value = false;
        const check = await forgetAccount(forgetEmail.value);
        if(check){
            forgetEmailAlterText.value = "已寄送信件至email"
        }else{
            forgetEmailAlterText.value = "信箱有誤，請確認輸入的信箱"
        }
        sendColdDown.value = true;
    }
</script>

<style lang="scss" module="style">
    .forgetPasswordAlterDiv{
        position: fixed;
        display: block;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9;
        &.forgetHidden{
            display: none;
        }
        .forgetPasswordAlterBox{
            position: fixed;
            top: 50%;
            left: 50%;
            width: calc( (11/12) * 100%);
            min-width: 300px;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            gap: 8px;
            background-color: #fff;
            border: 2px solid black;
            border-radius: 8px;
            transform: translate(-50%, calc(-50svh) );
            opacity: 0;
            transition: all 0.5s ease-in-out;
            z-index: 90;
            @media(min-width:768px){
                width: 50%;
                min-width: 300px;
                margin: 0;
            }
            &.boxActive{
                transform: translate(-50%,-50%);
                opacity: 1;
            }
            .forgetPasswordAlterContext{
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: start;
                padding: 0 0 16px 0;
                gap: 16px;
                .forgetPasswordAlterContextTopMenu{
                    border-radius: 8px 8px 0 0 ;
                    border:  2px black solid;
                    border-width:  0 0 2px 0 ;
                    height: 36px;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: end;
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
                    height: 100%;
                    width: calc((10/12)*100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: start;
                    gap:16px;
                    text-align: center;
                    input{
                        width: 100%;
                        padding:8px 16px;
                        border-radius: 8px;
                        border:2px black solid;
                        &:focus{
                            border:2px black solid;   
                            outline:none;
                        }
                    }
                    .forgetPasswordAlterText{
                        color: red;
                    }
                    button{
                        width: calc((4/12)*100%);
                    }
                }
            }
        }
    }
</style>

<template>
    <div :class="[style.forgetPasswordAlterDiv, { [style.forgetHidden]:!alterProps.alterOpen} ]" @click="closeForgetDiv" >
        <div :class="[style.forgetPasswordAlterBox, {[style.boxActive]:animation}]" @click.stop>
            <div :class="style.forgetPasswordAlterContext">
                <div :class="style.forgetPasswordAlterContextTopMenu">
                    <button type="button"  @click="closeForgetDiv">X</button>
                </div>
                <div :class="style.inputDiv">
                    <h2>請輸入信箱</h2>
                    <input type="email" :value="forgetEmail" @input="forgetEmailInput"></input>
                    <p :class="style.forgetPasswordAlterText">{{forgetEmailAlterText}}</p>
                    <button @click="sendPasswordResset">送出</button>
                </div>
            </div>
        </div>
    </div>
</template>
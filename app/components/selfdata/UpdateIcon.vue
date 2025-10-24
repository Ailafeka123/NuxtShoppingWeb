<script setup lang="ts">
    import { ref } from 'vue';
    const iconUpperDate = defineProps<{openState:boolean, userId:string}>();
    const emit = defineEmits<{(e:"openState"):void, (e:"upperDate",value:string):void}>();
    const userIconInput = ref<string| null>(null);
    const upperDateError = ref<string>("");
    const coldDown = ref<boolean>(false);
    const updateIconImgFunction = (e:Event) =>{
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            userIconInput.value = reader.result as string;
        };
        reader.readAsDataURL(file); // 轉成 base64 Data URL
    }
    const closeFunc = () =>{
        emit("openState");
    }
    const checkFun = async() =>{
        if(userIconInput.value === null) return;
        if(coldDown.value === true) return;
        coldDown.value = true;
        upperDateError.value = "請稍後，上傳中"
        const test:boolean = await upperDateAuthIcon(iconUpperDate.userId,userIconInput.value);
        if(test){
            emit("upperDate",userIconInput.value)
            closeFunc();
        }else{
            upperDateError.value = "發生錯誤 請稍後再嘗試"
        }
        coldDown.value = false;
    }
</script>

<style lang="scss" module="style">
    .upperDateBack{
        position: fixed;
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        &.hidden{
            display: none;
        }
        .upperDateDiv{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;

            background-color: #fff;
            border-radius: 8px;
            border:2px solid black;
            width: calc((10/12)*100%);
            height: 50%;
            @media(min-width: 768px){
                width: calc((10/12)*100%);
                min-width: 768px;
            }
            .userIconDiv{
                height: 50%;
                width: 100%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: contain; 
                }
            }
        }
    }
</style>

<template>
    <div :class="[style.upperDateBack, {[style.hidden]:!iconUpperDate.openState}]">
        <div :class="style.upperDateDiv">
            <div :class="style.userIconDiv">
                <div v-if="userIconInput === null"></div>
                <img v-else :src="userIconInput" ></img>
            </div>
            <div>
                <input type="file" @change="updateIconImgFunction"></input>
            </div>
            <p>{{ upperDateError }}</p>
            <div>
                <button type="button" @click="checkFun">確定</button>
            </div>
        </div>
    </div>
</template>
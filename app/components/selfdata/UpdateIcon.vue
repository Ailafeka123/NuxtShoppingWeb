<script setup lang="ts">
    import { ref } from 'vue';
    import WaitComponent from '../WaitComponent.vue';
    const iconUpperDate = defineProps<{openState:boolean, userId:string}>();
    const emit = defineEmits<{(e:"openState"):void, (e:"upperDate",value:string):void}>();
    const inputFileRef = ref<HTMLInputElement| null>(null)
    const userIconInput = ref<string| null>(null);
    const upperDateError = ref<string>("");
    const coldDown = ref<boolean>(false);
    const alterDiv = ref<boolean>(false);
    // 去觸發inputFile
    const clickToOpenFile = () =>{
        inputFileRef.value?.click();
    }
    // 更新並顯示圖片
    const updateIconImgFunction = (e:Event) =>{
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;
        if(!file.type.startsWith('image/')){
            alterDiv.value = true;
            setTimeout(()=>{
                alterDiv.value = false;
            },1000)
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            userIconInput.value = reader.result as string;
        };
        reader.readAsDataURL(file); // 轉成 base64 Data URL
    }
    // 拖移觸發
    function handleDrop(e: DragEvent) {
        const files = e.dataTransfer?.files
        if (!files || files.length === 0) return
        const file = files[0] // 取得第一個檔案
        if (!file) return;
        if(!file.type.startsWith('image/')){
            alterDiv.value = true;
            setTimeout(()=>{
                alterDiv.value = false;
            },1000)
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            userIconInput.value = reader.result as string;
        };
        reader.readAsDataURL(file); // 轉成 base64 Data URL
    }

    // 關閉視窗
    const closeFunc = () =>{
        emit("openState");
    }
    // 確定 並上傳
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
        z-index: 9999;
        .upperDateDiv{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            gap: 16px;
            background-color: #fff;
            border-radius: 8px;
            border:2px solid black;
            width: calc((10/12)*100%);
            height: 50%;
            @media(min-width: 768px){
                width: calc((10/12)*100%);
                min-width: 768px;
                padding: 8px;
            }
            .userIconDiv{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 80%;
                width: 100%;
                overflow: hidden;
                border:2px solid black;
                border-width: 0 0 2px 0;
                cursor: pointer;
                @media(min-width:768px){
                    border-width: 2px;
                }
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: contain; 
                }
            }
            .hidden{
                display: none;
            }
            .buttonDiv{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                width: 100%;
            }
        }
    }
</style>

<template>
    <div :class="[style.upperDateBack]" @click = "closeFunc">
        <div :class="style.upperDateDiv" @click.stop>
            <div :class="style.userIconDiv" @click="clickToOpenFile" @dragover.prevent   @drop.prevent="handleDrop" >
                <p v-if="userIconInput === null">
                    點擊或拖曳上傳圖片
                </p>
                <img v-else :src="userIconInput" ></img>
            </div>
            <input type="file" ref="inputFileRef" :class="style.hidden" @change="updateIconImgFunction" accept="image/*" ></input>
            <p>{{ upperDateError }}</p>
            <div :class="style.buttonDiv">
                <button type="button" @click="checkFun" :disabled="coldDown">確定</button>
                <button type="button" @click="closeFunc" :disabled="coldDown">關閉</button>
            </div>
        </div>
        <WaitComponent v-if="alterDiv" :openState="alterDiv" checkText="檔案類型錯誤，請放入圖片"/>
    </div>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import type {AuthType} from '~~/types/index'
     // 查詢方式
    type searchMethodType ={
        method:"auth" | "product" | "cart" | "active",
        sort:"name"|"editTime",
        sortMethod:"asc"|"desc",
        searchBox:string,
        limit:number
    }

    // 傳遞排序的方法
    const SearchMethod = ref<searchMethodType>({
        method:"auth",
        sort:'name',
        sortMethod:"asc",
        searchBox:"",
        limit:10
    })
    // 接收資料
    const AuthGetData = ref<AuthType[]>([]);


    // 目前進行模式
    const method = ref<"edit"|"create">("edit");
    const getData = async(require:any) =>{
        const token = await AuthToken();
        if(token.success){
            const data = await $fetch('/api/authEdit/authGetAll',{
                    method: "GET",
                    headers:{
                        DataMethod:require,
                        Authorization:token.message,
                    }    
                }
            );
            if(data.success){
                AuthGetData.value = data.message as AuthType[];
            }
        }
    }
    // 二度確認，避免前端部分被修改
    onMounted(async()=>{
        const getLevel = await AuthLevelCheck();
        if(getLevel === false){
            navigateTo('/');
            return;
        }
        await getData( "ABC" );
    })
   
    

</script>

<style lang="scss" module = "style">
    .article{
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: start;
        gap:16px;
        width: calc((11/12) *100%);
        min-height: 100svh;
        margin: auto;
        .header{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            gap: 16px;
            width: calc((10/11)*100%);
            h2{
                text-align: center;
                font-size: 24px;
            }
            .choseEditDiv{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
            }
        }
        .editList{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            gap: 16px;
            padding:16px;
            border: 2px solid black;
            border-radius: 8px;
            min-height: 700px;
            .editSearchList{
                display: grid;
                grid-template-columns: repeat(2,1fr);
                grid-template-rows: repeat(2,1fr);
                gap: 16px;
                width: 100%;
                .searchBox{
                    grid-column: 1 / 3;
                }
                @media(min-width:768px){
                    grid-template-columns:  repeat(4,1fr);
                    .searchBox{
                        grid-column: 1 / 4;
                    }
                    .addButton{
                        grid-column: 1/5;
                    }

                }
                
            }
        }
    }
</style>

<template>
    <main>
        <article :class="style.article">
            <header :class="style.header">
                <h2>資料編輯</h2>
                <div :class="style.choseEditDiv">
                    <button type="button">帳號資訊</button>
                    <button type="button">產品資訊</button>
                    <button type="button">配送資訊</button>
                    <button type="button">活動資訊</button>
                </div>
            </header>
            <section :class="style.editList">
                <header :class="style.editSearchList">

                    <input :class="style.searchBox"></input>
                    <button type="button" :class="style.searchButton">查詢</button>
                    <button type="button" :class="style.addButton">新增</button>

                </header>

                <div>
                    <p>資料展示區</p>
                </div>

                <footer>
                    <div>
                        <p>頁面選取</p>
                    </div>
                </footer>
            </section>
            <section>
                <p>編輯區</p>
            </section>
        </article>
    </main>
</template>
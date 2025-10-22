<script setup lang="ts">
    import { ref,onMounted,watch } from 'vue';
    const userId = useNuxtApp().$authUserId as Ref<string>;
    const pluginsLoading = useNuxtApp().$pluginsLoading as Ref<boolean>;
    onMounted(()=>{
        const getUserData = async() =>{
            const data = await readOnceData("auth",userId.value);
            console.log(`userId.value = `,userId);
            console.log(data);
        }
        watch(pluginsLoading,(newVal)=>{
            console.log(`newVal = ${newVal}`)
            if(newVal === false){
                getUserData();
            }
        })
    })
</script>
<template>
    <div>

    </div>
</template>
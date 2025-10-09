<script lang="ts" setup >
    import { ref } from 'vue';
    const data = ref<string>("123");
    // 這裡會去fetch資料
    


</script>
<style lang="scss" module="style" >
    .scrollDiv{
        width:100svw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .article{
        width: 100svw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        gap: 16px;
        .cardSection{
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
            width: 100%;
            padding:0 16px;
            gap: 16px;
            @media(min-width: 1024px){
                min-width: 1024px;
                width: calc(10/12)*100%;
            }
            .cardDiv{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                .cards{
                    width: 30%;

                }
            }
        }
    }
</style>

<template>
    <main>
        <div :class= [style.scrollDiv]>
            <h2>{{ data }}</h2>
        </div>

        <article :class=[style.article]>
            <section :class=[style.cardSection]>
                <header>
                    <h2>產品推薦</h2>
                </header>
                <div :class=[style.cardDiv]>
                    <div :class=[style.cards]>
                        1
                    </div>
                    <div>
                        1
                    </div>
                    <div>
                        1
                    </div>
                </div>
            </section>

            <section :class=[style.cardSection]>
                <header>
                    <h2>熱銷產品</h2>
                </header>
                <div :class=[style.cardDiv]>
                    <div>
                        1
                    </div>
                    <div>
                        1
                    </div>
                    <div>
                        1
                    </div>
                </div>
            </section>

            <section :class=[style.cardSection]>
                <header>
                    <h2>限時則扣</h2>
                </header>
                <div :class=[style.cardDiv]>
                    <div>
                        1
                    </div>
                    <div>
                        1
                    </div>
                    <div>
                        1
                    </div>
                </div>
            </section>

            <section :class=[style.cardSection]>
                <header>
                    <h2>新品上架</h2>
                </header>
                <div :class=[style.cardDiv]>
                    <div>
                        1
                    </div>
                    <div>
                        1
                    </div>
                    <div>
                        1
                    </div>
                </div>
            </section>
        </article>
    </main>
</template>
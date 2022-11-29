<template>
    <div class="max-w-sm mx-auto bg-white p-4 space-y-4">
        <div v-for="post in posts" :key="post.id">
            <div class="h-80 text-white bg-gray-600 rounded-lg p-4">
                {{ post.title }}
            </div>
        </div>

        <div class="fixed left-0 bottom-4 w-full" v-show="showLoading">
            <div class="max-w-sm mx-auto flex justify-center">
                <button class="bg-yellow-500 rounded px-4 text-center">Loading ...</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [],
            page: 1,
            showLoading: false,
        }
    },
    beforeMount() {
        this.handleLoadMore()
    },
    mounted() {
        this.handleScroll()
    },
    methods: {
        handleLoadMore() {
            let url = '/api/posts?page=' + this.page
            axios.get(url)
                .then(res => {
                    res.data.data.forEach((post, i) => {
                        this.posts.push(post)

                    });
                    this.showLoading = false
                })
            
            this.page += 1
        },
        handleScroll() {
            window.onscroll = () => {
                if(document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight) {
                    this.showLoading = true;
                    this.handleLoadMore()
                }
            }
        },
    },
}
</script>
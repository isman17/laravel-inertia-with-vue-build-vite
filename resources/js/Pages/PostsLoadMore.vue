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

        <button class="w-fit mx-auto flex bg-yellow-500 px-4 rounded" @click="handleLoadMore" v-show="showLoadMore">Load more</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: [],
            page: 1,
            showLoadMore: true,
            showLoading: false,
        }
    },
    beforeMount() {
        this.handleLoadMore()
    },
    methods: {
        handleLoadMore() {
            this.showLoading = true
            let url = '/api/posts?page=' + this.page
            axios.get(url)
                .then(res => {
                    res.data.data.forEach((post, i) => {
                        this.posts.push(post)

                    });
                    if(res.data.current_page === res.data.last_page) {
                        this.showLoadMore = false
                    }
                    this.showLoading = false
                })
            
            this.page += 1
        },
    },
}
</script>
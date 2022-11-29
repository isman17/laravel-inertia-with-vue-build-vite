import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper.43be4956.mjs";
const _sfc_main = {
  data() {
    return {
      posts: [],
      page: 1,
      showLoadMore: true,
      showLoading: false
    };
  },
  beforeMount() {
    this.handleLoadMore();
  },
  methods: {
    handleLoadMore() {
      this.showLoading = true;
      let url = "/api/posts?page=" + this.page;
      axios.get(url).then((res) => {
        res.data.data.forEach((post, i) => {
          this.posts.push(post);
        });
        if (res.data.current_page === res.data.last_page) {
          this.showLoadMore = false;
        }
        this.showLoading = false;
      });
      this.page += 1;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-sm mx-auto bg-white p-4 space-y-4" }, _attrs))}><!--[-->`);
  ssrRenderList($data.posts, (post) => {
    _push(`<div><div class="h-80 text-white bg-gray-600 rounded-lg p-4">${ssrInterpolate(post.title)}</div></div>`);
  });
  _push(`<!--]--><div class="fixed left-0 bottom-4 w-full" style="${ssrRenderStyle($data.showLoading ? null : { display: "none" })}"><div class="max-w-sm mx-auto flex justify-center"><button class="bg-yellow-500 rounded px-4 text-center">Loading ...</button></div></div><button class="w-fit mx-auto flex bg-yellow-500 px-4 rounded" style="${ssrRenderStyle($data.showLoadMore ? null : { display: "none" })}">Load more</button></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/PostsLoadMore.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PostsLoadMore = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  PostsLoadMore as default
};

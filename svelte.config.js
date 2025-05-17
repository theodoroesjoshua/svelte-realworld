import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: 'app.html',
      precompress: false
    }),
    paths: {
      base: '/theodoroesjoshua.github.io/svelte-realworld' 
    }
  }
};
const AppComponent = {
  data() {
    return {
      title: 'Idle Pack Maker',
      secondPassed: 0,
    };
  },
  mounted() {
    setInterval(() => {
        this.secondPassed++
      }, 1000);
  },
  computed: {
    // a title getter
    CachedTitleBarMessage() {
      return this.title + ` - second passed: ` + this.secondPassed;
    }
  }
}

const AppTitleComponent = {
  data() {
    return {
      title: this.props.title
    }
  },
  props: ["title", "secondPassed"],
  template: `<strong> {{ title }} </strong>`
}

const app = Vue.createApp(AppComponent);

app.component("app-title", AppTitleComponent);

const vm = app.mount("#app");
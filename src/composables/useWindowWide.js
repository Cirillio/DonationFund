import { onMounted, onBeforeUnmount } from "vue";
export function useWindowWide({ min = 640, ref }) {
  let resObs = null;

  let debounce = null;

  const checkMinWidth = (entries) => {
    const winWidth = window.innerWidth;
    console.log(winWidth, min);
    console.log(ref);
    ref.value = winWidth > min;
  };

  const debCheck = () => {
    clearTimeout(debounce);
    debounce = setTimeout(checkMinWidth, 1000);
  };

  onMounted(() => {
    checkMinWidth();
    resObs = new ResizeObserver(debCheck);
    resObs.observe(document.body);
  });

  onBeforeUnmount(() => {
    resObs.disconnect();
  });
}

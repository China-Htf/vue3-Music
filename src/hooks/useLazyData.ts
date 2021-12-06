// 监听进入可视区域行为
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

// 数据懒加载函数
export const useLazyData = (target: any, apiFn:any) => {
  /**
   * 需要的参数
   * 1：被观察的对象
   * 2：不同的API函数
   */
  const result:any = ref([])
  // stop 是停止观察是否进入或移出可视区域的行为
  const { stop } = useIntersectionObserver(
    //  target 是观察目标的dom容器，也必须是dom容器
    target,
  // isIntersecting 是否进入可视区域 true 是进入 false 是移出
    ([{ isIntersecting }], observerElement) => {
      if(isIntersecting) {
        stop()
        apiFn().then((data:any) => {
          result.value = data
        })
      }
    },
    // 配置选项
    {
      // threshold 表示 DOM 与可视化区面积 > 0 的时候 只要显示 DOM 一丢丢 就加载异步数据
      threshold: 0
    }
  )
  // 返回 ---> 数据(dom 后台数据)
  return { target, result }
}
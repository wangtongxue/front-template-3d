<template>
  <div class="model-wrap" v-loading="loading">
    <div id="model-container"></div>
  </div>
</template>

<script>
import modelConfig from '@/model.config.js'

const modelUtils = window.modelUtilsFunc()
const Motor = window.Motor
const Cesium = window.Cesium = Motor._Cesium
window.Cartesian3 = Cesium.Cartesian3
const { appId, appSecret, serviceConfigServer, configServer, projectId } = modelConfig
if (serviceConfigServer) { // 内网环境需要进行配置地址
  Motor.ServiceConfig.server = serviceConfigServer
  Motor.Config.server = configServer
}
let viewer = null // 模型对象
let viewerProject = null // 初始化获取到的工程对象
let project = null // 初始化获取到的工程对象

export default {
  name: 'index',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    /**
     * @description: 初始化模型
     * @author: wangtongxue
     * @date: 2020-12-18 17:28:22
     */
    initMotorHandler () {
      // 若需要根据条件选择project 可在此处修改 let resultProjectId = projectId['条件]
      let resultProjectId = projectId.default
      window.viewer = viewer = null
      window.viewer = viewer = new Motor.Viewer({
        container: 'model-container',
        viewerMode: Motor.ViewerMode.CIM,
        appid: appId,
        secret: appSecret,
        backgroundColor: new Motor.Color(0.04, 0.08, 0.18, 0.01),
        taaEnabled: false,
        antialias: true,
        enableBloom: false,
        enableBIMViewCube: false,
        shadows: true,
        backgroundImageCss: 'rgba(255, 255, 255, 0)'
      })
      this.loading = true
      viewer.initialize().then(() => {
        viewer.cesiumViewer.requestRenderMode = true
        modelUtils.changeViewerModeFromCIMToBIM()
        window.viewerProject = viewerProject = viewer.queryProject(resultProjectId)
        viewerProject.open().then(() => {
          project = window.project = viewerProject.getInnerProjectList()[0]
          // window.autoRoamManger = new Motor.AutoRoamManager(viewer)
          modelUtils.setClockViewModelTime()
          modelUtils.setInitDefaultProjectViewerPos()
          this.loading = false
          this.addViewerClickHandler()
        })
      })
    },
    /**
     * @description: 添加模型左键点击事件 并将当前点击的对象传递给父组件
     * @author: wangtongxue
     * @date: 2020-12-18 17:50:12
     */
    addViewerClickHandler () {
      viewer.addMouseEventListener(Motor.MouseEventType.LEFT_CLICK, (mouse) => {
        const currentClickedObj = viewer.pick(mouse.position, project)
        console.log(`当前点击模型：${currentClickedObj}`)
        // do something
        // currentClickedObj && modelUtils.flyToComponent(currentClickedObj)
      })
    }
  },
  mounted () {
    this.initMotorHandler()
  }
}
</script>

<style scoped lang="less">
.model-wrap {
  width: 100%;
  height: 100%;
  #model-container {
    width: 100%;
    height: 100%;
    outline: none;
  }
}
</style>

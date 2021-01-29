/**
 * @description: 添加视频投射到模型上 暴露出添加｜删除方法
 * @author: wangtongxue
 * @date: 2020-12-21 16:52:18
 */
class VideoUtils {
  constructor () {
    this.manager = null
    this.index = 0
  }

  /**
   * @description: 创建视频添加到模型上
   * @author: wangtongxue
   * @date: 2020-12-21 17:01:41
   * @param url 流地址
   * @param params [{ viewPitch, viewHeading, horizontalViewAngle, verticalViewAngle, viewDistance, longitude, latitude, height }]
   */
  async addVideoToModel (url, params) {
    const dexScript = document.querySelector('#dex-script')
    dexScript && dexScript.remove()
    await this.createDexScript()
    params.forEach((param) => {
      this.createVideo(url, param)
    })
  }

  /**
   * @description: 从模型上删除所有的视频
   * @author: wangtongxue
   * @date: 2020-12-21 17:12:13
   */
  removeVideoFromModel () {
    if (this.index <= 0) return
    if (this.manager) {
      for (let i = 0; i <= this.index; i++) {
        this.index >= -1 && this.manager.removePTMById(i)
      }
      this.index = 0
    }
  }

  /**
   * @description: 根据视频地址、视频投射角度等参数创建视频贴到模型上
   * @author: wangtongxue
   * @date: 2020-12-21 17:05:37
   */
  createVideo (url, param) {
    const { Cesium } = window
    const viewer = window.viewer ? window.viewer.cesiumViewer : null
    const $ = window.$
    let currentCamera = new Cesium.Camera(viewer.scene)
    let cloneCam = Cesium.Camera.clone(viewer.camera, currentCamera)

    const { viewPitch, viewHeading, horizontalViewAngle, verticalViewAngle, viewDistance, longitude, latitude, height } = param
    cloneCam.frustum.near = viewDistance * 0.001
    cloneCam.frustum.far = viewDistance
    const hr = Cesium.Math.toRadians(horizontalViewAngle)
    const vr = Cesium.Math.toRadians(verticalViewAngle)
    cloneCam.frustum.aspectRatio = (viewDistance * Math.tan(hr / 2) * 2) / (viewDistance * Math.tan(vr / 2) * 2)
    if (hr > vr) {
      cloneCam.frustum.fov = hr
    } else {
      cloneCam.frustum.fov = vr
    }
    cloneCam.setView({
      destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
      orientation: {
        heading: Cesium.Math.toRadians(viewHeading || 0),
        pitch: Cesium.Math.toRadians(viewPitch || 0),
        roll: 0
      }
    })

    let src = url
    let videoType = /^.+\.m3u8$/.test(src) ? 'application/x-mpegURL' : 'video/mp4'
    let videoElem = $('<video autoplay loop muted><source src="' + src + '" type="' + videoType + '"></video>')
    // videoElem[0].style = 'pointer-events: none; position: fixed; left: 10000px; top: 10000px;'
    videoElem[0].style = 'pointer-events: none;'
    videoElem[0].setAttribute('crossorigin', 'anonymous')
    $('body').append(videoElem)
    this.manager.createPTM({
      id: this.index,
      camera: cloneCam,
      videoElement: videoElem,
      fadeDistance: 20000 // 多远距离消失
    })
    this.index++
    setTimeout(() => {
      viewer.camera.rotateLeft(0.00000001) // 手动触发一次模型操作 达到重绘模型，实现视频自动播放
    }, 3000)
    return {
      manager: this.manager,
      cloneCam
    }
  }

  /**
   * @description: 动态创建script加载视频投射的js工具
   * @author: wangtongxue
   * @date: 2020-12-21 16:59:35
   */
  createDexScript () {
    const viewer = window.viewer ? window.viewer.cesiumViewer : null
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.setAttribute('id', 'dex-script')
      script.setAttribute('src', window.location.origin + '/video/dex.js')
      script.onload = () => {
        // eslint-disable-next-line no-undef
        this.manager = new ProjectiveManager(viewer)
        // eslint-disable-next-line no-undef
        resolve('加载结束')
      }
      document.body.appendChild(script)
    })
  }
}

let videoUtils = null
export default function () {
  return videoUtils || (videoUtils = new VideoUtils())
}

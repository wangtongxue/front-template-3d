<template>
  <div class="container">
    <model-component ref="modelComponent"></model-component>
    <div class="btn-group">
      <button @click="resetDefaultProjectViewPosHandler">将模型视角还原为初始位置</button>
      <button @click="getFloorNameHandler">获取模型中的楼层名称</button>
      <button @click="showCurrentSelectedFloorByFloorIdHandler">根据id显示当前楼层</button>
      <button @click="showComponentsByFloorNameHandler">根据模型中的当前楼层的名称显示构件</button>
      <button @click="hideComponentsByFloorNameHandler">根据模型中的当前楼层的名称隐藏构件</button>
      <button @click="hideAllComponentsHandler">隐藏所有构建</button>
      <button @click="showAllComponentsHandler">显示所有构建</button>
<!--      <button @click="getComponentsByFloorNameAndMapTypeHandler">根据楼层名称以及构件的mapType类型</button>-->
<!--      <button @click="showComponentsByGuidListHandler">根据构件id数组显示出数组中的构件</button>-->
<!--      <button @click="hideComponentsByGuidListHandler">根据构件id数组隐藏出数组中的构件</button>-->
      <button @click="getCurrentViewPosHandler">获取当前模型视角的参数</button>
      <button @click="setComponentsColorByGuidListHandler">根据guid数组设置构件的颜色</button>
      <button @click="resetComponentsDefaultColorByGuidListHandler">根据guid数组重置构件的颜色为初始颜色</button>
      <button><a href="https://lbdp.lubansoft.com/code-box/motor/index.html" target="_blank">添加文本标注矢量点位</a></button>
      <button><a href="https://lbdp.lubansoft.com/code-box/motor/index.html" target="_blank">添加图片标注矢量点位</a></button>
      <button><a href="https://lbdp.lubansoft.com/code-box/motor/index.html" target="_blank">添加文本+图片标注矢量点位</a></button>
      <button @click="flyToCurrentSelectedFloorByPosParamsHandler">飞向当前楼层的现实位置</button>
      <button @click="addVectorPlaneHandler">添加矢量面</button>
      <button @click="removeVectorPlaneHandler">删除矢量面</button>
      <button @click="hideVectorPlaneHandler">隐藏矢量面</button>
      <button @click="showVectorPlaneHandler">显示矢量面</button>
      <button @click="addVideoToModelHandler">添加视频到模型上</button>
      <button @click="removeVideoFromVideoHandler">从模型上删除视频</button>
    </div>
  </div>
</template>

<script>
import { ModelComponent } from '@/components/index.js'

const videoUtilsFunc = window.videoUtilsFunc()
const modelUtilsFunc = window.modelUtilsFunc()
let entityList = []

export default {
  name: 'index',
  components: {
    ModelComponent
  },
  methods: {
    resetDefaultProjectViewPosHandler () {
      modelUtilsFunc.resetDefaultProjectViewPos()
    },
    getFloorNameHandler () {
      console.log(modelUtilsFunc.getFloorNameByProject())
    },
    showCurrentSelectedFloorByFloorIdHandler () {
      modelUtilsFunc.showCurrentSelectedFloorByFloorId('2b7984f8-ba80-46ce-a76b-ef2755c78d70')
    },
    showComponentsByFloorNameHandler () {
      modelUtilsFunc.showComponentsByFloorName('F1.1')
    },
    hideComponentsByFloorNameHandler () {
      modelUtilsFunc.hideComponentsByFloorName('F1.1')
    },
    hideAllComponentsHandler () {
      modelUtilsFunc.hideAllComponents()
    },
    showAllComponentsHandler () {
      modelUtilsFunc.showAllComponents()
    },
    getCurrentViewPosHandler () {
      console.log(modelUtilsFunc.getCurrentViewPos())
    },
    setComponentsColorByGuidListHandler () {
      modelUtilsFunc.setComponentsColorByGuidList('red', 1, ['f41f875e-5dcb-4c53-9fec-2163ea9bec4a', 'd10f4cc0-034f-4fc7-abb4-011bb22f815a'])
    },
    resetComponentsDefaultColorByGuidListHandler () {
      modelUtilsFunc.resetComponentsDefaultColorByGuidList(['f41f875e-5dcb-4c53-9fec-2163ea9bec4a', 'd10f4cc0-034f-4fc7-abb4-011bb22f815a'])
    },
    flyToCurrentSelectedFloorByPosParamsHandler () {
      modelUtilsFunc.flyToCurrentSelectedFloorByPosParams({
        'floorHeight': 15,
        'latlng': [121.3097, 29.2089],
        'heading': -3.5,
        'pitch': -65,
        'range': 10
      })
    },
    // 添加房间矢量面
    addVectorPlaneHandler () {
      modelUtilsFunc.addVectorPlane(`${window.location.origin}/geojson/1F.geojson`, {
        eID: 'name',
        closeTop: false,
        closeBottom: false,
        height: 20,
        extrudedHeight: 0,
        materialColor: 'red',
        materialAlpha: 0.5,
        outline: true,
        outlineColor: 'black',
        outlineAlpha: 1
      })
        .then((res) => {
          console.log(res)
          entityList = [...res]
        })
    },
    removeVectorPlaneHandler () {
      modelUtilsFunc.removeVectorPlane(entityList)
    },
    hideVectorPlaneHandler () {
      modelUtilsFunc.hideVectorPlane(entityList)
    },
    showVectorPlaneHandler () {
      modelUtilsFunc.showVectorPlane(entityList)
    },
    addVideoToModelHandler () {
      videoUtilsFunc.addVideoToModel('http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8', [{
        viewPitch: -79,
        viewHeading: 90,
        horizontalViewAngle: 30,
        verticalViewAngle: 30,
        viewDistance: 150,
        longitude: 121.309605558112935,
        latitude: 29.20894871204564,
        height: 23
      }])
    },
    removeVideoFromVideoHandler () {
      videoUtilsFunc.removeVideoFromModel()
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .btn-group {
    position: fixed;
    left: 10px;
    top: 10px;
    display: flex;
    flex-direction: column;
  }
}
</style>

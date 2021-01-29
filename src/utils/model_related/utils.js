/**
 * @description: model工具类 暴露工具属性方法
 * @author: wangtongxue
 * @date: 2020-12-18 16:32:34
 */
class ModelUtils {
  constructor () {
    this.viewDefaultPos = null // 记录模型初始视角位置参数
  }

  /**
   * @description: 手动将CIM切换为BIM
   * 使用场景：由于目前视频投射不支持初始化时设置的BIM只支持CIM 但是业务需要BIM场景 则需要手动设置CIM为BIM
   * @author: wangtongxue
   * @date: 2020-12-18 15:46:07
   */
  changeViewerModeFromCIMToBIM () {
    const { viewer, Cesium } = window
    viewer.cesiumViewer.scene.globe.show = false
    viewer.cesiumViewer.scene.skyAtmosphere.show = false
    viewer.cesiumViewer.scene.skyBox.show = false
    viewer.cesiumViewer.scene.sun.show = false
    viewer.cesiumViewer.scene.moon.show = false
    viewer.cesiumViewer.scene.backgroundColor = Cesium.Color.fromBytes(0, 0, 0, 0)
  }

  /**
   * @description: 手动设置模型时间为当前时间
   * @author: wangtongxue
   * @date: 2020-12-18 15:58:12
   */
  setClockViewModelTime () {
    const { viewer, Cesium } = window
    let utc = Cesium.JulianDate.fromDate(new Date('2020/10/04 12:00:00')) // UTC
    viewer.cesiumViewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(utc, 8, new Cesium.JulianDate()) // 北京时间=UTC+8=GMT+8
  }

  /**
   * @description: 初始化加载模型的时候获取的初始位置，供还原为初始位置时使用
   * @author: wangtongxue
   * @date: 2020-12-18 16:12:28
   */
  setInitDefaultProjectViewerPos () {
    const { _currentView } = window.viewer
    const { position, heading, pitch, range, roll } = _currentView
    this.viewDefaultPos = { // 场景进入初始化的位置
      position: position ? JSON.parse(JSON.stringify(position)) : null,
      heading: heading || 0,
      pitch,
      range,
      roll
    }
  }

  /**
   * @description: 将模型视角位置还原为初始化加载模型的位置
   * @author: wangtongxue
   * @date: 2020-12-18 16:17:24
   */
  resetDefaultProjectViewPos () {
    if (!this.viewDefaultPos) {
      this.setInitDefaultProjectViewerPos()
    }
    const { viewer, Cartesian3 } = window
    const { heading, pitch, range, position } = this.viewDefaultPos
    if (!position) return
    const { x, y, z } = position
    viewer.currentView = {
      position: new Cartesian3(x, y, z),
      heading,
      pitch,
      range,
      callback: () => viewer.setLookAtCenter()
    }
    // 显示全部
    viewer.projectlist[0]._components.forEach((component) => {
      component.resetColor()
    })
  }

  /**
   * @description: 根据Project获取楼层名称数组
   * 使用场景 当后台返回的楼层名称和模型中定义的楼层名称不同时，可以根据当前方法获取到模型中的楼层名称做映射关系
   * @author: wangtongxue
   * @date: 2020-12-18 17:33:22
   * @return [{ floor: '1F' }, { floor: '2F' }]
   */
  getFloorNameByProject () {
    const { project } = window
    if (!project) return
    return project._floorNames.map((name) => {
      return { floor: name }
    })
  }

  /**
   * @author wangtongxue
   * @date 2020/10/19 12:25 下午
   * @description 飞向构件
   * @returns
   * @param component 构件对象
   **/
  flyToComponent (component) {
    if (!component) return
    const { project, viewer } = window
    project.queryComponents([component.guid])
      .then((coms) => {
        coms.forEach((com) => {
          viewer.flyTo(com)
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  /**
   * @description: 根据当前选择的楼层的id控制显示当前所选的楼层 隐藏其他未选楼层
   * @author: wangtongxue
   * @date: 2020-12-18 18:26:51
   * @param floorId 当前所选的楼层的id
   */
  showCurrentSelectedFloorByFloorId (floorId) {
    if (!floorId) return
    const { viewer, Motor } = window
    viewer.projectlist[0]._components.forEach((component) => {
      if (component.guid !== floorId) { // 控制其他楼层隐藏
        component.setColor(new Motor.Color(102 / 255, 204 / 255, 1.0, 0.0))
      } else {
        component.resetColor()
      }
    })
  }

  /**
   * @description: 根据当前所选的楼层的camera参数控制当前楼层的显示位置
   * @author: wangtongxue
   * @date: 2020-12-18 18:28:59
   * @param params 位置参数对象 init为回归初始加载位置 { init, latlng, floorHeight, heading, pitch, range }
   */
  flyToCurrentSelectedFloorByPosParams (params) {
    if (!params) return
    if (params.init) {
      this.resetDefaultProjectViewPos()
    } else {
      const { viewer, Motor } = window
      const { latlng, floorHeight, heading, pitch, range } = params
      viewer.currentView = {
        center: Motor.Cartesian3.fromDegrees(latlng[0], latlng[1], floorHeight),
        heading: heading,
        pitch: pitch,
        range: range
      }
    }
  }

  /**
   * @description: 根据模型上的楼层的名称控制对于楼层的所有的构件的显示
   * @author: wangtongxue
   * @date: 2020-12-18 19:00:28
   * @param floorName 模型上的楼层名称
   */
  showComponentsByFloorName (floorName) {
    if (!floorName) return
    const allFloorNames = this.getFloorNameByProject()
    const { project } = window
    project.setComponentsVisibilityByOption(allFloorNames, false) // 让所有楼层的构件消失
    project.setComponentsVisibilityByOption([{ floor: floorName }], true)
  }

  /**
   * @description: 根据传入的模型上的楼层名称控制对应楼层的构件隐藏
   * @author: wangtongxue
   * @date: 2020-12-18 19:05:28
   */
  hideComponentsByFloorName (floorName) {
    if (!floorName) return
    const { project } = window
    project.setComponentsVisibilityByOption([{ floor: floorName }], false)
  }

  /**
   * @description: 控制所有的构件都显示
   * @author: wangtongxue
   * @date: 2020-12-18 19:04:10
   */
  showAllComponents () {
    const allFloorNames = this.getFloorNameByProject()
    const { project } = window
    project.setComponentsVisibilityByOption(allFloorNames, true) // 让所有楼层的构件显示
  }

  /**
   * @description: 控制所有的构件都隐藏
   * @author: wangtongxue
   * @date: 2020-12-18 19:06:49
   */
  hideAllComponents () {
    const allFloorNames = this.getFloorNameByProject()
    const { project } = window
    project.setComponentsVisibilityByOption(allFloorNames, false) // 让所有楼层的构件隐藏
  }

  /**
   * @description: 根据当前模型中的楼层名称以及构件的类型获取到对应的构件
   * @author: wangtongxue
   * @date: 2020-12-21 18:26:54
   * @param floorName
   * @param mapType '机械设备'|'火警设备'|'家具系统'|'橱柜'|'家具'...
   * @return {Promise} 返回promise对象，可以获取到构件数组
   */
  // getComponentsByFloorNameAndMapType (floorName, mapType = '') {
  //   const { project } = window
  //   return project.queryComponents({
  //     floorName,
  //     main_type: mapType
  //   })
  // }

  /**
   * @description: 根据构件id数组显示出数组中的构件
   * @author: wangtongxue
   * @date: 2020-12-18 19:09:34
   * @param guidList ["f87d2dca-ff6a-4f88-9423-b0596af2f3be","f855d167-924e-4fdd-bd5c-3590fa2e1f01"]
   */
  showComponentsByGuidList (guidList) {
    window.project.setComponentsVisiblity(true, guidList)
  }

  /**
   * @description: 根据构件id数组隐藏数组中的构件
   * @author: wangtongxue
   * @date: 2020-12-18 19:09:34
   * @param guidList ["f87d2dca-ff6a-4f88-9423-b0596af2f3be","f855d167-924e-4fdd-bd5c-3590fa2e1f01"]
   */
  hideComponentsByGuidList (guidList) {
    window.project.setComponentsVisiblity(false, guidList)
  }

  /**
   * @description: 获取当前模型视角的参数
   * @author: wangtongxue
   * @date: 2020-12-18 19:32:06
   */
  getCurrentViewPos () {
    const { viewer, Cesium } = window
    let camera = viewer.cesiumViewer.camera
    let pos = camera.positionCartographic
    return {
      longitude: Cesium.Math.toDegrees(pos.longitude),
      latitude: Cesium.Math.toDegrees(pos.latitude),
      height: pos.height,
      heading: Cesium.Math.toDegrees(camera.heading),
      pitch: Cesium.Math.toDegrees(camera.pitch),
      roll: Cesium.Math.toDegrees(camera.roll)
    }
  }

  /**
   * @description: 根据guid数组将一组构件设置为指定的颜色
   * @author: wangtongxue
   * @date: 2020-12-18 19:43:00
   * @param color 16进制颜色/英文颜色
   * @param alpha 透明度
   * @param guidList ["f41f875e-5dcb-4c53-9fec-2163ea9bec4a","d10f4cc0-034f-4fc7-abb4-011bb22f815a"]
   */
  setComponentsColorByGuidList (color, alpha, guidList) {
    const { Motor, project } = window
    project.setComponentsColor(Motor.Color.fromCssColorString(color).withAlpha(alpha), guidList)
  }

  /**
   * @description: 将一组构件的颜色还原为初始化的颜色
   * @author: wangtongxue
   * @date: 2020-12-18 19:36:33
   * @param guidList ["f87d2dca-ff6a-4f88-9423-b0596af2f3be","f855d167-924e-4fdd-bd5c-3590fa2e1f01"]
   */
  resetComponentsDefaultColorByGuidList (guidList) {
    window.project.resetComponentsDefaultColor(guidList)
  }

  // 添加文本标注｜图片标注｜文本+图片 矢量点位参考：https://lbdp.lubansoft.com/code-box/motor/index.html

  /**
   * @description: 添加房间矢量面
   * @author: wangtongxue
   * @date: 2020-12-21 12:27:56
   * @param source 支持geojson路径地址、geojson数据两种格式
   * @param params {Object} { eID: 'id',  closeTop: false, closeBottom: false, height: Number, extrudedHeight: Number, materialColor: '16进制 ｜ red英文名称', materialAlpha: 透明度, outline: false|true, outlineColor: '16进制 ｜ red英文名称', outlineAlpha: 透明度 }
   * @return 返回矢量面entity列表
   */
  addVectorPlane (source, params) {
    const Cesium = window.Cesium
    const viewer = window.viewer
    return Cesium.GeoJsonDataSource.load(source)
      .then((dataSource) => {
        let planeList = []
        const entities = dataSource.entities.values
        for (let i = 0; i < entities.length; i++) {
          let entity = entities[i]
          entity.eID = entity.properties[params.eID]._value || undefined
          entity.polygon.material = Cesium.Color.fromCssColorString((params.materialColor || 'yellow')).withAlpha((params.materialAlpha || 1))
          entity.polygon.outline = params.outline || false
          entity.polygon.outlineColor = Cesium.Color.fromCssColorString((params.outlineColor || '#000000')).withAlpha((params.outlineAlpha || 0))
          entity.polygon.height = params.height || 3
          entity.polygon.extrudedHeight = params.extrudedHeight || 0
          entity.polygon.closeTop = params.closeTop || false
          entity.polygon.closeBottom = params.closeBottom || false
          entity.polygon.classificationType = Cesium.ClassificationType.CESIUM_3D_TILE
          planeList.push(viewer.cesiumViewer.entities.add(entity))
        }
        return planeList
      })
  }

  /**
   * @description: 删除矢量面
   * @author: wangtongxue
   * @date: 2020-12-21 15:19:32
   * @param entityList 矢量面entity列表
   */
  removeVectorPlane (entityList) {
    const viewer = window.viewer
    entityList.forEach((entity) => {
      viewer.cesiumViewer.entities.remove(entity)
    })
  }

  /**
   * @description: 根据entity数组隐藏矢量面
   * @author: wangtongxue
   * @date: 2020-12-21 16:04:01
   * @param entityList 矢量面entity数组
   */
  hideVectorPlane (entityList) {
    entityList.forEach((entity) => {
      entity.polygon.show = false
    })
  }

  /**
   * @description: 根据entity数组现实矢量面
   * @author: wangtongxue
   * @date: 2020-12-21 16:04:48
   * @param entityList 矢量面entity数组
   */
  showVectorPlane (entityList) {
    entityList.forEach((entity) => {
      entity.polygon.show = true
    })
  }
}

let modelUtils = null
export default function () {
  return modelUtils || (modelUtils = new ModelUtils())
}

export default {
  appId: 'e3585207cbc544c6bee810274c3e5211', // motor
  appSecret: 'b9be305ff68e6b8c7adeb95872abe6d3', // motor
  serviceConfigServer: '', // 服务配置
  configServer: '', // 服务配置
  // 系统中打开的project的配置，希望切换多个project通过键值对的方式配置引用关系
  // 注意：希望根据不同的key选择不同的project显示，需要修改model_related/index.vue加载模型的代码
  projectId: {
    'default': 'c0bddbe2-25f2-4527-9398-2fe870010a28'
  }
}

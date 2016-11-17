Page({
  data:{
    configs:{}
  },
  onLoad:function(options){
    var configs = wx.getStorageSync('configs');
    this.setData({configs:configs});
    
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  switchChange:function(res){
    console.log(res);
    var id = res.target.id;//获取switch的id
    var configs = this.data.configs;
    var config =configs[id];//直接获取对象
    if(!config){//如果不存在创建一个新的对象
      config = new Object();
      configs[id]=config//保存新的对象
    }
    config.state=res.detail.value;
    this.setData({configs:configs});
    wx.setStorageSync('configs', configs);
  },
  sliderChange:function(res){
    console.log(res);
    var id = res.target.id;
    var configs = this.data.configs;
    var config =configs[id];
    if(!config){
      config = new Object();
      configs[id]=config
    }
    config.time=res.detail.value;//获取时间
    this.setData({configs:configs});
    wx.setStorageSync('configs', configs);
  },
  radioChange:function(res){
    console.log(res);
    var id = res.target.id;
    var configs = this.data.configs;
    var config =configs[id];
    if(!config){
      config = new Object();
      configs[id]=config
    }
    config.voice=res.detail.value;//获取声音时间
    this.setData({configs:configs});
    wx.setStorageSync('configs', configs);
  }
})
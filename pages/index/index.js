Page({
  leftMove:0,
  rightMove:0,
  data:{
    actionSheetList:[],
    configs:{},
    title:"",
    desc:"",
    leftAnimationData:{},
    rightAnimationData:{},
    leftTime:100,
    rightTime:200,
    src: "/assets/sound/countdown.mp3"
  },
  onLoad:function(options){
    

  },
  onReady:function(){
    this.audioCtx = wx.createAudioContext("myAudio")
    
    
  },
  onShow:function(){
   this.loadConfigsName();
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  loadConfigsName:function(){
    var actionSheetList = [];
    var configs = wx.getStorageSync('configs');//获取缓存
    var first = true;//判断是不是第一个
    
    console.log(configs);
    for(var i in configs){
      var config = configs[i];
      if(config.state){//如果组件开启
        if(first){
          var desc = config.desc.replace(/@/g, config.time+"秒")//处理占位符，动态获取时间
          console.log(desc);
          this.setData({
            title:config.name, 
            desc:desc,
            leftTime:config.time,
            rightTime:config.time,
            voice:config.voice
            })
          first=false;//
        }
        actionSheetList.push(config.name);
      }
    }
    this.setData({actionSheetList:actionSheetList});
  },
  actionSheetClick:function(){
    var page = this;
    var actionSheetList = this.data.actionSheetList;
    wx.showActionSheet({//创建下拉菜单
      itemList:actionSheetList,
      success: function(res){
        var configs = wx.getStorageSync('configs')
        var name = actionSheetList[res.tapIndex];
        for (var i in configs){
          var config= configs[i]
          if(name===config.name){
            var desc = config.desc.replace(/@/g, config.time+"秒")
            page.setData({
              desc:desc,
              leftTime:config.time,
              rightTime:config.time,
              voice:config.voice
            });
            console.log(desc);
          }
        }
        page.setData({title:name});
        console.log(name);
        page.leftStop();
        page.rightStop();
      }
    })
  },
  leftStop:function(){//停止计时器
    clearInterval(this.leftInterval);
    this.leftInterval=0;
  },
  rightStop:function(){//停止计时器
    clearInterval(this.rightInterval);
    this.rightInterval=0;
  },
  leftStart:function(){
    if(this.leftInterval&&this.leftInterval!=0){//判断计时器已经启动
      this.leftStop();
      return
    }
    var page = this;
    var leftTime = this.data.leftTime;
    var voice = this.data.voice;
    console.log(voice);
    var animation = wx.createAnimation({//创建动画
      duration: 400,
      timingFunction: 'ease', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0',
    })
    animation.rotate(this.leftMove+=190).step();//旋转动画
    this.setData({
      leftAnimationData:animation.export()//传入动画数据
    })
    var leftInterval = setInterval(function(){//创建计时器，每一秒启动动画一次
      if(leftTime<=0){//时间等于0秒，暂停计时器
          page.leftStop();
          console.log(leftTime);
          page.audioPause();
          return
        }
      if(leftTime <= voice){
        page.audioPlay();
      }
      animation.rotate(page.leftMove+=100).step();//启动动画
      leftTime -= 1;//秒数递减1
      console.log(leftTime);
      page.setData({
        leftAnimationData:animation.export(),
        leftTime:leftTime
      });
    },1000);
    this.leftInterval=leftInterval;//传入计时器返回的数值
    if(this.rightInterval&&this.rightInterval!=0){
      this.rightStop();
    }

  },
  rightStar:function(){
     if(this.rightInterval&&this.rightInterval!=0){//判断计时器已经启动
      this.rightStop();
      return
    }
    var page = this;
    var rightTime = this.data.rightTime;
    var voice = this.data.voice;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0',
    });
    animation.rotate(this.rightMove+=100).step();
    this.setData({
      rightAnimationData:animation.export()
    });
    var rightInterval = setInterval(function(){//创建计时器，每一秒启动动画一次
      if(rightTime<=0){
        page.rightStop();
        console.log(rightTime);
        page.audioPause();
        return
      }
      if(rightTime <= voice){
        page.audioPlay();
      }
      animation.rotate(page.rightMove+=100).step();
      rightTime -=1;
      page.setData({
        rightAnimationData:animation.export(),
        rightTime: rightTime
      });
    },1000);
    this.rightInterval=rightInterval;//传入计时器返回的数值
    if(this.leftInterval&&this.leftInterval!=0){
      this.leftStop()
    }
  },
  audioPlay: function(){
    this.audioCtx.play()
    console.log(this.data.src);
  },
  audioPause: function(){
    this.audioCtx.pause()
  }
})
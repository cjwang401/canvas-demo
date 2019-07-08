var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5;

autoSetCanvasSize(yyy)

listenToUser(yyy)

//按钮点击（橡皮和笔）
var eraserEnabled = false
pen.onclick = function(){
  eraserEnabled = false
  // 添加一个类给svg
  pen.classList.add('active')
  //为了让一个红另一个不红，那么就消除掉class
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')

//颜色点击（红、绿、蓝）
red.onclick = function(){
  console.log('lala')
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('avtive')
  green.classList.remove('active')
  blue.classList.remove('active')

}
green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')

}
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  green.classList.remove('active')
  red.classList.remove('active')

}


thin.onclick = function(){
  console.log('点击细线')
  lineWidth = 5
}
thick.onclick = function(){
  console.log('点击粗线')
  lineWidth = 10
}






}
/******/
//自动设置canvas大小
function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }
  //document.documentElement.clientWidth是页面宽度，将canvas的高宽设置为页面大小
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

//画圆圈撼函数
function drawCircle(x, y, radius) {
  context.beginPath()
  // context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}
//画线函数
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  // context.strokeStyle = 'black'
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

//监听用户动作
function listenToUser(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }

  //这句话用来判断是否是一个触屏设备  也就是判断ontouchstart是不是document.body的一个属性
  if(document.body.ontouchstart !== undefined){
    //触屏设备
    //按压
    canvas.ontouchstart = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
      
      
    }
    //按压滑屏
    canvas.ontouchmove = function(aaa){
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
  
      if (!using) {return}
  
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }else{
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }

    //结束触屏
    canvas.ontouchend = function(){
      using = false
    }
  }else{
      //非触屏设备
      canvas.onmousedown = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          lastPoint = {
            "x": x,
            "y": y
          }
        }
      }
      canvas.onmousemove = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
    
        if (!using) {return}
    
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        }else{
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
    
      }
      canvas.onmouseup = function(aaa) {
        using = false
      }
    
      
    }
    
  }


  

//上述为mouse事件 对于触屏不好操作。采用touch事件

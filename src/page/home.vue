<template>
  <div class="home">
    <div class="content">
      <h3>海兔后台管理系统</h3>
      <p>这是一个计划用于游戏资讯网页的后台管理系统。</p>
      <p>功能还不完善，逐步更新中。。。</p>
      <div class="stack">
        <div class="font-ent">
          <dl>
            <dt>前端技术栈</dt>
            <dd>Vue.js</dd>
            <dd>Element</dd>
            <dd>javaScript</dd>
            <dd>Axios</dd>
            <dd>Sass</dd>
          </dl>
        </div>
        <div class="line"></div>
        <div class="back-ent">
          <dl>
            <dt>后端技术栈</dt>
            <dd>node.js</dd>
            <dd>express</dd>
            <dd>formidable</dd>
            <dd>token</dd>
            <dd>sqlite3</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-box top"></div>
      <div class="footer-box bottom"></div>
      <div class="footer-box forword"></div>
      <div class="footer-box back"></div>
    </div>
    <div class="icp"><a href="http://beian.miit.gov.cn" target="_blank">ICP: 闽ICP备2021014042号-1</a></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.home {
  height: 80%;
  color: #fff;
  position: relative;
  margin-top: 50px;

  .content {
    height: 100%;
    padding: 20px;
    padding-left: 50px;
    background-color: #446142;
    box-sizing: border-box;
    border: 20px solid #7d4a11;
    border-bottom: 10px solid #7d4a11;
    border-image: linear-gradient(#7d4a11, #774314);
    border-image-slice: 20;
    box-shadow: inset -1px 1px 20px 3px #3b4539;

    .stack {
      width: 300px;
      margin-top: 50px;
      display: flex;
      justify-content: space-between;

      .line {
        width: 1px;
        background-color: #fff;
      }

      dl {
        margin: 0;
      }

      dd {
        margin-left: 20px;
      }
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    perspective: 1000px;
    transform: rotateX(-45deg);
    transform-style: preserve-3d;

    .footer-box {
      position: absolute;
      top: 0;
      left: 0;
    }

    .top,
    .bottom,
    .forword,
    .back {
      width: 100%;
      height: 30px;
    }

    .top {
      transform: rotateX(90deg) translateZ(-15px);
      background-color: #744313;
    }

    .bottom {
      transform: rotateX(90deg) translateZ(15px);
      background-color: #9f725d;
    }

    .forword {
      transform: translateZ(15px);
      background-color: #744313;
    }

    .back {
      transform: translateY(-15px);
      background-color: #7d4a11;
    }
  }

  .icp {
    position: absolute;
    bottom: 50px;
    right: 40px;
  }
}
</style>
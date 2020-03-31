// ==UserScript==
// @name              视频解析助手
// @namespace         https://github.com/syhyz1990/media
// @version           1.0.8
// @icon              https://gw.alicdn.com/tfs/TB1ZvwSycbpK1RjSZFyXXX_qFXa-48-48.ico
// @description       解析各大视频网站视频，支持优酷，爱奇艺，乐视，腾讯视频，土豆，芒果TV，bilibili，PPTV，暴风，音悦台
// @author            syhyz1990
// @license           MIT
// @supportURL        https://github.com/syhyz1990/media
// @match             *://v.youku.com/v_*
// @match             *://m.youku.com/v*
// @match             *://m.youku.com/a*
// @match             *://*.iqiyi.com/v_*
// @match             *://*.iqiyi.com/w_*
// @match             *://*.iqiyi.com/a_*
// @match             *://*.iqiyi.com/dianying/*
// @match             *://*.le.com/ptv/vplay/*
// @match             *v.qq.com/x/cover/*
// @match             *v.qq.com/x/page/*
// @match             *v.qq.com/play*
// @match             *://*.tudou.com/listplay/*
// @match             *://*.tudou.com/albumplay/*
// @match             *://*.tudou.com/programs/view/*
// @match             *://*.mgtv.com/b/*
// @match             *://film.sohu.com/album/*
// @match             *://tv.sohu.com/*
// @match             *://*.bilibili.com/video/*
// @match             *://*.bilibili.com/anime/*
// @match             *://*.bilibili.com/bangumi/play/*
// @match             *://vip.pptv.com/show/*
// @match             *://v.pptv.com/show/*
// @match             *://*.baofeng.com/play/*
// @match             *://vip.1905.com/play/*
// @require           https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @run-at            document-idle
// @grant             unsafeWindow
// @grant             GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  GM_addStyle(`
  .h-icon-play {
    color: #d926b5;
    fill: #d926b5;
    height: 80px;
    width: 80px;
    position: fixed;
    z-index: 99999;
    top: 10px;
    left: 0;
    cursor: pointer;
  }

  .h-ol {
    position: fixed;
    top: 70px;
    left: 20px;
    z-index: 99999;
    counter-reset: li;
    list-style: none;
    font-size: 14px;
    padding: 0;
    margin-bottom: 4em;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
    display: none;
  }

  .h-ol a {
    position: relative;
    display: block;
    padding: 3px 10px 3px 2em;
    margin: 0.5em 0;
    background: #ddd;
    color: #444;
    text-decoration: none;
    border-radius: 0.3em;
    transition: all 0.3s ease-out;
  }

  .h-ol a:hover {
    background: #eee;
    color: #ff6f5c;
    transition: all 0.3s ease-out;
  }

  .h-ol a::before {
    content: counter(li);
    counter-increment: li;
    position: absolute;
    left: -1.2em;
    top: 50%;
    margin-top: -0.9em;
    background: #87ceeb;
    height: 1.5em;
    width: 1.5em;
    line-height: 1.5em;
    border: 0.1em solid #fff;
    text-align: center;
    font-weight: bold;
    border-radius: 1.5em;
  }
  `);

  let api = [
    {name: '线路1', url: 'http://api.baiyug.vip/index.php?url='},
    {name: '线路2', url: 'http://www.82190555.com/index/qqvod.php?url='},
    {name: '线路3', url: 'http://jx.618g.com/?url='},
    {name: '线路4', url: 'http://2gty.com/apiurl/yun.php?url='},

  let main = {
    showButton: function () {
      if (location.host.match(/youku|iqiyi|le|qq|tudou|mgtv|sohu|acfun|bilibili|pptv|baofeng/ig)) {
        let mainButton = '<div class="h-icon-play" title="点击显示解析地址"><svg viewBox="0 0 512 512"><path d="M422.6 193.6c-5.3-45.3-23.3-51.6-59-54 -50.8-3.5-164.3-3.5-215.1 0 -35.7 2.4-53.7 8.7-59 54 -4 33.6-4 91.1 0 124.8 5.3 45.3 23.3 51.6 59 54 50.9 3.5 164.3 3.5 215.1 0 35.7-2.4 53.7-8.7 59-54C426.6 284.8 426.6 227.3 422.6 193.6zM222.2 303.4v-94.6l90.7 47.3L222.2 303.4z"></path></svg></div>';
        let apiList = '<ol class="h-ol"></ol>';

        $(top.document.body).append(mainButton);
        $(top.document.body).append(apiList);

        api.forEach((val, index) => {
          $('.h-ol').append(`<li><a target="_blank" href="${val.url + encodeURI(location.href)}">${val.name}</a></li>`)
        });
        //反馈按钮
        $('.h-ol').append(`<li><a target="_blank" style="color: #999;" href="https://github.com/syhyz1990/media/issues">反馈</a></li>`);

        $(top.document.body).on('click', '.h-icon-play', () => {
          $('.h-ol').fadeToggle('fast');
        });
      }
    }
  };

  $(function () {
    main.showButton();
  });
})();

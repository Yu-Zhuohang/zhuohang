// Map
function fetchConfig() {
    return fetch('js/config.json')
        .then(response => response.json())
        .then(data => data.amapKey)
        .catch(error => {
            console.error("Failed to load config.json", error);
            return null;
        });
  }
  
  function initMap(apiKey) {
    if (!apiKey) {
        alert("API Key not loaded, unable to load the map.");
        return;
    }
  
    var script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${apiKey}`;
    document.head.appendChild(script);
  
    script.onload = function () {
        var map = new AMap.Map('map-container', {
            viewMode: '3D',
            center: [114.305196, 30.480976],
            zoom: 15,
            pitch: 40,
            rotation: 0,
            showBuildingBlock: true,
            expandZoomRange: true,
            zoomEnable: true,
            animateEnable: true,
            doubleClickZoom: true,
            keyboardEnable: true,
            dragEnable: true
        });
  
        AMap.plugin(['AMap.Scale', 'AMap.ToolBar', 'AMap.ControlBar', 'AMap.HawkEye'], function () {
            map.addControl(new AMap.Scale({
                position: 'LB',
                visible: true
            }));
  
            map.addControl(new AMap.ToolBar({
                position: {
                    right: '27px',
                    top: '25px'
                }
            }));
  
            map.addControl(new AMap.ControlBar({
                showZoomBar: true,
                showControlButton: true,
                position: {
                    right: '10px',
                    top: '100px'
                }
            }));
  
            var controlBar = document.querySelector('.amap-controlbar');
            if (controlBar) {
                controlBar.style.transform = 'scale(0.7)';
                controlBar.style.transformOrigin = 'right top';
            }
  
            map.addControl(new AMap.HawkEye({
                opened: false
            }));
        });
  
        var marker = new AMap.Marker({
            position: [114.30533, 30.48109],
            title: '武汉洪山区南李路28号',
            offset: new AMap.Pixel(-13, -30),
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            extData: {
                address: '湖北省武汉市洪山区南李路28号'
            }
        });
  
        var infoWindow = new AMap.InfoWindow({
            content: '<div style="padding: 8px 12px;font-size: 14px;"><strong>武汉洪山区南李路28号</strong><br/><span style="color:#666;">点击定位按钮可快速定位到此位置</span></div>',
            offset: new AMap.Pixel(0, -30)
        });
  
        marker.on('click', function () {
            infoWindow.open(map, marker.getPosition());
        });
  
        marker.setMap(map);
  
        document.getElementById('locate-btn').addEventListener('click', function () {
            map.setCenter([114.30533, 30.48109]);
            map.setZoom(17);
            map.setPitch(65);
            marker.setAnimation('AMAP_ANIMATION_DROP');
  
            infoWindow.open(map, marker.getPosition());
  
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 100);
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    };
  }
  
  window.onload = function () {
    fetchConfig().then(apiKey => {
        initMap(apiKey);
    });
  };
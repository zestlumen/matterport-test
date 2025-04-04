const iframe = document.getElementById('showcase');
//const iframeWindow = iframe.contentWindow;

const popup = document.getElementById('popup');
const closeBtn = document.getElementById('popup-close');

const startBtn = document.getElementById('start-tour');

document.getElementById("start-tour").addEventListener("click", () => {
    const iframe = document.getElementById("showcase");
    const baseUrl = "bundle/showcase.html?m=5F7EgMkQz48&applicationKey=anrseab1byb17gtm399uwf4sa&qs=0&play=1";
    iframe.src = baseUrl; // 플레이 버튼 없이 강제 재생
    document.getElementById("start-tour").style.display = "none";
  });
  

iframe.addEventListener('load', async () => {
    try {
    // const sdk = await iframeWindow.MP_SDK.connect(iframeWindow);
    const sdk = await iframe.contentWindow.MP_SDK.connect(iframe);
    console.log("🎉 SDK 연결 완료!", sdk); 

    //태그불러오기 - 라이센스 문제로 현재 사용불가
    // const tagsModule = await sdk.Module.get('Tags');
    // const tags = await tagsModule.getData();
    // console.log("태그 목록:", tags);

    // const tagList = document.getElementById('tag-list');

    // tags.forEach(tag => {
    //     const btn = document.createElement('button');
    //     btn.textContent = tag.label || '태그';
    //     btn.onclick = () => {
    //       sdk.Camera.moveTo(tag.anchorPosition, { transition: "fly", speed: 1 });
    //     };
    //     tagList.appendChild(btn);
    // });


    sdk.App.state.subscribe((state) => {
        console.log("🌀 현재 phase 상태:", state.phase);
    });

    sdk.App.state.subscribe((state) => {
        if (state.phase === 'appphase.playing') {
            console.log("투어 스타트");
            popup.style.display = "flex";
        }
    })


 
    } catch (err) {
        console.error("❌ SDK 연결 실패", err);
    }
});

closeBtn.addEventListener('click', ()=>{
    popup.style.display = "none";
});

//예약하기 토글
const reserveBtn = document.getElementById("reserve-btn");
const popupRes = document.getElementById("popup_res");
const closePopupRes = document.getElementById("close_popup_res");

reserveBtn.addEventListener("click", () => {
  popupRes.classList.toggle("hidden");
});

closePopupRes.addEventListener("click", () => {
  popupRes.classList.add("hidden");
});


// 3D 뷰 버튼 토글
const view3DBtn = document.getElementById("view3d-btn");
const popup3D = document.getElementById("popup_3d");
const closePopup3D = document.getElementById("close_popup_3d");

view3DBtn.addEventListener("click", () => {
  popup3D.classList.toggle("hidden");
});

closePopup3D.addEventListener("click", () => {
  popup3D.classList.add("hidden");
});

// 아바타 팝업 토글
const avatarBtn = document.getElementById("avatar-btn");
const popupAvatar = document.getElementById("popup_avatar");
const closePopupAvatar = document.getElementById("close_popup_avatar");

avatarBtn.addEventListener("click", () => {
  popupAvatar.classList.remove("hidden");
});

closePopupAvatar.addEventListener("click", () => {
  popupAvatar.classList.add("hidden");
});

// Ready Player Me에서 아바타 URL 받기
window.addEventListener("message", (event) => {
  const json = JSON.parse(event.data);
  if (json.source === "readyplayerme") {
    if (json.eventName === "v1.avatar.exported") {
      const avatarUrl = json.data.url;
      console.log("✅ 아바타 생성 완료! GLB 주소:", avatarUrl);

      // 예: 바로 model-viewer에 적용
      // document.querySelector("model-viewer").src = avatarUrl;

      // 팝업 닫기
      popupAvatar.classList.add("hidden");
    }
  }
});

const sunglassBtn = document.getElementById("sunglass-btn");
const popupSunglass = document.getElementById("popup_sunglass");
const closePopupSunglass = document.getElementById("close_popup_sunglass");

sunglassBtn.addEventListener("click", () => {
  popupSunglass.classList.remove("hidden");
});

closePopupSunglass.addEventListener("click", () => {
  popupSunglass.classList.add("hidden");
});

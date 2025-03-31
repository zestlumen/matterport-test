const iframe = document.getElementById('showcase');
//const iframeWindow = iframe.contentWindow;

const popup = document.getElementById('popup');
const closeBtn = document.getElementById('popup-close');

const startBtn = document.getElementById('start-tour');

document.getElementById("start-tour").addEventListener("click", () => {
    const iframe = document.getElementById("showcase");
    const baseUrl = "bundle/showcase.html?m=5F7EgMkQz48&applicationKey=anrseab1byb17gtm399uwf4sa&play=1";
    iframe.src = baseUrl; // 플레이 버튼 없이 강제 재생
    document.getElementById("start-tour").style.display = "none";
  });
  

iframe.addEventListener('load', async () => {
    try {
    // const sdk = await iframeWindow.MP_SDK.connect(iframeWindow);
    const sdk = await iframe.contentWindow.MP_SDK.connect(iframe);
    console.log("🎉 SDK 연결 완료!", sdk);

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
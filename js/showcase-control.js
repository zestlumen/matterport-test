const iframe = document.getElementById('showcase');

iframe.addEventListener('load', async () => {
  try {
    const iframeWindow = iframe.contentWindow;

    // iframe이 제대로 로드되지 않았을 경우 방지
    if (!iframeWindow || !iframeWindow.MP_SDK) {
      console.error("❌ iframeWindow 또는 MP_SDK가 준비되지 않았습니다.");
      return;
    }

    const sdk = await iframeWindow.MP_SDK.connect(iframe);

    const position = await sdk.Camera.getPosition();
    console.log("📍 카메라 위치:", position);   

    console.log("🎉 SDK 연결 완료!", sdk);
    alert("안녕하세요!");

    // 추가적인 SDK 기능은 여기서 호출하면 돼요
    // 예: sdk.Camera.getPosition().then(pos => console.log(pos));

  } catch (err) {
    console.error("❌ SDK 연결 실패", err);
  }
});
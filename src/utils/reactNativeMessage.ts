import { isMobile, isAndroid, isIOS } from 'react-device-detect';

// 메시지 데이터 인터페이스
interface MessageData {
  type: string;
  payload?: string;
}

interface Message {
  type: string;
  payload?: string;
}

export const getReactNativeMessage = () => {
  if (!isMobile) {
    return;
  }

  // MessageEvent로 타입 캐스팅을 사용
  const listener: EventListener = ((event: Event) => {
    // MessageEvent로 타입 캐스팅
    const messageEvent = event as MessageEvent;
    try {
      const parsedData: MessageData = JSON.parse(messageEvent.data);
      if (parsedData?.type === "FCMTOKEN") { // parsedData.type은 메시지의 용도에 맞게 재정의 필요
        console.log(parsedData.payload)
      }
    } catch (error) {
      console.error('Failed to parse message data:', error);
    }
  });

  if (window.ReactNativeWebView) {
    if (isAndroid) {
      document.addEventListener('message', listener);
    }
    if (isIOS) {
      window.addEventListener('message', listener);
    }
  }
};

export const sendReactNativeMessage = ({ type, payload }: Message) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }));
  }
};
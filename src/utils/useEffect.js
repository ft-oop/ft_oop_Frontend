export const useEffect = (callback, targetNode) => {
  // 대상 요소가 유효한지 확인
  if (!targetNode) {
    console.error(
      'useEffect: 대상 요소가 지정되지 않았거나 존재하지 않습니다.',
    );
    return;
  }
  // 기본 감시 옵션 설정   속성 변화 감지 |  자식 요소 변화 감지 | 모든 후손 요소 변화 감지 | 텍스트 노드 변화 감지
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  };

  // MutationObserver 콜백 정의
  const observerCallback = () => {
    callback(); // 변화가 감지될 때 콜백 함수 실행
  };

  // MutationObserver 인스턴스 생성
  const observer = new MutationObserver(observerCallback);

  // 감시 시작
  observer.observe(targetNode, config);

  // 정리(Cleanup) 함수 반환
  return () => observer.disconnect(); // 이 함수를 호출하여 감시를 중지
};

// export default function useEffect(callback, dependencies) {
//   const _index = currentStateIndex;
//   // 현재 위치에 저장되어 있는 값이 기존의 dependency이다
//   // 최초 실행 시에는 이 값은 undefined일 것이다
//   const oldDependencies = states[_index];

//   // useEffect 최초 실행 시에는 무조건 callback을 실행하므로 default 값은 true로 설정
//   let hasChanged = true;

//   // oldDependencies가 존재한다면 현재 받은 dependencies와 비교
//   if (oldDependencies) {
//     // Array.some 함수를 사용하여 조건을 만족하는 값이 존재하는지 확인
//     hasChanged = dependencies.some(
//       // 조건: 하나라도 동일하지 않은 값이 있는지
//       (dep, i) => !Object.is(dep, oldDependencies[i]),
//     );
//   }

//   // 최초 실행, 또는 dependencies 중 변경된 값이 있다면 callback 실행
//   if (hasChanged) {
//     callback();
//     // 현재의 dependency를 다시 현재 위치에 저장
//     states[_index] = dependencies;
//   }

//   currentStateIndex++;
// }

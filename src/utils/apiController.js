import axios from 'axios';
import { navigate } from './navigate.js';

const apiController = axios.create({
  baseURL: 'http://localhost:8000/', // 서버 8000
  // baseURL: 'http://10.13.6.5:8000/', // 서버 8000
});

// 요청 인터셉터 추가하기(요청 전)
apiController.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    const accessToken = localStorage.getItem('accessToken');

    // 토큰이 존재할 경우 헤더에 추가
    if (accessToken !== null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  async function (error) {
    // 요청 오류가 있는 작업 수행
    console.log(error);

    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가하기
apiController.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행

    console.log(response);

    return response;
  },
  async function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행

    // console.log('error: ', error);

    const { config, data, status } = error.response;

    // console.log('status: ' + status);

    if (status === 401) {
      // 401 토큰 만료
      localStorage.removeItem('accessToken');
      const reissueConfig = {
        url: '/jwt/reissue',
        method: 'POST',
        data: {
          refresh: localStorage.getItem('refreshToken'),
        },
      };

      // const accessToken = await reissueToken();

      const { data } = await apiController(reissueConfig);
      const { access } = data;
      localStorage.setItem('accessToken', access);

      return await apiController(config);
    } else if (status === 403) {
      // 토큰 없이 main 진입
      navigate('/login');
      return;
    }

    return Promise.reject(error.response);
  },
);

// 토큰 갱신 함수
// async function reissueToken() {
//   // 민진님!! try catch문을 사용하여 에러 처리를 해주셨는데 이렇게 처리해도 되는지 잘 모르겠어요 ㅎㅎ
//   // 저도 잘 모르겠어요.. 백이랑 연결해서 테스트 해보면서 확인해야 할 것 같아여ㅠ
//   try {
//     const reissueConfig = {
//       url: '/jwt/reissue',
//       method: 'POST',
//     };

//     const { data } = await apiController(reissueConfig);
//     const { accessToken } = data;

//     return accessToken;
//   } catch (e) {
//     // 유저 정보 삭제 후 로그인 페이지로 이동
//     localStorage.removeItem('accessToken');
//     navigate('/login');
//   }
// }

export default apiController;

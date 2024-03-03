import axios from 'axios';
import { navigate } from './navigate.js';

const apiController = axios.create({
  baseURL: 'http://localhost:8000/', // 서버 8000
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
  function (error) {
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

    /**
     * 201: Created
     * @description: 요청이 성공적으로 처리되었으며 그 결과로 새로운 리소스가 생성되었습니다. 2FA로 유저 리디렉션
     */
    if (response.status === 201) {
      console.log('201 Created');
    }
    if (response.status === 200) {
      console.log('200 OK');
    }
    console.log(response);

    return response;
  },
  async function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행

    console.log('error: ', error);

    const { config, data, status } = error.response;

    console.log('status: ' + status);

    if (status === 400) {
      if (data.errorMessage === '...') {
        // 에러 처리
      }
    } else if (status === 401) {
      // 토큰 만료
      console.log(data.errorMessage);

      const accessToken = await reissueToken();
      localStorage.setItem('accessToken', accessToken);

      return apiController(config);
    }

    return Promise.reject(error.response);
  },
);

// 토큰 갱신 함수
async function reissueToken() {
  try {
    const reissueConfig = {
      url: '/jwt/reissue',
      method: 'post',
    };

    const { data } = await apiController(reissueConfig);
    const { accessToken } = data;

    return accessToken;
  } catch (e) {
    // 유저 정보 삭제 후 로그인 페이지로 이동
    localStorage.removeItem('accessToken');
    navigate('/login');
  }
}

export default apiController;

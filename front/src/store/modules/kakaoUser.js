import produce from 'immer';
export const KAKAO_LOGIN = 'KAKAO_LOGIN';
export const KAKAO_LOGOUT = 'KAKAO_LOGOUT';
export const KAKAO_INFO = 'KAKAO_INFO';
export const KAKAO_REFRESH = 'KAKAO_REFRESH'

const initialState = {
  login : {
    userId: '',
    isLogin: false,
    userKey : '',
    accessToken : '',
    profileImg: '',
    favorite: [],
    localToken: '',
    uploadList: [],
  },
  user : {
    id: '',
    userId: '',
    profileImg: '',
    favorite: [],
    uploadList: [],
  },
}


const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case KAKAO_LOGIN : 
      return {
        ...state,
        login: {
          userId: action.kakaoLoginSuccess.data.userId,
          isLogin: true,
          userKey: action.kakaoLoginSuccess.data.userKey,
          accessToken: `Bearer ${action.kakaoLoginSuccess.data.accessToken}`,
          profileImg: action.kakaoLoginSuccess.data.profileImg,
          favorite: action.kakaoLoginSuccess.data.favorite,
          localToken: action.kakaoLoginSuccess.data.localToken,
          uploadList: action.kakaoLoginSuccess.data.uploadList,
        }
      }
      case KAKAO_LOGOUT : 
      return {
        ...state,
        login: {
          userId: null,
          isLogin: false,
          userKey: null,
          accessToken: null,
          profileImg: null,
          favorite: [],
          localToken: null,
          uploadList:[],
        }
      }
      case KAKAO_INFO :
        return {
          ...state,
          user : {
            id: action.getKakaoInfoSuccess.data.data._id,
            userId: action.getKakaoInfoSuccess.data.data.userId,
            profileImg: action.getKakaoInfoSuccess.data.data.profileImg,
            favorite: action.getKakaoInfoSuccess.data.data.favorite,
            uploadList: action.getKakaoInfoSuccess.data.data.uploadList,
          }
        }
      
      case KAKAO_REFRESH :
      return {
        ...state,
          login: {
            userId: action.autoRefreshKakao.data.data.userId,
            isLogin: true,
            userKey: action.autoRefreshKakao.data.data._id,
            accessToken: `Bearer ${action.autoRefreshKakao.data.accessToken}`,
            profileImg: action.autoRefreshKakao.data.data.profileImg,
            favorite: action.autoRefreshKakao.data.data.favorite,
          },
      }
      default : return state;
    }
  });
export default reducer;
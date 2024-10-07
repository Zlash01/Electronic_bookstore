import {create} from 'zustand';
import {Immer} from 'immer';

export const useAuthStore = create(set => ({
  user: null,
  isLogin: false,
  accessToken: null,
  refreshToken: null,

  login: (userData, accessToken, refreshToken) =>
    set(() => ({
      user: userData,
      isLogin: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
    })),

  logout: () => set(() => ({user: null, isLogin: false, accessToken: null})),
}));

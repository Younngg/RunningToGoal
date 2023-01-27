import { atom } from 'recoil';

export const userState = atom<{ nickname: string; profileImg: string } | null>({
  key: 'userState',
  default: null,
});

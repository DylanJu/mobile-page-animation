import { atom } from 'recoil';

type TransitionStage = 'center' | 'left' | 'right';

export const transitionStageState = atom<TransitionStage>({
  key: 'transitionStageState',
  default: 'center',
});

export const nextTransitionStageState = atom<TransitionStage>({
  key: 'nextTransitionStageState',
  default: 'right',
});

export const isTransitionState = atom({
  key: 'isTransitionState',
  default: false,
});

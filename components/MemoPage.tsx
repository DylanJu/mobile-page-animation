import { FC, useState, useEffect, ReactNode } from 'react';
import { styled } from '@stitches/react';
import type { RouterAction } from './MemoLayer';

export interface Props {
  lastAction: RouterAction;
  index: number;
  length: number;
}

type TransitionStage = 'none' | 'right' | 'center' | 'left';

const MemoPage: FC<Props> = ({ children, lastAction, index, length }) => {
  const [transitionStage, setTransitionStage] = useState<TransitionStage>('right');

  useEffect(() => {
    if (lastAction === 'push') {
      if (transitionStage === 'right') {
        setTransitionStage('center');
      } else if (transitionStage === 'center') {
        setTransitionStage('left');
      } else {
        setTransitionStage('none');
      }
    } else if (lastAction === 'replace') {
      if (transitionStage === 'right') {
        setTransitionStage('center');
      }
    } else if (lastAction === 'back') {
      if (transitionStage === 'center') {
        setTransitionStage('right');
      } else if (transitionStage === 'left') {
        setTransitionStage('center');
      } else if (transitionStage === 'none' && index === length - 2) {
        setTransitionStage('left');
      }
    }
  }, [length, children]);

  return <Box transitionStage={transitionStage}>{children}</Box>;
};

const Box = styled('div', {
  width: '100%',
  border: '1px solid blue',

  position: 'absolute',
  top: 0,
  left: 0,

  transition: 'transform 0.5s ease-in-out',

  variants: {
    transitionStage: {
      none: {
        display: 'none',
      },
      right: {
        transform: 'translateX(100%)',
      },
      center: {
        transform: 'translateX(0)',
      },
      left: {
        transform: 'translateX(-100%)',
      },
    },
  },
});

export default MemoPage;

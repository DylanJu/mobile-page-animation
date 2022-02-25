import { FC, useState, useEffect, createContext } from 'react';
import { styled } from '@stitches/react';
import type { RouterAction } from './AnimationLayer';

const CurrentScreenContext = createContext<{
  isTop: boolean;
  setIsTop: () => void;
  isRoot: boolean;
  setIsRoot: () => void;
}>({
  isTop: true,
  setIsTop: () => {},
  isRoot: true,
  setIsRoot: () => {},
});

export interface Props {
  lastAction: RouterAction;
  index: number;
  length: number;
  isSwiped: boolean;
}

type TransitionStage = 'none' | 'right' | 'center' | 'left';

const AnimationPage: FC<Props> = ({ children, lastAction, index, length, isSwiped }) => {
  const [transitionStage, setTransitionStage] = useState<TransitionStage>('right');

  useEffect(() => {
    if (isSwiped) {
      // return;
    }

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
      console.log('length: ', length, ' / index: ', index, ' / isSwpied: ', isSwiped);
      if (transitionStage === 'center') {
        setTransitionStage('right');
      } else if (transitionStage === 'left') {
        setTransitionStage('center');
      } else if (transitionStage === 'none' && index === length - 2) {
        setTransitionStage('left');
      }
    }
  }, [length, children]);

  return (
    <Box transitionStage={transitionStage} isSwiped={isSwiped}>
      {children}
    </Box>
  );
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
    isSwiped: {
      true: {
        transition: 'none',
      },
    },
  },
});

export default AnimationPage;

import { FC, useState, useEffect } from 'react';
import { styled } from '@stitches/react';
import type { TransitionStage, RouterAction } from './TransitionLayout';

export interface Props {
  lastAction: RouterAction;
  transitionStage: TransitionStage;
}

const PageBox: FC<Props> = ({ children, lastAction, transitionStage: prevStage }) => {
  const [transitionStage, setTransitionStage] = useState<TransitionStage>(prevStage);

  useEffect(() => {
    if (lastAction === 'push' || lastAction === 'replace') {
      if (prevStage === 'right') {
        setTimeout(() => {
          setTransitionStage('center');
        }, 100);
      } else if (prevStage === 'center') {
        setTimeout(() => {
          setTransitionStage('left');
        }, 100);
      } else if (prevStage === 'left') {
        setTransitionStage('none');
      } else {
        setTransitionStage(prevStage);
      }
    } else if (lastAction === 'back') {
      setTransitionStage(prevStage);
    }
  }, [prevStage, lastAction]);

  return (
    <Box transitionStage={transitionStage}>
      <button type="button" onClick={() => console.log(transitionStage)}>
        console stage
      </button>
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

  transition: 'transform 1s ease-in-out',

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

export default PageBox;

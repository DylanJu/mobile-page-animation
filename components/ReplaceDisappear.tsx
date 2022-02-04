import { FC, useEffect, useState } from 'react';
import { styled } from '@stitches/react';
import type { TransitionStage } from './TransitionLayout';

interface Props {
  onReplaceTransitionEnd: () => void;
}

const ReplaceDisappear: FC<Props> = ({ children, onReplaceTransitionEnd }) => {
  const [transitionStage, setTransitionStage] = useState<TransitionStage>('right');

  useEffect(() => {
    setTransitionStage('center');
  }, []);

  return (
    <Box transitionStage={transitionStage} onTransitionEnd={onReplaceTransitionEnd}>
      <h1>replace disappear</h1>
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

export default ReplaceDisappear;

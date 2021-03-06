import { FC, useEffect, useState } from 'react';
import { styled } from '@stitches/react';

type TransitionStage = 'none' | 'right' | 'center' | 'left';

interface Props {
  type: 'back' | 'replace';
  onTransitionEnd: () => void;
}

const Disappear: FC<Props> = ({ children, type, onTransitionEnd }) => {
  const [transitionStage, setTransitionStage] = useState<TransitionStage>('center');

  useEffect(() => {
    setTransitionStage(type === 'back' ? 'right' : 'left');
  }, []);

  return (
    <Box className="Disappear" transitionStage={transitionStage} onTransitionEnd={onTransitionEnd}>
      <h1>disappear {type}</h1>
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
  },
});

export default Disappear;

import { FC, ReactNode, useEffect, useState, useRef, memo } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@stitches/react';
import PageBox from './PageBox';
import Disappear from './Disappear';
import { handleTouchStart, handleTouchEnd, handleTouchMove } from './swipeDetector';

export type RouterAction = 'push' | 'back' | 'replace' | '';

export type TransitionStage = 'none' | 'right' | 'center' | 'left';

const TransitionLayout: FC = ({ children }) => {
  const router = useRouter();
  const [displayChildren, setDisplayChildren] = useState<ReactNode[]>([]);
  const urlHistory = useRef<string[]>([]);
  const lastActionRef = useRef<RouterAction>('');
  const [disappearComponent, setDisappearComponent] = useState<ReactNode>(null);

  useEffect(() => {
    const lastAction = lastActionRef.current;
    if (lastAction === 'push' || lastAction === '') {
      setDisplayChildren((prev) => prev.concat(children));
    } else if (lastAction === 'replace') {
      setDisplayChildren((prev) => prev.slice(0, -1).concat(children));
    } else if (lastAction === 'back') {
      setDisappearComponent(displayChildren[displayChildren.length - 1]);
      setDisplayChildren((prev) => prev.slice(0, -1));
    }
  }, [children]);

  const handleRouteChangeComplete = (url: string) => {
    // if (urlHistory.current[urlHistory.current.length - 1] === url) {
    //   return;
    // }

    if (urlHistory.current[urlHistory.current.length - 2] === url) {
      lastActionRef.current = 'back';
      urlHistory.current.pop();
    } else {
      lastActionRef.current = 'push';
      urlHistory.current.push(url);
    }

    console.log('complete', url, ' -> result: ', urlHistory.current);
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    // enqueue first url
    urlHistory.current.push(router.pathname);

    router.events.on('routeChangeStart', () => console.log('start'));
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    document.addEventListener('swiped-left', () => {
      alert('hey');
    });

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  const getTransitionStage = (i: number): TransitionStage => {
    const lastAction = lastActionRef.current;
    const { length } = displayChildren;

    if (length === 1) {
      return 'center';
    }

    if (lastAction === 'push' || lastAction === 'replace') {
      if (length === 2) {
        if (i === 0) {
          return 'center';
        }
        return 'right';
      }

      if (i === length - 1) {
        return 'right';
      }
      if (i === length - 2) {
        return 'center';
      }
      if (i === length - 3) {
        return 'left';
      }
      return 'none';
    }

    // back case
    if (i === length - 1) {
      return 'center';
    }
    if (i === length - 2) {
      return 'left';
    }
    return 'none';
  };

  return (
    <Layout>
      {displayChildren.map((child, i) => {
        return (
          <PageBox key={i.toString()} transitionStage={getTransitionStage(i)} lastAction={lastActionRef.current}>
            <h1>{i}</h1>
            {child}
          </PageBox>
        );
      })}
      {disappearComponent && <Disappear>{disappearComponent}</Disappear>}
    </Layout>
  );
};

const Layout = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'auto',
});

// export default memo<Props>(TransitionLayout, (prev, next) => false);
export default TransitionLayout;

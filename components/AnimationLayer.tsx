import React, { ReactNode } from 'react';
import { withRouter, NextRouter } from 'next/router';
// import Xwiper from 'xwiper';

import { styled } from '@stitches/react';
import AnimationPage from './AnimationPage';
import Disappear from './Disappear';

interface WithRouterProps {
  router: NextRouter;
}

interface Props extends WithRouterProps {
  children: ReactNode;
}

interface State {
  displayChildren: ReactNode[];
  disappearChild: ReactNode;
}

export type RouterAction = 'push' | 'back' | 'replace' | '';
let lastAction: RouterAction = 'replace'; // 첫 페이지로 들어올 경우 replaceState 이벤트가 발생하므로 초기값을 replace로 지정해준다.

let currentIdx = 0;

let isSwiped = false;

class AnimationLayer extends React.Component<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  state: State = {
    displayChildren: [],
    disappearChild: null,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (lastAction === 'push') {
      return { ...prevState, displayChildren: prevState.displayChildren.concat(nextProps.children) };
    }

    if (lastAction === 'replace') {
      return {
        ...prevState,
        displayChildren: prevState.displayChildren.concat(nextProps.children),
        disappearChild: prevState.displayChildren[prevState.displayChildren.length - 1] || null,
      };
    }

    if (lastAction === 'back') {
      console.log('children length', prevState.displayChildren.length);
      return {
        ...prevState,
        displayChildren: prevState.displayChildren.slice(0, -1),
        disappearChild: isSwiped ? null : prevState.displayChildren[prevState.displayChildren.length - 1],
      };
    }

    return prevState;
  }

  componentDidMount() {
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        lastAction = 'push';
        currentIdx = argArray[0].idx;
        return target.apply(thisArg, argArray as any);
      },
    });

    window.history.replaceState = new Proxy(window.history.replaceState, {
      apply: (target, thisArg, argArray) => {
        if (argArray[0].idx === currentIdx) {
          lastAction = 'replace';
        } else {
          lastAction = 'back';
        }
        currentIdx = argArray[0].idx;
        return target.apply(thisArg, argArray as any);
      },
    });

    // const xwiper = new Xwiper('body');
    // xwiper.onSwipeLeft(() => {
    //   isSwiped = true;
    //   setTimeout(() => {
    //     isSwiped = false;
    //   }, 200);
    // });
  }

  handleTransitionEnd() {
    if (isSwiped) {
      isSwiped = false;
      return;
    }

    if (lastAction === 'replace') {
      this.setState((prev) => ({
        ...prev,
        displayChildren: prev.displayChildren
          .slice(0, -2)
          .concat(prev.displayChildren[prev.displayChildren.length - 1]),
      }));
    }

    this.setState({ disappearChild: null });

    // setState 이후에 getDerivedStateToProps에서 lastAction을 back으로 새로운 back transition 로직을 타게됨.
    // lastAction으로 인한 오동작을 방지하기 위해 초기화 시켜준다.
    lastAction = '';
  }

  render() {
    return (
      <Layout>
        {this.state.displayChildren.map((child, i) => {
          return (
            <AnimationPage
              key={i.toString()}
              lastAction={lastAction}
              index={i}
              length={this.state.displayChildren.length}
              isSwiped={isSwiped}
            >
              <h1>{i}</h1>
              {child}
            </AnimationPage>
          );
        })}
        {this.state.disappearChild && (
          <Disappear
            type={lastAction === 'back' ? 'back' : 'replace'}
            onTransitionEnd={() => this.handleTransitionEnd()}
          >
            {this.state.disappearChild}
          </Disappear>
        )}
      </Layout>
    );
  }
}

const Layout = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'auto',
});

export default withRouter(AnimationLayer);

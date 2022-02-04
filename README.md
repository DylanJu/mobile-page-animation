## TODO
- [ ] back 할 때 onTransitionEnd()에서 slice 하기 (transition이 끝나기 전에 slice되면 현재화면이 날아가서 어색함)
  - back case에서 setTransitionStage를 onTransitionEnd()로 다 옮겨야함
- [x] `_commands.ts` 방식에서 event subscribe 방식으로 변경해야함
  - [x] 백스와이프 감지
  - [ ] 백스와이프를 했을 경우에는 애니메이션 방지
- [ ] fix to re-rendering: children, displayChildren 변경으로 인해 2번 렌더링 되는 현상

import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const A: FC = () => {
  const { push, back, replace } = useRouter();

  const onPushClick = () => {
    push('/b');
  };

  const onBackClick = () => {
    back();
  };

  const onReplaceClick = () => {
    replace('/b');
  };

  return (
    <div className="page-wrapper">
      <h1>A page</h1>
      <button type="button" onClick={onPushClick}>
        push
      </button>
      <br />
      <br />
      <br />
      <br />
      <button type="button" onClick={onBackClick}>
        back
      </button>
      <br />
      <br />
      <br />
      <br />
      <button type="button" onClick={onReplaceClick}>
        replace
      </button>
      <br />
      <br />
      <br />
      <br />
      <Link href="/b">link</Link>
    </div>
  );
};

export default A;

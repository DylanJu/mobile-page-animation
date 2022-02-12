import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const B: FC = () => {
  const { push, back, replace } = useRouter();

  const onPushClick = () => {
    push('/c');
  };

  const onBackClick = () => {
    back();
  };

  const onReplaceClick = () => {
    replace('/c');
  };

  return (
    <div className="page-wrapper">
      <h1>B page</h1>
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
      <Link href="/c">link</Link>
    </div>
  );
};

export default B;

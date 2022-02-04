import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const C: FC = () => {
  const { push, back, replace } = useRouter();

  const onPushClick = () => {
    push('/d');
  };

  const onBackClick = () => {
    back();
  };

  const onReplaceClick = () => {
    replace('/d');
  };

  return (
    <div>
      <h1>C page</h1>
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
      <Link href="/d">link</Link>
    </div>
  );
};

export default C;

import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const D: FC = () => {
  const { push, back, replace } = useRouter();

  const onPushClick = () => {
    push('/e');
  };

  const onBackClick = () => {
    back();
  };

  const onReplaceClick = () => {
    replace('/e');
  };

  return (
    <div>
      <h1>D page</h1>
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
      <Link href="/e">link</Link>
    </div>
  );
};

export default D;

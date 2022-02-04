import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const E: FC = () => {
  const { push, back, replace } = useRouter();

  const onPushClick = () => {
    push('/a');
  };

  const onBackClick = () => {
    back();
  };

  const onReplaceClick = () => {
    replace('/a');
  };

  return (
    <div>
      <h1>E page</h1>
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
      <Link href="/a">link</Link>
    </div>
  );
};

export default E;

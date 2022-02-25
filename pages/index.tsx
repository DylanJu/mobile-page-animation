import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { push } = useRouter();

  const [value, setValue] = useState('');

  const onClick = () => {
    push('/a');
  };

  return (
    <div>
      <h1>Hello</h1>
      <button type="button" onClick={onClick}>
        Next.js!
      </button>
      <input
        value={value}
        onChange={(e: any) => {
          setValue(e.currentTarget.value);
        }}
      />
    </div>
  );
};

export default Home;

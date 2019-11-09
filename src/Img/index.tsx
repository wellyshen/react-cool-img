import React from 'react';

interface Props {
  src: string;
}

export default ({ src }: Props) => <img src={src} alt="Fake image" />;

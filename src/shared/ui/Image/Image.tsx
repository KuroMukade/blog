import { ImgHTMLAttributes } from 'react';
import { IMG_PATH_PREFIX } from 'shared/lib/img/constants';

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image = ({ src, alt, ...props }: ImageProps) => {
  const srcWithPrefix = IMG_PATH_PREFIX + '/' + src;
  return (
      <img {...props} alt={alt} src={srcWithPrefix} />
  );
};

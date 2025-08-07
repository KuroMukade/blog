import { Image } from "shared/ui/Image/Image";

import { getArticlesImagePath } from "../../model/helpers/getArticlesImagePath";
import brokenImage from 'shared/assets/images/noutFound.png';
import { useRef } from "react";

type PropsType = {
  className: string;
  src: string;
  alt: string;
}

export const ArticlesImage = ({className, alt, src}: PropsType) => {
    const imgRef = useRef<HTMLImageElement>(null);
  
    const setBrokenImage = () => {
      if (imgRef?.current) {
        imgRef.current.src = brokenImage;
      }
    };
  
  return (
    <Image onError={setBrokenImage} className={className} src={getArticlesImagePath(src)} alt={alt} />
  )
};

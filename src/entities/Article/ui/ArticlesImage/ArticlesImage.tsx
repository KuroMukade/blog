import { Image } from "shared/ui/Image/Image";

import { getArticlesImagePath } from "../../model/helpers/getArticlesImagePath";

type PropsType = {
  className: string;
  src: string;
  alt: string;
}

export const ArticlesImage = ({className, alt, src}: PropsType) => {
  return (
    <Image className={className} src={getArticlesImagePath(src)} alt={alt} />
  )
};

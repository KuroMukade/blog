import { User } from 'entities/User';

export type ArticleBlockType = 'TEXT' | 'IMAGE' | 'CODE';

export interface ArticleBlockBase {
    id: string;
    type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: 'CODE';
    code: string;
}
export interface ArticleImageBlock extends ArticleBlockBase {
    type: 'IMAGE';
    src: string;
    title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: 'TEXT',
    paragraphs: string[];
    title?: string;
}

export type ArticleType = 'IT' | 'SCIENCE' | 'ECONOMICS';

export type ArticleView = 'grid' | 'list';

export type ArticleBlock = ArticleCodeBlock | ArticleTextBlock | ArticleImageBlock;

export interface Article {
    id: string;
    user: User;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}

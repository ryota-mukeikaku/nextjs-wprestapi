import PostType from '@/types/PostType';

type PostPaginationType = {
    prev: PostType | null;
    next: PostType | null;
};

export default PostPaginationType;

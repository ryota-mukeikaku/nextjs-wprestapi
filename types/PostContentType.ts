import PostType from '@/types/PostType';
import PostPaginationType from './PostPaginationType';
import RelationType from './RelationType';

type PostContentType = {
    post: PostType;
    pagination: PostPaginationType;
    relation: RelationType;
};

export default PostContentType;

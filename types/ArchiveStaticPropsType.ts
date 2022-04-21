import MetaType from '@/types/MetaType';
import ArchivePaginationType from '@/types/ArchivePaginationType';
import PostsType from '@/types/PostsType';

type ArchiveStaticPropsType = {
    meta: MetaType;
    posts: PostsType;
    pagination: ArchivePaginationType;
    label: string;
};

export default ArchiveStaticPropsType;

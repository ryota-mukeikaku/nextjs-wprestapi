type PostType = {
    id: string;
    title: string;
    content: string;
    date: string;
    taxonomies: {
        category: {
            slug: string;
            name: string;
        }[];
        post_tag: {
            slug: string;
            name: string;
        }[];
    } | null;
    thumbnail: string[] | null;
    post_type: string;
};

export default PostType;

type PostType = {
    id: string
    title: string
    content: string
    date: string
    taxonomies: {
        category: {
            slug: string
            name: string
        }[]
        tag: {
            slug: string
            name: string
        }[]
    } | null
    thumbnail: string[] | null
    post_type: string
    toc: {
        text: string
        id: string
    }[]
}

export default PostType

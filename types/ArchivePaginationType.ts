type ArchivePaginationType = {
    prev: number | false;
    next: number | false;
    current: number;
    numbers: number[];
    mode: string;
    slug: string;
} | null;

export default ArchivePaginationType;

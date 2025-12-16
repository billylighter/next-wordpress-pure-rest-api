export default interface WooRequestProps {
    hide_empty?: boolean,
    parent?: number,
    per_page?: number,
    slug?: string,
    category?: string | number,
    tag?: string | number,
    include?: string,
    search?:string,
}
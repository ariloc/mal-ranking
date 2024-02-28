export type PagedList<T> = {
    data: T
    nextPage: number | null
    previousPage: number | null
    pageSize: number | null
}
export default PagedList;
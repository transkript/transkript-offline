import {PaginatorState} from "primeng/paginator";

export interface PaginationPayload {
  page: number
  size: number
  sortBy: SortBy,
  totalPages: number,
  totalData: number
}

type SortBy = {
  [p: string]: SortDirection
}

export enum SortDirection {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC'
}

export const defaultPagination = (): PaginationPayload => <PaginationPayload>{
  size: 10,
  page: 0,
  totalData: 0,
  totalPages: 0,
  sortBy: {}
}

export const paginationFromPaginatorState = (
  state: PaginatorState,
  pagination: PaginationPayload = defaultPagination()
) => <PaginationPayload>{
  size: state.rows,
  page: state.page,
  totalPages: state.pageCount,
  totalData: 0,
  sortBy: pagination.sortBy
}

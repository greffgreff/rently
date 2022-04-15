import Listing from './Listing'

export default interface SearchResults {
  summary: {
    query: string
    totalResults: number
    count: number
    offset: number
    queryType: string
    params: { [key: string]: number }
    currentPage: string
    prevPage: string
    nextPage: string
    totalPages: number
  }
  results: Listing[]
}

export const calcPagination = ({
  totalItems,
  actualPage,
  limitFormatted,
  offset
}) => {
  const allItems = totalItems.length

  let toPagination = {
    actualPage: null,
    limitFormatted: null,
    offset: null,
    howMuchShowingNow: null,
    totalPages: null,
    prevPage: null,
    nextPage: null,
    surpassedTotalPages: null,
    allItems: null
  }

  const howMuchShowingNow =
    allItems - offset < limitFormatted ? allItems - offset : limitFormatted
  const totalPages = Math.ceil(allItems / limitFormatted)
  const prevPage = actualPage > 1 ? actualPage - 1 : null
  const nextPage = actualPage < totalPages ? actualPage + 1 : null
  const surpassedTotalPages = actualPage > totalPages

  toPagination["actualPage"] = actualPage
  toPagination["limitFormatted"] = limitFormatted
  toPagination["offset"] = offset
  toPagination["howMuchShowingNow"] = howMuchShowingNow
  toPagination["totalPages"] = totalPages
  toPagination["prevPage"] = prevPage
  toPagination["nextPage"] = nextPage
  toPagination["surpassedTotalPages"] = surpassedTotalPages
  toPagination["allItems"] = allItems

  return toPagination
}

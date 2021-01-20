import queryString from 'query-string'

// This function pushes the new search query to the browsers history
export function updateBrowserUrl(currentQuery: string) {
    if (currentQuery === '') {
        // on clear search query
        window.history.pushState({}, '', window.location.pathname)
    } else {
        let url: string = `${window.location.pathname}?filters={"textsearch":${encodeURIComponent(
            JSON.stringify(currentQuery)
        )}}`
        url = url.replace(/\./g, '%2E')
        window.history.pushState({}, '', url)
    }
}

// This function handles navigation to search page with a predefined searchquery in browsers url
export function transformBrowserUrlToSearchString(urlQuery: string) {
    // Example browser url string
    // .../search?filters={"textsearch":"kind%3Adeployment%20name%3Asearch-prod-df8fa-search-api"}&showrelated=pod
    const prefillSearchQuery = ''
    const preSelectedRelatedResources: string[] = []
    if (urlQuery !== '') {
        const paramString = queryString.parse(urlQuery)

        //Filter out the search query string
        let filterString = paramString.filters?.toString()
        // cut the start of the url string
        filterString = filterString?.replace('{"textsearch":"', '')
        // cut the end of the url string
        filterString = filterString?.replace('"}', '')

        // get any pre-selected related resources
        const relatedString = paramString.showrelated?.toString()
        const relatedArray = relatedString?.split(',')

        return {
            prefillSearchQuery: filterString,
            preSelectedRelatedResources: relatedArray,
        }
    }
    return { prefillSearchQuery, preSelectedRelatedResources }
}

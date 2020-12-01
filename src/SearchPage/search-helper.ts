export function formatSearchbarSuggestions(data: string[], suggestionKind: 'label' | 'filter' | 'value') {
    return data.map((field) => {
        return {
            id: `id-${field}`,
            key: `key-${field}`,
            name: field,
            kind: suggestionKind,
        }
    })
}

export const convertStringToQuery = (searchText: string) => {
    const searchTokens = searchText.split(' ')
    const keywords = searchTokens.filter((token) => token !== '' && token.indexOf(':') < 0)
    const filters = searchTokens
        .filter((token) => token.indexOf(':') >= 0)
        .map((f) => {
            const splitIdx = f.indexOf(':')
            const property = f.substring(0, splitIdx)
            const values = f.substring(splitIdx + 1)
            return { property, values: values.split(',') }
        })
        .filter((f) => ['', '=', '<', '>', '<=', '>=', '!=', '!'].findIndex((op) => op === f.values[0]) === -1)
    return {
        keywords,
        filters,
    }
}

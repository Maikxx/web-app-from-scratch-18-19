export function setNewRoute(payload: any, urlEndpoint: string) {
    const { origin } = window.location
    const urlToNavigateTo = `${origin}/${urlEndpoint}`

    window.history.pushState(
        payload,
        urlToNavigateTo,
        urlToNavigateTo
    )
}

export function intitializeScripts() {

}

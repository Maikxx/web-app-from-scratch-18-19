export interface Route {
    regex: any
    resolver: (args?: any) => void
}

export interface RouterOptions {
    base?: string
}

export class Router {
    public routes: Route[] = []
    public base: string
    public interval: NodeJS.Timeout

    constructor(options?: RouterOptions) {
        this.base = options && options.base
            ? `/${this.trimUrl(options.base)}/`
            : '/'
    }

    public getPath() {
        let path = ''

        try {
            path = this.getPathFromUrl()
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }

        path = this.base !== '/'
            ? path.replace(this.base, '')
            : path

        return this.trimUrl(path)
    }

    public trimUrl(url: string) {
        return url
            .replace(/^\//, '')
            .replace(/\/$/, '')
    }

    public addRoute(regex: any, resolver: () => void) {
        if (typeof regex === 'function') {
            resolver = regex
            regex = ''
        }

        this.routes.push({ regex, resolver })
    }

    public removeRoute(indicator: any) {
        const urlIndex = this.routes.findIndex(({ regex, resolver }) => {
            return resolver === indicator || regex.toString() === indicator.toString()
        })
        this.routes.splice(urlIndex, 1)
    }

    public resetRouter() {
        this.routes = []
        this.base = '/'
    }

    public getPathFromUrl() {
        return this.trimUrl(decodeURI(`${location.pathname}${location.search}`))
            .replace(/\?(.*)$/, '')
    }

    public check(defaultPath?: string) {
        const path = defaultPath || this.getPath()

        this.routes.forEach(route => {
            const match = path.match(route.regex)

            if (match) {
                match.shift()
                route.resolver.apply({}, match)
            }
        })
    }

    public watch() {
        let currentPath = this.getPath()

        const checker = () => {
            if (currentPath !== this.getPath()) {
                currentPath = this.getPath()
                this.check(currentPath)
            }
        }

        clearInterval(this.interval)
        this.interval = setInterval(checker, 50)
    }

    public redirect(path: string = '') {
        const url = `${this.base}${this.trimUrl(path)}`
        history.pushState(null, url, url)
    }
}

export function setNewRoute(payload: any, urlEndpoint: string) {
    const { origin } = window.location
    const urlToNavigateTo = `${origin}/${urlEndpoint}`

    window.history.pushState(
        payload,
        urlToNavigateTo,
        urlToNavigateTo
    )
}

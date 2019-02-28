# Changelog

* Remove leftover async statement in [index.ts](../client/src/ts/index.ts).
* Refactor [sorter function](../client/src/ts/sorters/sortByObjectKey.ts) to be more generic.
* Refactor [detail views](../client/src/ts/components/Generic/DetailView.ts) in order to remove repertition.
* Use [Navigo](https://github.com/krasimir/navigo) as a router, instead of my [custom built one](../client/src/ts/utils/Router.ts) because of compatibility issues.
* Refactor util folder files to class-based components.
* Add loaders where the application is fetching data.
* Add infinite scrolling.
* Add searching for characters.
* Add attribute check in the Engine.
* Add [data persistence](../client/src/ts/utils/LocalStorageService.ts) on the detail pages on revisit.
* Add recursive data cleaning.
* Add error page.
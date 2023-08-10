import ReactDOM from "react-dom/client";
import { PageShell } from "./PageShell";
import { getPageTitle } from "./getPageTitle";
import "./global.css";
import { isTransition } from "./store";
import type { PageContextClient } from "./types";

let root: ReactDOM.Root;

export const clientRouting = true;
export const hydrationCanBeAborted = true;

export async function render(pageContext: PageContextClient) {
	const { Page, pageProps } = pageContext;

	const page = (
		<PageShell pageContext={pageContext}>
			<Page {...pageProps} />
		</PageShell>
	);
	const container = document.getElementById("root")!;
	if (pageContext.isHydration) {
		root = ReactDOM.hydrateRoot(container, page);
	} else {
		if (!root) {
			root = ReactDOM.createRoot(container);
		}
		root.render(page);
	}
	document.title = getPageTitle(pageContext);
}

export function onHydrationEnd() {
	console.log("Hydration finished; page is now interactive.");
}

export function onPageTransitionStart(pageContext: PageContextClient) {
	console.log("Page transition start");
	// console.log("Is backwards navigation?", pageContext.isBackwardNavigation);
	isTransition.set(true);
	// document.querySelector('body')!.classList.add('page-is-transitioning')
}

export function onPageTransitionEnd() {
	console.log("Page transition end");
	isTransition.set(false);
	// document.querySelector('body')!.classList.remove('page-is-transitioning')
}

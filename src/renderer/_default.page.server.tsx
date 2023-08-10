import { renderToString } from "react-dom/server";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import { PageShell } from "./PageShell";
import { getPageTitle } from "./getPageTitle";
import type { PageContextServer } from "./types";

export { render };
export { passToClient };

const passToClient = ["pageProps", "documentProps", "someAsyncProps"];

async function render(pageContext: PageContextServer) {
	const { Page, pageProps } = pageContext;

	const stream = dangerouslySkipEscape(
		renderToString(
			<PageShell pageContext={pageContext}>
				<Page {...pageProps} />
			</PageShell>
		)
	);

	const title = getPageTitle(pageContext);

	const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="root">${stream}</div>
      </body>
    </html>`;

	return {
		documentHtml,
		// See https://vite-plugin-ssr.com/stream#initial-data-after-stream-end
		pageContext: async () => {
			return {
				someAsyncProps: 42,
			};
		},
	};
}

import { LayoutDefault } from "#/layouts/LayoutDefault";
import React from "react";
import type { PageContext } from "./types";
import { PageContextProvider } from "./usePageContext";

type Props = {
	pageContext: PageContext;
	children: React.ReactNode;
};

export function PageShell({ pageContext, children }: Props) {
	const Layout = pageContext.exports.Layout;
	return (
		// <React.StrictMode>
		<PageContextProvider pageContext={pageContext}>
			{Layout ? (
				<LayoutDefault>
					<Layout>{children}</Layout>
				</LayoutDefault>
			) : (
				<LayoutDefault>{children}</LayoutDefault>
			)}
		</PageContextProvider>
		// </React.StrictMode>
	);
}

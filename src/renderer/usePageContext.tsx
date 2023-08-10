import React, { useContext } from "react";
import type { PageContext } from "./types";

export { PageContextProvider };
// eslint-disable-next-line react-refresh/only-export-components
export { usePageContext };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = React.createContext<PageContext>(undefined as any);

function PageContextProvider({
	pageContext,
	children,
}: {
	pageContext: PageContext;
	children: React.ReactNode;
}) {
	return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  const pageContext = useContext(Context);
	return pageContext;
}

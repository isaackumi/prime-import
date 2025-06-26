import { ReactNode } from "react";
import { Navbar } from "./navbar";
import Footer from "./footer";
import SearchFilters from "./search-filters";

import configPromise from "@payload-config";
import { getPayload } from "payload";

interface Props {
    children: ReactNode;
}

const Layout = async ({ children }: Props) => {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.find({
        collection: "categories" as any,
        depth: 1, //populate subcategories
        pagination: false,
        where: {
            parent: {
                exists: false
            }
        }
    });

    const formattedData = data.docs.map((doc: any) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((subDoc: any) => ({
            ...subDoc
        }))
    }));

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SearchFilters data={formattedData} />
            <div className="flex-1">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
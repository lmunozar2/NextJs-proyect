
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation"
import SideBar from "@/components/SideBar";
import ConsolesInfo from "@/components/ConsolesInfo"


export default async function ConsolesPage({
    children
}: {
    children: React.ReactNode;
}) {
    const user = await stackServerApp.getUser();
    if(!user) {
        redirect('/');
    }

    return (
        <div>
            <SideBar currentPath={'/console'}>
            
            <ConsolesInfo />
            </SideBar>

        </div>
    );
}
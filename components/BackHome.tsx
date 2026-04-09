"use client";
import { HouseLineIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function BackHome() {

    return (
        <div className="flex btn bg-white text-black border-white mt-2 rounded-md">
            <Link href="/">Back Home</Link>
        </div>
    );
}
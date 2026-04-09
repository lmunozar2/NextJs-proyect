"use client";
import Image from "next/image";
import Link from "next/link";
import { FingerprintIcon } from "@phosphor-icons/react";
import { UserCirclePlusIcon } from "@phosphor-icons/react"

export default function HomeInfo() {
    return (
        <div className="hero min-h-screen">

            <div className="absolute inset-0 bg-[url(/imgs/bg-home.jpeg)] bg-cover bg-center blur-sm scale-99 -z-10" />

            <div className="hero-overlay"></div>

            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <img className="mb-5" src="/imgs/logo.png" alt="" />
                    <p className="mb-5">
                        <strong>GameNext.js</strong> is a modern platform to manage and organize
                        videogames. Built with Next.js, it uses Prisma, Neon database, and
                        Stack Auth to provide secure authentication, fast performance, and scalable
                        data management.
                    </p>

                    <div className="gap-4 flex justify-center">
                    <Link href="handler/sign-in" className="btn btn-outline hover:bg-white hover:text-black hover:border-white transition-colors duration-200">
                        <FingerprintIcon size={26} />
                        Sign In </Link>

                        <Link href="handler/sign-up" className="btn btn-outline hover:bg-white hover:text-black hover:border-white transition-colors duration-200">
                        <UserCirclePlusIcon size={26} />
                        Sign Up </Link>
                        </div>
                        
                </div>
            </div>
        </div>
    )
}



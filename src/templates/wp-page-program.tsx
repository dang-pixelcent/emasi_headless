import { MainImage } from "gatsby-plugin-image";
import React from "react";
import MainTitle from "@/components/pages/program/main_title";
import HocHieu from "@/components/pages/program/hoc_hieu";
import AllProgram from "@/components/pages/program/all_program";
import University from "@/components/pages/program/university";
import LogoUniversity from "@/components/pages/home/logo_university";
import Educational from "@/components/pages/program/educational";
import RegisterSection from "@/components/pages/home/register";
 

export default function Program() {
    return (
        <>
            <MainTitle />
            <HocHieu />
            <AllProgram />
            <University />
            <LogoUniversity />
            <Educational />
            <RegisterSection />
        </>
    );
};
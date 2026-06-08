import React from "react";
import EmasiAbout from '@/components/pages/home/emasi_about/emasi_about';
import Banner from "@/components/pages/home/banner/banner";
import SchoolList from "@/components/pages/home/school_list/school_list";
import Values from "@/components/pages/home/values/values";
import EducationRoute from "@/components/pages/home/education_route/education_route";
import University from "@/components/pages/home/university/university";
import PublicShare from "@/components/pages/home/public_share/public_share";
import Register from "@/components/pages/home/register/register";
import LogoUniversity from "@/components/pages/home/logo_university/logo_university";

export default function Home() {
    return (
        <>
            <Banner />
            <EmasiAbout />
            <SchoolList />
            <Values />
            <EducationRoute />
            <University />
            <LogoUniversity />
            <PublicShare />
            <Register />
        </> 
    );
};
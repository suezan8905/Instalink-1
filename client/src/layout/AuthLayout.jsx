import { Outlet } from "react-router";
import Authimage from "../assets/Authimage.png";

export default function AuthLayout() {
  return (
    <section className="container max-w-[960px] mx-auto flex justify center gap-8 min-h-screen mt-[50px]">
      <div className="hidden lg:block ml-auto lg:w-[400px] h-[550px]">
        <img 
        src={Authimage} 
        alt="Authimagesrc" 
        />
      </div>
      <div className="md:w-[50%]">
      <Outlet />
      </div>
    </section>
  );
}

// The first div will be static, as will be in all page, while the second div is for the register page that will be changed (InstaLink)

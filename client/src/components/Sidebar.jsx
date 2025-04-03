import InstaShots from "../assets/logo_instagram.png"
import { NavLink } from "react-router";
import { sidebarLinks } from "../libs/constants";
import Search from "./Search";
export default function Sidebar() {
  return (
    <div
      className="hidden md:block min-h-screen fixed z-50 shadow border-r
    border-gray-200 w-[220px] xl:w-[240px]"
    >
      <div
        className="flex flex-col min-h-screen justify-between py-6 px-4
      items-center"
      >
        <div>
          <div className="flex gap-3 items-center mb-10">
            <img src={InstaShots} className="w-[40px] h-[40px]" />
            <h1 className="text-2xl font-bold italic">Instashots</h1>
          </div>
          <div className="flex flex-col gap-2">
            {sidebarLinks.map(({ id, name, path, Icon }) => (
              //this is we mapping the sidebarlinks. The below is we trying to list out the home and explore manually but in a more shorter one
              <NavLink
                to={path}
                key={id}
                className="tooltip tooltip-right z-50"
                data-tip={name}
              >
                {({ isActive }) => (
                  <span
                   className={`flex items-center gap-3 p-3 hover:font-bold  hover:transistion duration-150 ease-out text-lg rounded-lg ${
                      isActive
                        ? "font-bold bg-[#8D0D76] text-white"
                        : "hover:bg-zinc-100 hover:text-zinc-800 "
                    }`}
                  >
                  <i className={`${Icon} text-2xl`}></i> {name}
                  </span>
                )}
                {/* this above is gotten from route router */}
                {/* the tooltip (its like showing the name when you hover it, its from daisy ui. theyre designs there) */}
              </NavLink>
            ))}
            <Search />
              {/*this is a component and its for us importing the searchbar  */}
          </div>
        </div>
      </div>
    </div>
  );
}

{/* <NavLink></NavLink> //this came from the react router, hence we need to import it */}

//  <NavLink>
// <span>
//<i className="ri-home-line text-2xl"></i>Home
// </span>
// </NavLink>  all of these icons were gotten from remix icon

// this is for how we connect in our database 
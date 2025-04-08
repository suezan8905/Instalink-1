import { Outlet } from "react-router";


export default function VerifyAccountLayout() {
  return (
    <div className="max-w-[750px] mx-auto py-6 px-4">
    <Outlet />
    </div>
  );
}


// we are making a layout for this, because we want it to be a blank page with few writings on it. it has a dfiferent design on it's own hence creation of a different layout. 
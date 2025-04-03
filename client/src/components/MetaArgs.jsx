import { Helmet } from "react-helmet-async";

export default function MeraArgs ({ title, content}) {
  return ( 
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Helmet>
       /* This is to embed desctiption to our pages, just like going through other pages on chrome */ 
  );
}









// in react when you want to use something multiple times, make it as a reuseable component
  // <Helmet>
  //       <title>Sign up to InstaShots</title>
  //       <meta name="description" content="Get access to InstaShots" />
  //     </Helmet>;
  //     {/* This is to embed desctiption to our pages, just like going through other pages on chrome */ }
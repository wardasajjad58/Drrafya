import Hero from "./Hero";
import Approach from "./Approach";
import Journey from "./Journey";
import Testimonials from "./Testimonials";
import VideoBlock from "./VideoBlock";
import Blogs from "./Blogs";
import Ecosystem from "./Ecosystem";
import SelfService from "./SelfService";
import CommunityCTA from "./CommunityCTA";
import { Outlet } from "react-router-dom";
import TrendingBlogs from './TrendingBlogs';
import Toolsandfetaures from './ToolsAndFeatures';

export default function Layout() {
  return (
    <div>
      {/* Make sure these ids exist for navbar anchors */}
      <section id="start"><Hero /></section>
      <TrendingBlogs/>
      <section id="preconception"><Approach /></section>
      <Toolsandfetaures/>

      
      {/* <section id="pregnancy"><Journey /></section> */}
      
      

      
<section id="library"><SelfService /></section>
      {/* <section id="tools"><Ecosystem /></section> */}
      
<Testimonials />
      <section id="community"><CommunityCTA /></section>
    </div>
  );
}

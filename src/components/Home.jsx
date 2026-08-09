import Hero from "./Hero";
import Journey from "./Journey";
import SelfService from "./SelfService";
import Approach from "./Approach";
import Ecosystem from "./Ecosystem";
import Testimonials from "./Testimonials";
import CommunityCTA from "./CommunityCTA";
import Trendingblogs from './TrendingBlogs';

export default function Home() {
  return (
    <>
      <Hero />
      <Trendingblogs/>
      <Journey />
      <SelfService />
      <Approach />
      <Ecosystem />
      <Testimonials />
      <CommunityCTA />
    </>
  );
}

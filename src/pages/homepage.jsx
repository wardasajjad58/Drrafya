import Hero from '../components/Hero.jsx';
import Trendingblogs from '../components/TrendingBlogs.jsx';
import Approach from '../components/Approach.jsx';
import Toolsandfeatures from '../components/ToolsAndFeatures.jsx';
import Selfservice from '../components/SelfService.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CommunityCTA from '../components/CommunityCTA.jsx';
import FAQsection from '../components/FAQSection.jsx';
import Pregnencyweekselector from '../components/PregnancyWeekSelector.jsx';
import TrustSection from '../components/TrustSection.jsx';
export default function HomePage(){
    return(
        <>
        <Hero/>
        <Trendingblogs/>
        <Approach/>
        
        <Pregnencyweekselector/>
        <Toolsandfeatures/>
        <TrustSection/>
        <Selfservice/>
        <Testimonials/>
        <FAQsection/>
        <CommunityCTA/>
        </>
    );
}
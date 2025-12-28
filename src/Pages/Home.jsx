import Header from "../components/Header";
import Features from "../components/Features";
import Hero from "../components/Hero";
import AIGenerator from "../components/AIGenerator"
import HowItWorks from "../components/HowItWorks"
import Testimonials from "../components/Testimonials"
import CTASection from "../components/CTASection"
import Footer from "../components/Footer"


function Home(){
    return (
        <>
         <Header />
        <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
      </>
    );
}
export default Home
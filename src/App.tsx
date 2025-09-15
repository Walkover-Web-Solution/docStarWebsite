import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

// Pages
import APIDocumentationAndTesting from './pages/APIDocumentationAndTesting';
import Blogging from './pages/Blogging';
import DocumentationWithAI from './pages/DocumentationWithAI';
import SimpleWebsite from './pages/SimpleWebsite';
import { Pricing } from "./components/Pricing";
import { WhiteLabelling } from "./pages/CustomDomain";
import { SsoAuthentication } from "./pages/SsoAuthentication";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ContactUs } from "./components/ContactUs";
import NotFound from "./pages/NotFound";
import ExternalRedirect from "./components/ExternalRedirect";
import Editor from "./pages/Editor";
import EmbedEditorPage from "./pages/embed-editor";
import FeatureCards from "./components/ExtraFeatures";
import FAQLandingPage from "./pages/FAQ";
import ApiDocumentationPage from "./pages/APIDocumentationPlatfrom";
import PublishPage from "./pages/PublishPage";
import CollaboratePage from "./pages/CollaborateInRealTime";
import { MultiLanguage } from "./pages/MultiLanguage";
import { AIPoweredSearchPage } from "./pages/AIPoweredSearch";
import { CustomizeLayoutsPage } from "./pages/Themes";
import { IdeasWithAIPage } from "./pages/IdeasWithAI";

function App() {
  return (
    <div className="">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/index" element={<Navigate to="/" replace />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features autoCycle={false}/>
              <FeatureCards />
              <Testimonials />
              <CTA />
            </>
          }
        />
        <Route path="/login" element={<ExternalRedirect url="https://app.docstar.io/login" />} />
        <Route path="/api-documentation" element={<APIDocumentationAndTesting />} />
        <Route path="/blogging" element={<Blogging />} />
        <Route path="/documentation-with-ai" element={<DocumentationWithAI />} />
        <Route path="/simple-website" element={<SimpleWebsite />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/custom-domain" element={<WhiteLabelling />} />
        <Route path="/sso-authentication" element={<SsoAuthentication />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/support" element={<ContactUs />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/embed-editor" element={<EmbedEditorPage />} />
        <Route path="/faq" element={<FAQLandingPage />} />
        <Route path="/api-documentation-platform" element= {<ApiDocumentationPage />} />
        <Route path="/publish-page" element= {<PublishPage />} />
        <Route path="/collaborate-in-real-time" element={<CollaboratePage />} />
        <Route path="/multi-language" element={<MultiLanguage />} />
        <Route path="/ai-powered-search" element={<AIPoweredSearchPage />} />
        <Route path="/themes" element={<CustomizeLayoutsPage />} />
        <Route path="/ideas-with-ai" element={<IdeasWithAIPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

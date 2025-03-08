import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Newspaper, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

const Guides = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  useEffect(() => {
    fetchFinancialNews();
  }, []);

  const fetchFinancialNews = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("X-API-KEY", "8e089ad743fdffb9ed5623c24d2d9493e22e0457");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "q": "health, nutrition, pregnancy, breastfeeding, postpartum, baby, toddler, child, adult, elderly",
        "gl": "us",
        "hl": "en",
        "type": "news"
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
      };

      const response = await fetch("https://google.serper.dev/search", requestOptions);
      const result = await response.json();
      
      // Process and format the news data
      const formattedNews = result.news?.map(article => ({
        title: article.title,
        snippet: article.snippet,
        link: article.link,
        date: article.date,
        imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=300&q=80'
      })) || [];

      setNewsArticles(formattedNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoadingNews(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-20 bg-gradient-to-b from-sage-50 to-white">
        <div className="container-custom">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Financial News</h1>
            <p className="text-lg text-sage-700 max-w-2xl mx-auto">
              Stay updated with the latest financial news and market insights.
            </p>
          </header>

          {/* Financial News Section */}
          <section className="mb-16">
            <div className="flex items-center justify-center mb-8">
              <Newspaper className="h-6 w-6 text-sage-600 mr-2" />
              <h2 className="text-2xl font-semibold text-sage-800 text-center">
                Latest Market Updates
              </h2>
            </div>
            
            {isLoadingNews ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsArticles.map((article, index) => (
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    key={index}
                    className="group"
                  >
                    <Card className="h-full card-hover border border-sage-100 transition-transform duration-200 group-hover:scale-[1.02]">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=300&q=80';
                          }}
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg text-sage-800 group-hover:text-sage-600 flex items-start">
                          {article.title}
                          <ExternalLink className="h-4 w-4 ml-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                        {article.date && (
                          <CardDescription className="text-sm text-sage-500">
                            {new Date(article.date).toLocaleDateString()}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-sage-600 line-clamp-3">
                          {article.snippet}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            )}
          </section>

          <section className="p-8 bg-sage-50 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl font-semibold text-sage-800 mb-3">Stay Updated</h2>
                <p className="text-sage-600">
                  Get the latest financial news and market insights delivered to your inbox.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700">
                <BookOpen className="mr-2 h-5 w-5" />
                Subscribe Now
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;

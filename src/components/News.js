import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
    
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    
    const capaitalizeFirstLeter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
 
  useEffect(() => {
      pageUpdate();
      document.title = `${capaitalizeFirstLeter(props.category)} - NewsMonkey `;
  },[])

  const pageUpdate  = async ()=>{
      props.setProgress(0);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(50);
    //   console.log(parsedData);
    setArticles( parsedData.articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }

  const fetchMoreData = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults( parsedData.totalResults)
  };

    return (
      <> 
        <h1 className="text-center" style={{margin:'35px 0px', marginTop: '90px'}}>NewsMonkey Top {capaitalizeFirstLeter (props.category)} Headlines </h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4>Loading...</h4>}
        >
        <div className="container">            
        <div className="row">
          {articles.map((element) => {
            return (
                <div className="col-md-4">
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author ? element.author:"Unknown"}
                  date={element.publishedAt}
                  />
              </div>
            );
        })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
    country:'in',
    pageSize: 8,
}

News.propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category: PropTypes.string
}



export default News
import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';


import NewsCards from './components/NewsCards/NewsCards';
import useStyles from  './styles.js';
import wordsToNumbers from 'words-to-numbers';

const alanKey = '0226c8b9d95653d5c9f030cd4a92e5fc2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () =>{
    
    const[newsArticles, setNewsArticles] = useState([]);
    const[activeArticle, setActiveArticle]= useState(-1);
    const classes= useStyles();
    
    useEffect( ()=> {
        alanBtn({
            key: alanKey,
            onCommand: ({ command , articles , number })=> {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if(command=== 'highlight'){
                    setActiveArticle((prevActiveArticle)=> prevActiveArticle+1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
          
                    if (parsedNumber > articles.length) {
                      alanBtn().playText('I dont think that newscard exits, Please try that again...');
                    } else if (article) {
                      window.open(article.url, '_blank');
                      alanBtn().playText('Here you go');
                    } else {
                      alanBtn().playText('Please try that again...');
                    }
                  }
            }
        })
    } , [])  
    return(
        <div>
            <div className ={classes.logoContainer}>
                <img src='https://hative.com/wp-content/uploads/2013/10/paper-logos/paper-knot-logo-idea-49.png' className={classes.alanLogo} alt="alan logo" />
            </div>
            <NewsCards articles = {newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App;

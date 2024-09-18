import logging
import azure.functions as func
from bs4 import BeautifulSoup
import requests
from transformers import pipeline
import datetime
import os


app = func.FunctionApp()

@app.schedule(schedule="0 0 6 * * *", arg_name="myTimer", run_on_startup=True,
              use_monitor=False) 
@app.cosmos_db_output(arg_name="outputDocument", database_name="ScrapeSummarizeApp", container_name="Articles", connection="CosmosDbConnectionString")
def scrape_summarize_job(myTimer: func.TimerRequest, outputDocument: func.Out[func.Document]) -> None:
    logging.info("Starting job...")
    
    hf_papers = "https://huggingface.co/papers"
    res = requests.get(hf_papers)
    soup = BeautifulSoup(res.content, 'html.parser')

    article_names = soup.find_all('a', {'class':'line-clamp-3 cursor-pointer text-balance'})

    abstracts = []

    for i in range(len(article_names)):
        paper = article_names[i]['href']
        res = requests.get(f"https://arxiv.org/abs/{paper.split('/')[2]}")
        soup = BeautifulSoup(res.content, 'html.parser')
        abstract = soup.find('blockquote', {'class':'abstract mathjax'}).text.split('Abstract:')[1].rstrip()
        subject = soup.find('td', {'class':'tablecell subjects'}).text.split('\n')[1].split('; ')
        authors = soup.find('div', {'class':'authors'}).findChildren("a", recursive=False)
        authors = list(map(lambda x : x.text, authors))
        abstracts.append({'title': article_names[i].text, 'link': f"https://arxiv.org/abs/{paper.split('/')[2]}", 'abstract': abstract, 'subject': subject, 'authors': authors})

    logging.info("Loading model...")

    model_name = "dross20/summarization_model"
    access_token=os.environ["HuggingFaceAccessToken"]
    summarizer = pipeline('summarization', model=model_name, token=access_token)

    logging.info("Generating summaries...")

    for i in range(len(abstracts)):
        abstracts[i]["summary"] = summarizer(abstracts[i]['abstract'])[0]['summary_text']

    documents = []
    today = datetime.datetime.now().strftime("%x")

    for i in range(len(abstracts)):
        id = today + str(i)
        id = id.replace("/","_")
        document = {
            "id": id,
            "Date": today,
            "title": abstracts[i]["title"],
            "link": abstracts[i]["link"],
            "subject": abstracts[i]["subject"],
            "authors": abstracts[i]["authors"],
            "summary": abstracts[i]["summary"]
        }

        documents.append(document)

    outputDocument.set(func.DocumentList(documents))

    logging.info('Python timer trigger function executed.')
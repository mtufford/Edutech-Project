import json
import requests
from lxml import html
from lxml import objectify
from urllib.parse import unquote




def googleResults(textquery):

    linkarr = []
    URL = "https://www.google.com/search?&ie=UTF-8"
    PARAMS = {'q': textquery}
    page = requests.get(url = URL, params = PARAMS)
    tree = html.fromstring(page.content.decode('utf-8','ignore'))
    #print(page.content)

    linktxtelems = tree.xpath("//div[@class='g']/h3")
    linkelems = tree.xpath("//div[@class='g']/h3//@href")
    descelems = tree.xpath("//div[@class='g']//span[@class='st']")
    numOfItems = min(len(linktxtelems), len(linkelems), len(descelems))

    for iter in range(numOfItems):
        #print(item.text_content())
        if "/search?q=" not in linkelems[iter]:
            tempitemdict = {"link" : unquote(linkelems[iter].split('/url?q=')[1].split('&')[0]),
                        "linktxt" : linktxtelems[iter].text_content(),
                        "description" : descelems[iter].text_content()}

            linkarr.append(tempitemdict)
    return (linkarr)

def webopediaResults(textquery):

    linkarr = []
    URL = "https://search.webopedia.com/serp?"
    PARAMS = {'q': textquery}
    page = requests.get(url = URL, params = PARAMS)
    tree = html.fromstring(page.content.decode('utf-8','ignore'))
    #print(page.content)

    linktxtelems = tree.xpath("//a[@class='web-bing__title']")
    linkelems = tree.xpath("//span[@class='web-bing__url']")
    descelems = tree.xpath("//span[@class='web-bing__description']")

    numOfItems = min(len(linktxtelems), len(linkelems), len(descelems))

    for iter in range(numOfItems):
        #print(item.text_content())
        tempitemdict = {"link" : linkelems[iter].text_content(),
                    "linktxt" : linktxtelems[iter].text_content(),
                    "description" : descelems[iter].text_content()}

        linkarr.append(tempitemdict)
    return (linkarr)

def stackoverflowResults(textquery):

    linkarr = []
    URL = "https://stackoverflow.com/search?"
    PARAMS = {'q': textquery}
    page = requests.get(url = URL, params = PARAMS)
    tree = html.fromstring(page.content.decode('utf-8','ignore'))
    #print(page.content)

    linktxtelems = tree.xpath("//div[@class='summary']/div[@class='result-link']//h3//a")
    linkelems = tree.xpath("//div[@class='summary']/div[@class='result-link']//h3//a//@href")
    descelems = tree.xpath("//div[@class='summary']/div[@class='excerpt']")

    numOfItems = min(len(linktxtelems), len(linkelems), len(descelems))

    for iter in range(numOfItems):
        #print(item.text_content())
        tempitemdict = {"link" : "https://stackoverflow.com"+linkelems[iter],
                    "linktxt" : linktxtelems[iter].text_content(),
                    "description" : descelems[iter].text_content()}

        linkarr.append(tempitemdict)
    return (linkarr)

def stackexchangeResults(textquery):

    linkarr = []
    URL = "https://stackexchange.com/search?"
    PARAMS = {'q': textquery}
    page = requests.get(url = URL, params = PARAMS)
    tree = html.fromstring(page.content.decode('utf-8','ignore'))
    #print(page.content)

    linktxtelems = tree.xpath("//div[@class='summary']/div[@class='result-link']//h3//a")
    linkelems = tree.xpath("//div[@class='summary']/div[@class='result-link']//h3//a//@href")
    descelems = tree.xpath("//div[@class='summary']/div[@class='excerpt']")

    numOfItems = min(len(linktxtelems), len(linkelems), len(descelems))

    for iter in range(numOfItems):
        #print(item.text_content())
        tempitemdict = {"link" : "https://stackoverflow.com"+linkelems[iter],
                    "linktxt" : linktxtelems[iter].text_content(),
                    "description" : descelems[iter].text_content()}

        linkarr.append(tempitemdict)
    return (linkarr)

if __name__ == "__main__":
    print(stackexchangeResults('test'))

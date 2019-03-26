# /usr/bin/python

"""
   Web scrapper for pulling images from FEMA website.
   
   Usage: python web-crawler.py {url} {proxy_url}
 """

# Python libraries
import sys
import requests
import time
from selenium import webdriver
from bs4 import BeautifulSoup

"""
  Main method that runs the program.

  param url:string    The string url to scrape for images.
"""

def main(url, proxy=None):

  driver = webdriver.Firefox()

  get_urls(url, driver, proxy)

  """
    Recursive function that downloads all images from url and its 
    children urls.

    param url:string        The string url that will be scraped.
    param driver:WebDriver  The WebDriver used to control the browser.
    param proxy:string      The proxy url to use.
  """

def get_urls(url, driver, proxy):

  driver.get(url)

  time.sleep(3)

  soup = BeautifulSoup(driver.page_source, 'html.parser')

  pre = soup.find('pre')

  if pre != None:

    for a in pre.find_all('a'):

      if a.text !=  '../':

        if '/' in a.text:

          get_urls(url + a.text, driver, proxy)
        
        else:

          print('Downloading image: ' + a.text)

          image_url = driver.current_url + a.text

          if proxy is None:
            img_data = requests.get(image_url).content
          else:
            img_data = requests.get(image_url, proxies=proxy).content

          with open(a.text, 'wb') as handler:
            handler.write(img_data)

      else:
        print('No pre div exists on web page.')

# The start of the python program.
if __name__ == "__main__":

  print("Starting web crawler.")
  
  if len(sys.argv) > 2:
      main(sys.argv[1],  {
                'http' : sys.argv[2],
                'https' : sys.argv[2]
              })
  elif len(sys.argv) > 1:
      main(sys.argv[1])
  else:
    print('Please provide a url to scrape.')

  print("Terminating web crawler.")
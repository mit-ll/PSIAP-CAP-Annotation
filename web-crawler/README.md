# Web-Crawler

## Getting Started

These instructions will assist in getting you started with the web-crawler 
program.  Please note this setup was used on a windows system, but it should
work within a linux environment as well.

### Prerequisites

```
Firefox
Python
Geckodriver
```

### Installing External Libraries

```
python -m pip --proxy {proxy_url} install selenium bs4 requests
```

### Configurations

* Add an environment variable to your system pth or user path in order to points to the appropriate program.
* Linux, Mac - geckodriver
* Windows - geckdriver.exe

### Deployment

```
python web-crawler.py {url} {proxy_url}
```

## Built With
* [bs4](https://pypi.org/project/beautifulsoup4/) - Beautiful Soup is a library that makes it easy to scrape information from web pages.
* [firefox](https://www.mozilla.org/en-US/firefox/) - Mozilla Firefox is a free and open-source web browser.
* [geckodriver](https://github.com/mozilla/geckodriver/releases) - Gecko is a browser engine developed by Mozilla.
* [python](https://www.python.org/) - Python is an interpreted, high-level, general-purpose programming language.
* [requests](http://docs.python-requests.org/en/master/) -  is the only Non-GMO HTTP library for Python.
* [selenium](https://www.seleniumhq.org/) - A portable framework for testing web applications.

## Authors
* Daniel Ribeirinha-Braga (MITLL)

## Acknowledgments
* Andrew Weinert (MITLL)

## Distribution Statement
This work was performed under the following financial assistance award 70NANB17Hl69 from U.S. Department of Commerce, National Institute of Standards and Technology.

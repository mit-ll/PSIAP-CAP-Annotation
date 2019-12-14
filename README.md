# PSIAP-CAP-Annotation
The Civil Air Patrol (CAP) Analysis is a web application, primarily built using HTML CSS,  Node.js, and Python 3, to crowdsource annotations of freely and publicly available CAP imagery. CAP is a congressionally chartered, federally supported non-profit corporation that serves as the official civilian auxiliary of the United States Air Force. They provide imagery, often collected at low altitudes, of incidients and disasters.

## Overview and Motivation
This application, funded by PSIAP 2017, supports the development of datasets representative of public safety operations, whose need was formally identified in [NIST TN 1917: Public Safety Analytics R&D Roadmap](https://www.nist.gov/publications/public-safety-analytics-rd-roadmap):

> One of the most fundamental barriers to seamless data integration is simply a lack of awareness or access to datasets that are accurate, current, and relevant to improving response.

This effort is motivation by video and  imagery becoming increasingly important to public safety operations. The goal of annotating CAP imagery is to accelerate technology innovation for network providers, application providers, and public safety agenices. Public safety outreach indicated the need for a low altitude airborne-based dataset. There is a desire and intent to deploy drones and low altitude aircraft in response to small and large incidents. These operations often occur at the tactical edge in disconnected, intermittent, and low-bandwidth (DIL) environments. Analytics trained on CAP imagery could improve situational awareness and result in a faster, safer, and more efficient response.

Development of any dataset for public safety is a large combinatorial challenge, as incidents and disasters can widely vary. CAP imagery is ideal because they respond to a wide range of incidents and the data is intended for public access and use. Most importantly, as CAP is a national resource that operates independent on the PSIAP effort and will continue to collect and post imagery beyond the PSIAP effort. A CAP-based dataset is every growing. This dynamism is a realization discussed in [NISTIR 8164: First Workshop on Video Analytics in Public Safety](https://www.nist.gov/publications/first-workshop-video-analytics-public-safety):

> **Thoughts on future development:** Increasingly, software developers will need to take advantage of new hardware innovations. With the increasing reliance on machine learning methods such as deep learning, developers will require access to ever-increasing quantities of data for both training and evaluation purposes. Going beyond static datasets (which can be overlearned), future algorithms will require constant novelty allowing for a state of never-ending unsupervised learning. This will require a migration from data-sets to data-sites and, perhaps, data-cities.

Prior to this PSIAP effort, current annotation capabilities for CAP imagery has good intent but are insufficient for response and research. Other efforts have focused on damage to buildings or structures, whereas public safety requires additional information. For example, an urban search and rescue (USAR) team would like situational awareness of what roads are flooded or bridges destroyed, so they can efficiently plan their search. The PSIAP effort intends to make the CAP annotations freely and publicly available.

## Semantic Annotations
[Liu et al.](https://doi.org/10.1109/ITSC.2018.8569449) demonstrated that labeling individual features with bounding boxes is not required to produce useful annotations and analytics. Instead each CAP image is labeled with semantic text labels, such as *bridge* or *vegetation*. Multiple labels can easily and rapidly be assigned to faciliate efficient crowd sourcing. Labels can then be encoded as binary values to streamline their use as a training dataset for machine learning. Images are segmented and labeled in quadrants to improve the information for each image and better utilize the smaller screens of mobile devices. 

## Example CAP Imagery
| Debris        | Flooding      | Damage     |
| ------------- | ------------- | ------------- |
| <img src="https://s3.amazonaws.com/fema-cap-imagery/Images/9068/614055/DJI_0017_1444d71c-525c-44c4-ad1f-2199f3f070f7.jpg" width="300">  | <img src="https://s3.amazonaws.com/fema-cap-imagery/Images/9120/615626/IMG_2019_a64dc7a7-0f92-4f02-938f-33e4cdc5826d.jpg" width="300">  | <img src="https://s3.amazonaws.com/fema-cap-imagery/Images/9075/614140/A0069_AP_e4cdf881-c8d9-4fd3-81c8-d6ce9a3e6364.jpg" width="300"> |
| <img src="http://s3.amazonaws.com/fema-cap-imagery/Images/9080/614276/DJI_0022_1e920dcc-84e4-41d3-91fa-04954208c168.jpg" width="300">   | <img src="https://fema-cap-imagery.s3.amazonaws.com/Images/9096/615037/DSC_0007_a956a88f-c659-4db7-933e-c37a2df95211.jpg" width="300">  | <img src="https://s3.amazonaws.com/fema-cap-imagery/Images/9068/614008/DJI_0013_9e945493-a1b3-4024-a48a-37733a2227ca.jpg" width="300"> |

## Useful Links
* [Civil Air Patrol](https://www.gocivilairpatrol.com/)  
* [GeoPlatform: Diasters - Civil Air Patrol (CAP Browser)](https://communities.geoplatform.gov/disasters/civil-air-patrol-cap-browser/)  
* [Public Safety Innovation Accelerator Program 2017](https://www.nist.gov/ctl/pscr/funding-opportunities/past-funding-opportunities/psiap-2017)  
* [ResearchGate - NIST PSIAP: Representative Public Safety Video Dataset](https://www.researchgate.net/project/NIST-PSIAP-Representative-Public-Safety-Video-Dataset)  
* [New Jersey Office of Homeland Security and Preparedness](https://www.njhomelandsecurity.gov/home/)
* [MIT Lincoln Laboratory - Humanitarian Assistance and Disaster Relief Systems](https://www.ll.mit.edu/r-d/homeland-protection/humanitarian-assistance-and-disaster-relief-systems)  

## Authors
* Daniel Ribeirinha-Braga (MITLL)  

## Acknowledgments
* Andrew Weinert  (MITLL)    
* Dieter Schuldt (MITLL)  
* Gabriela Barrera (MITLL)
* Chad Council (MITLL)  
* Steven Talpas (NJOHSP)  
* William Drew (NJOHSP)  

## Distribution Statement
This work was performed under the following financial assistance award 70NANB17Hl69 from U.S. Department of Commerce, National Institute of Standards and Technology.

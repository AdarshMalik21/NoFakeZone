from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from rest_framework.permissions import AllowAny
from bs4 import BeautifulSoup
from openai import OpenAI
from dotenv import load_dotenv
import os


# Load the environment variables from your .env file
load_dotenv()

# Load NLP API key from environment variables
NLP_api_key = os.getenv("NLP_API_KEY")

class FactCheckView(APIView):
    permission_classes = [AllowAny]
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            print("Request data:", request.data)
            
            query = request.data.get('query')
            if not query:
                return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)
            try:

                #Scraping Starts
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
                response = requests.get(query, headers=headers, timeout=10)
                response.raise_for_status()  
                soup = BeautifulSoup(response.text, 'html.parser')

                title = soup.find('h1').get_text(strip=True) if soup.find('h1') else 'No Title Found'

                article_body = []
                for paragraph in soup.find_all('p'):
                    article_body.append(paragraph.get_text(strip=True))
                full_article_text = "\n".join(article_body)

                if not full_article_text:
                    return Response({"error": "Could not extract article content. The page structure may be different."}, status=status.HTTP_400_BAD_REQUEST)
                # Scraping Ends

                #GPT-5 based NLP starts here
                article_title = title
                article_text = full_article_text
                try:
                    client = OpenAI(
                        base_url="https://openrouter.ai/api/v1",
                        api_key= NLP_api_key,
                    )

                    prompt_for_ai = f"summarize the following article:\n\nTitle: {article_title}\n\nText: {article_text}"

                    completion = client.chat.completions.create(
                        model="google/gemma-3n-e4b-it:free",
                        messages=[
                            {
                                "role": "user",
                                "content": prompt_for_ai
                            }
                        ]
                    )

                    ai_summary = completion.choices[0].message.content
                    print("AI Summary:", ai_summary)
                    #GPT-5 based NLP ends here


                    # Return a successful response with the AI summary
                    return Response({
                        "message": "Article summarized successfully!",
                        "title": title,
                        "summary": ai_summary
                    }, status=status.HTTP_200_OK)
                except Exception as e:
                    return Response({"error": f"AI processing failed: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

        

            except requests.exceptions.RequestException as e:
                return Response({"error": f"Failed to access URL: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": f"An error occurred during scraping: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




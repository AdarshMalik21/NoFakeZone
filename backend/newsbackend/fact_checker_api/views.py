from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from rest_framework.permissions import AllowAny
from bs4 import BeautifulSoup
from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import traceback


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

                prompt_for_single_call = f"""
                You are a senior news analyst and fact-checker. Your task is to perform a complete analysis of the following news article.

                Follow these steps precisely:
                1.  **Summarize**: Provide a concise, single-paragraph summary of the provided article.
                2.  **Extract Factual Claims**: Identify and extract every factual claim made in the summary. Present these claims as a JSON array of strings.
                3.  **Verify & Justify**: For each claim you extracted, verify its veracity by performing a real-time web search. For each claim, determine if it is "True," "False," "Partially True," or "Unverified." Provide a brief justification for each verification.
                4.  **Final Verdict**: Based on your verification of all claims, provide a single, conclusive verdict on the overall accuracy of the article. Your verdict should be one of the following: "Highly Accurate," "Mostly Accurate," "Inaccurate," or "Unverified."
                5.  **Sources**: For each claim that you verified, provide the URL of the most relevant source you found during your web search. The sources array should contain only unique URLs.


                Article Title: {title}
                Article Text: {full_article_text}

                Return your entire response as a single, valid JSON object with the following keys:
                    {{
                    "summary": "...",
                    "claims": [
                    "Claim 1",
                    "Claim 2",
                    ...
                    ],
                    "verdict": "...",
                    "sources": [
                        "URL 1",
                        "URL 2",
                        ...
                    ]
                    }}
                    """
                try:
                    client = OpenAI(
                        base_url="https://openrouter.ai/api/v1",
                        api_key= NLP_api_key,
                    )

                    claims_completion = client.chat.completions.create(
                        model = "tngtech/deepseek-r1t2-chimera:free",
                        messages=[{"role": "user", "content": prompt_for_single_call}]

                    )
                    raw_json_string = claims_completion.choices[0].message.content

                    raw_json_string = raw_json_string.strip().strip("```json").strip("```").strip()
                    try:
                        fact_check_data = json.loads(raw_json_string)
                        print(fact_check_data.get("sources"))
                        print(fact_check_data.get("verdict"))
                        return Response({
                            "message": "Article processed successfully!",
                            "title": fact_check_data.get("title", title),
                            "summary": fact_check_data.get("summary"),
                            "claims": fact_check_data.get("claims"),
                            "verdict": fact_check_data.get("verdict"),
                            "sources": fact_check_data.get("sources")
                        }, status=status.HTTP_200_OK) 
                    except json.JSONDecodeError as e:
                        print(f"JSON Decode Error: {e}")
                        print(f"Raw AI response: {raw_json_string}")
                        return Response({"error": f"Failed to parse AI response as JSON: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                except Exception as e:
                    print("Error in ai connection")
                    print(traceback.format_exc())        
                    return Response({"error": f"AI processing failed: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        #         #GPT-5 based NLP starts here
        #         article_title = title
        #         article_text = full_article_text
        #         try:
        #             client = OpenAI(
        #                 base_url="https://openrouter.ai/api/v1",
        #                 api_key= NLP_api_key,
        #             )

        #             prompt_for_ai = f"summarize the following article:\n\nTitle: {article_title}\n\nText: {article_text}"

        #             completion = client.chat.completions.create(
        #                 model="google/gemma-3n-e4b-it:free",
        #                 messages=[
        #                     {
        #                         "role": "user",
        #                         "content": prompt_for_ai
        #                     }
        #                 ]
        #             )

        #             ai_summary = completion.choices[0].message.content
        #             print("AI Summary:", ai_summary)
        #             #GPT-5 based NLP ends here


        #             # Api call to extract claims from the summary Starts Here

        #             prompt_for_claims = f"""
        #             You are a text analysis expert. Your task is to identify and list each factual claim or key assertion made in the following summary. Return the claims as a JSON array of strings.

        #             Summary:
        #             {ai_summary}
        #             """
        #             claims_completion = client.chat.completions.create(
        #                 model = "tngtech/deepseek-r1t2-chimera:free",
        #                 messages=[{"role": "user", "content": prompt_for_claims}]

        #             )

        #             claims_json_string = claims_completion.choices[0].message.content

        #             claims_json_string = claims_json_string.strip().strip("```json").strip("```").strip()


        #             try:
        #                 print("claims_json_string:", claims_json_string)
        #                 claims_list = json.loads(claims_json_string)
        #             except json.JSONDecodeError:
        #                 print(traceback.format_exc()) 
        #                 claims_list = [claims_json_string] 

        #             fact_check_results ={}
        #             for claim in claims_list:
        #                 prompt_for_fact_check = f"""Act as a fact-checker. Verify the following claim by searching for recent, reliable news sources. 
        #                 State whether the claim is true or false based on your search, and provide a direct link to one or more sources that support your conclusion.

        #                 Claim: "{claim}"
        #                 """       
        #                 fact_check_completion = client.chat.completions.create(
        #                     model = "tngtech/deepseek-r1t2-chimera:free",
        #                     messages=[{"role": "user", "content": prompt_for_fact_check}]
        #                 )

        #                 fact_check_results[claim] = fact_check_completion.choices[0].message.content
        #             # print("Fact-Check Results:", fact_check_results)    
        #             results_text = json.dumps(fact_check_results, indent=2)
        #             prompt_for_verdict = f"""
        #             You are a senior analyst. Review the following fact-checking results and provide a single, conclusive verdict on the overall accuracy of the original summary.

        #             - Synthesize the findings into a final, brief verdict.
        #             - List all unique sources provided in the individual fact-checks.

        #             Fact-Checking Results:
        #             {results_text}

        #             Provide the final verdict and a list of all sources in a clear format.
        #             """
        #             verdict_completion = client.chat.completions.create(
        #                 model="tngtech/deepseek-r1t2-chimera:free",
        #                 messages=[{"role": "user", "content": prompt_for_verdict}]
        #             )
        #             final_verdict = verdict_completion.choices[0].message.content
        #             # Return a successful response with the AI summary
        #             return Response({
        #             "message": "Article processed successfully!",
        #             "title": title,
        #             "summary": ai_summary,
        #             "fact_check_results": fact_check_results,
        #             "final_verdict": final_verdict
        #             }, status=status.HTTP_200_OK)
        #         except Exception as e:
        #             print(traceback.format_exc()) 
        #             return Response({"error": f"AI processing failed: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

        

            except requests.exceptions.RequestException as e:
                print(traceback.format_exc()) 
                return Response({"error": f"Failed to access URL: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(traceback.format_exc()) 
            return Response({"error": f"An error occurred during scraping: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




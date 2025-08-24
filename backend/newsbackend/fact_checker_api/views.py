from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from rest_framework.permissions import AllowAny

class FactCheckView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            print("Request data:", request.data)
            # Example: expecting 'query' in request.data
            query = request.data.get('query')
            if not query:
                return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)
            # Your logic here...
            return Response({"message": "Fact check result"}, status=status.HTTP_200_OK)
        except Exception as e:
            print("Error:", str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
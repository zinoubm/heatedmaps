from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class HealthCheckAPIView(APIView):
    permission_classes = []

    def get(self, request, format=None):
        """
        Returns 200 OK for healthcheck.
        """

        return Response({"status": "ok"}, status=status.HTTP_200_OK)

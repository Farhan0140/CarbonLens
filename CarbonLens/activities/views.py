from rest_framework import viewsets, permissions
from .models import Activity, ActivityRecord
from .serializers import ActivitySerializer, ActivityRecordSerializer
from core.permissions import IsAdminOrReadOnly


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAdminOrReadOnly]  # only admin can create/edit activities


class ActivityRecordViewSet(viewsets.ModelViewSet):
    serializer_class = ActivityRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return ActivityRecord.objects.none()
        return ActivityRecord.objects.filter(user=user)

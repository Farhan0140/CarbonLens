from rest_framework import viewsets, permissions
from .models import Activity, ActivityRecord
from .serializers import ActivitySerializer, ActivityRecordSerializer
from core.permissions import IsAdminOrReadOnly


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAdminOrReadOnly]  # Only admin can add/edit activities


class ActivityRecordViewSet(viewsets.ModelViewSet):
    serializer_class = ActivityRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return ActivityRecord.objects.none()

        # ✅ Check if we’re accessing via nested route (activities/<id>/records/)
        activity_id = self.kwargs.get("activity_pk")
        queryset = ActivityRecord.objects.filter(user=user)
        if activity_id:
            queryset = queryset.filter(activity_id=activity_id)
        return queryset

    def perform_create(self, serializer):
        # ✅ Automatically set user and (if nested) activity
        activity_id = self.kwargs.get("activity_pk")
        if activity_id:
            serializer.save(user=self.request.user, activity_id=activity_id)
        else:
            serializer.save(user=self.request.user)

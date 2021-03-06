from django.urls import path

from apps.seekerprofiles.views import ListAllSeekersView, RetrieveSeekerView, FilterSeekersRequestsByStatus, \
    ListAllOfferedTestOfLoggedInSeeker, ToggleVerifySeekerView

urlpatterns = [
    path('list/', ListAllSeekersView.as_view(), name='list-all-seekers'),
    path('<int:seeker_id>/', RetrieveSeekerView.as_view(), name='get-specific-seeker'),
    path('search/', FilterSeekersRequestsByStatus.as_view(), name='filter-seeker-requests-by-status'),
    path('tests/me/', ListAllOfferedTestOfLoggedInSeeker.as_view(), name='list-all-offered-tests-of-logged-in-seeker'),
    path('verify/<int:seeker_id>/', ToggleVerifySeekerView.as_view(), name='toggle-verifying-a-seeker-view'),
]
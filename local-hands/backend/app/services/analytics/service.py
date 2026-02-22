from app.services.analytics.schemas import AnalyticsOverview


def get_overview() -> AnalyticsOverview:
    return AnalyticsOverview(total_profiles=0, total_jobs=0, match_success_rate=0.0)

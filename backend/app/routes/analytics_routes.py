from collections import defaultdict
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth import require_admin
from ..database import get_db

router = APIRouter(prefix="/api", tags=["analytics"])


@router.get("/analytics", response_model=schemas.AnalyticsResponse)
def get_analytics(_: models.User = Depends(require_admin), db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

    total_users = db.query(func.count(models.User.id)).scalar() or 0
    total_admins = db.query(func.count(models.User.id)).filter(models.User.role == "admin").scalar() or 0
    active_users = db.query(func.count(models.User.id)).filter(models.User.last_login.is_not(None)).scalar() or 0
    new_users_today = (
        db.query(func.count(models.User.id)).filter(models.User.created_at >= today_start).scalar() or 0
    )

    seven_days_ago = today_start - timedelta(days=6)
    users = db.query(models.User).filter(models.User.created_at >= seven_days_ago).all()

    growth_map = defaultdict(int)
    for user in users:
        key = user.created_at.astimezone(timezone.utc).strftime("%Y-%m-%d")
        growth_map[key] += 1

    cumulative = 0
    user_growth = []
    for idx in range(7):
        day = seven_days_ago + timedelta(days=idx)
        key = day.strftime("%Y-%m-%d")
        cumulative += growth_map[key]
        user_growth.append({"date": key, "users": cumulative})

    role_rows = db.query(models.User.role, func.count(models.User.id)).group_by(models.User.role).all()
    role_distribution = [{"role": role, "count": count} for role, count in role_rows]

    weekly_activity = []
    for idx in range(7):
        day_start = today_start - timedelta(days=(6 - idx))
        day_end = day_start + timedelta(days=1)
        logins = (
            db.query(func.count(models.User.id))
            .filter(models.User.last_login >= day_start, models.User.last_login < day_end)
            .scalar()
            or 0
        )
        weekly_activity.append({"day": day_start.strftime("%a"), "logins": logins})

    recent_users = db.query(models.User).order_by(models.User.created_at.desc()).limit(8).all()
    recent_activity = [
        {
            "id": user.id,
            "event": "User Registered",
            "name": user.name,
            "timestamp": user.created_at.isoformat(),
        }
        for user in recent_users
    ]

    return {
        "stats": {
            "total_users": total_users,
            "total_admins": total_admins,
            "active_users": active_users,
            "new_users_today": new_users_today,
        },
        "user_growth": user_growth,
        "role_distribution": role_distribution,
        "weekly_activity": weekly_activity,
        "recent_activity": recent_activity,
    }

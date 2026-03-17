from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    role: Literal["admin", "user"] = "user"


class UserCreate(UserBase):
    password: str = Field(min_length=6, max_length=128)


class UserUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=120)
    email: EmailStr | None = None
    role: Literal["admin", "user"] | None = None
    password: str | None = Field(default=None, min_length=6, max_length=128)


class UserRead(UserBase):
    id: int
    created_at: datetime
    last_login: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    token: str
    userId: int
    role: str


class TokenData(BaseModel):
    user_id: int
    role: str


class DashboardStats(BaseModel):
    total_users: int
    total_admins: int
    active_users: int
    new_users_today: int


class GrowthPoint(BaseModel):
    date: str
    users: int


class RoleDistribution(BaseModel):
    role: str
    count: int


class WeeklyActivity(BaseModel):
    day: str
    logins: int


class AnalyticsResponse(BaseModel):
    stats: DashboardStats
    user_growth: list[GrowthPoint]
    role_distribution: list[RoleDistribution]
    weekly_activity: list[WeeklyActivity]
    recent_activity: list[dict]

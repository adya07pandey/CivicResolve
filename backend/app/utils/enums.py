from enum import Enum


class UserRole(str, Enum):

    admin = "admin"
    officer = "officer"
    citizen = "citizen"


class ComplaintStatus(str, Enum):

    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    RESOLVED = "RESOLVED"


class ComplaintPriority(str, Enum):

    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
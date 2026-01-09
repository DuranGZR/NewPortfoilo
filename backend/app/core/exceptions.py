"""
Custom Exceptions
"""
from fastapi import HTTPException


class NotFoundException(HTTPException):
    """Resource not found."""
    def __init__(self, detail: str = "Resource not found"):
        super().__init__(status_code=404, detail=detail)


class BadRequestException(HTTPException):
    """Bad request."""
    def __init__(self, detail: str = "Bad request"):
        super().__init__(status_code=400, detail=detail)


class UnauthorizedException(HTTPException):
    """Unauthorized access."""
    def __init__(self, detail: str = "Unauthorized"):
        super().__init__(status_code=401, detail=detail)


class ForbiddenException(HTTPException):
    """Forbidden access."""
    def __init__(self, detail: str = "Forbidden"):
        super().__init__(status_code=403, detail=detail)


class ServiceUnavailableException(HTTPException):
    """Service temporarily unavailable."""
    def __init__(self, detail: str = "Service temporarily unavailable"):
        super().__init__(status_code=503, detail=detail)

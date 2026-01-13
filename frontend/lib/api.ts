/**
 * API Client for Portfolio Backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Types
export interface ChatRequest {
    message: string;
    session_id?: string;
}

export interface ChatResponse {
    response: string;
    session_id: string;
}

export interface ChatSuggestion {
    question: string;
    category: string;
}

export interface ChatSuggestionsResponse {
    suggestions: ChatSuggestion[];
}

export interface ContactRequest {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

export interface ContactResponse {
    success: boolean;
    message: string;
}

export interface AnalyticsEvent {
    event_type: string;
    page?: string;
    metadata?: Record<string, unknown>;
}

// API Functions
export async function sendChatMessage(data: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Chat API error: ${response.status}`);
    }

    return response.json();
}

export async function getChatSuggestions(): Promise<ChatSuggestionsResponse> {
    const response = await fetch(`${API_URL}/chat/suggestions`);

    if (!response.ok) {
        throw new Error(`Suggestions API error: ${response.status}`);
    }

    return response.json();
}

export async function submitContactForm(data: ContactRequest): Promise<ContactResponse> {
    const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Contact API error: ${response.status}`);
    }

    return response.json();
}

export async function trackAnalytics(data: AnalyticsEvent): Promise<void> {
    try {
        await fetch(`${API_URL}/analytics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        // Silently fail for analytics - don't block user experience
        console.warn('Analytics tracking failed:', error);
    }
}

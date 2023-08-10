import type { Action } from 'redux';
import type { Event } from '@models/event';

export const EVENT_KEY = 'WR-EVENT';

export const EventActionTypes = {
    CREATE: `CREATE_${EVENT_KEY}`,
    UPDATE: `UPDATE_${EVENT_KEY}`,
    DELETE: `DELETE_${EVENT_KEY}`,
} as const;

export interface CreateEventPayload extends Event {}

export interface UpdateEventPayload extends Partial<CreateEventPayload> {}

export interface DeleteEventPayload {
    index: number;
}

export interface CreateEventAction extends Action<string> {
    payload: CreateEventPayload;
}

export interface UpdateEventAction extends Action<string> {
    payload: UpdateEventPayload;
}

export interface DeleteEventAction extends Action<string> {
    payload: DeleteEventPayload;
}

export function createEvent(payload: CreateEventPayload): CreateEventAction {
    return {
        type: EventActionTypes.CREATE,
        payload,
    };
}

export function updateEvent(payload: UpdateEventPayload): UpdateEventAction {
    return {
        type: EventActionTypes.UPDATE,
        payload,
    };
}

export function deleteEvent(payload: DeleteEventPayload): DeleteEventAction {
    return {
        type: EventActionTypes.DELETE,
        payload,
    };
}

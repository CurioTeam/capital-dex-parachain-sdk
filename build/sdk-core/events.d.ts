import { ApiPromise, ApiRx } from '@polkadot/api';
import { Vec } from '@polkadot/types';
import { EventRecord } from '@polkadot/types/interfaces';
import '@polkadot/api-augment';
import { FrameSystemEventRecord } from '@polkadot/types/lookup';
import { Observable } from 'rxjs';
export declare const eventMethodsFilter: (methods: string[]) => (event: EventRecord) => boolean;
export declare const eventSectionsFilter: (sections: string[]) => (event: EventRecord) => boolean;
export declare const eventsFilter: (data: {
    section: string;
    method: string;
}[]) => (event: FrameSystemEventRecord) => boolean;
export declare const mockEventRecord: (section?: string, method?: string) => Vec<EventRecord>;
export declare const eventsFilterRx: (api: ApiRx, configs: {
    section: string;
    method: string;
}[], immediately: boolean) => Observable<FrameSystemEventRecord>;
export declare const eventsFilterCallback: (api: ApiPromise, configs: {
    section: string;
    method: string;
}[], immediately: boolean, callback: () => void) => void;

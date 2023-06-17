export interface Payload {
	type: 'join' | 'create' | 'leave';
	room: string;
	name: string;
}


export interface Message {
	payload: Payload;
	data: {
		message: string;
		type: 'message';
	};
}
export interface Video {
	payload: Payload;
	data: {
		currentTime: number;
		paused: boolean;
		type: 'video';
		duration: number;
	};
}

export type SocketData = Message | Video;

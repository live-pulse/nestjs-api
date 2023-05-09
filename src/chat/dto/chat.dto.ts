
export class ChatDto {

  streamKey: string;
  userId: number;
  name: string;
  message: string;

  static of(streamKey: string, name: string): ChatDto {
    const chat = new ChatDto();
    chat.streamKey = streamKey;
    chat.userId = 0;
    chat.name = name;
    chat.message = `${name}님이 입장하셨습니다.`;
    return chat;
  }
}

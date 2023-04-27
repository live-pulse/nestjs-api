
export class StreamSaveRequest {
  streamId: string;
  status: string;
  type: string;
  name: string;
  publish: boolean;
  date: number;
  plannedStartDate: number;
  plannedEndDate: number;
  duration: number;
  publicStream: boolean;
  is360: boolean;
  password: string;
  speed: number;
  streamUrl: string;
  originAdress: string;
  mp4Enabled: number;
  webMEnabled: number;
  expireDurationMS: number;
  rtmpURL: string;
  zombi: boolean;
  pendingPacketSize: number;
  hlsViewerCount: number;
  webRTCViewerCount: number;
  rtmpViewerCount: number;
  startTime: number;
  receivedBytes: number;
  bitrate: number;
  userAgent: string;
  absoluteStartTimeMs: number;
  webRTCViewerLimit: number;
  hlsViewerLimit: number;

  static of(streamKey: string){
    const request = new StreamSaveRequest();
    request.streamId = streamKey;
    request.status = 'created';
    request.type = 'liveStream';
    request.name = streamKey;
    request.publish = true;
    request.date = new Date().getTime();
    request.plannedStartDate = 0;
    request.plannedEndDate = 0;
    request.duration = 0;
    request.publicStream = true;
    request.is360 = false;
    request.speed = 0.0;
    request.originAdress = '127.0.0.1';
    request.mp4Enabled = 0;
    request.webMEnabled = 0;
    request.expireDurationMS = 0;
    request.rtmpURL = process.env.STREAM_RTMP_URL + streamKey;
    request.zombi = false;
    request.pendingPacketSize = 0;
    request.hlsViewerCount = 0;
    request.webRTCViewerCount = 0;
    request.rtmpViewerCount = 0;
    request.startTime = 0;
    request.receivedBytes = 0;
    request.bitrate = 0;
    request.userAgent = "N/A";
    request.absoluteStartTimeMs = 0;
    request.webRTCViewerLimit = -1;
    request.hlsViewerLimit = -1;
    return request;
  }

}

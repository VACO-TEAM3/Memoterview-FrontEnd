export async function mediaStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    return stream;
  } catch (error) {
    console.error(error);
  }
}

export const mediaOptions = {
  audioOff(stream) {
    return stream.getAudioTracks().forEach((track) => (track.enabled = false));
  },
  audioOn(stream) {
    return stream.getAudioTrack().forEach((track) => (track.enabled = true));
  },
  videoOff(stream) {
    return stream.getVideoTracks().forEach((track) => (track.enabled = false));
  },
  videoOn(stream) {
    return stream.getVideoTracks().forEach((track) => (track.enabled = true));
  },
};

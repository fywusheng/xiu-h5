/*
 * @Description: 录音API
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-07-13 15:20:23
 */
import Recorder from "./recorder";
export default class Record {
  startRecord(param) {
    let self = this;
    try {
      Recorder.get(rec => {
        if (rec.error) return param.error(rec.error);
        self.recorder = rec;
        self.recorder.start();
        param.success("开始讲话");
      })
    } catch (e) {
      param.error("开始讲话失败" + e);
    }
  }

  stopRecord(param) {
    let self = this;
    try {
      let blobData = self.recorder.getBlob();
      param.success(blobData);
    } catch (e) {
      param.error("结束讲话失败" + e);
    }
  }

  play(audio) {
    let self = this;
    try {
      self.recorder.play(audio);
    } catch (e) {
      console.error("讲话失败" + e);
    }
  }

  clear(audio) {
    let self = this;
    try {
      self.recorder.clear(audio);
    } catch (e) {
      console.error("清空录音失败" + e);
    }
  }
}
import "./css/Page.css";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecordWebcam } from "react-record-webcam";
import { Setb, Setburl } from "../App";
import "./css/Home2.css";

const Record = ({ match }) => {
  const history = useHistory();
  const num = match.params.num;
  const OPTIONS = { recordingLength: 5, fileType: "mp4" }; // 녹화 제한 시간, 확장자
  const recordWebcam = useRecordWebcam(OPTIONS);

  const setburl = useContext(Setburl);
  const Setblob = useContext(Setb);

  const [re_state, set_state] = useState(false);
  const [record_state, set_restate] = useState(false);

  useEffect(() => {
    recordWebcam.open();
    set_state(false);
  }, []);

  const set = () => {
    recordWebcam.getRecording().then((respone) => Setblob(respone));
    setburl(recordWebcam.previewRef.current.currentSrc);
    history.push({
      pathname: "/Preview/" + num,
    });
  };

  const stop = () => {
    set_state(true);
    set_restate(false);
    recordWebcam.stop();
  };

  const retake = () => {
    set_state(false);
    recordWebcam.retake();
  };

  const start = () => {
    recordWebcam.start();
    set_restate(true);
  };

  return (
    <div class="masthead height: 100%">
      <div class="container-lg p-3 mb-2 vh-80">
        <h1>Record Your Face!</h1>
        <div class="container d-block">
          <div style={{ display: "block" }}>
            {re_state ? (
              <div class="container p-3 mb-2 vh-80">
                <div class="pt-4">
                  {" "}
                  <video
                    ref={recordWebcam.previewRef}
                    height="480px"
                    width="680px"
                    autoPlay
                    muted
                    loop
                  />
                </div>
              </div>
            ) : (
              <div class="mt-4">
                <video
                  ref={recordWebcam.webcamRef}
                  height="480px"
                  width="680px"
                  autoPlay
                  muted
                />
              </div>
            )}
            <p>Camera status: {recordWebcam.status}</p>
          </div>
          {re_state ? (
            <div class="m-4">
              <button class="m-2" onClick={retake}>
                Retake{"  "}
                <i class="bi bi-camera-video"/>
              </button>
            </div>
          ) : (
            <div class="m-4">
              <button class="m-2" onClick={start}>
                Start{"  "}
                <i class="bi bi-camera-video"/>
              </button>
              <button onClick={stop} class="m-2" disabled={!record_state}>
                Stop{"  "}
                <i class="bi bi-stop-circle"></i>
              </button>
            </div>
          )}
        </div>
        <Link to="../Selection">
          <button
            type="button"
            class="btn btn-primary m-3"
            disabled={record_state}
          >
            <i class="bi-caret-left"/>
            BACK
          </button>
        </Link>
        <button
          type="button"
          class="btn btn-primary m-3"
          disabled={!re_state}
          onClick={set}
        >
          NEXT
          <i class="bi-caret-right"/>
        </button>
      </div>
    </div>
  );
};

export default Record;

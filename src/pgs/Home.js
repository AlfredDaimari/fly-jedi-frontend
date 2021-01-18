import React from "react";
import Header from "./cont/Header";
import "../css/Home.css";
import BB8 from "./BB8";

export default function Home(props) {
  //const [loading, setLoading] = useState(true);
  //var style = { display: "none" };
  /* useEffect(() => {
    if (!loading) {
      style.display = "block";
    }
  }, [loading]);*/
  /*  useEffect(() => {
    setTimeout(() => setLoading(false), 6000);
  }, [loading]);
*/
  return (
    <div>
      <Header user={props.user} />
      <video className="lp-bg-video" autoPlay loop muted>
        <source src="/img/homepage_bg_video.mp4" type="video/mp4" />
      </video>
      <BB8 />
    </div>

    /*  
    <div>
      {loading === false ? (
        <div>
          <Header user={props.user} />
          <video
            className="lp-bg-video"
            autoPlay
            loop
            muted
          >
            <source src="/img/homepage_bg_video.mp4" type="video/mp4" />
          </video>
          <BB8 />
        </div>
      ) : (
      <div>
      <img source src="/img/loading.gif"></img>
      <video
        className="lp-bg-video"
        autoPlay
        loop
        muted
      >
        <source src="/img/homepage_bg_video.mp4" type="video/mp4" />
      </video>  
      
      </div>
      )}
    </div>*/
  );
}
